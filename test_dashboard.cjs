const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(process.argv[2] || 'dashboard.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {
    value: id === 'rate' ? '0' : '', textContent: '', innerHTML: '', className: '', style: {}, hidden: false,
    classList: {toggle() {}, add() {}}, addEventListener() {}, setAttribute() {}
  });
  return elements.get(id);
}
const context = vm.createContext({document: {getElementById: element, querySelectorAll: () => []}, Intl, Number, String, Math, Set});
vm.runInContext(script, context);
assert.equal(vm.runInContext("parseMoney('1.234,56')", context), 1234.56);
assert.equal(vm.runInContext("parseMoney('1.234')", context), 1234);
assert.equal(vm.runInContext("parseMoney('')", context), null);
vm.runInContext("selectItem(data.find(x => x.cap === 'Sim' && x.rates['0'][0] != null && x.rates['0'][1] != null))", context);
assert.equal(element('scenario').value, '');
assert.match(element('verdictTitle').textContent, /Aguardando/);
const reference = vm.runInContext("current.rates['0'][1]", context);
element('scenario').value = 'pmvg';
element('quote').value = (reference + 10).toFixed(2).replace('.', ',');
element('qty').value = '3';
vm.runInContext('update()', context);
assert.match(element('verdictTitle').textContent, /Acima/);
assert.match(element('verdictText').textContent, /R\$\s30,00/);
vm.runInContext("selectItem(data.find(x => x.s === 'CLORIDRATO DE FLUOXETINA' && x.a === '20 MG CAP DURA CT BL AL PLAS TRANS X 30'))", context);
assert.equal(element('groupCount').textContent, '12');
assert.equal(element('groupLabs').textContent, '12');
assert.match(element('groupMedian').textContent, /48,47/);
assert.notEqual(element('groupIqr').textContent, 'amostra pequena');
assert.match(element('analysisText').textContent, /mediana/);
const batchItem = vm.runInContext("data.find(x => x.rates['0'][0] != null)", context);
const csv = `ggrem;preco_unitario;quantidade;referencia;icms\n${batchItem.g};100000,00;2;pf;0\nINVALIDO;12,00;1;pf;0`;
const batch = vm.runInContext('analyzeBatch(input)', vm.createContext({...context, input: csv}));
assert.equal(batch.length, 2);
assert.equal(batch[0].status, 'Acima');
assert.equal(batch[1].status, 'Revisar');
assert.match(batch[1].reason, /GGREM/);
assert.equal(vm.runInContext("csvRows('ggrem;descricao\\n123;\"A;B\"')[1][1]", context), 'A;B');
console.log('Interação, cálculo e análise: OK');
