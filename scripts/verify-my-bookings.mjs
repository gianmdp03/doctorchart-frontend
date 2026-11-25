// Local browser regression. All API data below is synthetic and intercepted in the test browser only.
// Start ng serve before running this script (MY_BOOKINGS_URL defaults to port 4203).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const output = path.resolve('test-results/my-bookings');
fs.mkdirSync(output, {recursive:true});
const browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHROME_CHANNEL || 'msedge'});
const base = {
  reference:'next', status:'CONFIRMED', start:'2030-12-02T13:00:00Z', end:'2030-12-02T13:30:00Z',
  doctorName:'Dra. Ana Pérez', specialtyName:'Clínica médica', clinicName:'Consultorio de prueba',
  address:'Dirección de prueba 123, Buenos Aires', modality:'IN_PERSON', timezone:'America/Argentina/Buenos_Aires',
  version:'1', canChange:true, publicDoctorId:'doctor-test', publicClinicId:'clinic-test', specialtyContextId:'specialty-test',
};
let items = [];
let mode = 'verified';
let verified = true;
const mutations = [];
const errors = [];
let page;
try {
  page = await browser.newPage({viewport:{width:1440,height:1000}, timezoneId:'Asia/Tokyo'});
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/doctorchart/**', async route => {
    const request = route.request();
    const url = request.url();
    const body = request.postDataJSON();
    const fulfill = data => route.fulfill({json:data});
    if (url.endsWith('/my-bookings')) {
      if (mode === 'error') return route.fulfill({status:503,json:{message:'No pudimos cargar tus turnos.'}});
      if (body?.document) return fulfill({items:[
        {reference:'next',date:'2030-12-02',canAccess:false,canChange:true,canReschedule:true},
        {reference:'past',date:'2020-01-01',canAccess:false,canChange:false,canReschedule:false},
      ],hasMore:false});
      if (!verified) return route.fulfill({status:403,json:{code:'BOOKING_ACCESS_DENIED'}});
      return fulfill({items,hasMore:false,expiresAt:new Date(Date.now() + 48 * 3600_000).toISOString()});
    }
    if (url.endsWith('/challenge')) return fulfill({token:'portal-browser-regression',difficulty:18});
    if (url.endsWith('/access/request')) return fulfill({requestId:'test-code',maskedEmail:'ana***@example.invalid'});
    if (url.endsWith('/access/verify')) { verified = true; return route.fulfill({status:204}); }
    if (url.endsWith('/my-bookings/change')) {
      mutations.push(body);
      items = items.map(item => item.reference !== body.reference ? item : body.action === 'cancel'
        ? {...item,status:'CANCELLED',canChange:false,version:'2'}
        : {...item,start:body.start,end:'2030-12-03T13:30:00Z',version:'2'});
      return fulfill({});
    }
    if (url.includes('/availability')) return fulfill({timezone:base.timezone,days:[{date:'2030-12-03',slots:[{start:'2030-12-03T13:00:00Z',end:'2030-12-03T13:30:00Z'}]}]});
    if (url.endsWith('/my-bookings/logout')) { verified = false; return route.fulfill({status:204}); }
    return fulfill({});
  });
  items = [base,
    {...base,reference:'later',start:'2030-12-04T14:00:00Z',end:'2030-12-04T14:45:00Z',modality:'TELECONSULTATION',address:''},
    {...base,reference:'past',start:'2020-01-01T13:00:00Z',end:'2020-01-01T13:30:00Z',canChange:false},
    {...base,reference:'cancelled',status:'CANCELLED',canChange:false},
  ];
  const goto = async () => {
    await page.goto((process.env.MY_BOOKINGS_URL || 'http://127.0.0.1:4203') + '/appointments/confirmation');
    await page.locator('.dashboard-heading').waitFor();
  };
  await goto();
  assert.match(await page.locator('#booking-next').innerText(), /10:00/);
  assert.equal(await page.locator('#booking-past button').isDisabled(), true);
  assert.equal(await page.locator('#booking-cancelled button').isDisabled(), true);
  await page.locator('#booking-next').getByRole('button',{name:'Ver detalles'}).click();
  await page.locator('#details-next').waitFor();
  const detailsButton = page.locator('#booking-next').getByRole('button',{name:'Ocultar detalles'});
  await detailsButton.focus();
  await page.keyboard.press('Enter');
  await page.locator('#details-next').waitFor({state:'detached'});
  await page.keyboard.press('Enter');
  await page.locator('#details-next').waitFor();
  assert.equal(await page.locator('nav [aria-current="page"]').innerText(),'Mis turnos');
  for (const theme of ['light','dark']) {
    await page.evaluate(theme => {localStorage.setItem('doctorchart_theme',theme);document.documentElement.classList.toggle('dark',theme === 'dark');}, theme);
    for (const width of [1440,834,390,320]) {
      await page.setViewportSize({width,height:1000});
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${theme} ${width}: horizontal overflow`);
      await page.screenshot({path:path.join(output,`verified-${theme}-${width}.png`),fullPage:true,animations:'disabled'});
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#booking-next').getByRole('button',{name:'Reprogramar'}).click();
  await page.locator('#portal-change-reason').fill('Cambio de disponibilidad (prueba)');
  await page.locator('.slot-time').click();
  await page.getByRole('button',{name:'Confirmar horario'}).click();
  await page.getByRole('status').filter({hasText:'El turno se reprogramó.'}).waitFor();
  assert.equal(mutations[0].action,'reschedule');
  assert.equal(mutations[0].start,'2030-12-03T13:00:00Z');
  await page.locator('#booking-next').getByRole('button',{name:'Cancelar turno'}).click();
  assert.equal(mutations.length,1, 'Cancellation must require confirmation');
  await page.locator('#portal-change-reason').fill('No puedo asistir (prueba)');
  await page.screenshot({path:path.join(output,'cancellation-confirmation.png'),fullPage:true,animations:'disabled'});
  await page.getByRole('button',{name:'Confirmar cancelación'}).click();
  await page.getByRole('status').filter({hasText:'El turno se canceló.'}).waitFor();
  assert.equal(mutations[1].action,'cancel');
  assert.equal(await page.locator('#booking-next button').isDisabled(),true);

  // Exercise the real DNI -> proof -> email -> verified panel UI.
  verified = false;
  await page.reload();
  await page.locator('#portal-document').fill('12345678');
  await page.getByRole('button',{name:'Ver mis turnos',exact:true}).click();
  await page.locator('#booking-next').waitFor();
  assert.equal(await page.locator('#booking-past button').isDisabled(),true);
  assert.equal(await page.getByText(base.doctorName,{exact:true}).count(),0);
  await page.screenshot({path:path.join(output,'preview-dark-desktop.png'),fullPage:true});
  await page.locator('#booking-next').getByRole('button',{name:'Ver detalles'}).click();
  await page.locator('#confirmation-code').fill('123456');
  await page.getByRole('button',{name:'Confirmar código'}).click();
  await page.locator('.dashboard-heading').waitFor();

  // Date rollover closes an already open panel without a refresh.
  items = [{...base,start:new Date(Date.now()+60_000).toISOString(),end:new Date(Date.now()+120_000).toISOString()}, {...base,reference:'another'}];
  await goto();
  await page.locator('#booking-next').getByRole('button',{name:'Ver detalles'}).click();
  await page.locator('#details-next').waitFor();
  await page.locator('#booking-next').getByRole('button',{name:'Cancelar turno'}).click();
  await page.locator('#portal-change-reason').waitFor();
  await page.clock.install();
  await page.clock.fastForward(61_000);
  await page.locator('.booking-details').waitFor({state:'detached'});
  assert.equal(await page.locator('.booking-details').count(),0);
  assert.equal(await page.locator('#booking-next button').isDisabled(),true);
  assert.equal(await page.locator('.change-panel').count(),0);
  assert.equal(await page.locator('#booking-another').getByRole('button',{name:'Cancelar turno'}).isEnabled(),true);
  await page.clock.resume();

  items = [];
  await goto();
  await page.locator('.empty-state').waitFor();
  await page.screenshot({path:path.join(output,'empty.png'),fullPage:true,animations:'disabled'});
  mode = 'error';
  await page.reload();
  await page.locator('.error').waitFor();
  await page.locator('.public-header').waitFor();
  await page.locator('.public-footer').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path:path.join(output,'error.png'),fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[]);
  console.log('Verified: both themes at 1440/834/390/320 px, no overflow or page errors, Argentine time in a foreign device zone, code flow, expired details, cancellation, rescheduling, empty and error states. Screenshots:',output);
} catch (error) {
  if (page) {
    await page.screenshot({path:path.join(output,'failure.png'),fullPage:true});
    console.error('Page errors:', errors, 'Visible page:', await page.locator('body').innerText());
  }
  throw error;
} finally { await browser.close(); }
