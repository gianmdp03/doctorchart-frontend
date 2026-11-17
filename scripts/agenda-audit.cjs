// Run against the disposable M6 lab and its --serve frontend only.
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { randomBytes, X509Certificate, createHash } = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');

const tag = 'doctorchart-specialty-m6-20261110';
const lab = path.join(os.tmpdir(), tag);
const settingsFile = path.join(lab, 'settings.json');
const settings = JSON.parse(fs.readFileSync(settingsFile));
const origin = 'https://localhost:4353';
const apiPrefix = '/api/doctorchart';
const zone = 'America/Argentina/Buenos_Aires';
const secondId = '8c39b9ed-6d89-48b7-8a7b-8bf6d67bdb49';
const secondEmail = 'agenda-audit-virtual@local.test';
const mixedName = 'Profesional mixto de auditoría con nombre y apellido extensos';
const virtualName = 'Profesional virtual de auditoría';
assert.equal(settings.task, tag);
assert.equal(settings.origin, origin);

function docker(...args) {
  return execFileSync('docker', args, { encoding: 'utf8' }).trim();
}

function owned(service, port) {
  const name = `doctorchart-specialty-m6-${service}`;
  const [info] = JSON.parse(docker('inspect', name));
  assert.equal(info.Config.Labels['codex.task'], tag);
  assert.ok(Object.values(info.NetworkSettings.Ports).flat().some(p => p?.HostIp === '127.0.0.1' && p.HostPort === port));
  return name;
}

if (process.argv.includes('--fixture')) {
  const support = owned('support', '19447');
  settings.doctors ??= [];
  if (!settings.doctors.some(doctor => doctor.id === secondId)) {
    assert.ok(!settings.doctors.some(doctor => doctor.email === secondEmail));
    settings.doctors.push({ id: secondId, email: secondEmail, name: virtualName,
      password: randomBytes(24).toString('hex'), refresh: randomBytes(32).toString('hex') });
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
  }
  docker('restart', support);
  console.log('Second signed test identity configured on the disposable lab.');
  process.exit(0);
}

const pg = owned('pg18', '55470');
function sql(statement) {
  return docker('exec', pg, 'psql', '-X', '-v', 'ON_ERROR_STOP=1', '-U', 'migration_fixture', '-d', 'doctorchart_m6_e2e', '-Atc', statement);
}

const out = process.env.DOCTORCHART_AUDIT_OUTPUT || fs.mkdtempSync(path.join(os.tmpdir(), 'doctorchart-agenda-audit-'));
fs.mkdirSync(out, { recursive: true });
const output = name => path.join(out, name);
const run = { cases: [], http: [], browser: [], database: {}, started: new Date().toISOString() };
const nextMonday = new Date();
nextMonday.setUTCHours(12, 0, 0, 0);
nextMonday.setUTCDate(nextMonday.getUTCDate() + ((8 - nextMonday.getUTCDay()) % 7 || 7));
const day = offset => new Date(+nextMonday + offset * 86400000).toISOString().slice(0, 10);
const monday = day(0);
const timestamp = (date, hhmm) => new Date(`${date}T${hhmm}:00-03:00`).toISOString();
const slotSelector = (attribute, start) => `[${attribute}^="${start.slice(0, 19)}"]`;

function persist() {
  fs.writeFileSync(output('results.json'), JSON.stringify(run, null, 2));
}

async function check(id, name, dependencies, page, action) {
  const blocked = dependencies.filter(dep => run.cases.find(item => item.id === dep)?.status !== 'aprobada');
  const result = { id, name, status: 'bloqueada' };
  if (blocked.length) result.dependencies = blocked;
  else {
    try {
      result.evidence = await action();
      result.status = 'aprobada';
    } catch (error) {
      result.status = 'fallida';
      result.error = error.stack || String(error);
      if (page && !page.isClosed()) {
        result.url = safeURL(page.url());
        result.visible = (await page.locator('main').first().innerText({ timeout: 1500 }).catch(() => '')).slice(0, 3500);
        result.screenshot = `${id}-fallo.png`;
        await page.screenshot({ path: output(result.screenshot), timeout: 3000 }).catch(() => { delete result.screenshot; });
      }
    }
  }
  run.cases.push(result);
  persist();
  console.log(`${result.status} ${id} ${name}${result.error ? '\n' + result.error : ''}`);
}

function safeURL(url) {
  const parsed = new URL(url);
  return parsed.origin + parsed.pathname;
}

async function date(page, input, value) {
  const field = page.locator(input);
  await field.fill(value.split('-').reverse().join('/'));
  await field.press('Tab');
}

function response(page, method, endpoint) {
  return page.waitForResponse(reply => {
    const url = new URL(reply.url());
    return reply.request().method() === method && (typeof endpoint === 'string' ? url.pathname === apiPrefix + endpoint : endpoint.test(url.pathname));
  });
}

async function action(page, method, endpoint, trigger, status) {
  const [reply] = await Promise.all([response(page, method, endpoint), trigger()]);
  const body = await reply.json();
  assert.equal(reply.status(), status, `${method} ${endpoint}: ${JSON.stringify(body).slice(0, 650)}`);
  return body;
}

async function login(page, account, specialties) {
  await page.goto(origin + '/login');
  await page.locator('#login-email').fill(account.email);
  await page.locator('#login-password').fill(account.password);
  await page.getByRole('button', { name: 'Ingresar a DoctorChart', exact: true }).click();
  const ids = {};
  for (const [index, name] of specialties.entries()) {
    if (index === 0) await page.getByRole('heading', { name: 'Elegí tu especialidad médica' }).waitFor();
    else {
      await page.goto(origin + '/specialties');
      await page.getByRole('button', { name: 'Agregar especialidad', exact: true }).click();
    }
    await page.getByRole('button', { name: index === 0 ? new RegExp(name) : name, exact: index !== 0 }).click();
    if (index === 0) await page.getByRole('button', { name: 'Continuar', exact: true }).click();
    await page.waitForURL(/\/onboarding\/setup/);
    await page.locator('.step-navigation .step-button').filter({ hasText: 'Historia Clínica' }).click();
    await page.getByRole('button', { name: 'Finalizar configuración', exact: true }).click();
    await page.waitForURL(/\/dashboard\?specialtyContextId=/);
    await page.locator('.notes-textarea').waitFor();
    ids[name] = new URL(page.url()).searchParams.get('specialtyContextId');
  }
  return ids;
}

