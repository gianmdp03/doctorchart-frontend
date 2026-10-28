import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { parseTemplate } from '@angular/compiler';

const slash = p => p.replaceAll('\\', '/');
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [slash(path.join(dir,e.name))]); }
const sourceFiles=files('src/app').filter(p=>p.endsWith('.ts')&&!p.endsWith('.spec.ts'));
const controls=[]; const templates=[]; const methods=[];
const testSources=files('src/app').filter(p=>p.endsWith('.spec.ts')).map(file=>({file,text:fs.readFileSync(file,'utf8')}));
for (const owner of sourceFiles) {
  const source=fs.readFileSync(owner,'utf8'); const ast=ts.createSourceFile(owner,source,ts.ScriptTarget.Latest,true);
  function visit(node) {
    if(ts.isMethodDeclaration(node)&&node.name) methods.push({name:node.name.getText(ast),file:owner,line:ast.getLineAndCharacterOfPosition(node.getStart()).line+1,body:node.getText(ast)});
    if(ts.isPropertyAssignment(node)&&['template','templateUrl'].includes(node.name.getText(ast))&&ts.isStringLiteralLike(node.initializer)) {
      const external=node.name.getText(ast)==='templateUrl';
      const file=external?slash(path.join(path.dirname(owner),node.initializer.text)):owner;
      templates.push({owner,file,text:external?fs.readFileSync(file,'utf8'):node.initializer.text,base:external?0:ast.getLineAndCharacterOfPosition(node.initializer.getStart()).line});
    }
    ts.forEachChild(node,visit);
  } visit(ast);
}
for(const t of templates) {
  const parsed=parseTemplate(t.text,t.file,{preserveWhitespaces:false});
  if(parsed.errors?.length) throw Error(t.file+': '+parsed.errors.map(e=>e.toString()).join('\n'));
  function walk(nodes,form=null) {
    for(const n of nodes??[]) {
      const outputs=(n.outputs??[]).map(o=>({event:o.name,expression:o.handler.source}));
      const attrs=Object.fromEntries((n.attributes??[]).map(a=>[a.name,a.value]));
      const bindings=Object.fromEntries((n.inputs??[]).map(i=>[i.name,i.value.source]));
      const currentForm=n.name==='form'?outputs.find(o=>o.event==='ngSubmit'||o.event==='submit')?.expression??null:form;
      if(['button','a','summary','form'].includes(n.name)||(n.name==='input'&&['submit','button','reset'].includes(attrs.type))||outputs.some(o=>['click','triggered','ngSubmit','submit'].includes(o.event))) {
        const text=n.sourceSpan.toString().replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
        const expression=outputs.map(o=>o.expression).join('; ');
        const calls=[...expression.matchAll(/([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]).filter(name=>!['set','update','emit','click','open','stopPropagation','preventDefault','$any'].includes(name));
        const refs=calls.flatMap(name=>{const own=methods.filter(m=>m.file===t.owner&&m.name===name);return own.length?own:methods.filter(m=>m.name===name)}).map(({body,...ref})=>ref);
        const testReferences=testSources.flatMap(test=>calls.flatMap(call=>{ const found=test.text.split(/\r?\n/).findIndex(line=>line.includes(call+'('));return found>=0?[{file:test.file,line:found+1,method:call}]:[];}));
        controls.push({id:`DC-${String(controls.length+1).padStart(3,'0')}`,file:t.file,line:t.base+n.sourceSpan.start.line+1,owner:t.owner,element:n.name,label:attrs['aria-label']||text,outputs,attrs,bindings,submitHandler:currentForm,dormant:t.file.includes('medical-calculators/')||expression.includes('handleGoogleOAuth'),implementation:refs,testFile:fs.existsSync(t.owner.replace(/\.ts$/,'.spec.ts'))?t.owner.replace(/\.ts$/,'.spec.ts'):null,testReferences,verification:'static template + handler trace; listed test references are candidates, not proof of runtime execution for this control'});
      }
      walk(n.children,currentForm); walk(n.branches?.flatMap(b=>b.children??[]),currentForm);
      walk(n.cases?.flatMap(c=>c.children??[]),currentForm);
      for(const key of ['empty','placeholder','loading','error']) if(n[key]?.children)walk(n[key].children,currentForm);
    }
  } walk(parsed.nodes);
}
fs.mkdirSync('docs',{recursive:true});
fs.writeFileSync('docs/control-inventory-2026-10-28.json',JSON.stringify({generatedFrom:'Angular parseTemplate; source template controls, repeated runtime rows count once',templates:templates.length,total:controls.length,active:controls.filter(c=>!c.dormant).length,dormant:controls.filter(c=>c.dormant).length,controls},null,2)+'\n');
const esc=s=>String(s??'').replaceAll('|','\\|').replaceAll('\n',' ');
fs.writeFileSync('docs/control-inventory-2026-10-28.md',`# Inventario de controles DoctorChart\n\n${controls.length} controles declarados en ${templates.length} plantillas. Incluye botones, enlaces, summaries, formularios y otros elementos con click/submit. Cada plantilla repetida cuenta una vez; las instancias dependen de datos. ${controls.filter(c=>c.dormant).length} están suspendidos (42 de calculadoras y acceso Google).\n\nLa tabla documenta revisión estática; una prueba relacionada no equivale a ejecutar cada control con una cuenta real. Las referencias completas están en el JSON, junto con candidatos de evidencia de pruebas por método y archivo. El acceso a calculadoras desde el banner rápido también permanece oculto por feature flag.\n\n| ID | Fuente | Control | Acción/destino | Disabled | Estado |\n|---|---|---|---|---|---|\n`+controls.map(c=>`| ${c.id} | ${c.file}:${c.line} | ${esc(c.label).slice(0,170)} | ${esc(c.outputs.map(o=>o.event+': '+o.expression).join('; ')||c.bindings.routerLink||c.attrs.routerLink||c.bindings.href||c.attrs.href||c.submitHandler||'nativo/directiva')} | ${esc(c.bindings.disabled)} | ${c.dormant?'suspendido':'revisión estática'} |`).join('\n')+'\n');
fs.mkdirSync('.angular',{recursive:true});
fs.writeFileSync('.angular/control-handler-bodies.json',JSON.stringify(methods,null,2));
console.log(JSON.stringify({templates:templates.length,total:controls.length,active:controls.filter(c=>!c.dormant).length,dormant:controls.filter(c=>c.dormant).length}));
