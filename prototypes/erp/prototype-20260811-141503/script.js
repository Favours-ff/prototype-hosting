const rules = [
  {
    id: 1,
    name: "菲律宾测评订单换货",
    mode: "manual",
    platform: "Shopee",
    shop: "SPE039_PH_BT",
    site: "菲律宾",
    conditionGroups: [[{ field: "平台 SKU", operator: "只要存在一个", value: "HMLN0001-001、HMLN0001-006" }]],
    scope: "matched",
    skuRows: [{ sku: "VHCI0005-001", qty: 1 }],
    priority: 999999,
    status: "enabled",
    remark: "原有测评订单手动换货流程",
    updater: "朱丽洁",
    updatedAt: "2026-07-28 16:16"
  },
  {
    id: 2,
    name: "印尼 Runye 测评换货",
    mode: "manual",
    platform: "Shopee",
    shop: "SPE015_ID_BT",
    site: "印度尼西亚",
    conditionGroups: [[{ field: "平台 SKU", operator: "包含任意一个", value: "VHCI0005-OLD" }]],
    scope: "all",
    skuRows: [{ sku: "VHCI0005-001", qty: 1 }],
    priority: 99999,
    status: "enabled",
    remark: "",
    updater: "艾萍",
    updatedAt: "2026-07-15 18:29"
  },
  {
    id: 3,
    name: "泰国低利润订单自动审单换货",
    mode: "auto",
    platform: "Shopee",
    shop: "SPE087_TH_BT",
    site: "泰国",
    conditionGroups: [
      [
        { field: "利润率", operator: "小于等于", value: "0%" },
        { field: "发货 SKU", operator: "包含任意一个", value: "BAG-DEMO-01" }
      ],
      [{ field: "订单金额（原币）", operator: "大于等于", value: "1000" }]
    ],
    scope: "all",
    skuRows: [{ sku: "BAG-DEMO-02", qty: 1 }, { sku: "CARD-DEMO-01", qty: 1 }],
    priority: 1000,
    status: "enabled",
    remark: "命中后自动执行",
    updater: "刘梦",
    updatedAt: "2026-07-26 10:42"
  },
  {
    id: 4,
    name: "TikTok 美区指定 SKU 自动审单",
    mode: "auto",
    platform: "TikTok Shop",
    shop: "TIKTOK_08_us",
    site: "美国",
    conditionGroups: [[{ field: "发货 SKU", operator: "等于", value: "US-DEMO-OLD" }]],
    scope: "matched",
    skuRows: [{ sku: "US-DEMO-NEW", qty: 1 }],
    priority: 500,
    status: "disabled",
    remark: "",
    updater: "系统管理员",
    updatedAt: "2026-07-20 09:18"
  }
];

const warehouseMappings = [
  {
    id: 1,
    platform: "TikTok Shop",
    shop: "TIKTOK_08_us",
    site: "美国",
    externalName: "顺友美东仓",
    externalCode: "7654839757679560449",
    internalName: "顺友美东仓",
    internalId: "WH_US_EAST_01",
    status: "enabled",
    remark: "",
    updater: "系统管理员",
    updatedAt: "2026-07-29 10:18"
  },
  {
    id: 2,
    platform: "TikTok Shop",
    shop: "TIKTOK_09_us",
    site: "美国",
    externalName: "顺友美东仓",
    externalCode: "7654839757679561298",
    internalName: "顺友美东仓",
    internalId: "WH_US_EAST_01",
    status: "enabled",
    remark: "同一实体仓库，不同店铺后台编码不同",
    updater: "系统管理员",
    updatedAt: "2026-07-29 10:22"
  },
  {
    id: 3,
    platform: "Shopee",
    shop: "SPE015_ID_BT",
    site: "印度尼西亚",
    externalName: "Jakarta Hub",
    externalCode: "ID-JKT-00318",
    internalName: "雅加达中心仓",
    internalId: "WH_ID_JKT_01",
    status: "disabled",
    remark: "",
    updater: "艾萍",
    updatedAt: "2026-07-25 16:40"
  }
];

const genericRules = {
  audit: [
    { id: 101, name: "全托管亏损自动审单-速卖通多品", platform: "AliExpress", priority: 99999999, status: "enabled", executions: 0, creator: "朱丽洁", createdAt: "2025-04-06 10:00:13", updater: "朱丽洁", updatedAt: "2025-04-30 16:16:37", conditionGroups: [[{ field: "利润", operator: "小于", value: "0" }]], action: "自动审单" },
    { id: 102, name: "吴明珠003 007 005 083 店铺亏损2元以内的自动审单", platform: "AliExpress", priority: 99999999, status: "enabled", executions: 0, creator: "黄灵", createdAt: "2025-03-03 11:09:20", updater: "黄灵", updatedAt: "2025-11-21 17:10:14", conditionGroups: [[{ field: "来源店铺", operator: "包含", value: "003、007、005、083" }]], action: "自动审单" }
  ],
  logistics: [
    { id: 201, name: "采君士耳其匹配顺友", platform: "AliExpress", warehouse: "顺友仓", priority: 99999, status: "enabled", executions: 0, creator: "陈梦瑶", createdAt: "2026-02-02 08:48:05", updater: "陈梦瑶", updatedAt: "2026-07-17 17:52:27", conditionGroups: [[{ field: "订单目的国家", operator: "包含", value: "土耳其" }]], action: "指定默认物流" },
    { id: 202, name: "安捷利仓自动匹配物流渠道", platform: "AliExpress", warehouse: "安捷利仓", priority: 99999, status: "enabled", executions: 0, creator: "黄灵", createdAt: "2025-09-30 16:09:08", updater: "黄灵", updatedAt: "2026-07-17 17:52:27", conditionGroups: [[{ field: "来源店铺", operator: "包含", value: "" }]], action: "智能分配物流" }
  ],
  allocation: [
    { id: 301, name: "TEMU-Y2-东莞仓", platform: "Temu", priority: 9999999, status: "enabled", executions: 0, creator: "刘葶", createdAt: "2026-03-13 09:14:45", updater: "刘葶", updatedAt: "2026-07-17 17:46:35", conditionGroups: [[{ field: "来源店铺", operator: "包含", value: "TEMU-Y2" }]], action: "自动分配仓库" },
    { id: 302, name: "116海外仓橙联分仓", platform: "AliExpress", priority: 999999, status: "enabled", executions: 0, creator: "黄灵", createdAt: "2025-08-29 09:06:56", updater: "黄灵", updatedAt: "2026-07-17 17:46:35", conditionGroups: [[{ field: "平台SKU", operator: "包含", value: "" }]], action: "自动分配仓库" }
  ],
  declaration: [
    { id: 401, name: "顺友-欧盟税改申报", platform: "", priority: 999999, status: "disabled", executions: 0, creator: "刘葶", createdAt: "2026-06-24 12:23:00", updater: "刘葶", updatedAt: "2026-06-25 12:18:45", conditionGroups: [[{ field: "订单发货仓库", operator: "包含", value: "顺友" }, { field: "订单目的国家", operator: "包含", value: "欧盟国家" }, { field: "物流渠道", operator: "包含", value: "顺友" }]], action: "固定价格 / 固定重量申报" },
    { id: 402, name: "EDIS-欧盟税改申报", platform: "", priority: 999999, status: "disabled", executions: 0, creator: "刘妙芝", createdAt: "2026-06-22 15:10:24", updater: "刘葶", updatedAt: "2026-06-24 12:29:29", conditionGroups: [[{ field: "订单发货仓库", operator: "包含", value: "EDIS" }, { field: "订单目的国家", operator: "包含", value: "欧盟国家" }, { field: "物流渠道", operator: "包含", value: "EDIS" }]], action: "固定价格 / 固定重量申报" }
  ],
  semiHosted: [
    { id: 501, name: "袁青-jit转pop", platform: "AliExpress", priority: 999999999, status: "enabled", executions: 0, creator: "袁青", createdAt: "2025-12-05 10:35:35", updater: "庄镇艺", updatedAt: "2026-01-08 15:24:36", conditionGroups: [[{ field: "订单商品数量", operator: "大于", value: "0" }]], action: "POP发货模式" }
  ]
};

