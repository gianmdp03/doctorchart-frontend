// Synthetic identity and intercepted APIs only. No real account/network writes.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createPreview } from './preview-server.mjs';
import site from '../src/app/core/config/site.config.json' with {type:'json'};

const text=readFileSync('src/environments/environment.base.ts','utf8');
const project=text.match(/https:\/\/([a-z0-9]+)\.supabase\.co/)[1];
const server=createPreview({directory:resolve('dist/doctorchart-frontend/browser'),...site});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge'});
const specialty={id:1,code:'TEST',name:'Especialidad de prueba',description:null};
const setup={id:1,version:0,specialty,onboardingCompleted:true,currentStepKey:'completed',sourceWizardVersion:1,draftSourceWizardVersion:null,draftDefinition:null,experience:{specialtyId:1,specialtyVersion:1,navigation:['DASHBOARD','PATIENTS','WIZARD'],patientRecordTabs:['SUMMARY','ENCOUNTERS'],patientRecordActions:['NEW_ENCOUNTER']},definition:{patientForm:{categories:[]},encounterForm:{categories:[]},modulesConfig:{CLINICAL_RECORDS:true,AI_ASSISTANT:false}}};
const record={id:1,patientId:1,patientFullName:'Paciente ficticio UTC',specialtyId:1,specialty,version:0,workspaceVersion:0,encounterDate:'2026-10-15T01:30:00Z',consultationType:'FIRST_VISIT',chiefComplaint:'Prueba de horario',formValues:{},formulaResults:{},formDefinitionSnapshot:{categories:[]},formulaContext:{zone:'Europe/Madrid'}};
const expires=Math.floor(Date.now()/1000)+3600;
const user={id:'00000000-0000-4000-8000-000000000001',aud:'authenticated',role:'authenticated',email:'fixture@example.invalid',app_metadata:{role:'DOCTOR',app_modules:{doctorchart:{active:true,tier:'PRO',expires_at:new Date((expires+3600)*1000).toISOString()}}},user_metadata:{full_name:'Profesional de prueba'},created_at:'2026-01-01T00:00:00Z'};
const session={user,access_token:'e30.'+Buffer.from(JSON.stringify({sub:user.id,aud:'authenticated',exp:expires,role:'authenticated'})).toString('base64url')+'.fixture',refresh_token:'synthetic',expires_in:3600,expires_at:expires,token_type:'bearer'};
const reports=[];
try {
  for(const [timeZone,expected] of [['America/Argentina/Buenos_Aires','14/10/2026 22:30'],['Europe/Madrid','15/10/2026 03:30'],['America/Los_Angeles','14/10/2026 18:30']]) {
    const context=await browser.newContext({timezoneId:timeZone,viewport:{width:1440,height:900}});
    await context.addInitScript(({key,session})=>localStorage.setItem(key,JSON.stringify(session)),{key:'sb-'+project+'-auth-token',session});
    const zones=[];
    await context.route('**/*',async route=>{
      const request=route.request(),url=new URL(request.url());
      if(url.origin===origin) return route.continue();
      const headers={'access-control-allow-origin':origin,'access-control-allow-headers':'authorization,content-type,apikey,x-client-info','access-control-allow-methods':'GET,POST,OPTIONS','content-type':'application/json'};
      if(request.method()==='OPTIONS')return route.fulfill({status:204,headers});
      if(url.hostname.endsWith('.supabase.co'))return route.fulfill({status:200,headers,body:JSON.stringify(url.pathname.endsWith('/user')?user:session)});
      if(url.pathname.startsWith('/api/doctorchart/')) {
        assert.equal(request.method(),'GET','Unexpected clinical write');
        zones.push(url.searchParams.get('timeZone'));
        let body=null;
        if(url.pathname.endsWith('/workspace'))body=setup;
        else if(url.pathname.endsWith('/workspace/preferences'))body={version:0,quickNotes:null,patientColumnsConfig:{}};
        else if(url.pathname.endsWith('/encounters/1'))body=record;
        else if(url.pathname.endsWith('/encounters'))body={content:[record],page:{size:50,number:0,totalElements:1,totalPages:1}};
        return route.fulfill({status:200,headers,body:JSON.stringify(body)});
      }
      return route.abort();
    });
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    try {
      await page.goto(origin+'/consultas');
      await page.getByText(expected,{exact:true}).waitFor();
      await page.getByRole('button',{name:'Ver Detalle',exact:true}).click();
      await page.locator('app-encounter-detail-dialog [role=dialog]').waitFor();
      assert.ok((await page.locator('app-encounter-detail-dialog').innerText()).includes(expected));
      await page.getByRole('button',{name:'Editar consulta',exact:true}).click();
      assert.equal(await page.locator('app-encounter-detail-dialog input[type=time], app-encounter-detail-dialog app-date-picker').count(),0);
      assert.ok((await page.locator('app-encounter-detail-dialog').innerText()).includes('no editable'));
      const native=await page.evaluate(()=>new Intl.DateTimeFormat().resolvedOptions().timeZone);
      assert.ok(zones.length>=4);assert.ok(zones.every(zone=>zone===native));assert.deepEqual(errors,[]);
      reports.push({timeZone,display:expected,requestZone:native,requests:zones.length,status:'PASS'});
      console.log(timeZone+': visible instant, request context and immutable date passed.');
    } catch (error) { console.error({url:page.url(),body:(await page.locator('body').innerText()).slice(0,1800),errors,zones}); throw error; }
    finally {await context.close();}
  }
} finally {await browser.close();await new Promise(r=>server.close(r));}
writeFileSync('docs/time-zone-browser-results.json',JSON.stringify(reports,null,2));
