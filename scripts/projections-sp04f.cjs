// Real HTTP/UI against the explicitly owned M6 synthetic laboratory only.
const assert = require('node:assert/strict');

module.exports = async function runProjectionCompatibility({page, browser, state, origin, api, add, db}) {
  const contexts = await api(page, 'GET', '/workspace/contexts');
  const scope = contexts.find(c => c.specialty.code === 'pediatrics').id;
  const workspace = await api(page, 'GET', '/workspace', null, scope);
  const patient = await api(page, 'POST', '/patients', {workspaceVersion:workspace.version, values:{
    sys_firstName:'Compatibilidad', sys_lastName:'Sintética SP04F', sys_dni:'29414417', sys_dob:'2020-01-01', sys_sex:'UNKNOWN',
  }}, scope, 201);
  const record = await api(page, 'POST', '/encounters', {
    patientId:patient.id, workspaceVersion:workspace.version, consultationType:'FIRST_VISIT',
    values:{chiefComplaint:'Consulta sintética SP04F',weightKg:20,heightCm:100},
  }, scope, 201);
  const route = '/encounters/' + record.id;
  const snapshot = JSON.parse(db('SELECT form_definition_snapshot::text FROM clinical_encounters WHERE id=' + record.id));
  const original = JSON.parse(db('SELECT form_values::text FROM clinical_encounters WHERE id=' + record.id));
  const json = value => "'" + JSON.stringify(value).replaceAll("'", "''") + "'::jsonb";
  let version;
  async function check(name, keys, values, hidden, expected) {
    const form = structuredClone(snapshot);
    form.categories.push({key:'synthetic_sp04f', title:'Compatibilidad sintética', enabled:true, fields:[
      {key:'showSyntheticFollowUp',type:'BOOLEAN',label:'Mostrar',required:false},
      ...keys.map(key => ({key,type:'TEXTAREA',label:'Seguimiento sintético '+key,required:false,
        ...(key === hidden ? {visibleWhen:{fieldKey:'showSyntheticFollowUp',equals:true}} : {})})),
    ]});
    db("BEGIN; SELECT set_config('doctorchart.revision_actor',(SELECT user_id FROM patients WHERE id="+patient.id+"),true);"+
      "UPDATE clinical_encounters SET form_definition_snapshot="+json(form)+",form_values="+json({...original,...values,showSyntheticFollowUp:false,historicalUnknown:'Original sintético conservado'})+
      ",follow_up_instructions='Columna antigua sintética',version=version+1 WHERE id="+record.id+"; COMMIT;");
    const before = db('SELECT jsonb_build_array(form_values,form_definition_snapshot,version,(SELECT count(*) FROM clinical_revisions))::text FROM clinical_encounters WHERE id='+record.id);
    const detail = await api(page,'GET',route,null,scope);
    assert.equal(detail.followUpInstructions, expected);
    version = detail.version;
    const summary = await api(page,'GET','/patients/'+patient.id+'/clinical-summary',null,scope);
    assert.equal(summary.lastEncounter.followUp,expected);
    assert.equal(detail.formValues.historicalUnknown,'Original sintético conservado');
    const after = db('SELECT jsonb_build_array(form_values,form_definition_snapshot,version,(SELECT count(*) FROM clinical_revisions))::text FROM clinical_encounters WHERE id='+record.id);
    assert.equal(after,before,'Reading must not mutate clinical records or create revisions');
    add('SP-04F '+name+' uses its own snapshot consistently and preserves original answers without new revisions');
  }
  await check('historical followUp',['followUp'],{followUp:'Control histórico sintético'},null,'Control histórico sintético');
  await page.goto(origin+route+'?specialtyContextId='+scope);
  await page.getByText('Control histórico sintético',{exact:true}).waitFor();
  await check('explicit canonical empty',['followUp','followUpInstructions'],{followUp:'Alias antiguo sintético',followUpInstructions:''},null,'');
  await page.goto(origin+route+'?specialtyContextId='+scope);
  await page.getByRole('heading',{name:'Detalle de la consulta'}).waitFor();
  await page.getByText('Consulta sintética SP04F',{exact:true}).waitFor();
  assert.equal(await page.getByText('Alias antiguo sintético',{exact:true}).count(),0);
  await check('hidden canonical field',['followUp','followUpInstructions'],{followUp:'Alias antiguo sintético',followUpInstructions:'Canónico oculto sintético'},'followUpInstructions',null);
  await check('hidden historical field',['followUp'],{followUp:'Histórico oculto sintético'},'followUp',null);
  await check('canonical field',['followUpInstructions'],{followUpInstructions:'Control canónico sintético'},null,'Control canónico sintético');
  await page.goto(origin+route+'?specialtyContextId='+scope);
  await page.getByText('Control canónico sintético',{exact:true}).waitFor();
  // A current correction uses the saved form, not a newer workspace definition.
  const current = await api(page,'GET',route,null,scope);
  const values = {...current.formValues}; delete values.historicalUnknown;
  values.followUpInstructions='Control corregido sintético';
  const corrected = await api(page,'PUT',route,{expectedVersion:version,consultationType:current.consultationType,values,reason:'Corrección sintética SP04F'},scope);
  assert.equal(corrected.followUpInstructions,'Control corregido sintético');
  const revisions = await api(page,'GET','/patients/'+patient.id+'/revisions?encounterId='+record.id,null,scope);
  assert.equal(revisions.items[0].previous.form_values.followUpInstructions,'Control canónico sintético');
  assert.equal(revisions.items[0].derivedProjections['encounter.followUpInstructions'],'Control canónico sintético');
  const wrong = contexts.find(c => c.id !== scope);
  if(wrong) await api(page,'GET',route,null,wrong.id,404);
  add('SP-04F correction preserves the previous canonical value and server derivation and rejects another specialty');

  const adminContext = await browser.newContext();
  try {
    const admin = await adminContext.newPage();
    await admin.goto(origin+'/login');
    await admin.locator('#login-email').fill(state.admin.email);
    await admin.locator('#login-password').fill(state.admin.password);
    await admin.getByRole('button',{name:'Ingresar a DoctorChart',exact:true}).click();
    await admin.getByRole('heading',{name:'Especialidades y wizard'}).waitFor();
    const definition = structuredClone(workspace.definition);
    definition.patientForm.categories[0].fields.push({
      key:'firstName',label:'Nombre ambiguo sintético',type:'TEXT',required:false,
    });
    const rejected = await api(admin,'POST','/admin/specialties',{
      code:'sp04f_collision_fixture',name:'Colisión sintética SP04F',definition,
    },null,400);
    assert.ok(rejected.errors.some(error => error.code === 'CLINICAL_PROJECTION_COLLISION'));
    add('SP-04F Go rejects a catalog definition whose custom field would overwrite protected identity');
  } finally {
    await adminContext.close();
  }
};
