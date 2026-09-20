'use strict';
const scenarios = {
  initial: { message:'We need 1,000 custom boxes.<br>Could you send us a quote?', version:'v1', quantity:'1,000', price:'2.75', total:'2,750', state:'待人工审核', rule:'依据已确认规格与数量规则计算', next:'核对价格和交期，再发送客户回复。', announcement:'初次报价示例：1000件，参考单价2.75元，待人工审核。' },
  change: { message:'Can we change the quantity to 2,000?<br>Please update the quotation.', version:'v2', quantity:'2,000', price:'2.63', total:'5,260', state:'变更后需复核', rule:'数量变化，重新计算并更新报价版本', next:'确认新报价，避免沿用上一版价格。', announcement:'数量变更示例：2000件，参考单价2.63元，需重新审核。' },
  follow: { message:'Thanks for the quote.<br>Could you confirm the delivery date?', version:'v2', quantity:'2,000', price:'2.63', total:'5,260', state:'待确认交期', rule:'客户在意交付时间，价格沿用当前版本', next:'核实工厂可交付日期，再起草跟进回复。', announcement:'跟进示例：客户询问交期，需要业务员核实后回复。' }
};
const controls = document.querySelectorAll('[data-scenario]');
controls.forEach(button => button.addEventListener('click', () => {
  const item = scenarios[button.dataset.scenario];
  controls.forEach(control => { const active = control === button; control.classList.toggle('selected', active); control.setAttribute('aria-pressed', String(active)); });
  document.getElementById('buyer-message').innerHTML = item.message;
  document.getElementById('version').textContent = item.version;
  document.getElementById('quantity').innerHTML = `${item.quantity} <small>件</small>`;
  document.getElementById('unit-price').textContent = `¥ ${item.price}`;
  document.getElementById('total').textContent = `¥ ${item.total}`;
  document.getElementById('quote-state').textContent = item.state;
  document.getElementById('rule-note').textContent = item.rule;
  document.getElementById('next-action').textContent = item.next;
  document.getElementById('demo-announcement').textContent = item.announcement;
}));
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
function closeMenu(){ menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','打开导航'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航'); nav.classList.toggle('open',open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true'){ closeMenu(); menu.focus(); } });
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('liangbowenbill@gmail.com'); status.textContent = '已复制'; }
  catch { status.textContent = '请选中左侧邮箱复制'; }
});