const ruleSchemas = {
  audit: {
    subtitle: "真实动作：人工审单 / 自动审单；支持设置标签。",
    actions: ["人工审单", "自动审单"],
    conditions: ["来源店铺", "订单站点", "订单付款时间", "是否COD订单", "是否有留言", "是否有备注", "订单目的国家", "系统SKU", "订单金额(CNY)", "订单商品数量", "平台运输方式", "订单金额(原币)", "【分仓】仓库", "利润", "平台SKU", "item_id", "利润率", "订单类型", "物流渠道", "location", "平台物流方式数量", "包裹重量(g)", "SKU销售状态", "订单金额(通用)", "是否有sku留言", "发货SKU"]
  },
  logistics: {
    subtitle: "真实动作：人工分配物流 / 指定默认物流 / 智能分配物流。",
    actions: ["人工分配物流", "指定默认物流", "智能分配物流"],
    extraBase: "warehouse",
    conditions: ["来源店铺", "订单站点", "订单付款时间", "是否COD订单", "是否有留言", "是否有备注", "订单目的国家", "映射SKU", "订单金额(CNY)", "订单商品数量", "订单商品重量(kg)", "平台运输方式", "订单金额(原币)", "系统SKU物流属性", "平台SKU", "item_id", "订单类型", "location", "发货SKU", "平台物流方式数量", "订单金额(通用)", "包裹重量(g)"]
  },
  allocation: {
    subtitle: "真实动作：自动分配仓库；可配置优先级类型与可发货仓库顺序。",
    actions: ["自动分配仓库"],
    conditions: ["来源店铺", "订单站点", "订单付款时间", "是否COD订单", "是否有留言", "是否有备注", "订单目的国家", "订单金额(CNY)", "订单商品数量", "平台运输方式", "订单金额(原币)", "平台SKU", "item_id", "订单类型", "location"]
  },
  declaration: {
    subtitle: "订单发货仓库、订单目的国家、物流渠道为必选条件。",
    actions: ["申报信息设置"],
    noPlatform: true,
    requiredConditions: ["订单发货仓库", "订单目的国家", "物流渠道"],
    conditions: ["订单发货仓库", "订单目的国家", "物流渠道", "来源平台", "来源店铺", "平台运输方式", "物流属性", "订单金额(原币)", "包裹重量(g)", "平台SKU", "item_id", "订单金额(通用)"]
  },
  semiHosted: {
    subtitle: "所属平台固定为速卖通；真实动作：人工选择发货模式 / POP发货模式 / 托管发货模式。",
    actions: ["人工选择发货模式", "POP发货模式", "托管发货模式"],
    fixedPlatform: "速卖通",
    conditions: ["订单商品数量", "来源店铺"]
  }
};

const tabMeta = {
  warehouse: { name: "平台仓库映射规则", create: "新增仓库映射", desc: "按店铺后台仓库编码匹配系统仓库，统一供订单处理服务读取。" },
  exchange: { name: "换货处理规则", create: "新增换货规则", desc: "统一配置哪些订单需要换货，以及命中后的审单方式和发货 SKU 替换方案。" },
  audit: { name: "审单规则", create: "新增审单规则", desc: "配置订单进入人工审核或自动审核的判断规则。" },
  logistics: { name: "物流规则", create: "新增物流规则", desc: "配置订单匹配物流渠道的优先级与适用范围。" },
  allocation: { name: "分仓规则", create: "新增分仓规则", desc: "配置订单与 SKU 应分配到哪个发货仓库。" },
  declaration: { name: "申报规则", create: "新增申报规则", desc: "配置不同订单场景下的申报金额与申报方式。" },
  semiHosted: { name: "半托管发货规则", create: "新增半托管发货规则", desc: "配置半托管订单的发货模式与适用范围。" }
};

