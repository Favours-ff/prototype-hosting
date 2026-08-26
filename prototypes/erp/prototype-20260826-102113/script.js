const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const stores = [
  {
    id: "shopee-spe055", shop: "SPE055", platform: "Shopee", site: "泰国站", type: "普通店",
    warehouse: { name: "曼谷主仓", code: "平台同步获取", objectType: "地址", contact: "TH06SH", phone: "66822937885", address: "9/19 หมู่ที่ 2 ตำบลไทรใหญ่ อำเภอไทรน้อย จังหวัดนนทบุรี 11150", roles: ["默认地址", "揽收/发货地址"] },
    returnAddress: { name: "曼谷退件地址", objectType: "地址", contact: "SH", phone: "66804760575", address: "374 12 ถ. บางขุนเทียน แขวงแสมดำ เขตบางขุนเทียน กรุงเทพมหานคร 10150", roles: ["退件地址"] },
    hasRemovedSnapshot: true, mappedWarehouse: "",
    logs: [["系统", "平台数据同步", "SPE055", "完成平台后台设置快照更新", "2026-08-05 10:24:18"], ["张赛", "地址角色设置", "曼谷主仓", "平台同步确认成功", "2026-08-04 15:18:06"]]
  },
  {
    id: "lazada-th-001", shop: "LAZ-TH-001", platform: "Lazada", site: "泰国站", type: "—",
    warehouse: { name: "Lazada 泰国发货仓", code: "平台同步获取", objectType: "仓库", contact: "LAZTH01", phone: "—", address: "平台同步返回的泰国仓库地址", roles: ["揽收/发货地址"] },
    returnAddress: { name: "Lazada 泰国退件地址", objectType: "地址", contact: "LAZTH01", phone: "—", address: "平台同步返回的泰国退件地址", roles: ["退件地址"] },
    hasRemovedSnapshot: false, mappedWarehouse: "",
    logs: [["系统", "平台数据同步", "LAZ-TH-001", "完成平台后台设置快照更新", "2026-08-05 10:26:03"]]
  },
  {
    id: "tiktok-uk-002", shop: "TTS-UK-002", platform: "TikTok Shop", site: "英国站", type: "—",
    warehouse: { name: "TikTok 英国发货仓", code: "平台同步获取", objectType: "仓库", contact: "TTSUK02", phone: "—", address: "平台同步返回的英国仓库地址", roles: ["揽收/发货地址"] },
    returnAddress: { name: "TikTok 英国退件地址", objectType: "地址", contact: "TTSUK02", phone: "—", address: "平台同步返回的英国退件地址", roles: ["退件地址"] },
    hasRemovedSnapshot: false, mappedWarehouse: "英国中心仓",
    logs: [["系统", "平台数据同步", "TTS-UK-002", "完成平台后台设置快照更新", "2026-08-05 10:28:42"]]
  }
];

const systemWarehouseOptions = {
  Shopee: ["", "泰国曼谷中心仓", "顺友泰国仓", "东南亚自营仓"],
  Lazada: ["", "泰国曼谷中心仓", "东南亚自营仓"],
  "TikTok Shop": ["", "英国中心仓", "欧洲海外仓"]
};

const state = { platformFilter: "all", query: "", currentStore: null, rows: [] };

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function switchMainTab(tab) {
  $$('[data-main-tab]').forEach((button) => button.classList.toggle('is-active', button.dataset.mainTab === tab));
  $$('[data-main-panel]').forEach((panel) => { panel.hidden = panel.dataset.mainPanel !== tab; });
}

function switchSubTab(tab) {
  $$('[data-sub-tab]').forEach((button) => button.classList.toggle('is-active', button.dataset.subTab === tab));
  $$('[data-sub-panel]').forEach((panel) => { panel.hidden = panel.dataset.subPanel !== tab; });
}

function renderShopRows() {
  const query = state.query.toLowerCase();
  const visible = stores.filter((store) =>
    (state.platformFilter === 'all' || store.platform === state.platformFilter) &&
    (!query || store.shop.toLowerCase().includes(query))
  );
  $('[data-bind="shop-rows"]').innerHTML = visible.map((store) => `
    <tr><td><strong>${escapeHtml(store.shop)}</strong></td><td>${escapeHtml(store.platform)}</td><td>${escapeHtml(store.site)}</td><td>${escapeHtml(store.type)}</td><td class="is-muted">暂无已接入指标</td><td class="actions"><button type="button" data-action="open-shop" data-store-id="${escapeHtml(store.id)}">查看</button></td></tr>
  `).join('') || '<tr><td colspan="6" class="empty-row">暂无匹配店铺</td></tr>';
  $('[data-bind="shop-count"]').textContent = visible.length;
}