async function createClinic(page, name, virtual = false) {
  await page.goto(origin + '/clinics');
  if (virtual) await page.getByRole('link', { name: 'Crear agenda virtual' }).click();
  else await page.getByTestId('create-clinic-btn').click();
  await page.locator('#clinic-name').fill(name);
  if (virtual) assert.equal(await page.locator('#clinic-address').count(), 0);
  else {
    const country = page.locator('#clinic-country');
    if (await country.inputValue() !== 'Argentina') await country.selectOption('Argentina');
    await page.locator('#clinic-province').selectOption('Buenos Aires');
    await page.locator('#clinic-city').selectOption('Mar del Plata');
    await page.locator('#clinic-address').fill(`Dirección de ensayo ${name}`);
  }
  const clinic = await action(page, 'POST', '/clinics', () => page.getByTestId('submit-clinic-btn').click(), 201);
  assert.equal(clinic.modality, virtual ? 'TELECONSULTATION' : 'IN_PERSON');
  assert.equal(clinic.timezone, zone);
  if (virtual) assert.equal(clinic.address, '');
  return clinic;
}

async function editClinic(page, clinic, name) {
  await page.goto(origin + '/clinics');
  await page.getByTestId('edit-link-' + clinic.id).click();
  await page.locator('#clinic-name').fill(name);
  const changed = await action(page, 'PATCH', '/clinics/' + clinic.id, () => page.getByTestId('submit-clinic-btn').click(), 200);
  assert.equal(changed.name, name);
  await page.reload();
  await page.locator('#clinic-name').waitFor();
  assert.equal(await page.locator('#clinic-name').inputValue(), name);
  return changed;
}

async function time(input, value) {
  await input.fill(value);
  await input.press('Tab');
}

async function addBlock(page, contextId, weekday, from, to, minutes) {
  await page.getByLabel('Especialidad del bloque').selectOption(contextId);
  await page.locator('.day-options').getByLabel(weekday, { exact: true }).check();
  await time(page.getByRole('textbox', { name: 'Inicio del nuevo bloque', exact: true }), from);
  await time(page.getByRole('textbox', { name: 'Final del nuevo bloque', exact: true }), to);
  await page.locator('#schedule-duration').fill(String(minutes));
  await page.getByRole('button', { name: 'Agregar a los días seleccionados', exact: true }).click();
}

function saveSchedule(page, status = 200) {
  return action(page, 'PUT', /\/schedule$/, () => page.getByTestId('save-schedule').click(), status);
}

async function schedule(page, clinic, context, weekday, from, to, minutes) {
  await page.goto(`${origin}/clinics/${clinic.id}/schedule`);
  await addBlock(page, context, weekday, from, to, minutes);
  const saved = await saveSchedule(page);
  await page.getByText('La agenda se guardó correctamente.', { exact: true }).waitFor();
  return saved;
}

async function publish(page, name, specialties, clinics) {
  await page.goto(origin + '/booking-publication');
  await page.locator('#publication-name').fill(name);
  for (const specialty of specialties) await page.getByRole('checkbox', { name: specialty, exact: true }).check();
  for (const clinic of clinics) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(clinic.name) });
    await checkbox.check();
    if (clinic.modality === 'IN_PERSON') {
      await page.locator('.publication-clinic').filter({ has: checkbox }).getByLabel('Dirección que verá el paciente').fill(clinic.address);
    }
  }
  await page.locator('#publication-enabled').check();
  return action(page, 'PUT', '/booking-publication', () => page.locator('#publication-save').click(), 200);
}

async function publicProfile(page, modality, doctor, clinic, specialty, value = monday) {
  await page.goto(origin + '/appointments');
  const directory = page.locator('.search-results');
  await page.getByRole('combobox', { name: 'Modalidad', exact: true }).selectOption(modality);
  await directory.locator(`article`).filter({ hasText: doctor }).filter({ hasText: clinic }).getByRole('link', { name: /Ver disponibilidad/ }).click();
  await page.getByRole('heading', { name: doctor, exact: true }).waitFor();
  const filter = page.getByLabel('Especialidad de la reserva');
  if (await filter.count()) await filter.selectOption({ label: specialty });
  await date(page, '#public-date', value);
}

async function publicForm(page, start, name, email) {
  await page.locator(slotSelector('data-public-slot', start)).click();
  await page.locator('#public-contact').fill(name);
  await page.locator('#public-document').fill('22345678');
  await page.locator('#public-phone').fill('2231234567');
  await page.locator('#public-email').fill(email);
  await page.locator('#public-consent').check();
  await page.locator('#public-review').click();
}

async function confirmed(page, receipt, modality, start) {
  assert.equal(receipt.modality, modality);
  assert.equal(Date.parse(receipt.start), Date.parse(start));
  await page.getByText(receipt.reference, { exact: true }).waitFor();
}

async function calendar(page, value = monday) {
  await page.goto(origin + '/calendar');
  await date(page, '#calendar-date', value);
  await page.locator('.calendar-board[aria-busy="false"]').waitFor();
}

function booking(page, name) {
  return page.locator('button.event').filter({ hasText: name });
}

async function layout(page, label) {
  const metrics = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth,
    clipped: [...document.querySelectorAll('main h1,main h2,main button.event,main button.primary')]
      .filter(node => node.clientWidth > 0 && node.scrollWidth > node.clientWidth + 2)
      .map(node => node.textContent.trim().slice(0, 160)) }));
  await page.screenshot({ path: output(`${label}.png`), fullPage: true });
  return metrics;
}

