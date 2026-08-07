const activities = [
  { id: 'ACT-260609-001', name: '双11鞋服大促', platform: 'Shopee', type: '产品折扣', status: '待审核', store: 'SPE002_VN_BT 等 11 个店铺', products: 65, time: '2026-11-01 ~ 2026-11-12', error: '' },
  { id: 'ACT-260609-002', name: '黑五电子产品降价', platform: 'Lazada', type: '多买多省', status: '执行中', store: 'LAZ201_MY_EL', products: 12, time: '2026-11-20 ~ 2026-11-30', error: '' },
  { id: 'ACT-260609-003', name: '双12预热-台湾站', platform: 'Shopee', type: '买X送Y', status: '草稿', store: 'SPE088_TW_HM 等 14 个店铺', products: 108, time: '2026-12-01 ~ 2026-12-12', error: '' },
  { id: 'ACT-260609-004', name: '清仓大处理', platform: 'Lazada', type: '产品折扣', status: '已拒绝', store: 'LAZ_TH_01', products: 5, time: '2026-06-15 ~ 2026-06-20', error: 'SKU 不满足平台活动要求' },
  { id: 'ACT-260609-005', name: '春季上新活动', platform: 'Shopee', type: '产品折扣', status: '结束', store: 'SPE_VN_02', products: 42, time: '2026-03-10 ~ 2026-03-30', error: '' }
];

const statusClass = { 草稿: 'tag--default', 待审核: 'tag--warning', 执行中: 'tag--processing', 已拒绝: 'tag--error', 结束: 'tag--success' };
let currentActivity = activities[0];
let selectedDates = [];

function renderRows(data = activities) {
  const rows = document.getElementById('activityRows');
  rows.innerHTML = data.map(a => `
    <tr data-row-id="${a.id}">
      <td><button class="btn btn--link btn--color-primary c-row-title" data-detail="${a.id}">${a.name}</button><span class="c-cell-sub">${a.id}</span></td>
      <td>${a.platform}</td><td>${a.type}</td><td><span class="tag ${statusClass[a.status]}">${a.status}</span></td>
      <td><button class="btn btn--link btn--color-primary c-row-title" data-action="stores">${a.store}</button><span class="c-cell-sub">${a.products} 个商品 / SKU</span></td>
      <td>${a.time}</td>
      <td>${a.error ? `<span class="tag tag--error">绑定异常</span><span class="c-cell-sub">${a.error}</span>` : '<span class="c-cell-sub">—</span>'}</td>
      <td class="c-table__cell--actions"><div class="c-row-actions"><button class="btn btn--link btn--color-primary" data-detail="${a.id}">查看</button>${rowAction(a)}<button class="btn btn--link btn--color-primary" data-action="more">更多⌄</button></div></td>
    </tr>`).join('');
  const countText = `共 ${data.length} 条活动`;
  document.getElementById('resultSummary').textContent = countText;
  document.getElementById('headerCount').textContent = `共 ${data.length} 条`;
  document.getElementById('filteredEmpty').hidden = data.length > 0;
}

function rowAction(a) {
  if (a.status === '草稿' || a.status === '已拒绝') return '<button class="btn btn--link btn--color-primary" data-action="edit">编辑</button>';
  if (a.status === '待审核') return '<button class="btn btn--link btn--color-primary" data-detail-tab="approval">审批记录</button>';
  if (a.status === '执行中') return '<button class="btn btn--link btn--color-primary" data-action="close">关闭</button>';
  return '';
}