function openStore(storeId) {
  state.currentStore = stores.find((store) => store.id === storeId);
  if (!state.currentStore) return;
  $('[data-view="platform-list"]').hidden = true;
  $('[data-view="shop-detail"]').hidden = false;
  $('[data-bind="breadcrumb"]').textContent = `店铺运营管理 / 平台后台管理 / ${state.currentStore.shop}`;
  $('[data-bind="detail-title"]').textContent = `店铺后台档案 · ${state.currentStore.shop}`;
  $('[data-bind="detail-shop"]').textContent = state.currentStore.shop;
  $('[data-bind="detail-platform"]').textContent = state.currentStore.platform;
  $('[data-bind="detail-site"]').textContent = state.currentStore.site;
  $('[data-bind="detail-type"]').textContent = state.currentStore.type;
  $('[data-bind="channel-platform"]').textContent = state.currentStore.platform;
  switchMainTab('settings');
  switchSubTab('addresses');
  renderAddressRows();
  renderLogs();
}

function backToList() {
  closeMappingDrawer();
  $('[data-view="shop-detail"]').hidden = true;
  $('[data-view="platform-list"]').hidden = false;
  $('[data-bind="breadcrumb"]').textContent = '店铺运营管理 / 平台后台管理';
}

function rowHtml(record, options = {}) {
  const roles = record.roles.map((role) => `<span class="tag">${escapeHtml(role)}</span>`).join('');
  const systemWarehouse = options.allowMapping && options.mapped
    ? `<strong class="system-warehouse-name" title="${escapeHtml(options.mapped)}">${escapeHtml(options.mapped)}</strong>`
    : '-';
  const mappingAction = options.allowMapping
    ? '<button class="mapping-action" data-action="open-mapping">匹配系统仓库</button>'
    : '';
  return `<tr ${options.allowMapping ? 'data-row="main-warehouse"' : ''}><td><strong>${escapeHtml(record.name)}</strong><span class="tag tag--neutral">${escapeHtml(record.objectType)}</span></td><td>${systemWarehouse}</td><td>${escapeHtml(record.contact)}</td><td>${escapeHtml(record.phone)}</td><td><span class="ellipsis" title="${escapeHtml(record.address)}">${escapeHtml(record.address)}</span></td><td>${roles}</td><td><span class="tag tag--success">有效</span></td><td>2026-08-05 10:24:18</td><td class="actions"><button data-action="edit-address">编辑</button><button data-action="set-role">设置地址角色</button>${mappingAction}</td></tr>`;
}

function renderAddressRows() {
  const store = state.currentStore;
  const rows = [rowHtml(store.warehouse, { allowMapping: true, mapped: store.mappedWarehouse }), rowHtml(store.returnAddress)];
  if (store.hasRemovedSnapshot) rows.push('<tr class="is-muted"><td><strong>历史仓库快照</strong><span class="tag tag--neutral">仓库</span></td><td>-</td><td>—</td><td>—</td><td>平台完整成功同步后不再返回的历史记录</td><td>—</td><td><span class="tag tag--neutral">平台已移除</span></td><td>2026-07-28 15:42:09</td><td class="actions"><span>只读</span></td></tr>');
  $('[data-bind="address-rows"]').innerHTML = rows.join('');
}