async function invite(doctor, staff, name, email, clinicNames, permission, password) {
  await doctor.goto(origin + '/secretaries');
  await doctor.getByRole('textbox', { name: 'Nombre', exact: true }).fill(name);
  await doctor.getByRole('textbox', { name: 'Correo electrónico', exact: true }).fill(email);
  for (const clinicName of clinicNames) await doctor.getByRole('checkbox', { name: new RegExp(clinicName) }).check();
  await doctor.locator('select[name=permissionPreset]').selectOption(permission);
  await action(doctor, 'POST', '/secretaries/invitations', () => doctor.getByRole('button', { name: 'Crear invitación' }).click(), 201);
  const link = await doctor.getByLabel('Enlace de invitación').inputValue();
  assert.equal(new URL(link).origin, origin);
  await staff.goto(link);
  await staff.getByLabel('Contraseña nueva', { exact: true }).fill(password);
  await staff.getByRole('button', { name: 'Entrar a la agenda', exact: true }).click();
  await staff.getByRole('heading', { name: 'Agenda de consultorios' }).waitFor();
  await staff.getByRole('button', { name: 'Cerrar sesión' }).click();
  await staff.waitForURL('**/staff/login');
  await staff.getByLabel('Correo electrónico', { exact: true }).fill(email);
  await staff.getByLabel('Contraseña', { exact: true }).fill(password);
  await staff.getByRole('button', { name: 'Ingresar', exact: true }).click();
  await staff.getByRole('heading', { name: 'Agenda de consultorios' }).waitFor();
}

async function staffAgenda(page, clinicName) {
  const selector = page.getByLabel('Consultorio asignado');
  const option = selector.locator('option').filter({ hasText: clinicName });
  await option.waitFor({ state: 'attached' });
  const key = await option.getAttribute('value');
  await selector.selectOption(key);
  await date(page, '#staff-date', monday);
  return key.split('|');
}

function assertPrivateProjection(document) {
  const forbidden = /^(patientId|provenance|address|meeting.*|googleMeet.*|video.*|joinUrl|clinical.*)$/i;
  const scan = value => {
    if (!value || typeof value !== 'object') return;
    for (const [key, nested] of Object.entries(value)) {
      assert.ok(!forbidden.test(key), `Campo privado en secretaría: ${key}`);
      scan(nested);
    }
  };
  scan(document);
}

function staffRequest(page, endpoint, options) {
  return page.evaluate(async ({ endpoint, options }) => {
    const reply = await fetch(endpoint, options);
    return { status: reply.status, body: await reply.json() };
  }, { endpoint, options });
}

