import {chromium} from 'playwright';import fs from 'node:fs';import path from 'node:path';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
const dir=path.resolve('test-results/validation');const browser=await chromium.launch({channel:'msedge'});const page=await browser.newPage({reducedMotion:'reduce'});
await page.route('**/*',route=>{const u=route.request().url();return u.startsWith('file:')||u.startsWith('http://127.0.0.1:4202/')?route.continue():route.abort();});
const failures=[];const cases=['paciente-inicial','paciente-al-guardar','paciente-corregido','historias-colapsadas','historia-expandida','detalle-volver-paciente'];
try{for(const name of cases){for(const width of [1440,768,430,390,320]){for(const theme of ['light','dark']){
await page.setViewportSize({width,height:1000});await page.goto(pathToFileURL(path.resolve(`test-results/mobile/workspace-${theme}.html`)).href,{waitUntil:'domcontentloaded'});
await page.evaluate(({html,css})=>{const doc=new DOMParser().parseFromString(html,'text/html');document.head.insertAdjacentHTML('beforeend',[...doc.querySelectorAll('style')].map(e=>e.outerHTML).join(''));document.querySelector('.app-main-content').innerHTML=doc.body.innerHTML;const style=document.createElement('style');style.textContent=css;document.head.append(style);},{html:fs.readFileSync(path.join(dir,name+'.html'),'utf8'),css:fs.readFileSync('src/styles-m3-private.css','utf8')+fs.readFileSync('src/app/app.css','utf8')});
await page.evaluate(async()=>{await new Promise(requestAnimationFrame);await Promise.allSettled(document.getAnimations().filter(a=>a.effect.getComputedTiming().iterations!==Infinity).map(a=>a.finished));});
const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,outside:[...document.querySelectorAll('input,select,textarea,button,a')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left< -1||r.right>innerWidth+1);}).map(e=>e.className)}));
if(result.overflow||result.outside.length)failures.push({name,width,theme,...result});
if(name==='paciente-inicial'||name==='paciente-corregido')assert.equal(await page.locator('.field-error,.has-error').count(),0);
if(name==='paciente-al-guardar')assert.equal(await page.locator('.field-error').count(),5);
if(name==='historias-colapsadas'){assert.equal(await page.locator('.card-soap-body,.card-footer-actions').count(),0);assert.equal(await page.locator('.entry-patient').count(),3);}
if(name==='historia-expandida')assert.equal(await page.locator('.card-soap-body').count(),1);
if(name==='detalle-volver-paciente')assert.equal(await page.locator('a:has-text("Volver a la historia del paciente")').getAttribute('href'),'/pacientes/22?tab=historia');
if(width===1440||width===390)await page.screenshot({path:path.join(dir,`${name}-${theme}-${width}.png`),fullPage:true,animations:'disabled'});
}}}fs.writeFileSync(path.join(dir,'audit.json'),JSON.stringify(failures,null,2));assert.deepEqual(failures,[]);console.log('Verified 60 layouts, no initial validation, errors only after save, correction clears errors, collapsed and individually expanded histories, return to patient history.');}finally{await browser.close();}