function renderLogs() {
  $('[data-bind="log-rows"]').innerHTML = state.currentStore.logs.map((item) => `<tr>${item.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('');
}

function renderMappingRow() {
  const row = state.rows[0];
  const options = systemWarehouseOptions[state.currentStore.platform] || [""];
  $('[data-bind="mapping-rows"]').innerHTML = `<div class="single-mapping-form"><label><span>后台仓库名称</span><input data-field="externalName" value="${escapeHtml(row.externalName)}" readonly /></label><label><span>后台仓库 ID</span><input data-field="externalCode" value="${escapeHtml(row.externalCode)}" readonly /></label><label><span><em>*</em> 系统仓库名称</span><select data-field="internalName">${options.map((name) => `<option value="${escapeHtml(name)}" ${name === row.internalName ? 'selected' : ''}>${name || '请选择系统仓库'}</option>`).join('')}</select></label></div>`;
}

function openMappingDrawer() {
  const store = state.currentStore;
  state.rows = [{ externalName: store.warehouse.name, externalCode: store.warehouse.code, internalName: store.mappedWarehouse }];
  $('[data-bind="drawer-title"]').textContent = `${store.mappedWarehouse ? '编辑系统仓库映射' : '匹配系统仓库'} · ${store.warehouse.name}`;
  $('[data-bind="mapping-platform"]').textContent = store.platform;
  $('[data-bind="mapping-shop"]').textContent = store.shop;
  $('[data-bind="mapping-site"]').textContent = store.site;
  $('[data-bind="form-error"]').hidden = true;
  renderMappingRow();
  $('[data-bind="drawer-mask"]').hidden = false;
  const drawer = $('[data-bind="mapping-drawer"]');
  drawer.dataset.open = 'true';
  drawer.setAttribute('aria-hidden', 'false');
}

function closeMappingDrawer() {
  $('[data-bind="drawer-mask"]').hidden = true;
  const drawer = $('[data-bind="mapping-drawer"]');
  drawer.dataset.open = 'false';
  drawer.setAttribute('aria-hidden', 'true');
}

function saveMapping() {
  const systemWarehouse = $('[data-field="internalName"]').value;
  const error = $('[data-bind="form-error"]');
  if (!systemWarehouse) { error.textContent = '请选择当前后台仓库对应的系统仓库。'; error.hidden = false; return; }
  const wasSaved = Boolean(state.currentStore.mappedWarehouse);
  state.currentStore.mappedWarehouse = systemWarehouse;
  appendLog(wasSaved ? '仓库映射编辑' : '仓库映射新增', state.currentStore.warehouse.name, `已匹配系统仓库：${systemWarehouse}`);
  renderAddressRows();
  closeMappingDrawer();
  showToast(wasSaved ? '仓库映射已更新' : '系统仓库匹配成功');
}

function appendLog(type, object, summary) {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const time = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  state.currentStore.logs.unshift(['系统管理员', type, object, summary, time]);
  renderLogs();
}

function showToast(message) {
  const toast = $('[data-bind="toast"]');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2200);
}

function openDialog(type) {
  const store = state.currentStore;
  const body = $('[data-bind="dialog-body"]');
  if (type === 'edit-address') {
    $('[data-bind="dialog-title"]').textContent = `编辑地址 · ${store.warehouse.name}`;
    body.innerHTML = `<label>联系人<input value="${escapeHtml(store.warehouse.contact)}" /></label><label>联系电话<input value="${escapeHtml(store.warehouse.phone)}" /></label><label>地址名称<input value="${escapeHtml(store.warehouse.name)}" /></label><label>详细地址<input value="${escapeHtml(store.warehouse.address)}" /></label>`;
  } else {
    $('[data-bind="dialog-title"]').textContent = `设置地址角色 · ${store.warehouse.name}`;
    body.innerHTML = '<div class="role-options"><label><input type="checkbox" checked /> 默认地址</label><label><input type="checkbox" checked /> 揽收/发货地址</label><label><input type="checkbox" /> 退件地址</label></div>';
  }
  $('[data-bind="modal-mask"]').hidden = false;
  $('[data-bind="dialog"]').hidden = false;
}

function closeDialog() {
  $('[data-bind="modal-mask"]').hidden = true;
  $('[data-bind="dialog"]').hidden = true;
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.mainTab) switchMainTab(target.dataset.mainTab);
  if (target.dataset.subTab) switchSubTab(target.dataset.subTab);
  if (target.dataset.platformFilter) {
    state.platformFilter = target.dataset.platformFilter;
    $$('[data-platform-filter]').forEach((button) => button.classList.toggle('is-active', button === target));
    renderShopRows();
  }
  const action = target.dataset.action;
  if (action === 'search-shops') { state.query = $('[data-bind="shop-search"]').value.trim(); renderShopRows(); }
  if (action === 'open-shop') openStore(target.dataset.storeId);
  if (action === 'back-to-list') backToList();
  if (action === 'open-mapping') openMappingDrawer();
  if (action === 'close-mapping') closeMappingDrawer();
  if (action === 'save-mapping') saveMapping();
  if (action === 'edit-address' || action === 'set-role') openDialog(action);
  if (action === 'close-dialog') closeDialog();
});

$('[data-bind="drawer-mask"]').addEventListener('click', closeMappingDrawer);
$('[data-bind="modal-mask"]').addEventListener('click', closeDialog);
renderShopRows();
