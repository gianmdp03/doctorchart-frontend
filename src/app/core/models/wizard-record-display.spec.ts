import { clinicalFormFixture } from './clinical-form.fixture';
import { wizardRecordEntries } from './wizard-record-display';

describe('Saved clinical form display', () => {
  it('uses saved labels/options, preserves zero/false and formats dates in Argentina', () => {
    const record = { ...clinicalFormFixture(), formValues: { randomA: 0, randomB: false, randomC: 'option_7', randomD: '2026-10-05' },
      formDefinitionSnapshot: { categories: [{key:'random',title:'Configurada',enabled:true,fields:[
        {key:'randomA',label:'Número',type:'NUMBER' as const,required:false},
        {key:'randomB',label:'Respuesta',type:'BOOLEAN' as const,required:false},
        {key:'randomC',label:'Selección',type:'SELECT' as const,required:false,options:[{value:'option_7',label:'Opción elegida'}]},
        {key:'randomD',label:'Fecha',type:'DATE' as const,required:false},
      ]}] } };
    expect(wizardRecordEntries(record)).toEqual([{label:'Número',value:'0'},{label:'Respuesta',value:'No'},{label:'Selección',value:'Opción elegida'},{label:'Fecha',value:'05/10/2026'}]);
  });
  it('hides chained conditional answers and formulas from disabled controllers', () => {
    const record = {...clinicalFormFixture(),formValues:{a:true,b:true,c:'oculto'},
      formDefinitionSnapshot:{categories:[{key:'off',title:'Deshabilitada',enabled:false,fields:[{key:'a',label:'A',type:'BOOLEAN' as const,required:false}]},
        {key:'on',title:'Visible',enabled:true,fields:[{key:'b',label:'B',type:'BOOLEAN' as const,required:false,visibleWhen:{fieldKey:'a',equals:true}},
          {key:'c',label:'C',type:'TEXT' as const,required:false,visibleWhen:{fieldKey:'b',equals:true}},
          {key:'f',label:'Resultado',type:'FORMULA' as const,required:false}]}]},
      formulaResults:{f:{status:'MISSING_INPUT' as const,value:null}}};
    expect(wizardRecordEntries(record)).toEqual([]);
  });
});