function showView(name) {
  document.querySelectorAll('.page-view').forEach(view => view.classList.toggle('is-active', view.id === `view-${name}`));
  document.getElementById('crumbCurrent').textContent = name === 'create' ? '新建折扣活动' : '折扣活动';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePopups(except) {
  document.querySelectorAll('.c-popup.is-open').forEach(node => { if (node !== except) node.classList.remove('is-open'); });
}

function positionPopup(trigger, popup) {
  const rect = trigger.getBoundingClientRect();
  popup.style.left = `${Math.min(rect.left, window.innerWidth - popup.offsetWidth - 16)}px`;
  popup.style.top = `${rect.bottom + 6}px`;
}

function openDrawer(id) {
  document.querySelectorAll('.c-drawer').forEach(drawer => drawer.classList.remove('is-open'));
  document.getElementById(id).classList.add('is-open');
  document.querySelector('.c-drawer-mask').classList.add('is-open');
}

function closeDrawers() {
  document.querySelectorAll('.c-drawer').forEach(drawer => drawer.classList.remove('is-open'));
  document.querySelector('.c-drawer-mask').classList.remove('is-open');
}

function openDetail(id, tab = 'basic') {
  currentActivity = activities.find(a => a.id === id) || activities[0];
  document.getElementById('detailTitle').textContent = `${currentActivity.name} · ${currentActivity.id}`;
  document.getElementById('detailStatus').innerHTML = `<span class="tag ${statusClass[currentActivity.status]}">${currentActivity.status}</span>`;
  document.getElementById('detailPlatform').textContent = `平台：${currentActivity.platform}`;
  document.getElementById('detailTime').textContent = `活动时间：${currentActivity.time}`;
  document.getElementById('detailDesc').innerHTML = `<dt>活动名称</dt><dd>${currentActivity.name}</dd><dt>活动 ID</dt><dd>${currentActivity.id}</dd><dt>平台</dt><dd>${currentActivity.platform}</dd><dt>折扣类型</dt><dd>${currentActivity.type}</dd><dt>店铺范围</dt><dd>${currentActivity.store}</dd><dt>商品数量</dt><dd>${currentActivity.products} 个商品 / SKU</dd><dt>活动时间</dt><dd>${currentActivity.time}</dd><dt>创建人</dt><dd>张运营</dd>`;
  document.getElementById('drawerPrimary').textContent = currentActivity.status === '待审核' ? '处理审核' : currentActivity.status === '执行中' ? '关闭活动' : '编辑活动';
  switchDrawerTab(tab);
  openDrawer('detailDrawer');
}

function switchDrawerTab(tab) {
  document.querySelectorAll('.c-drawer__tab').forEach(item => item.classList.toggle('is-active', item.dataset.tab === tab));
  document.querySelectorAll('.c-tab-pane').forEach(item => item.classList.toggle('is-active', item.dataset.pane === tab));
}

function renderRule(type) {
  document.getElementById('ruleHint').textContent = `当前类型：${type}`;
  const box = document.getElementById('ruleBox');
  if (type === '产品折扣') box.innerHTML = '<p class="c-rule-note">对单个商品或 SKU 设置固定价格或百分比折扣。</p><div class="c-rule-grid"><label>折扣方式<button class="btn c-select-trigger"><span>固定促销价</span><span>⌄</span></button></label><label>默认促销价<input class="input" placeholder="例如：99.00"></label><label>买家限购<input class="input" placeholder="不填表示不限"></label></div>';
  if (type === '多买多省') box.innerHTML = '<p class="c-rule-note">最多配置 3 层阶梯，后一层购买数量必须大于前一层。</p><div class="c-rule-grid"><label>阶梯 1：买满<input class="input" value="2 件"></label><label>优惠方式<button class="btn c-select-trigger"><span>立减金额</span><span>⌄</span></button></label><label>优惠值<input class="input" value="20.00"></label></div>';
  if (type === '买X送Y') box.innerHTML = '<p class="c-rule-note">购买商品与赠品商品均不能为空。</p><div class="c-rule-grid"><label>购买商品 X<button class="btn c-select-trigger" id="buyProduct"><span>选择商品 / SKU</span><span>⌄</span></button></label><label>购买数量 X<input class="input" value="2"></label><label>赠品数量 Y<input class="input" value="1"></label></div>';
}

function renderCalendar() {
  const months = [{ days: 30, offset: 0 }, { days: 31, offset: 2 }];
  const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
  document.getElementById('calendar').innerHTML = months.map((month, index) => {
    const names = weekdays.map(day => `<span>${day}</span>`).join('');
    const blanks = Array.from({ length: month.offset }, () => '<span></span>').join('');
    const days = Array.from({ length: month.days }, (_, dayIndex) => {
      const value = `2026-${String(index + 6).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`;
      return `<button class="btn${selectedDates.includes(value) ? ' is-selected' : ''}" data-date="${value}">${dayIndex + 1}</button>`;
    }).join('');
    return `<div class="c-month">${names}${blanks}${days}</div>`;
  }).join('');
}

function toast(message) {
  const node = document.getElementById('toast');
  node.textContent = message;
  node.classList.add('is-open');
  setTimeout(() => node.classList.remove('is-open'), 2200);
}

function applyQuery() {
  const keyword = document.getElementById('keywordInput').value.trim();
  const keywordType = document.getElementById('keywordType').textContent;
  const status = document.getElementById('statusValue').textContent;
  const type = document.getElementById('typeValue').textContent;
  const selectedPlatforms = [...document.querySelectorAll('[data-platform]:checked')].map(input => input.dataset.platform);
  const selectedStores = [...document.querySelectorAll('#storePopup [data-store]:checked')].map(input => input.dataset.store.split(' / ').pop());
  const storeMatched = a => (!selectedPlatforms.length && !selectedStores.length) || selectedPlatforms.includes(a.platform) || selectedStores.some(store => a.store.includes(store));
  const data = activities.filter(a => (!keyword || (keywordType === '活动 ID' ? a.id.includes(keyword) : a.name.includes(keyword))) && (status === '全部状态' || a.status === status) && (type === '全部类型' || a.type === type) && storeMatched(a));
  renderRows(data);
  const chips = [];
  if (keyword) chips.push(`${keywordType}：${keyword}`);
  if (status !== '全部状态') chips.push(`活动状态：${status}`);
  if (type !== '全部类型') chips.push(`折扣类型：${type}`);
  if (selectedPlatforms.length) chips.push(`平台：${selectedPlatforms.join('、')}`);
  if (!selectedPlatforms.length && selectedStores.length) chips.push(`店铺：${[...new Set(selectedStores)].join('、')}`);
  if (document.getElementById('dateValue').textContent !== '请选择日期范围') chips.push(`${document.getElementById('timeTypeValue').textContent}：${document.getElementById('dateValue').textContent}`);
  document.getElementById('filterChips').innerHTML = chips.map(chip => `<span class="c-chip">${chip} ×</span>`).join('');
  toast('查询条件已应用');
}

function resetQuery() {
  document.getElementById('keywordType').textContent = '活动名称';
  document.getElementById('keywordInput').value = '';
  document.getElementById('keywordInput').placeholder = '请输入活动名称';
  document.getElementById('statusValue').textContent = '全部状态';
  document.getElementById('typeValue').textContent = '全部类型';
  document.getElementById('storeValue').textContent = '全部平台 / 店铺';
  document.getElementById('timeTypeValue').textContent = '活动开始时间';
  document.getElementById('dateValue').textContent = '请选择日期范围';
  document.querySelectorAll('#storePopup input[type=checkbox]').forEach(input => { input.checked = false; });
  selectedDates = [];
  renderCalendar();
  document.getElementById('filterChips').innerHTML = '';
  renderRows();
}

document.addEventListener('click', event => {
  const view = event.target.closest('[data-view]');
  if (view) showView(view.dataset.view);
  const popupTrigger = event.target.closest('[data-popup]');
  if (popupTrigger) {
    event.stopPropagation();
    const popup = document.getElementById(popupTrigger.dataset.popup);
    const willOpen = !popup.classList.contains('is-open');
    closePopups(popup);
    popup.classList.toggle('is-open', willOpen);
    if (willOpen) positionPopup(popupTrigger, popup);
    return;
  }
  const select = event.target.closest('[data-select]');
  if (select) {
    document.getElementById(select.dataset.select).textContent = select.textContent;
    if (select.dataset.select === 'keywordType') document.getElementById('keywordInput').placeholder = select.textContent === '活动 ID' ? '请输入活动 ID' : '请输入活动名称';
    closePopups();
  }
  const detail = event.target.closest('[data-detail]');
  if (detail) openDetail(detail.dataset.detail);
  const detailTab = event.target.closest('[data-detail-tab]');
  if (detailTab) openDetail(detailTab.closest('tr').dataset.rowId, detailTab.dataset.detailTab);
  const drawerOpen = event.target.closest('[data-open-drawer]');
  if (drawerOpen) openDrawer(drawerOpen.dataset.openDrawer);
  if (event.target.closest('[data-close-drawer]')) closeDrawers();
  const tab = event.target.closest('[data-tab]');
  if (tab) switchDrawerTab(tab.dataset.tab);
  const action = event.target.closest('[data-action]');
  if (action) {
    if (action.dataset.action === 'edit') showView('create');
    if (action.dataset.action === 'close') toast('关闭活动需要主管确认');
    if (action.dataset.action === 'stores') toast('已展示该活动的店铺范围');
    if (action.dataset.action === 'more') toast('更多操作：复制活动、查看接口日志');
  }
  const typeCard = event.target.closest('[data-type]');
  if (typeCard) {
    document.querySelectorAll('[data-type]').forEach(item => item.classList.toggle('is-active', item === typeCard));
    renderRule(typeCard.dataset.type);
  }
  const date = event.target.closest('[data-date]');
  if (date) {
    event.stopPropagation();
    if (selectedDates.length === 2) selectedDates = [];
    selectedDates.push(date.dataset.date);
    selectedDates.sort();
    document.getElementById('dateSelection').textContent = selectedDates.join(' ~ ') || '请选择开始和结束日期';
    renderCalendar();
  }
  if (event.target.closest('[data-close-modal]')) document.getElementById('productModal').hidden = true;
  if (!event.target.closest('.c-popup') && !popupTrigger) closePopups();
});

document.getElementById('collapseBtn').addEventListener('click', () => {
  const shell = document.querySelector('.c-shell');
  shell.dataset.collapsed = shell.dataset.collapsed === 'true' ? 'false' : 'true';
});
document.getElementById('moreFilter').addEventListener('click', () => {
  const filter = document.querySelector('.c-filter');
  filter.dataset.expanded = filter.dataset.expanded === 'true' ? 'false' : 'true';
  document.getElementById('moreFilter').textContent = filter.dataset.expanded === 'true' ? '收起筛选⌃' : '更多筛选⌄';
});
document.getElementById('storePopup').addEventListener('click', event => event.stopPropagation());
document.getElementById('storePopup').addEventListener('change', event => {
  if (event.target.dataset.platform) {
    const checked = event.target.checked;
    let active = false;
    document.querySelectorAll('#storePopup [data-store]').forEach(input => {
      if (input.dataset.store.startsWith(event.target.dataset.platform)) { input.checked = checked; active = true; }
    });
    if (!active) event.target.checked = checked;
  }
  const platforms = [...document.querySelectorAll('#storePopup [data-platform]:checked')].map(input => input.dataset.platform);
  const stores = [...document.querySelectorAll('#storePopup [data-store]:checked')].map(input => input.dataset.store.split(' / ').pop());
  document.getElementById('storeValue').textContent = platforms.length ? platforms.join('、') : stores.length ? `已选择 ${new Set(stores).size} 个店铺` : '全部平台 / 店铺';
});
document.getElementById('storeSearch').addEventListener('input', event => {
  const keyword = event.target.value.toLowerCase();
  document.querySelectorAll('#storePopup .c-node').forEach(node => { node.hidden = !node.textContent.toLowerCase().includes(keyword); });
});
document.querySelectorAll('[data-range]').forEach(button => button.addEventListener('click', event => {
  event.stopPropagation();
  document.getElementById('dateValue').textContent = button.dataset.range;
  closePopups();
}));
document.getElementById('clearDate').addEventListener('click', event => {
  event.stopPropagation(); selectedDates = []; document.getElementById('dateSelection').textContent = '请选择开始和结束日期'; document.getElementById('dateValue').textContent = '请选择日期范围'; renderCalendar();
});
document.getElementById('applyDate').addEventListener('click', event => {
  event.stopPropagation(); if (selectedDates.length !== 2) return toast('请选择开始和结束日期'); document.getElementById('dateValue').textContent = selectedDates.join(' ~ '); closePopups();
});
document.getElementById('queryBtn').addEventListener('click', applyQuery);
document.getElementById('resetBtn').addEventListener('click', () => { resetQuery(); toast('筛选条件已重置'); });
document.getElementById('clearFilters').addEventListener('click', resetQuery);
document.getElementById('refreshBtn').addEventListener('click', () => toast('活动状态已刷新'));
document.getElementById('selectProduct').addEventListener('click', () => { document.getElementById('productModal').hidden = false; });
document.getElementById('applyProducts').addEventListener('click', () => { document.getElementById('productModal').hidden = true; toast('商品选择已更新'); });
document.getElementById('saveDraft').addEventListener('click', () => toast('草稿已保存'));
document.getElementById('submitReview').addEventListener('click', () => {
  if (!document.getElementById('activityName').value.trim()) return toast('请先填写活动名称');
  toast('活动已提交审核'); setTimeout(() => showView('list'), 700);
});
document.getElementById('drawerSecondary').addEventListener('click', () => toast('活动状态已刷新'));
document.getElementById('drawerPrimary').addEventListener('click', () => {
  if (currentActivity.status === '待审核') { switchDrawerTab('approval'); toast('请在审批记录中处理'); return; }
  if (currentActivity.status === '执行中') { toast('关闭活动需要主管确认'); return; }
  closeDrawers(); showView('create');
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closePopups(); closeDrawers(); } });

renderRows();
renderRule('产品折扣');
renderCalendar();