const state = {
  activeTab: "warehouse",
  visibleRules: [...rules],
  visibleWarehouseMappings: [...warehouseMappings],
  editingId: null,
  editingWarehouseId: null,
  editingGenericId: null,
  genericDraft: null,
  pendingDeleteId: null,
  mode: "manual",
  status: "enabled",
  scope: "matched",
  conditionGroups: [],
  skuRows: []
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function renderRules() {
  const tbody = $('[data-bind="rule-rows"]');
  tbody.innerHTML = state.visibleRules.map((rule) => `
    <tr>
      <td><span class="tag tag--default">换货处理规则</span></td>
      <td><span class="c-table__primary">${escapeHtml(rule.name)}</span><span class="c-table__secondary">ID：EX-${String(rule.id).padStart(4, "0")}</span></td>
      <td><span class="c-condition-summary">来源平台：${escapeHtml(rule.platform)}</span></td>
      <td>${escapeHtml(rule.priority)}</td>
      <td><button class="c-switch" type="button" role="switch" aria-checked="${rule.status === "enabled"}" aria-label="${rule.status === "enabled" ? "停用" : "启用"}规则" data-action="toggle-status" data-id="${rule.id}"></button></td>
      <td>${escapeHtml(rule.executions ?? 0)}</td>
      <td><span class="c-table__primary">${escapeHtml(rule.creator || "—")}</span><span class="c-table__secondary">${escapeHtml(rule.createdAt || "—")}</span></td>
      <td><span class="c-table__primary">${escapeHtml(rule.updater)}</span><span class="c-table__secondary">${escapeHtml(rule.updatedAt)}</span></td>
      <td class="c-table__actions"><span class="c-actions"><button class="btn btn--text btn--color-primary btn--sm" type="button" data-action="edit-rule" data-id="${rule.id}">编辑</button><button class="btn btn--text btn--color-danger btn--sm" type="button" data-action="delete-rule" data-id="${rule.id}">删除</button></span></td>
    </tr>
  `).join("");

  $('[data-bind="result-count"]').textContent = state.visibleRules.length;
  $('[data-bind="page-total"]').textContent = state.visibleRules.length;
  $('[data-bind="empty"]').hidden = state.visibleRules.length !== 0;
  $(".c-table-scroll").hidden = state.visibleRules.length === 0;
  $(".c-pagination").hidden = state.visibleRules.length === 0;
}

function renderWarehouseMappings() {
  $('[data-bind="warehouse-rows"]').innerHTML = state.visibleWarehouseMappings.map((mapping) => `
    <tr>
      <td><span class="c-table__primary">${escapeHtml(mapping.platform)}</span><span class="c-table__secondary">${escapeHtml(mapping.site)}</span></td>
      <td><span class="c-table__primary">${escapeHtml(mapping.shop)}</span></td>
      <td><span class="c-table__primary">${escapeHtml(mapping.externalName)}</span></td>
      <td><code>${escapeHtml(mapping.externalCode)}</code></td>
      <td><span class="c-table__primary">${escapeHtml(mapping.internalName)}</span><span class="c-table__secondary">${escapeHtml(mapping.internalId)}</span></td>
      <td><button class="c-switch" type="button" role="switch" aria-checked="${mapping.status === "enabled"}" data-action="toggle-warehouse-status" data-id="${mapping.id}"></button></td>
      <td><span class="c-table__primary">${escapeHtml(mapping.updater)}</span><span class="c-table__secondary">${escapeHtml(mapping.updatedAt)}</span></td>
      <td class="c-table__actions"><button class="btn btn--text btn--color-primary btn--sm" type="button" data-action="edit-warehouse" data-id="${mapping.id}">编辑</button></td>
    </tr>
  `).join("");
  $('[data-bind="warehouse-count"]').textContent = state.visibleWarehouseMappings.length;
  $('[data-bind="warehouse-total"]').textContent = state.visibleWarehouseMappings.length;
}

function renderGenericRules() {
  const items = genericRules[state.activeTab] || [];
  const keyword = $('[data-generic-filter="keyword"]')?.value.trim().toLowerCase() || "";
  const platform = $('[data-generic-filter="platform"]')?.value.trim().toLowerCase() || "";
  const priorityMin = Number($('[data-generic-filter="priority-min"]')?.value) || 0;
  const priorityMax = Number($('[data-generic-filter="priority-max"]')?.value) || Infinity;
  const status = $('[data-generic-filter="status"]')?.dataset.value || "";
  const updater = $('[data-generic-filter="updater"]')?.value.trim().toLowerCase() || "";
  const updatedStart = $('[data-generic-filter="updated-start"]')?.value || "";
  const updatedEnd = $('[data-generic-filter="updated-end"]')?.value || "";
  const visible = items.filter((item) =>
    (!keyword || item.name.toLowerCase().includes(keyword)) &&
    (!platform || item.platform.toLowerCase().includes(platform)) &&
    item.priority >= priorityMin &&
    item.priority <= priorityMax &&
    (!status || item.status === status) &&
    (!updater || item.updater.toLowerCase().includes(updater)) &&
    (!updatedStart || item.updatedAt.slice(0, 10) >= updatedStart) &&
    (!updatedEnd || item.updatedAt.slice(0, 10) <= updatedEnd)
  );
  $('[data-bind="generic-rows"]').innerHTML = visible.map((item) => `
    <tr>
      <td><span class="tag tag--default">${escapeHtml(tabMeta[state.activeTab].name)}</span></td>
      <td><span class="c-table__primary">${escapeHtml(item.name)}</span></td>
      <td><span class="c-condition-summary">来源平台：${escapeHtml(item.platform || "—")}</span></td>
      <td>${escapeHtml(item.priority)}</td>
      <td><button class="c-switch" type="button" role="switch" aria-checked="${item.status === "enabled"}" data-action="toggle-generic-status" data-id="${item.id}"></button></td>
      <td>${escapeHtml(item.executions)}</td>
      <td><span class="c-table__primary">${escapeHtml(item.creator)}</span><span class="c-table__secondary">${escapeHtml(item.createdAt)}</span></td>
      <td><span class="c-table__primary">${escapeHtml(item.updater)}</span><span class="c-table__secondary">${escapeHtml(item.updatedAt)}</span></td>
      <td class="c-table__actions"><span class="c-actions"><button class="btn btn--text btn--sm" type="button" data-action="copy-generic" data-id="${item.id}">复制</button><button class="btn btn--text btn--color-primary btn--sm" type="button" data-action="edit-generic" data-id="${item.id}">编辑</button><button class="btn btn--text btn--sm" type="button" data-action="view-generic" data-id="${item.id}">查看</button>${state.activeTab === "audit" ? `<button class="btn btn--text btn--sm" type="button" data-action="schedule-generic" data-id="${item.id}">设置执行时间</button>` : ""}<button class="btn btn--text btn--sm" type="button" data-action="log-generic" data-id="${item.id}">日志</button><button class="btn btn--text btn--color-danger btn--sm" type="button" disabled>删除</button></span></td>
    </tr>
  `).join("");
  $('[data-bind="generic-count"]').textContent = visible.length;
  $('[data-bind="generic-total"]').textContent = visible.length;
  $('[data-bind="generic-type-name"]').textContent = tabMeta[state.activeTab].name;
}

function switchTab(tab) {
  state.activeTab = tab;
  $$("[data-tab]").forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tab));
  $('[data-view="exchange"]').hidden = tab !== "exchange";
  $('[data-view="warehouse"]').hidden = tab !== "warehouse";
  $('[data-view="generic"]').hidden = ["exchange", "warehouse"].includes(tab);
  $('[data-bind="crumb-current"]').textContent = tabMeta[tab].name;
  $('[data-bind="page-desc"]').textContent = tabMeta[tab].desc;
  $('[data-bind="create-current-label"]').textContent = tabMeta[tab].create;
  if (tab === "warehouse") renderWarehouseMappings();
  if (!["exchange", "warehouse"].includes(tab)) renderGenericRules();
}