async function main() {
  assert.equal(sql('SELECT count(*) FROM doctor_workspaces'), '0', 'Use a fresh disposable M6 database');
  const secondAccount = settings.doctors?.find(doctor => doctor.id === secondId);
  assert.ok(secondAccount, 'Run with --fixture first');
  run.database.version = sql('SHOW server_version');
  run.database.constraints = sql("SELECT conname FROM pg_constraint WHERE contype='x' ORDER BY conname").split('\n');
  const cert = new X509Certificate(fs.readFileSync(path.join(lab, 'certs/cert.pem')));
  const spki = createHash('sha256').update(cert.publicKey.export({ type: 'spki', format: 'der' })).digest('base64');
  const browser = await chromium.launch({ channel: 'chrome', args: ['--ignore-certificate-errors-spki-list=' + spki] });
  async function open(label, mobile = false, timezoneId = zone) {
    const context = await browser.newContext({ timezoneId, locale: 'es-AR', viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    if (process.env.DOCTORCHART_AUDIT_ANGULAR_STACKS === '1') {
      const cdp = await context.newCDPSession(page);
      cdp.on('Runtime.consoleAPICalled', event => {
        if (event.type === 'warning' && event.args.some(arg => String(arg.value).includes('NG0956'))) {
          run.browser.push({ label, type: 'angular-stack', frames: event.stackTrace?.callFrames });
        }
      });
      await cdp.send('Runtime.enable');
    }
    page.on('pageerror', error => run.browser.push({ label, type: 'pageerror', message: error.message }));
    page.on('console', message => {
      if (['warning', 'error'].includes(message.type())) run.browser.push({ label, type: message.type(), message: message.text(), location: message.location() });
    });
    page.on('requestfailed', request => run.browser.push({ label, type: 'requestfailed', method: request.method(), url: safeURL(request.url()), message: request.failure()?.errorText }));
    page.on('response', reply => {
      if (reply.status() >= 400) run.http.push({ label, method: reply.request().method(), url: safeURL(reply.url()), status: reply.status() });
    });
    return page;
  }
  try {
    const doctor = await open('médico mixto');
    const virtualDoctor = await open('médico virtual');
    const physicalPatient = await open('paciente presencial', true);
    const virtualPatient = await open('paciente virtual', true, 'America/New_York');
    const competitor = await open('paciente concurrente', true);
    const secondPatient = await open('paciente del médico virtual', true);
    const manager = await open('secretaría con gestión', true);
    const restricted = await open('secretaría de lectura', true);
    const specialties = ['Pediatría', 'Medicina General', 'Dermatología'];
    const [pediatrics, general, dermatology] = specialties;
    const physicalStart = timestamp(monday, '09:00');
    const virtualStart = timestamp(monday, '13:00');
    const physicalName = 'Paciente presencial de ensayo';
    const virtualNames = ['Paciente virtual uno', 'Paciente virtual dos'];
    const staffName = 'Turno virtual de secretaría';
    let ids, secondSpecialty, a, b, c, tele, secondTele, physicalReceipt, virtualWinner, thirdBooking;

    await check('A01', 'Iniciar sesión y configurar tres especialidades y fichas sintéticas', [], doctor, async () => {
      ids = await login(doctor, settings, specialties);
      for (const [index, id] of Object.values(ids).entries()) {
        await doctor.goto(`${origin}/patients/new?specialtyContextId=${id}`);
        await doctor.locator('#field-sys_firstName').fill('Paciente');
        await doctor.locator('#field-sys_lastName').fill('Prueba ' + (index + 1));
        await doctor.locator('#field-sys_dni').fill('2234567' + index);
        await date(doctor, '#field-sys_dob', '2010-01-01');
        await doctor.locator('#field-sys_sex').selectOption('MALE');
        await doctor.getByRole('button', { name: 'Crear Paciente', exact: true }).click();
        await doctor.waitForURL(/\/(?:patients|records)\/[0-9]+/);
      }
      return { specialties: ids };
    });

    await check('A02', 'Crear tres consultorios físicos y editar uno con recarga', ['A01'], doctor, async () => {
      a = await createClinic(doctor, 'Consultorio A inicial');
      a = await editClinic(doctor, a, 'Consultorio A');
      b = await createClinic(doctor, 'Consultorio B');
      c = await createClinic(doctor, 'Consultorio C');
      assert.equal(new Set([a.id, b.id, c.id]).size, 3);
      return [a.id, b.id, c.id];
    });

    await check('A03', 'Crear agenda virtual sin domicilio', ['A01'], doctor, async () => {
      tele = await createClinic(doctor, 'Agenda virtual mixta del centro médico de especialidades', true);
      return { id: tele.id, modality: tele.modality, address: tele.address };
    });

    await check('A04', 'Guardar bloques de tres especialidades con duraciones distintas y recargar', ['A02'], doctor, async () => {
      await schedule(doctor, a, ids[general], 'Lunes', '09:00', '13:00', 30);
      await schedule(doctor, b, ids[pediatrics], 'Lunes', '16:00', '18:00', 20);
      await schedule(doctor, c, ids[dermatology], 'Martes', '09:00', '12:00', 45);
      await doctor.reload();
      await doctor.getByRole('textbox', { name: 'Martes inicio 1' }).waitFor();
      assert.equal(await doctor.getByRole('textbox', { name: 'Martes inicio 1' }).inputValue(), '09:00');
      await doctor.getByText(/45 min por turno/).first().waitFor();
      return { minutes: [30, 20, 45] };
    });

    await check('B01', 'Rechazar 12:00–15:00 sobre 09:00–13:00 y explicar la intersección', ['A03', 'A04'], doctor, async () => {
      await doctor.goto(`${origin}/clinics/${tele.id}/schedule`);
      await addBlock(doctor, ids[dermatology], 'Lunes', '12:00', '15:00', 30);
      const reply = await saveSchedule(doctor, 409);
      const message = await doctor.getByTestId('schedule-error').innerText();
      assert.equal(reply.code, 'SCHEDULE_CONFLICT');
      assert.equal(reply.details.existing.name, a.name);
      assert.equal(reply.details.existing.modality, 'IN_PERSON');
      assert.equal(Date.parse(reply.details.overlapEnd) - Date.parse(reply.details.overlapStart), 3600000);
      assert.match(message, /Consultorio A.*09:00.*13:00.*12:00[–-]13:00/s);
      await doctor.screenshot({ path: output('B01-conflicto.png'), fullPage: true });
      return { message, details: reply.details };
    });

    await check('B02', 'Aceptar límites contiguos y persistir la teleconsulta', ['B01'], doctor, async () => {
      await time(doctor.getByRole('textbox', { name: 'Lunes inicio 1' }), '13:00');
      const saved = await saveSchedule(doctor);
      await doctor.getByText('La agenda se guardó correctamente.', { exact: true }).waitFor();
      await doctor.reload();
      await doctor.getByRole('textbox', { name: 'Lunes inicio 1' }).waitFor();
      assert.equal(await doctor.getByRole('textbox', { name: 'Lunes inicio 1' }).inputValue(), '13:00');
      return saved.weekly.find(item => item.weekday === 1);
    });

    await check('B03', 'Rechazar edición presencial sobre teleconsulta ya guardada', ['B02'], doctor, async () => {
      await doctor.goto(`${origin}/clinics/${a.id}/schedule`);
      await time(doctor.getByRole('textbox', { name: 'Lunes fin 1' }), '13:30');
      const reply = await saveSchedule(doctor, 409);
      assert.equal(reply.code, 'SCHEDULE_CONFLICT');
      assert.equal(reply.details.existing.modality, 'TELECONSULTATION');
      await doctor.getByTestId('schedule-error').filter({ hasText: '13:00–13:30' }).waitFor();
      await time(doctor.getByRole('textbox', { name: 'Lunes fin 1' }), '13:00');
      await saveSchedule(doctor);
      return reply.details;
    });

    await check('B04', 'Rechazar superposición entre consultorios de especialidades distintas', ['A04'], doctor, async () => {
      await doctor.goto(`${origin}/clinics/${b.id}/schedule`);
      await addBlock(doctor, ids[pediatrics], 'Lunes', '10:00', '11:00', 20);
      const reply = await saveSchedule(doctor, 409);
      assert.equal(reply.code, 'SCHEDULE_CONFLICT');
      assert.equal(reply.details.existing.clinicId, a.id);
      await doctor.getByTestId('schedule-error').filter({ hasText: '10:00–11:00' }).waitFor();
      await doctor.getByRole('button', { name: 'Quitar bloque 1 de Lunes' }).click();
      await saveSchedule(doctor);
      return reply.details;
    });

    await check('B05', 'Rechazar excepción por fecha que se cruza con otro consultorio', ['A04'], doctor, async () => {
      await doctor.goto(`${origin}/clinics/${b.id}/schedule`);
      await doctor.getByLabel('Especialidad del bloque').selectOption(ids[pediatrics]);
      await doctor.getByRole('button', { name: 'Añadir excepción' }).click();
      await date(doctor, '#exception-from-0', day(7));
      await doctor.getByRole('button', { name: 'Añadir horario especial' }).click();
      const inputs = doctor.getByRole('textbox', { name: 'Hora de la excepción' });
      await time(inputs.nth(0), '10:00');
      await time(inputs.nth(1), '11:00');
      const reply = await saveSchedule(doctor, 409);
      await doctor.getByRole('button', { name: 'Quitar excepción', exact: true }).click();
      await saveSchedule(doctor);
      assert.equal(reply.code, 'SCHEDULE_CONFLICT');
      assert.equal(reply.details.date, day(7));
      return reply.details;
    });

    await check('A05', 'Cerrar una fecha por excepción y comprobar persistencia y disponibilidad', ['A04'], doctor, async () => {
      await doctor.goto(`${origin}/clinics/${c.id}/schedule`);
      await doctor.getByRole('button', { name: 'Añadir excepción' }).click();
      await date(doctor, '#exception-from-0', day(8));
      await saveSchedule(doctor);
      await doctor.reload();
      await doctor.locator('#exception-from-0').waitFor();
      assert.equal(await doctor.locator('#exception-from-0').inputValue(), day(8).split('-').reverse().join('/'));
      await date(doctor, '#availability-date', day(8));
      await doctor.getByRole('button', { name: 'Ver disponibilidad' }).click();
      await doctor.locator('.availability-day').getByText('Sin horarios disponibles').first().waitFor();
      return { closed: day(8) };
    });

    await check('D01', 'Publicar al médico mixto en ambas modalidades', ['A04', 'B02'], doctor, async () => {
      const publication = await publish(doctor, mixedName, specialties, [a, b, c, tele]);
      assert.ok(publication.publicId);
      return { publicId: publication.publicId };
    });

    await check('D02', 'Publicar un segundo médico exclusivamente virtual', [], virtualDoctor, async () => {
      secondSpecialty = (await login(virtualDoctor, secondAccount, [general]))[general];
      secondTele = await createClinic(virtualDoctor, 'Agenda exclusivamente virtual', true);
      await schedule(virtualDoctor, secondTele, secondSpecialty, 'Lunes', '09:00', '11:00', 30);
      const publication = await publish(virtualDoctor, virtualName, [general], [secondTele]);
      assert.ok(publication.publicId);
      return { publicId: publication.publicId, clinic: secondTele.id };
    });

    await check('D03', 'Buscar por modalidad y confirmar reserva presencial con dirección y horario', ['D01'], physicalPatient, async () => {
      await publicProfile(physicalPatient, 'IN_PERSON', mixedName, a.name, general);
      await publicForm(physicalPatient, physicalStart, physicalName, 'agenda-presencial@local.test');
      physicalReceipt = await action(physicalPatient, 'POST', /\/public\/appointments\/doctors\/[^/]+\/bookings$/, () => physicalPatient.locator('#public-confirm').click(), 201);
      await confirmed(physicalPatient, physicalReceipt, 'IN_PERSON', physicalStart);
      assert.equal(physicalReceipt.address, a.address);
      await physicalPatient.locator('app-public-booking-receipt').getByText(/09:00.*09:30/).waitFor();
      return { start: physicalReceipt.start, address: physicalReceipt.address, reference: physicalReceipt.reference };
    });

    await check('B06', 'Dos pacientes compiten por la misma teleconsulta desde dos navegadores', ['D01'], virtualPatient, async () => {
      await Promise.all([virtualPatient, competitor].map(page => publicProfile(page, 'TELECONSULTATION', mixedName, tele.name, dermatology)));
      await Promise.all([virtualPatient, competitor].map((page, index) => publicForm(page, virtualStart, virtualNames[index], `agenda-concurrente-${index}@local.test`)));
      const endpoint = /\/public\/appointments\/doctors\/[^/]+\/bookings$/;
      const pages = [virtualPatient, competitor];
      const replies = await Promise.all(pages.map(page => Promise.all([
        response(page, 'POST', endpoint), page.locator('#public-confirm').click(),
      ]).then(([reply]) => reply)));
      assert.deepEqual(replies.map(reply => reply.status()).sort(), [201, 409]);
      const winner = replies.findIndex(reply => reply.status() === 201);
      const loser = 1 - winner;
      const receipt = await replies[winner].json();
      const rejected = await replies[loser].json();
      virtualWinner = { name: virtualNames[winner], receipt, page: pages[winner], loser: pages[loser] };
      await confirmed(pages[winner], receipt, 'TELECONSULTATION', virtualStart);
      assert.equal(receipt.address, '');
      assert.equal(await pages[winner].locator('app-public-booking-receipt').getByText(/Dirección de ensayo/).count(), 0);
      assert.equal(rejected.code, 'BOOKING_SLOT_UNAVAILABLE');
      await pages[loser].getByRole('alert').filter({ hasText: /horario|disponible/i }).first().waitFor();
      await pages[loser].screenshot({ path: output('B06-turno-ocupado.png'), fullPage: true });
      return { statuses: replies.map(reply => reply.status()), code: rejected.code, start: receipt.start };
    });

    await check('D04', 'Reservar con médico exclusivamente virtual y excluirlo del buscador presencial', ['D02'], secondPatient, async () => {
      await secondPatient.goto(origin + '/appointments');
      const [directory] = await Promise.all([
        secondPatient.waitForResponse(reply => reply.request().method() === 'GET' && new URL(reply.url()).searchParams.get('modality') === 'IN_PERSON'),
        secondPatient.getByRole('combobox', { name: 'Modalidad', exact: true }).selectOption('IN_PERSON'),
      ]);
      assert.equal(directory.status(), 200);
      assert.ok(!(await directory.json()).items.some(item => item.name === virtualName));
      await publicProfile(secondPatient, 'TELECONSULTATION', virtualName, secondTele.name, general);
      assert.equal(await secondPatient.locator('.clinic-options button').count(), 1);
      await publicForm(secondPatient, physicalStart, 'Paciente del médico virtual', 'agenda-segundo@local.test');
      const receipt = await action(secondPatient, 'POST', /\/public\/appointments\/doctors\/[^/]+\/bookings$/, () => secondPatient.locator('#public-confirm').click(), 201);
      await confirmed(secondPatient, receipt, 'TELECONSULTATION', physicalStart);
      assert.equal(receipt.address, '');
      return { reference: receipt.reference, address: receipt.address };
    });

    await check('C01', 'Crear un turno de una tercera especialidad desde la agenda médica', ['A04'], doctor, async () => {
      await calendar(doctor);
      const start = timestamp(monday, '16:00');
      await doctor.locator(slotSelector('data-slot-start', start)).click();
      await doctor.locator('#booking-contact').fill('Paciente pediátrico interno');
      thirdBooking = await action(doctor, 'POST', '/bookings', () => doctor.locator('#booking-create').click(), 201);
      assert.equal(thirdBooking.specialtyContextId, ids[pediatrics]);
      await booking(doctor, 'Paciente pediátrico interno').waitFor();
      return { id: thirdBooking.id, start: thirdBooking.start, duration: thirdBooking.provenance.slotMinutes };
    });

    await check('C02', 'Combinar turnos y alternar filtros de sede, especialidad y modalidad', ['D03', 'B06', 'C01'], doctor, async () => {
      await calendar(doctor);
      const physical = booking(doctor, physicalName);
      const virtual = booking(doctor, virtualWinner.name);
      const pediatric = booking(doctor, 'Paciente pediátrico interno');
      await physical.filter({ hasText: /09:00.*Medicina General.*Consultorio A.*Presencial/s }).waitFor();
      await virtual.filter({ hasText: /13:00.*Dermatología.*Agenda virtual mixta.*Teleconsulta/s }).waitFor();
      await pediatric.filter({ hasText: /16:00.*Pediatría.*Consultorio B/s }).waitFor();
      await doctor.getByRole('button', { name: /^Filtros/ }).click();
      const modality = doctor.getByLabel('Filtrar agenda por modalidad');
      const specialty = doctor.getByLabel('Filtrar agenda por especialidad');
      const clinic = doctor.locator('#calendar-clinic');
      await modality.selectOption('TELECONSULTATION');
      await physical.waitFor({ state: 'hidden' });
      await virtual.waitFor();
      await modality.selectOption('');
      await specialty.selectOption(ids[pediatrics]);
      await virtual.waitFor({ state: 'hidden' });
      await pediatric.waitFor();
      await specialty.selectOption('');
      await clinic.selectOption(a.id);
      await pediatric.waitFor({ state: 'hidden' });
      await physical.waitFor();
      await clinic.selectOption('');
      await Promise.all([physical, virtual, pediatric].map(item => item.waitFor()));
      await doctor.screenshot({ path: output('C02-agenda-unificada.png'), fullPage: true });
      return { physical: await physical.innerText(), virtual: await virtual.innerText(), pediatric: await pediatric.innerText() };
    });

    await check('B07', 'Impedir un cambio de bloque que alteraría una reserva futura', ['D03'], doctor, async () => {
      await doctor.goto(`${origin}/clinics/${a.id}/schedule`);
      const mondayBlock = doctor.locator('.day-row').filter({ has: doctor.getByRole('heading', { name: 'Lunes', exact: true }) });
      await mondayBlock.locator('input[type=number]').fill('60');
      const reply = await saveSchedule(doctor, 409);
      assert.equal(reply.code, 'BOOKING_SCHEDULE_CONFLICT');
      await doctor.getByTestId('schedule-error').waitFor();
      await calendar(doctor);
      await booking(doctor, physicalName).waitFor();
      return { code: reply.code };
    });

    await check('F01', 'Desactivar y reactivar sede física y virtual sin perder reservas futuras', ['D03', 'B06'], doctor, async () => {
      const data = [];
      for (const [clinic, name] of [[a, physicalName], [tele, virtualWinner.name]]) {
        await doctor.goto(origin + '/clinics');
        await doctor.getByTestId('edit-link-' + clinic.id).click();
        const inactive = await action(doctor, 'PATCH', `/clinics/${clinic.id}/status`, () => doctor.getByTestId('form-deactivate-btn').click(), 200);
        assert.equal(inactive.status, 'INACTIVE');
        await doctor.getByTestId('form-submit-feedback').waitFor();
        await calendar(doctor);
        await booking(doctor, name).waitFor();
        assert.equal(await doctor.locator('.available-slot').and(doctor.getByRole('button', { name: clinic.name, exact: false })).count(), 0);
        await doctor.goto(origin + '/clinics');
        await doctor.getByTestId('edit-link-' + clinic.id).click();
        const active = await action(doctor, 'PATCH', `/clinics/${clinic.id}/status`, () => doctor.getByTestId('form-activate-btn').click(), 200);
        assert.equal(active.status, 'ACTIVE');
        await calendar(doctor);
        await doctor.locator('.available-slot').and(doctor.getByRole('button', { name: clinic.name, exact: false })).first().waitFor();
        await booking(doctor, name).waitFor();
        data.push({ clinic: clinic.name, futureBookings: inactive.futureBookings });
      }
      return data;
    });

    await check('F02', 'Reprogramar y cancelar desde el calendario; liberar el horario', ['D03'], doctor, async () => {
      await calendar(doctor);
      const row = booking(doctor, physicalName);
      await row.click();
      await doctor.locator('#booking-move').click();
      const start = timestamp(monday, '09:30');
      const option = doctor.locator('#move-slot option').filter({ hasText: /^09:30/ });
      await option.waitFor({ state: 'attached' });
      await doctor.locator('#move-slot').selectOption(await option.getAttribute('value'));
      const moved = await action(doctor, 'POST', /\/bookings\/[^/]+\/reschedule$/, () => doctor.locator('#move-confirm').click(), 200);
      assert.equal(Date.parse(moved.start), Date.parse(start));
      await row.filter({ hasText: '09:30' }).waitFor();
      const cancelled = await action(doctor, 'PATCH', /\/bookings\/[^/]+\/status$/, () => doctor.getByRole('button', { name: 'Cancelar turno', exact: true }).click(), 200);
      assert.equal(cancelled.status, 'CANCELLED');
      await row.locator('xpath=self::*[@data-status="CANCELLED"]').waitFor();
      await doctor.locator(slotSelector('data-slot-start', start)).waitFor();
      await doctor.reload();
      await date(doctor, '#calendar-date', monday);
      await row.locator('xpath=self::*[@data-status="CANCELLED"]').waitFor();
      await doctor.locator(slotSelector('data-slot-start', start)).waitFor();
      return { id: moved.id, start: moved.start, finalStatus: cancelled.status };
    });

    await check('F03', 'Mostrar la hora de la agenda y la hora local al paciente remoto', ['D01'], virtualPatient, async () => {
      await publicProfile(virtualPatient, 'TELECONSULTATION', mixedName, tele.name, dermatology);
      const slot = virtualPatient.locator(slotSelector('data-public-slot', timestamp(monday, '14:30')));
      await slot.waitFor();
      const patientTime = new Intl.DateTimeFormat('es-AR', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(timestamp(monday, '14:30')));
      assert.match(await slot.innerText(), new RegExp(`14:30.*Tu hora.*${patientTime}`, 's'));
      await slot.click();
      await virtualPatient.getByText(new RegExp(`Tu hora local.*${patientTime}`)).waitFor();
      return { agenda: '14:30', patient: patientTime };
    });

    await check('D05', 'Consultar una constancia privada después de recargar y verificar la cancelación', ['F02', 'B06'], physicalPatient, async () => {
      for (const [page, receipt, status, modality] of [
        [physicalPatient, physicalReceipt, 'CANCELLED', 'IN_PERSON'],
        [virtualWinner.page, virtualWinner.receipt, 'CONFIRMED', 'TELECONSULTATION'],
      ]) {
        assert.equal(receipt.accessCode?.length, 43);
        await page.goto(origin + '/appointments/confirmation');
        await page.reload();
        await page.locator('#confirmation-code').fill(receipt.accessCode);
        const details = await action(page, 'POST', '/public/appointments/confirmation', () => page.getByRole('button', { name: 'Consultar turno' }).click(), 200);
        assert.equal(details.reference, receipt.reference);
        assert.equal(details.status, status);
        assert.equal(details.modality, modality);
        await page.getByRole('region', { name: 'Constancia del turno' }).getByText(receipt.reference, { exact: true }).waitFor();
        if (modality === 'TELECONSULTATION') assert.equal(details.address, '');
      }
      return { physical: 'CANCELLED', virtual: 'CONFIRMED' };
    });

    await check('E01', 'Invitar, activar e iniciar sesión en secretaría con gestión y de solo lectura', ['A02', 'A03'], manager, async () => {
      const password = randomBytes(24).toString('hex');
      await invite(doctor, manager, 'Secretaría de gestión', 'agenda-gestion@local.test', [a.name, tele.name], 'manage', password);
      await invite(doctor, restricted, 'Secretaría de lectura', 'agenda-lectura@local.test', [tele.name], 'view', password);
      await staffAgenda(manager, tele.name);
      await staffAgenda(restricted, tele.name);
      assert.equal(await manager.getByLabel('Consultorio asignado').locator('option').count(), 3);
      assert.equal(await restricted.getByLabel('Consultorio asignado').locator('option').count(), 2);
      return { managerAssignments: 2, readerAssignments: 1 };
    });

    await check('E02', 'Secretaría crea, reprograma y cancela un turno virtual desde la interfaz', ['E01', 'B02', 'B06'], manager, async () => {
      await staffAgenda(manager, tele.name);
      await booking(manager, virtualWinner.name).waitFor();
      await manager.getByRole('button', { name: /13:30 · Disponible/ }).click();
      await manager.getByLabel('Nombre del solicitante').fill('Contacto de ensayo');
      await manager.getByLabel('Nombre de quien será atendido').fill(staffName);
      const created = await action(manager, 'POST', /\/staff\/owners\/[^/]+\/bookings$/, () => manager.getByRole('button', { name: 'Confirmar turno' }).click(), 201);
      const row = booking(manager, staffName);
      await row.click();
      await manager.getByRole('button', { name: 'Reprogramar', exact: true }).click();
      await manager.getByRole('button', { name: /14:00 · Disponible/ }).click();
      const moved = await action(manager, 'POST', /\/staff\/owners\/[^/]+\/bookings\/[^/]+\/reschedule$/, () => manager.getByRole('button', { name: 'Confirmar reprogramación' }).click(), 200);
      assert.equal(Date.parse(moved.start), Date.parse(timestamp(monday, '14:00')));
      await row.filter({ hasText: '14:00' }).waitFor();
      const cancel = manager.getByRole('button', { name: /^Cancelad[oa]$/ });
      if (!(await cancel.isVisible())) await row.click();
      const cancelled = await action(manager, 'PATCH', /\/staff\/owners\/[^/]+\/bookings\/[^/]+\/status$/, () => cancel.click(), 200);
      assert.equal(cancelled.status, 'CANCELLED');
      for (const item of [created, moved, cancelled]) assertPrivateProjection(item);
      assert.equal(created.clinicSnapshot.modality, 'TELECONSULTATION');
      await manager.getByRole('button', { name: /14:00 · Disponible/ }).waitFor();
      return { id: created.id, start: moved.start, status: cancelled.status };
    });

    await check('E03', 'Limitar lectura y proteger otros médicos y campos clínicos o privados', ['E01', 'B06', 'D02'], restricted, async () => {
      const [owner, clinic] = await staffAgenda(restricted, tele.name);
      const row = booking(restricted, virtualWinner.name);
      await row.click();
      for (const name of ['Reprogramar', 'Cancelado']) assert.ok(await restricted.getByRole('button', { name, exact: true }).isDisabled());
      assert.ok(await restricted.locator('.available-slot').first().isDisabled());
      assert.equal(await restricted.getByRole('link', { name: /ficha|historia clínica/i }).count(), 0);
      const range = `?from=${monday}T00:00:00Z&to=${day(1)}T00:00:00Z`;
      const assignedPath = `${apiPrefix}/staff/owners/${owner}/clinics/${clinic}/bookings${range}`;
      const foreignPath = `${apiPrefix}/staff/owners/${secondId}/clinics/${secondTele.id}/bookings${range}`;
      const permitted = await staffRequest(restricted, assignedPath);
      assert.equal(permitted.status, 200);
      const document = permitted.body;
      assert.ok(document.items.length);
      assertPrivateProjection(document);
      const [foreign, unassigned, clinical, session] = await Promise.all([
        staffRequest(restricted, foreignPath),
        staffRequest(restricted, `${apiPrefix}/staff/owners/${owner}/clinics/${a.id}/bookings${range}`),
        staffRequest(restricted, apiPrefix + '/patients'),
        staffRequest(restricted, apiPrefix + '/staff/session'),
      ]);
      assert.equal(foreign.status, 403);
      assert.equal(foreign.body.code, 'STAFF_FORBIDDEN');
      assert.equal(unassigned.status, 404);
      assert.equal(clinical.status, 401);
      assert.equal(session.status, 200);
      const denied = await staffRequest(restricted, `${apiPrefix}/staff/owners/${owner}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': session.body.csrfToken, 'Idempotency-Key': randomBytes(16).toString('hex') },
        body: JSON.stringify({ clinicId: clinic, start: timestamp(monday, '14:30'), contactName: 'Intento de lectura' }),
      });
      assert.equal(denied.status, 403);
      assert.equal(denied.body.code, 'STAFF_FORBIDDEN');
      return { assigned: permitted.status, foreign: foreign.status, unassigned: unassigned.status, clinical: clinical.status, write: denied.status, returnedFields: Object.keys(document.items[0]) };
    });

    await check('F04', 'Verificar estado de carga de Angular y resultado del gateway real', ['D01'], competitor, async () => {
      await competitor.goto(origin + '/appointments');
      await competitor.locator('.clinic-card').first().waitFor();
      let release;
      const gate = new Promise(resolve => { release = resolve; });
      const endpoint = '**/api/doctorchart/public/appointments/doctors?**';
      await competitor.route(endpoint, async route => { await gate; await route.continue(); }, { times: 1 });
      try {
        await competitor.getByRole('button', { name: 'Buscar turnos' }).click();
        await competitor.getByRole('status').filter({ hasText: 'Buscando profesionales…' }).waitFor();
        release();
        await competitor.getByRole('status').filter({ hasText: 'Buscando profesionales…' }).waitFor({ state: 'hidden' });
        await competitor.locator('.clinic-card').first().waitFor();
      } finally {
        release();
      }
    });

    await check('V01', 'Comprobar desbordamiento y cortes básicos en vistas de 390 px', ['A04', 'D03', 'B06', 'E01'], doctor, async () => {
      await doctor.setViewportSize({ width: 390, height: 844 });
      await calendar(doctor);
      await booking(doctor, virtualWinner.name).waitFor();
      const metrics = { calendar: await layout(doctor, 'V01-agenda-movil') };
      await doctor.goto(`${origin}/clinics/${a.id}/schedule`);
      await doctor.getByTestId('save-schedule').waitFor();
      metrics.schedule = await layout(doctor, 'V01-horarios-movil');
      await publicProfile(competitor, 'TELECONSULTATION', mixedName, tele.name, dermatology);
      await competitor.locator('[data-public-slot]').first().waitFor();
      metrics.public = await layout(competitor, 'V01-reservas-movil');
      await staffAgenda(manager, tele.name);
      await booking(manager, virtualWinner.name).waitFor();
      metrics.staff = await layout(manager, 'V01-secretaria-movil');
      const summary = manager.locator('#staff-assignment-summary');
      for (const [clinic, modality] of [[tele, 'Teleconsulta'], [a, 'Presencial']]) {
        await staffAgenda(manager, clinic.name);
        await summary.getByText(mixedName, { exact: true }).waitFor();
        await summary.getByText(`${clinic.name} · ${modality}`, { exact: true }).waitFor();
        assert.ok(await summary.evaluate(node => {
          const { left, right } = node.getBoundingClientRect();
          return left >= 0 && right <= innerWidth && [...node.children].every(line => line.scrollWidth <= line.clientWidth);
        }), `Texto de la asignación cortado: ${clinic.name}`);
      }
      run.layout = metrics;
      assert.ok(Object.values(metrics).every(item => item.width === item.content && !item.clipped.length), JSON.stringify(metrics));
      return metrics;
    });

    await check('I01', 'Validar catálogo y comprobar que PostgreSQL no guardó turnos vigentes superpuestos', ['B06'], null, async () => {
      assert.ok(run.database.constraints.includes('bookings_owner_interval_exclusion'));
      assert.ok(run.database.constraints.includes('schedule_blocks_weekly_no_overlap'));
      assert.ok(run.database.constraints.includes('schedule_blocks_exception_no_overlap'));
      const duplicates = sql("SELECT count(*) FROM bookings a JOIN bookings b ON a.workspace_id=b.workspace_id AND a.id<b.id AND tstzrange(a.start_at,a.end_at,'[)') && tstzrange(b.start_at,b.end_at,'[)') WHERE a.status<>'CANCELLED' AND b.status<>'CANCELLED'");
      const winners = sql(`SELECT count(*) FROM bookings WHERE status<>'CANCELLED' AND clinic_id=${Number(tele.id)} AND start_at='${virtualStart}'`);
      assert.equal(duplicates, '0');
      assert.equal(winners, '1');
      return { duplicates, winners, constraints: run.database.constraints };
    });

    await check('I02', 'Revisar excepciones JavaScript, NG0956 y fallos inesperados HTTP 5xx', [], null, async () => {
      assert.deepEqual(run.browser.filter(event => event.type === 'pageerror'), []);
      assert.deepEqual(run.http.filter(event => event.status >= 500), []);
      assert.deepEqual(run.browser.filter(event => event.type === 'warning' && event.message.includes('NG0956')), []);
      return { errorsJS: 0, http5xx: 0, ng0956: 0 };
    });
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  run.fatal = error.stack;
  console.error(error);
}).finally(() => {
  run.finished = new Date().toISOString();
  persist();
  if (run.fatal || run.cases.some(item => item.status !== 'aprobada')) process.exitCode = 1;
});
