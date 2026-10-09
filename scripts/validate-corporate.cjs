const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, esModuleInterop:true}}).outputText, filename);
const {corporateCommercial: practice, resolvePractice} = require('../src/data/service-practices.ts');
const {services} = require('../src/data/services.ts');
const {serviceFormConfig} = require('../src/data/serviceFormConfig.ts');
assert.equal(practice.groups.length,6);
assert.deepEqual(practice.groups.map(group=>group.children.length),[12,8,10,7,13,9]);
assert.deepEqual(practice.groups.map(group=>[group.title,group.children.map(child=>child.title)]),services[0].subServices.map(group=>[group.title,group.children]));
assert.deepEqual(practice.groups.map(group=>group.title),serviceFormConfig[0].requirements.map(item=>item.label));
assert.equal(practice.groups[0].children[1].slug,'one-person-company');
for(const group of practice.groups) {
  assert.equal(resolvePractice([practice.slug,group.slug]).group,group);
  assert(fs.existsSync('public'+group.image));
  assert.equal(new Set(group.children.map(child=>child.slug)).size,group.children.length);
  for(const child of group.children) {
    assert.match(child.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(child.paragraphs.length,2);
    assert(child.paragraphs.every(paragraph=>paragraph.length>100));
    assert.equal(child.covers.length,3);
    for(const field of ['when','considerations','assistance']) assert(child[field].length>40);
  }
}
assert.equal(resolvePractice([practice.slug,'not-a-service']),null);
assert.equal(resolvePractice([practice.slug,practice.groups[0].slug,'llp-formation']),null);
console.log('PASS: six groups, 59 exact workbook child services, unique anchors, substantive content, form parity and bounded routing.');