function selectMarkup(type, value, groupIndex, conditionIndex, options) {
  const current = options.find((option) => option === value) || options[0];
  return `
    <span class="c-select" data-select data-row-select="${type}" data-group-index="${groupIndex}" data-condition-index="${conditionIndex}" data-value="${escapeHtml(current)}">
      <button class="c-select__trigger" type="button"><span data-select-label>${escapeHtml(current)}</span><span>⌄</span></button>
      <span class="c-select__menu">${options.map((option) => `<button type="button" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}</span>
    </span>
  `;
}

function renderConditionGroups() {
  $('[data-bind="condition-groups"]').innerHTML = state.conditionGroups.map((group, groupIndex) => `
    ${groupIndex > 0 ? '<div class="c-condition-join"><span>OR</span></div>' : ""}
    <section class="c-condition-group">
      <div class="c-condition-group__head">
        <span class="tag tag--processing c-condition-group__title">条件组 ${groupIndex + 1}</span>
        <span class="c-condition-group__hint">组内条件需全部满足（AND）</span>
        <button class="btn btn--text btn--color-danger btn--sm c-condition-group__delete" type="button" data-action="remove-condition-group" data-group-index="${groupIndex}" ${state.conditionGroups.length === 1 ? "disabled" : ""}>删除组</button>
      </div>
      <div class="c-condition-table">
        <div class="c-condition-table__head"><span>条件字段</span><span>操作符</span><span>条件值</span><span></span></div>
        ${group.map((condition, conditionIndex) => `
          <div class="c-condition-row">
            ${selectMarkup("field", condition.field, groupIndex, conditionIndex, ["平台 SKU", "发货 SKU", "订单金额（原币）", "利润", "利润率", "订单类型", "物流渠道", "item_id"])}
            ${selectMarkup("operator", condition.operator, groupIndex, conditionIndex, ["只要存在一个", "包含任意一个", "等于", "小于等于", "大于等于"])}
            <input class="input" data-condition-value data-group-index="${groupIndex}" data-condition-index="${conditionIndex}" value="${escapeHtml(condition.value)}" placeholder="请输入条件值" />
            <button class="btn btn--text btn--color-danger c-icon-danger" type="button" data-action="remove-condition" data-group-index="${groupIndex}" data-condition-index="${conditionIndex}" aria-label="删除条件" ${group.length === 1 ? "disabled" : ""}>×</button>
          </div>
        `).join("")}
      </div>
      <button class="btn btn--text btn--color-primary c-add-row" type="button" data-action="add-condition" data-group-index="${groupIndex}">＋ 添加条件（AND）</button>
    </section>
  `).join("");
}

function renderSkuRows() {
  $('[data-bind="sku-rows"]').innerHTML = state.skuRows.map((item, index) => `
    <div class="c-action-row">
      <input class="input" data-sku-value="${index}" value="${escapeHtml(item.sku)}" placeholder="请输入换货 SKU" />
      <input class="input" data-qty-value="${index}" type="number" min="1" value="${escapeHtml(item.qty)}" aria-label="固定数量" />
      <button class="btn btn--text btn--color-danger c-icon-danger" type="button" data-action="remove-sku" data-index="${index}" aria-label="删除换货 SKU">×</button>
    </div>
  `).join("");
}

function setSegmented(name, value) {
  const root = $(`[data-segmented="${name}"]`);
  $$("button", root).forEach((button) => button.classList.toggle("is-active", button.dataset.value === value));
}

function setFormSelect(name, value) {
  const select = $(`[data-form-select="${name}"]`);
  select.dataset.value = value;
  $("[data-select-label]", select).textContent = value;
}

function syncFlowHint() {
  const hint = $('[data-bind="flow-hint"]');
  hint.innerHTML = state.mode === "manual"
    ? "<span>订单命中规则</span><b>→</b><span>停留待审核</span><b>→</b><span>用户操作“转待发货”</span><b>→</b><span>按规则替换 SKU</span>"
    : "<span>订单命中规则</span><b>→</b><span>按规则替换 SKU</span><b>→</b><span>系统自动通过审核</span><b>→</b><span>流转至待发货</span>";
  $('[data-bind="scope-help"]').textContent = state.scope === "matched"
    ? "需在订单命中条件中配置“平台 SKU”或“发货 SKU”。"
    : "命中订单后，原有发货 SKU 将全部替换为下方配置的换货 SKU。";
}

function openDrawer(rule) {
  state.editingId = rule?.id ?? null;
  state.mode = rule?.mode ?? "manual";
  state.status = rule?.status ?? "enabled";
  state.scope = rule?.scope ?? "matched";
  state.conditionGroups = rule
    ? rule.conditionGroups.map((group) => group.map((item) => ({ ...item })))
    : [[{ field: "平台 SKU", operator: "只要存在一个", value: "" }]];
  state.skuRows = rule ? rule.skuRows.map((item) => ({ ...item })) : [{ sku: "", qty: 1 }];

  $('[data-bind="drawer-title"]').textContent = rule ? "编辑换货规则" : "新增换货规则";
  const form = $('[data-bind="rule-form"]');
  form.elements.ruleId.value = rule?.id ?? "";
  form.elements.name.value = rule?.name ?? "";
  form.elements.priority.value = rule?.priority ?? 100;
  form.elements.remark.value = rule?.remark ?? "";
  setFormSelect("platform", rule?.platform ?? "Shopee");
  setFormSelect("shop", rule?.shop ?? "SPE039_PH_BT");
  setFormSelect("site", rule?.site ?? "菲律宾");
  setSegmented("status", state.status);
  setSegmented("scope", state.scope);
  $$("[data-mode]", $('[data-mode-cards]')).forEach((card) => card.classList.toggle("is-active", card.dataset.mode === state.mode));
  renderConditionGroups();
  renderSkuRows();
  syncFlowHint();
  $('[data-bind="form-error"]').hidden = true;
  $('[data-bind="drawer"]').dataset.open = "true";
  $('[data-bind="drawer"]').setAttribute("aria-hidden", "false");
  $('[data-bind="drawer-mask"]').dataset.open = "true";
}

function closeDrawer() {
  $('[data-bind="drawer"]').dataset.open = "false";
  $('[data-bind="drawer"]').setAttribute("aria-hidden", "true");
  $('[data-bind="drawer-mask"]').dataset.open = "false";
  closeSelects();
}

function openWarehouseDrawer(mapping) {
  state.editingWarehouseId = mapping?.id ?? null;
  const form = $('[data-bind="warehouse-form"]');
  form.elements.mappingId.value = mapping?.id ?? "";
  form.elements.platform.value = mapping?.platform ?? "TikTok Shop";
  form.elements.shop.value = mapping?.shop ?? "";
  form.elements.site.value = mapping?.site ?? "美国";
  form.elements.externalName.value = mapping?.externalName ?? "";
  form.elements.externalCode.value = mapping?.externalCode ?? "";
  form.elements.internalName.value = mapping?.internalName ?? "";
  form.elements.internalId.value = mapping?.internalId ?? "";
  form.elements.remark.value = mapping?.remark ?? "";
  setSegmented("warehouseStatus", mapping?.status ?? "enabled");
  $('[data-bind="warehouse-form-error"]').hidden = true;
  $('[data-bind="warehouse-drawer-title"]').textContent = mapping ? "编辑仓库映射" : "新增仓库映射";
  $('[data-bind="warehouse-drawer"]').dataset.open = "true";
  $('[data-bind="warehouse-drawer"]').setAttribute("aria-hidden", "false");
  $('[data-bind="warehouse-drawer-mask"]').dataset.open = "true";
}

function closeWarehouseDrawer() {
  $('[data-bind="warehouse-drawer"]').dataset.open = "false";
  $('[data-bind="warehouse-drawer"]').setAttribute("aria-hidden", "true");
  $('[data-bind="warehouse-drawer-mask"]').dataset.open = "false";
}

function saveWarehouseMapping() {
  const form = $('[data-bind="warehouse-form"]');
  const payload = {
    id: state.editingWarehouseId ?? Math.max(...warehouseMappings.map((item) => item.id), 0) + 1,
    platform: form.elements.platform.value.trim(),
    shop: form.elements.shop.value.trim(),
    site: form.elements.site.value.trim(),
    externalName: form.elements.externalName.value.trim(),
    externalCode: form.elements.externalCode.value.trim(),
    internalName: form.elements.internalName.value.trim(),
    internalId: form.elements.internalId.value.trim(),
    status: $('[data-segmented="warehouseStatus"] button.is-active').dataset.value,
    remark: form.elements.remark.value.trim(),
    updater: "系统管理员",
    updatedAt: "2026-07-30 16:10"
  };
  const error = $('[data-bind="warehouse-form-error"]');
  const required = [payload.platform, payload.shop, payload.site, payload.externalName, payload.externalCode, payload.internalName, payload.internalId];
  const duplicated = warehouseMappings.some((item) =>
    item.id !== payload.id &&
    item.platform === payload.platform &&
    item.shop === payload.shop &&
    item.externalCode === payload.externalCode
  );
  if (required.some((value) => !value)) {
    error.textContent = "请完整填写平台、店铺、站点、后台仓库和系统仓库信息。";
    error.hidden = false;
    return;
  }
  if (duplicated) {
    error.textContent = "该平台、店铺和后台仓库编码已存在映射，请勿重复配置。";
    error.hidden = false;
    return;
  }
  const index = warehouseMappings.findIndex((item) => item.id === payload.id);
  if (index >= 0) warehouseMappings[index] = payload;
  else warehouseMappings.unshift(payload);
  state.visibleWarehouseMappings = [...warehouseMappings];
  renderWarehouseMappings();
  closeWarehouseDrawer();
  showMessage(index >= 0 ? "仓库映射已更新" : "仓库映射已创建");
}

function genericSelectMarkup(type, value, groupIndex, conditionIndex, options, disabled = false) {
  const current = options.includes(value) ? value : options[0];
  return `
    <span class="c-select${disabled ? " is-disabled" : ""}" data-select data-generic-row-select="${type}" data-group-index="${groupIndex}" data-condition-index="${conditionIndex}" data-value="${escapeHtml(current)}">
      <button class="c-select__trigger" type="button" ${disabled ? "disabled" : ""}><span data-select-label>${escapeHtml(current)}</span><span>⌄</span></button>
      <span class="c-select__menu">${options.map((option) => `<button type="button" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}</span>
    </span>
  `;
}

function genericConditionGroupsMarkup() {
  const schema = ruleSchemas[state.activeTab];
  const required = new Set(schema.requiredConditions || []);
  const operators = ["包含", "不包含", "等于", "不等于", "大于", "小于", "只要存在一个"];
  return state.genericDraft.conditionGroups.map((group, groupIndex) => `
    ${groupIndex > 0 ? '<div class="c-condition-join"><span>OR</span></div>' : ""}
    <section class="c-condition-group">
      <div class="c-condition-group__head">
        <span class="tag tag--processing c-condition-group__title">条件组 ${groupIndex + 1}</span>
        <span class="c-condition-group__hint">组内条件需全部满足（AND）</span>
        <button class="btn btn--text btn--color-danger btn--sm c-condition-group__delete" type="button" data-action="remove-generic-condition-group" data-group-index="${groupIndex}" ${state.genericDraft.conditionGroups.length === 1 ? "disabled" : ""}>删除组</button>
      </div>
      <div class="c-condition-table">
        <div class="c-condition-table__head"><span>条件字段</span><span>操作符</span><span>条件值</span><span></span></div>
        ${group.map((condition, conditionIndex) => `
          <div class="c-condition-row">
            ${genericSelectMarkup("field", condition.field, groupIndex, conditionIndex, required.has(condition.field) ? schema.conditions : schema.conditions.filter((field) => !required.has(field)), required.has(condition.field))}
            ${genericSelectMarkup("operator", condition.operator, groupIndex, conditionIndex, operators)}
            <input class="input" data-generic-condition-value data-group-index="${groupIndex}" data-condition-index="${conditionIndex}" value="${escapeHtml(condition.value)}" placeholder="请输入或选择值" />
            ${required.has(condition.field) ? '<span class="tag tag--processing">必选</span>' : `<button class="btn btn--text btn--color-danger c-icon-danger" type="button" data-action="remove-generic-condition" data-group-index="${groupIndex}" data-condition-index="${conditionIndex}" aria-label="删除条件" ${group.length === 1 ? "disabled" : ""}>×</button>`}
          </div>
        `).join("")}
      </div>
      <button class="btn btn--text btn--color-primary c-add-row" type="button" data-action="add-generic-condition" data-group-index="${groupIndex}">＋ 添加条件（AND）</button>
    </section>
  `).join("");
}

function declarationActionMarkup() {
  return `
    <div class="c-declaration-grid">
      <label class="c-field"><span><i>*</i> 申报币种</span><select class="input"><option>USD</option></select><small class="c-field__help">OMS 默认申报币种为 USD</small></label>
      <label class="c-field"><span><i>*</i> 申报价格</span><select class="input"><option>按固定价格申报</option></select></label>
      <label class="c-field"><span>申报价格</span><input class="input" placeholder="请输入申报价格" /></label>
      <label class="c-field"><span>申报价格折扣</span><input class="input" type="number" min="0" max="1" step="0.01" value="1.00" /></label>
      <label class="c-field c-field--span-2"><span>申报包裹尺寸（CM）</span><span class="c-inline-inputs"><input class="input" type="number" placeholder="长" /><input class="input" type="number" placeholder="宽" /><input class="input" type="number" placeholder="高" /></span></label>
      <label class="c-field"><span><i>*</i> 申报重量</span><select class="input"><option>按固定重量申报</option></select></label>
      <label class="c-field"><span>固定重量（KG）</span><input class="input" type="number" step="0.001" value="0.000" /></label>
      <label class="c-field"><span>申报中文名</span><input class="input" placeholder="请输入申报中文名" /></label>
      <label class="c-field"><span>申报英文名</span><input class="input" placeholder="请输入申报英文名" /></label>
      <label class="c-field"><span>海关编码</span><input class="input" placeholder="请输入海关编码" /></label>
      <label class="c-field"><span>SKU 合并申报</span><select class="input"><option>否</option><option>是</option></select></label>
      <label class="c-field c-field--span-2"><span>申报品种数</span><span class="c-segmented"><button type="button" class="is-active">全部申报</button><button type="button">限制最多申报品种数</button></span></label>
      <label class="c-field c-field--span-2"><span>单 SKU 申报数量</span><span class="c-segmented"><button type="button" class="is-active">按实际数量申报</button><button type="button">按订单数量申报</button><button type="button">限制最多申报数量</button></span></label>
    </div>
  `;
}

function genericActionMarkup(schema) {
  if (state.activeTab === "declaration") return declarationActionMarkup();
  const actionButtons = schema.actions.map((action) => `<button type="button" data-action="select-generic-action" data-value="${escapeHtml(action)}" class="${state.genericDraft.action === action ? "is-active" : ""}">${escapeHtml(action)}</button>`).join("");
  let extra = "";
  if (state.activeTab === "audit") extra = '<label class="c-field c-field--action"><span>设置标签</span><input class="input" placeholder="请选择标签" /></label>';
  if (state.activeTab === "logistics") extra = '<div class="c-form-grid c-form-grid--two c-action-extra"><label class="c-field"><span>物流渠道</span><input class="input" placeholder="请选择" /></label><label class="c-field"><span>物流方式</span><input class="input" placeholder="智能分配物流时选择" /></label></div>';
  if (state.activeTab === "allocation") extra = '<div class="c-form-grid c-form-grid--two c-action-extra"><label class="c-field"><span><i>*</i> 优先级类型</span><select class="input"><option>仓库优先级</option></select></label><label class="c-field"><span><i>*</i> 可发货仓库</span><input class="input" placeholder="请选择（按先后点击顺序排序）" /></label></div>';
  return `<div class="c-segmented c-segmented--wrap" data-generic-action>${actionButtons}</div>${extra}`;
}

function renderGenericForm() {
  const schema = ruleSchemas[state.activeTab];
  const draft = state.genericDraft;
  const platformField = schema.noPlatform ? "" : `
    <label class="c-field"><span><i>*</i> 所属平台</span><input class="input" name="platform" value="${escapeHtml(schema.fixedPlatform || draft.platform || "AliExpress")}" ${schema.fixedPlatform ? "readonly" : ""} /></label>`;
  const warehouseField = schema.extraBase === "warehouse" ? `
    <label class="c-field"><span><i>*</i> 所属仓库</span><input class="input" name="warehouse" value="${escapeHtml(draft.warehouse || "")}" placeholder="请选择所属仓库" /></label>` : "";
  $('[data-bind="generic-form-content"]').innerHTML = `
    <section class="c-form-section">
      <div class="c-form-section__head"><span class="c-step">1</span><div><h3>基础信息</h3><p>字段名称与 OMS 创建规则窗口保持一致。</p></div></div>
      <div class="c-form-grid c-form-grid--two">
        <label class="c-field"><span><i>*</i> 规则类型</span><input class="input" value="${escapeHtml(tabMeta[state.activeTab].name)}" readonly /></label>
        <label class="c-field"><span><i>*</i> 规则名称</span><input class="input" name="name" value="${escapeHtml(draft.name)}" placeholder="请输入规则名称" /></label>
        ${platformField}${warehouseField}
        <label class="c-field"><span><i>*</i> 优先级</span><input class="input" name="priority" type="number" min="1" value="${escapeHtml(draft.priority)}" /></label>
        <label class="c-field"><span>状态</span><span class="c-segmented" data-segmented="genericStatus"><button type="button" data-value="enabled" class="${draft.status === "enabled" ? "is-active" : ""}">启用</button><button type="button" data-value="disabled" class="${draft.status === "disabled" ? "is-active" : ""}">停用</button></span></label>
      </div>
    </section>
    <section class="c-form-section">
      <div class="c-form-section__head">
        <span class="c-step">2</span>
        <div><h3>命中条件</h3><p>条件字段和操作符均使用枚举选择；组内 AND，组间 OR，任一条件组成立即可命中。</p></div>
        <button class="btn btn--outlined btn--color-primary" type="button" data-action="add-generic-condition-group">＋ 添加条件组（OR）</button>
      </div>
      <div class="c-condition-groups" data-bind="generic-condition-groups">${genericConditionGroupsMarkup()}</div>
    </section>
    <section class="c-form-section">
      <div class="c-form-section__head"><span class="c-step">3</span><div><h3>${state.activeTab === "declaration" ? "申报信息设置" : "设定动作"}</h3><p>${escapeHtml(schema.subtitle)}</p></div></div>
      ${genericActionMarkup(schema)}
    </section>
  `;
}

function syncGenericDraftConditions() {
  if (!state.genericDraft) return;
  $$("[data-generic-condition-value]").forEach((input) => {
    const groupIndex = Number(input.dataset.groupIndex);
    const conditionIndex = Number(input.dataset.conditionIndex);
    state.genericDraft.conditionGroups[groupIndex][conditionIndex].value = input.value.trim();
  });
}

function syncGenericDraftForm() {
  if (!state.genericDraft) return;
  const form = $('[data-bind="generic-form"]');
  state.genericDraft.name = form.elements.name?.value.trim() || state.genericDraft.name;
  state.genericDraft.platform = form.elements.platform?.value.trim() || state.genericDraft.platform;
  state.genericDraft.warehouse = form.elements.warehouse?.value.trim() || state.genericDraft.warehouse;
  state.genericDraft.priority = Number(form.elements.priority?.value) || state.genericDraft.priority;
  state.genericDraft.status = $('[data-segmented="genericStatus"] button.is-active')?.dataset.value || state.genericDraft.status;
  syncGenericDraftConditions();
}

function openGenericDrawer(item) {
  const schema = ruleSchemas[state.activeTab];
  state.editingGenericId = item?.id ?? null;
  state.genericDraft = {
    name: item?.name ?? "",
    platform: item?.platform ?? schema.fixedPlatform ?? "AliExpress",
    warehouse: item?.warehouse ?? "",
    priority: item?.priority ?? 99999,
    status: item?.status ?? "enabled",
    conditionGroups: item?.conditionGroups
      ? item.conditionGroups.map((group) => group.map((condition) => ({ ...condition })))
      : [[...(schema.requiredConditions || []).map((field) => ({ field, operator: "包含", value: "" })), ...(!schema.requiredConditions?.length ? [{ field: schema.conditions[0], operator: "包含", value: "" }] : [])]],
    action: item?.action ?? schema.actions[0]
  };
  $('[data-bind="generic-form"]').elements.genericId.value = item?.id ?? "";
  $('[data-bind="generic-form-error"]').hidden = true;
  $('[data-bind="generic-drawer-title"]').textContent = state.editingGenericId !== null ? `编辑${tabMeta[state.activeTab].name}` : tabMeta[state.activeTab].create;
  $('[data-bind="generic-drawer-subtitle"]').textContent = schema.subtitle;
  renderGenericForm();
  $('[data-bind="generic-drawer"]').dataset.open = "true";
  $('[data-bind="generic-drawer"]').setAttribute("aria-hidden", "false");
  $('[data-bind="generic-drawer-mask"]').dataset.open = "true";
}

function closeGenericDrawer() {
  $('[data-bind="generic-drawer"]').dataset.open = "false";
  $('[data-bind="generic-drawer"]').setAttribute("aria-hidden", "true");
  $('[data-bind="generic-drawer-mask"]').dataset.open = "false";
  state.genericDraft = null;
}

function saveGenericRule() {
  const form = $('[data-bind="generic-form"]');
  const items = genericRules[state.activeTab];
  const schema = ruleSchemas[state.activeTab];
  const name = form.elements.name.value.trim();
  const platform = schema.fixedPlatform ? "AliExpress" : (form.elements.platform?.value.trim() || "");
  const priority = Number(form.elements.priority.value);
  const error = $('[data-bind="generic-form-error"]');
  if (!name || (!schema.noPlatform && !platform) || !priority) {
    error.textContent = "请完整填写规则名称、所属平台和优先级。";
    error.hidden = false;
    return;
  }
  syncGenericDraftConditions();
  const allConditions = state.genericDraft.conditionGroups.flat();
  if (!state.genericDraft.conditionGroups.length || state.genericDraft.conditionGroups.some((group) => !group.length) || allConditions.some((condition) => !condition.value)) {
    error.textContent = "请完整填写每个条件组中的命中条件。";
    error.hidden = false;
    return;
  }
  const payload = {
    id: state.editingGenericId ?? Math.max(...Object.values(genericRules).flat().map((item) => item.id), 0) + 1,
    name,
    platform,
    warehouse: form.elements.warehouse?.value.trim() || "",
    priority,
    status: $('[data-segmented="genericStatus"] button.is-active').dataset.value,
    executions: state.editingGenericId ? items.find((item) => item.id === state.editingGenericId)?.executions ?? 0 : 0,
    creator: state.editingGenericId ? items.find((item) => item.id === state.editingGenericId)?.creator : "系统管理员",
    createdAt: state.editingGenericId ? items.find((item) => item.id === state.editingGenericId)?.createdAt : "2026-07-30 16:10:00",
    updater: "系统管理员",
    updatedAt: "2026-07-30 16:10:00",
    conditionGroups: state.genericDraft.conditionGroups.map((group) => group.map((condition) => ({ ...condition }))),
    action: state.genericDraft.action
  };
  const index = items.findIndex((item) => item.id === payload.id);
  if (index >= 0) items[index] = payload;
  else items.unshift(payload);
  renderGenericRules();
  closeGenericDrawer();
  showMessage(index >= 0 ? "规则已更新" : "规则已创建");
}

function updateDraftInputs() {
  $$("[data-condition-value]").forEach((input) => {
    state.conditionGroups[Number(input.dataset.groupIndex)][Number(input.dataset.conditionIndex)].value = input.value.trim();
  });
  $$("[data-sku-value]").forEach((input) => { state.skuRows[Number(input.dataset.skuValue)].sku = input.value.trim(); });
  $$("[data-qty-value]").forEach((input) => { state.skuRows[Number(input.dataset.qtyValue)].qty = Number(input.value) || 1; });
}

function saveRule() {
  updateDraftInputs();
  const form = $('[data-bind="rule-form"]');
  const error = $('[data-bind="form-error"]');
  const name = form.elements.name.value.trim();
  const priority = Number(form.elements.priority.value);
  const allConditions = state.conditionGroups.flat();
  const hasSkuCondition = allConditions.some((item) => ["平台 SKU", "发货 SKU"].includes(item.field) && item.value);
  let message = "";

  if (!name) message = "请填写规则名称。";
  else if (!priority || priority < 1) message = "优先级必须为大于 0 的整数。";
  else if (!state.conditionGroups.length || state.conditionGroups.some((group) => !group.length) || allConditions.some((item) => !item.value)) message = "请完整填写每个条件组中的订单命中条件。";
  else if (state.scope === "matched" && !hasSkuCondition) message = "选择“只替换命中的 SKU”时，必须配置平台 SKU 或发货 SKU 条件。";
  else if (!state.skuRows.length || state.skuRows.some((item) => !item.sku || item.qty < 1)) message = "请完整填写至少一条换货 SKU 和固定数量。";

  if (message) {
    error.textContent = message;
    error.hidden = false;
    error.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const existingRule = rules.find((item) => item.id === state.editingId);
  const payload = {
    id: state.editingId ?? Math.max(...rules.map((item) => item.id), 0) + 1,
    name,
    mode: state.mode,
    platform: $('[data-form-select="platform"]').dataset.value,
    shop: $('[data-form-select="shop"]').dataset.value,
    site: $('[data-form-select="site"]').dataset.value,
    conditionGroups: state.conditionGroups.map((group) => group.map((item) => ({ ...item }))),
    scope: state.scope,
    skuRows: state.skuRows.map((item) => ({ ...item })),
    priority,
    status: state.status,
    remark: form.elements.remark.value.trim(),
    executions: existingRule?.executions ?? 0,
    creator: existingRule?.creator ?? (state.editingId ? "" : "系统管理员"),
    createdAt: existingRule?.createdAt ?? (state.editingId ? "" : "2026-07-30 15:30"),
    updater: "系统管理员",
    updatedAt: "2026-07-30 15:30"
  };

  const index = rules.findIndex((item) => item.id === payload.id);
  if (index >= 0) rules[index] = payload;
  else rules.unshift(payload);
  state.visibleRules = [...rules];
  renderRules();
  closeDrawer();
  showMessage(index >= 0 ? "规则已更新" : "规则已创建");
}

function closeSelects(except) {
  $$("[data-select][data-open='true']").forEach((select) => {
    if (select !== except) select.dataset.open = "false";
  });
}

function showMessage(text) {
  const message = $('[data-bind="message"]');
  message.textContent = text;
  message.dataset.open = "true";
  window.clearTimeout(showMessage.timer);
  showMessage.timer = window.setTimeout(() => { message.dataset.open = "false"; }, 1800);
}

function applyFilters() {
  const keyword = $('[data-filter="keyword"]').value.trim().toLowerCase();
  const mode = $('[data-filter="mode"]').dataset.value;
  const platform = $('[data-filter="platform"]').dataset.value;
  const status = $('[data-filter="status"]').dataset.value;
  state.visibleRules = rules.filter((rule) =>
    (!keyword || rule.name.toLowerCase().includes(keyword) || rule.shop.toLowerCase().includes(keyword)) &&
    (!mode || rule.mode === mode) &&
    (!platform || rule.platform === platform) &&
    (!status || rule.status === status)
  );
  renderRules();
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  const select = event.target.closest("[data-select]");
  const option = event.target.closest("[data-select] .c-select__menu button");

  if (option) {
    const owner = option.closest("[data-select]");
    owner.dataset.value = option.dataset.value;
    $("[data-select-label]", owner).textContent = option.textContent;
    owner.dataset.open = "false";
    if (owner.dataset.rowSelect) {
      updateDraftInputs();
      state.conditionGroups[Number(owner.dataset.groupIndex)][Number(owner.dataset.conditionIndex)][owner.dataset.rowSelect] = option.dataset.value;
    }
    if (owner.dataset.genericRowSelect) {
      syncGenericDraftConditions();
      state.genericDraft.conditionGroups[Number(owner.dataset.groupIndex)][Number(owner.dataset.conditionIndex)][owner.dataset.genericRowSelect] = option.dataset.value;
    }
    event.stopPropagation();
    return;
  }

  if (select && event.target.closest(".c-select__trigger")) {
    const willOpen = select.dataset.open !== "true";
    closeSelects(select);
    select.dataset.open = String(willOpen);
    event.stopPropagation();
    return;
  }
  closeSelects();

  const modeCard = event.target.closest("[data-mode]");
  if (modeCard) {
    state.mode = modeCard.dataset.mode;
    $$("[data-mode]", $('[data-mode-cards]')).forEach((card) => card.classList.toggle("is-active", card === modeCard));
    syncFlowHint();
    return;
  }

  const segmentedButton = event.target.closest("[data-segmented] button");
  if (segmentedButton) {
    const root = segmentedButton.closest("[data-segmented]");
    $$("button", root).forEach((button) => button.classList.toggle("is-active", button === segmentedButton));
    if (root.dataset.segmented === "scope") state.scope = segmentedButton.dataset.value;
    if (root.dataset.segmented === "status") state.status = segmentedButton.dataset.value;
    syncFlowHint();
    return;
  }

  if (!action) return;
  const id = Number(action.dataset.id);
  if (action.dataset.action === "switch-tab") switchTab(action.dataset.tab);
  if (action.dataset.action === "create-current") {
    if (state.activeTab === "exchange") openDrawer();
    else if (state.activeTab === "warehouse") openWarehouseDrawer();
    else openGenericDrawer();
  }
  if (action.dataset.action === "collapse") {
    const shell = $(".c-shell");
    shell.dataset.collapsed = String(shell.dataset.collapsed !== "true");
    $$(".c-shell__brand-text, .c-shell__menu-label, .c-shell__menu-group").forEach((item) => { item.hidden = shell.dataset.collapsed === "true"; });
  }
  if (action.dataset.action === "create-rule") openDrawer();
  if (action.dataset.action === "edit-rule") openDrawer(rules.find((rule) => rule.id === id));
  if (action.dataset.action === "close-drawer") closeDrawer();
  if (action.dataset.action === "edit-warehouse") openWarehouseDrawer(warehouseMappings.find((mapping) => mapping.id === id));
  if (action.dataset.action === "close-warehouse-drawer") closeWarehouseDrawer();
  if (action.dataset.action === "save-warehouse") saveWarehouseMapping();
  if (action.dataset.action === "edit-generic") openGenericDrawer((genericRules[state.activeTab] || []).find((item) => item.id === id));
  if (action.dataset.action === "copy-generic") {
    const source = (genericRules[state.activeTab] || []).find((item) => item.id === id);
    openGenericDrawer({ ...source, id: null, name: `${source.name}-副本` });
  }
  if (action.dataset.action === "close-generic-drawer") closeGenericDrawer();
  if (action.dataset.action === "save-generic") saveGenericRule();
  if (action.dataset.action === "add-generic-condition") {
    syncGenericDraftForm();
    const groupIndex = Number(action.dataset.groupIndex);
    const schema = ruleSchemas[state.activeTab];
    const required = new Set(schema.requiredConditions || []);
    const defaultField = schema.conditions.find((field) => !required.has(field)) || schema.conditions[0];
    state.genericDraft.conditionGroups[groupIndex].push({ field: defaultField, operator: "包含", value: "" });
    renderGenericForm();
  }
  if (action.dataset.action === "remove-generic-condition") {
    syncGenericDraftForm();
    state.genericDraft.conditionGroups[Number(action.dataset.groupIndex)].splice(Number(action.dataset.conditionIndex), 1);
    renderGenericForm();
  }
  if (action.dataset.action === "add-generic-condition-group") {
    syncGenericDraftForm();
    const required = ruleSchemas[state.activeTab].requiredConditions || [];
    state.genericDraft.conditionGroups.push(
      required.length
        ? required.map((field) => ({ field, operator: "包含", value: "" }))
        : [{ field: ruleSchemas[state.activeTab].conditions[0], operator: "包含", value: "" }]
    );
    renderGenericForm();
  }
  if (action.dataset.action === "remove-generic-condition-group") {
    syncGenericDraftForm();
    state.genericDraft.conditionGroups.splice(Number(action.dataset.groupIndex), 1);
    renderGenericForm();
  }
  if (action.dataset.action === "select-generic-action") {
    state.genericDraft.action = action.dataset.value;
    $$("[data-generic-action] button").forEach((button) => button.classList.toggle("is-active", button === action));
  }
  if (action.dataset.action === "view-generic") showMessage("已读取规则详情，点击“编辑”可查看完整真实字段");
  if (action.dataset.action === "schedule-generic") showMessage("审单规则执行时间入口已保留");
  if (action.dataset.action === "log-generic") showMessage("日志入口已保留（原型不连接真实日志服务）");
  if (action.dataset.action === "add-condition") {
    updateDraftInputs();
    state.conditionGroups[Number(action.dataset.groupIndex)].push({ field: "平台 SKU", operator: "只要存在一个", value: "" });
    renderConditionGroups();
  }
  if (action.dataset.action === "remove-condition") {
    updateDraftInputs();
    state.conditionGroups[Number(action.dataset.groupIndex)].splice(Number(action.dataset.conditionIndex), 1);
    renderConditionGroups();
  }
  if (action.dataset.action === "add-condition-group") {
    updateDraftInputs();
    state.conditionGroups.push([{ field: "平台 SKU", operator: "只要存在一个", value: "" }]);
    renderConditionGroups();
  }
  if (action.dataset.action === "remove-condition-group") {
    updateDraftInputs();
    state.conditionGroups.splice(Number(action.dataset.groupIndex), 1);
    renderConditionGroups();
  }
  if (action.dataset.action === "add-sku") {
    updateDraftInputs();
    state.skuRows.push({ sku: "", qty: 1 });
    renderSkuRows();
  }
  if (action.dataset.action === "remove-sku") {
    updateDraftInputs();
    state.skuRows.splice(Number(action.dataset.index), 1);
    renderSkuRows();
  }
  if (action.dataset.action === "save-rule") saveRule();
  if (action.dataset.action === "toggle-status") {
    const rule = rules.find((item) => item.id === id);
    rule.status = rule.status === "enabled" ? "disabled" : "enabled";
    applyFilters();
    showMessage(rule.status === "enabled" ? "规则已启用" : "规则已停用");
  }
  if (action.dataset.action === "toggle-warehouse-status") {
    const mapping = warehouseMappings.find((item) => item.id === id);
    mapping.status = mapping.status === "enabled" ? "disabled" : "enabled";
    renderWarehouseMappings();
    showMessage(mapping.status === "enabled" ? "仓库映射已启用" : "仓库映射已停用");
  }
  if (action.dataset.action === "toggle-generic-status") {
    const item = (genericRules[state.activeTab] || []).find((rule) => rule.id === id);
    item.status = item.status === "enabled" ? "disabled" : "enabled";
    renderGenericRules();
    showMessage(item.status === "enabled" ? "规则已启用" : "规则已停用");
  }
  if (action.dataset.action === "delete-rule") {
    state.pendingDeleteId = id;
    $('[data-bind="modal-mask"]').dataset.open = "true";
    $('[data-bind="confirm-modal"]').dataset.open = "true";
  }
  if (action.dataset.action === "cancel-delete") {
    state.pendingDeleteId = null;
    $('[data-bind="modal-mask"]').dataset.open = "false";
    $('[data-bind="confirm-modal"]').dataset.open = "false";
  }
  if (action.dataset.action === "confirm-delete") {
    const index = rules.findIndex((rule) => rule.id === state.pendingDeleteId);
    if (index >= 0) rules.splice(index, 1);
    state.pendingDeleteId = null;
    $('[data-bind="modal-mask"]').dataset.open = "false";
    $('[data-bind="confirm-modal"]').dataset.open = "false";
    applyFilters();
    showMessage("规则已删除");
  }
  if (action.dataset.action === "search") applyFilters();
  if (action.dataset.action === "reset-filter") {
    $('[data-filter="keyword"]').value = "";
    $$("[data-filter]").filter((item) => item.matches("[data-select]")).forEach((item) => {
      item.dataset.value = "";
      $("[data-select-label]", item).textContent = "全部";
    });
    applyFilters();
  }
  if (action.dataset.action === "refresh") {
    applyFilters();
    showMessage("列表已刷新");
  }
  if (action.dataset.action === "search-warehouse" || action.dataset.action === "refresh-warehouse") {
    const platform = $('[data-warehouse-filter="platform"]').dataset.value;
    const shop = $('[data-warehouse-filter="shop"]').dataset.value;
    const externalName = $('[data-warehouse-filter="externalName"]').value.trim().toLowerCase();
    const internalName = $('[data-warehouse-filter="internalName"]').value.trim().toLowerCase();
    state.visibleWarehouseMappings = warehouseMappings.filter((mapping) =>
      (!platform || mapping.platform === platform) &&
      (!shop || mapping.shop === shop) &&
      (!externalName || mapping.externalName.toLowerCase().includes(externalName)) &&
      (!internalName || mapping.internalName.toLowerCase().includes(internalName))
    );
    renderWarehouseMappings();
    if (action.dataset.action === "refresh-warehouse") showMessage("仓库映射列表已刷新");
  }
  if (action.dataset.action === "reset-warehouse-filter") {
    $$('[data-warehouse-filter]').forEach((field) => {
      if (field.matches('[data-select]')) {
        field.dataset.value = "";
        $('[data-select-label]', field).textContent = "全部";
      } else {
        field.value = "";
      }
    });
    state.visibleWarehouseMappings = [...warehouseMappings];
    renderWarehouseMappings();
  }
  if (action.dataset.action === "search-generic") renderGenericRules();
  if (action.dataset.action === "refresh-generic") {
    renderGenericRules();
    showMessage("规则列表已刷新");
  }
  if (action.dataset.action === "reset-generic-filter") {
    $$("[data-generic-filter]").forEach((field) => {
      if (field.matches("[data-select]")) {
        field.dataset.value = "";
        $("[data-select-label]", field).textContent = "全部状态";
      } else {
        field.value = "";
      }
    });
    renderGenericRules();
  }
});

renderRules();
renderWarehouseMappings();
