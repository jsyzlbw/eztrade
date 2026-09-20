'use strict';
const scenarios = {
  initial: { message:'We need 1,000 custom boxes.<br>Could you send us a quote?', version:'v1', quantity:'1,000', price:'2.75', total:'2,750', zh:{state:'待人工审核',rule:'依据已确认规格与数量规则计算',next:'核对价格和交期，再发送客户回复。',announcement:'初次报价示例：1000件，参考单价2.75元，待人工审核。'}, en:{state:'Awaiting review',rule:'Calculated from confirmed specifications and quantity rules',next:'Review the price and delivery terms before replying.',announcement:'First quote example: 1,000 units at CNY 2.75 each, awaiting human review.'} },
  change: { message:'Can we change the quantity to 2,000?<br>Please update the quotation.', version:'v2', quantity:'2,000', price:'2.63', total:'5,260', zh:{state:'变更后需复核',rule:'数量变化，重新计算并更新报价版本',next:'确认新报价，避免沿用上一版价格。',announcement:'数量变更示例：2000件，参考单价2.63元，需重新审核。'}, en:{state:'Review changes',rule:'Quantity changed: recalculated and saved as a new version',next:'Approve the updated quote so the previous price is not reused.',announcement:'Quantity change example: 2,000 units at CNY 2.63 each, requiring a new review.'} },
  follow: { message:'Thanks for the quote.<br>Could you confirm the delivery date?', version:'v2', quantity:'2,000', price:'2.63', total:'5,260', zh:{state:'待确认交期',rule:'客户在意交付时间，价格沿用当前版本',next:'核实工厂可交付日期，再起草跟进回复。',announcement:'跟进示例：客户询问交期，需要业务员核实后回复。'}, en:{state:'Confirm delivery',rule:'Customer asks about delivery; the current quote is unchanged',next:'Check the available delivery date, then draft a reply.',announcement:'Follow-up example: the customer asks about delivery. Confirm the date before replying.'} }
};
const uiCopy = {
  zh:{title:'EZTrade 易贸｜展会之后，让生意继续',description:'EZTrade 易贸，面向制造企业的外贸询盘、报价与客户跟进助手。从展会后的需求整理开始，让报价有依据，让每一次跟进有下一步。正在开发，欢迎企业参与需求交流。',ogDescription:'整理询盘，准备报价，跟进客户。面向制造企业的外贸工作助手，现招募共创企业。',openMenu:'打开导航',closeMenu:'关闭导航',navigation:'主导航',home:'EZTrade 易贸首页',demo:'报价流程概念演示，使用模拟数据',scenarios:'切换模拟业务场景',copy:'复制联系邮箱',copied:'已复制',copyFailed:'请选中左侧邮箱复制',unit:'件',subject:'EZTrade 易贸｜企业需求交流'},
  en:{title:'EZTrade | Keep business moving after the trade show',description:'An inquiry, quoting and follow-up assistant for manufacturers. Turn scattered requirements into grounded quotes and clear next steps. In development and seeking design partners.',ogDescription:'Organize inquiries, prepare quotes and follow up with customers. An export workflow assistant for manufacturers, now seeking design partners.',openMenu:'Open navigation',closeMenu:'Close navigation',navigation:'Main navigation',home:'EZTrade home',demo:'Quoting concept demo using sample data',scenarios:'Choose a sample business scenario',copy:'Copy contact email',copied:'Copied',copyFailed:'Please select and copy the email address',unit:'units',subject:'EZTrade | Let’s discuss our export workflow'}
};
const controls = document.querySelectorAll('[data-scenario]');
const languageButtons = document.querySelectorAll('[data-lang]');
const localizedNodes = [...document.querySelectorAll('[data-i18n]')];
const chineseCopy = new Map(localizedNodes.map(node => [node.dataset.i18n,node.innerHTML]));
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
let currentScenario = 'initial';
let currentLanguage = 'zh';
function renderScenario(announce = false){
  const item = scenarios[currentScenario];
  const copy = item[currentLanguage];
  controls.forEach(button => { const active = button.dataset.scenario === currentScenario; button.classList.toggle('selected',active); button.setAttribute('aria-pressed',String(active)); });
  document.getElementById('buyer-message').innerHTML = item.message;
  document.getElementById('version').textContent = item.version;
  document.getElementById('quantity').innerHTML = `${item.quantity} <small>${uiCopy[currentLanguage].unit}</small>`;
  document.getElementById('unit-price').textContent = `¥ ${item.price}`;
  document.getElementById('total').textContent = `¥ ${item.total}`;
  document.getElementById('quote-state').textContent = copy.state;
  document.getElementById('rule-note').textContent = copy.rule;
  document.getElementById('next-action').textContent = copy.next;
  document.getElementById('demo-announcement').textContent = announce ? copy.announcement : '';
}
function applyLanguage(language, userInitiated = false){
  currentLanguage = language === 'en' ? 'en' : 'zh';
  const copy = uiCopy[currentLanguage];
  localizedNodes.forEach(node => { node.innerHTML = currentLanguage === 'en' ? (englishCopy[node.dataset.i18n] ?? chineseCopy.get(node.dataset.i18n)) : chineseCopy.get(node.dataset.i18n); });
  document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'zh-CN';
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = copy.description;
  document.querySelector('meta[property="og:title"]').content = copy.title;
  document.querySelector('meta[property="og:description"]').content = copy.ogDescription;
  document.querySelector('meta[property="og:locale"]').content = currentLanguage === 'en' ? 'en_US' : 'zh_CN';
  languageButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.lang === currentLanguage)));
  menu.setAttribute('aria-label',menu.getAttribute('aria-expanded') === 'true' ? copy.closeMenu : copy.openMenu);
  nav.setAttribute('aria-label',copy.navigation);
  document.querySelector('.brand').setAttribute('aria-label',copy.home);
  document.querySelector('.demo').setAttribute('aria-label',copy.demo);
  document.querySelector('.demo-controls').setAttribute('aria-label',copy.scenarios);
  document.getElementById('copy-email').setAttribute('aria-label',copy.copy);
  document.getElementById('copy-status').textContent = '';
  document.querySelector('.email-link').href = `mailto:liangbowenbill@gmail.com?subject=${encodeURIComponent(copy.subject)}`;
  renderScenario(userInitiated);
  if(userInitiated){
    try { localStorage.setItem('eztrade-language',currentLanguage); } catch { /* Language still works when storage is unavailable. */ }
    const url = new URL(window.location.href);
    url.searchParams.set('lang',currentLanguage);
    history.replaceState(null,'',url);
  }
}
controls.forEach(button => button.addEventListener('click',()=>{ currentScenario=button.dataset.scenario; renderScenario(true); }));
languageButtons.forEach(button => button.addEventListener('click',()=>applyLanguage(button.dataset.lang,true)));
function closeMenu(){ menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label',uiCopy[currentLanguage].openMenu); nav.classList.remove('open'); }
menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?uiCopy[currentLanguage].closeMenu:uiCopy[currentLanguage].openMenu);nav.classList.toggle('open',open); });
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.getElementById('copy-email').addEventListener('click',async()=>{
  const status=document.getElementById('copy-status');
  try{await navigator.clipboard.writeText('liangbowenbill@gmail.com');status.textContent=uiCopy[currentLanguage].copied;}
  catch{status.textContent=uiCopy[currentLanguage].copyFailed;}
});
let savedLanguage='zh';
try{savedLanguage=localStorage.getItem('eztrade-language')||'zh';}catch{/* Use the default language. */}
const requestedLanguage=new URLSearchParams(window.location.search).get('lang');
applyLanguage(['en','zh'].includes(requestedLanguage)?requestedLanguage:savedLanguage);
