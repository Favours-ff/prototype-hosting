const rawRows = [
  {
    orderNo: "AMZ-20260501-0001",
    platform: "Amazon",
    shop: "US-旗舰店",
    platformSku: "AMZ-MUG-BLK-01",
    shippingSku: "DG-MUG-350-BLK",
    shipTime: "2026-05-01 10:23",
    settleTime: "2026-05-08 18:35",
    settled: true,
    estimatedRevenue: 128.6,
    refundAmount: 0,
    promotionFee: 3.2,
    shopMiscFee: 1.1,
    platformCommission: 11.5,
    adFee: 4,
    fineAmount: 0,
    productCost: 42,
    warehouseHandlingFee: 5.2,
    returnSupplementCost: 0,
    logisticsFreight: 28.8,
    vat: 6.3,
    platformPaymentFee: 1.6,
    assetImpairmentLoss: 0,
    settledRevenue: 126.9,
    settledRefundAmount: 0,
    settledPromotionFee: 3.5,
    settledShopMiscFee: 1.1,
    settledPlatformCommission: 11.8,
    settledAdFee: 4.2,
    settledFineAmount: 0,
    settledProductCost: 42,
    settledWarehouseHandlingFee: 5.2,
    settledReturnSupplementCost: 0,
    settledLogisticsFreight: 28.9,
    settledVat: 6.1,
    settledPlatformPaymentFee: 1.7,
    settledAssetImpairmentLoss: 0
  },
  {
    orderNo: "AMZ-20260502-0002",
    platform: "Amazon",
    shop: "US-旗舰店",
    platformSku: "AMZ-CABLE-C-02",
    shippingSku: "DG-CBL-TC-120",
    shipTime: "2026-05-02 09:12",
    settleTime: "",
    settled: false,
    estimatedRevenue: 95,
    refundAmount: 0,
    promotionFee: 2.7,
    shopMiscFee: 0.8,
    platformCommission: 8.4,
    adFee: 2.2,
    fineAmount: 0,
    productCost: 31.2,
    warehouseHandlingFee: 4.1,
    returnSupplementCost: 0,
    logisticsFreight: 22.5,
    vat: 4.3,
    platformPaymentFee: 1.2,
    assetImpairmentLoss: 0,
    settledRevenue: null,
    settledRefundAmount: null,
    settledPromotionFee: null,
    settledShopMiscFee: null,
    settledPlatformCommission: null,
    settledAdFee: null,
    settledFineAmount: null,
    settledProductCost: null,
    settledWarehouseHandlingFee: null,
    settledReturnSupplementCost: null,
    settledLogisticsFreight: null,
    settledVat: null,
    settledPlatformPaymentFee: null,
    settledAssetImpairmentLoss: null
  },
  {
    orderNo: "SHP-20260503-0088",
    platform: "Shopee",
    shop: "SG-跨境店",
    platformSku: "SHP-LAMP-WHT-03",
    shippingSku: "DG-LMP-LED-WH",
    shipTime: "2026-05-03 15:40",
    settleTime: "2026-05-10 09:20",
    settled: true,
    estimatedRevenue: 70.2,
    refundAmount: 0,
    promotionFee: 1.6,
    shopMiscFee: 0.6,
    platformCommission: 5.8,
    adFee: 1.9,
    fineAmount: 0,
    productCost: 22.6,
    warehouseHandlingFee: 3.2,
    returnSupplementCost: 0,
    logisticsFreight: 18.4,
    vat: 2.1,
    platformPaymentFee: 0.8,
    assetImpairmentLoss: 0,
    settledRevenue: 69.1,
    settledRefundAmount: 0,
    settledPromotionFee: 1.9,
    settledShopMiscFee: 0.6,
    settledPlatformCommission: 5.9,
    settledAdFee: 2.1,
    settledFineAmount: 0,
    settledProductCost: 22.6,
    settledWarehouseHandlingFee: 3.2,
    settledReturnSupplementCost: 0,
    settledLogisticsFreight: null,
    settledVat: 2.2,
    settledPlatformPaymentFee: 0.8,
    settledAssetImpairmentLoss: 0
  },
  {
    orderNo: "TK-20260503-0166",
    platform: "TikTok",
    shop: "UK-直播店",
    platformSku: "TK-BAG-GRN-07",
    shippingSku: "DG-BAG-TRV-GN",
    shipTime: "2026-05-03 20:18",
    settleTime: "",
    settled: false,
    estimatedRevenue: 210,
    refundAmount: 0,
    promotionFee: 9.4,
    shopMiscFee: 1.6,
    platformCommission: 19.2,
    adFee: 6.3,
    fineAmount: 0,
    productCost: null,
    warehouseHandlingFee: 7.8,
    returnSupplementCost: 0,
    logisticsFreight: 35.5,
    vat: 12.4,
    platformPaymentFee: 2.2,
    assetImpairmentLoss: 0,
    settledRevenue: null,
    settledRefundAmount: null,
    settledPromotionFee: null,
    settledShopMiscFee: null,
    settledPlatformCommission: null,
    settledAdFee: null,
    settledFineAmount: null,
    settledProductCost: null,
    settledWarehouseHandlingFee: null,
    settledReturnSupplementCost: null,
    settledLogisticsFreight: null,
    settledVat: null,
    settledPlatformPaymentFee: null,
    settledAssetImpairmentLoss: null
  },
  {
    orderNo: "SHP-20260504-0110",
    platform: "Shopee",
    shop: "PH-本地店",
    platformSku: "SHP-ADJ-001",
    shippingSku: "FIN-ADJ-NOCOST",
    shipTime: "2026-05-04 11:05",
    settleTime: "2026-05-11 11:30",
    settled: true,
    estimatedRevenue: 45.5,
    refundAmount: 0,
    promotionFee: 0.5,
    shopMiscFee: 0.4,
    platformCommission: 2.2,
    adFee: 0,
    fineAmount: 0,
    productCost: 0,
    warehouseHandlingFee: 0,
    returnSupplementCost: 0,
    logisticsFreight: 0,
    vat: 1.1,
    platformPaymentFee: 0.4,
    assetImpairmentLoss: 0,
    settledRevenue: 44,
    settledRefundAmount: 0,
    settledPromotionFee: 0.5,
    settledShopMiscFee: 0.5,
    settledPlatformCommission: 2.3,
    settledAdFee: 0,
    settledFineAmount: 0,
    settledProductCost: 0,
    settledWarehouseHandlingFee: 0,
    settledReturnSupplementCost: 0,
    settledLogisticsFreight: 0,
    settledVat: 1.2,
    settledPlatformPaymentFee: 0.4,
    settledAssetImpairmentLoss: 0
  },
  {
    orderNo: "EBY-20260506-0218",
    platform: "eBay",
    shop: "DE-精品店",
    platformSku: "EBY-CASE-BLU-09",
    shippingSku: "DG-PHN-CASE-BL",
    shipTime: "2026-05-06 14:26",
    settleTime: "2026-05-14 16:18",
    settled: true,
    estimatedRevenue: 156.8,
    refundAmount: 12,
    promotionFee: 4.2,
    shopMiscFee: 1.4,
    platformCommission: 14.7,
    adFee: 3.6,
    fineAmount: 0,
    productCost: 51.4,
    warehouseHandlingFee: 4.8,
    returnSupplementCost: 6.5,
    logisticsFreight: 29.7,
    vat: 8.5,
    platformPaymentFee: 1.9,
    assetImpairmentLoss: 0,
    settledRevenue: 152.4,
    settledRefundAmount: 14.2,
    settledPromotionFee: 4.3,
    settledShopMiscFee: 1.4,
    settledPlatformCommission: 15.1,
    settledAdFee: 3.8,
    settledFineAmount: 1.5,
    settledProductCost: 51.4,
    settledWarehouseHandlingFee: 4.9,
    settledReturnSupplementCost: 7.8,
    settledLogisticsFreight: 30.2,
    settledVat: 8.8,
    settledPlatformPaymentFee: 2,
    settledAssetImpairmentLoss: 0
  }
];

const estimateFields = [
  ["预估收入", "estimatedRevenue"],
  ["退款金额", "refundAmount"],
  ["推广费用", "promotionFee"],
  ["店铺杂费", "shopMiscFee"],
  ["平台佣金", "platformCommission"],
  ["广告费", "adFee"],
  ["罚款金额", "fineAmount"],
  ["商品成本", "productCost"],
  ["东莞仓/中转仓处理费", "warehouseHandlingFee"],
  ["退件补成本", "returnSupplementCost"],
  ["物流运费", "logisticsFreight"],
  ["VAT", "vat"],
  ["平台回款费用", "platformPaymentFee"],
  ["资产减值损失", "assetImpairmentLoss"],
  ["预估利润", "estimatedProfit"]
];

const settlementFields = [
  ["结算收入", "settledRevenue"],
  ["结算退款金额", "settledRefundAmount"],
  ["结算推广费用", "settledPromotionFee"],
  ["结算店铺杂费", "settledShopMiscFee"],
  ["结算平台佣金", "settledPlatformCommission"],
  ["结算广告费", "settledAdFee"],
  ["结算罚款金额", "settledFineAmount"],
  ["结算商品成本", "settledProductCost"],
  ["结算东莞仓/中转仓处理费", "settledWarehouseHandlingFee"],
  ["结算退件补成本", "settledReturnSupplementCost"],
  ["结算物流运费", "settledLogisticsFreight"],
  ["结算VAT", "settledVat"],
  ["结算平台回款费用", "settledPlatformPaymentFee"],
  ["结算资产减值损失", "settledAssetImpairmentLoss"],
  ["结算利润", "settledProfit"]
];

const diffFields = [
  { label: "收入差异", estimateKey: "estimatedRevenue", settlementKey: "settledRevenue", kind: "income" },
  { label: "退款差异", estimateKey: "refundAmount", settlementKey: "settledRefundAmount", kind: "fee" },
  { label: "推广费用差异", estimateKey: "promotionFee", settlementKey: "settledPromotionFee", kind: "fee" },
  { label: "店铺杂费差异", estimateKey: "shopMiscFee", settlementKey: "settledShopMiscFee", kind: "fee" },
  { label: "平台佣金差异", estimateKey: "platformCommission", settlementKey: "settledPlatformCommission", kind: "fee" },
  { label: "广告费差异", estimateKey: "adFee", settlementKey: "settledAdFee", kind: "fee" },
  { label: "罚款金额差异", estimateKey: "fineAmount", settlementKey: "settledFineAmount", kind: "fee" },
  { label: "商品成本差异", estimateKey: "productCost", settlementKey: "settledProductCost", kind: "fee" },
  { label: "东莞仓/中转仓处理费差异", estimateKey: "warehouseHandlingFee", settlementKey: "settledWarehouseHandlingFee", kind: "fee" },
  { label: "退件补成本差异", estimateKey: "returnSupplementCost", settlementKey: "settledReturnSupplementCost", kind: "addback" },
  { label: "物流运费差异", estimateKey: "logisticsFreight", settlementKey: "settledLogisticsFreight", kind: "fee" },
  { label: "VAT差异", estimateKey: "vat", settlementKey: "settledVat", kind: "fee" },
  { label: "平台回款费用差异", estimateKey: "platformPaymentFee", settlementKey: "settledPlatformPaymentFee", kind: "fee" },
  { label: "资产减值损失差异", estimateKey: "assetImpairmentLoss", settlementKey: "settledAssetImpairmentLoss", kind: "fee" },
  { label: "利润差异", estimateKey: "estimatedProfit", settlementKey: "settledProfit", kind: "profit" }
];

const estimateFormula = {
  income: "estimatedRevenue",
  addBack: "returnSupplementCost",
  deductions: [
    "refundAmount",
    "promotionFee",
    "shopMiscFee",
    "platformCommission",
    "adFee",
    "fineAmount",
    "productCost",
    "warehouseHandlingFee",
    "logisticsFreight",
    "vat",
    "platformPaymentFee",
    "assetImpairmentLoss"
  ]
};

const settlementFormula = {
  income: "settledRevenue",
  addBack: "settledReturnSupplementCost",
  deductions: [
    "settledRefundAmount",
    "settledPromotionFee",
    "settledShopMiscFee",
    "settledPlatformCommission",
    "settledAdFee",
    "settledFineAmount",
    "settledProductCost",
    "settledWarehouseHandlingFee",
    "settledLogisticsFreight",
    "settledVat",
    "settledPlatformPaymentFee",
    "settledAssetImpairmentLoss"
  ]
};

const rows = rawRows.map((row) => ({
  ...row,
  estimatedProfit: calcProfit(row, estimateFormula),
  settledProfit: calcProfit(row, settlementFormula)
}));

const pageConfigs = {
  settlement: {
    hash: "#settlement-match",
    navLabel: "订单结算匹配",
    breadcrumb: "财务对账 / 订单结算匹配 / 已发货订单结算匹配",
    eyebrow: "订单结算 / 结算匹配",
    title: "已发货订单结算匹配",
    desc: "使用 ERP 已发货订单与后台结算账单进行匹配，识别已结算与未结算订单。",
    hint: "按平台单号匹配账单",
    tableTitle: "订单结算匹配",
    tableSubTitle: "展示订单是否匹配到账单，以及预估收入、结算收入、预估利润和结算利润。",
    exportCurrentName: "订单结算匹配_当前列表",
    exportFullName: "订单结算匹配_完整明细",
    columns: [
      { label: "平台单号", render: (row) => escapeHtml(row.orderNo) },
      { label: "平台", render: (row) => escapeHtml(row.platform) },
      { label: "店铺", render: (row) => escapeHtml(row.shop) },
      { label: "发货时间", render: (row) => escapeHtml(row.shipTime) },
      { label: "预估收入", className: "num", render: (row) => moneyCell(row.estimatedRevenue) },
      { label: "结算收入", className: "num", render: (row) => moneyCell(row.settledRevenue) },
      { label: "预估利润", className: "num", render: (row) => moneyCell(row.estimatedProfit) },
      { label: "结算利润", className: "num", render: (row) => moneyCell(row.settledProfit) },
      { label: "结算时间", render: (row) => escapeHtml(row.settleTime || "-") },
      { label: "是否结算", render: (row) => statusTag(row) }
    ]
  },
  revenue: {
    hash: "#shipping-revenue",
    navLabel: "发货确认收入",
    breadcrumb: "财务对账 / 发货确认收入 / 已发货订单结算对账",
    eyebrow: "订单结算 / 对账明细",
    title: "已发货订单结算对账",
    desc: "用 ERP 已发货订单匹配平台后台账单，核对预估口径、结算口径和每项差异。",
    hint: "差异 = 结算值 - 预估值",
    tableTitle: "发货确认收入明细",
    tableSubTitle: "主表展示关键字段，完整费用与差异在明细抽屉中查看。",
    exportCurrentName: "发货确认收入_当前列表",
    exportFullName: "发货确认收入_完整明细",
    columns: [
      { label: "平台单号", render: (row) => escapeHtml(row.orderNo) },
      { label: "平台", render: (row) => escapeHtml(row.platform) },
      { label: "店铺", render: (row) => escapeHtml(row.shop) },
      { label: "平台 SKU", render: (row) => escapeHtml(row.platformSku) },
      { label: "发货 SKU", render: (row) => escapeHtml(row.shippingSku) },
      { label: "发货时间", render: (row) => escapeHtml(row.shipTime) },
      { label: "结算时间", render: (row) => escapeHtml(row.settleTime || "-") },
      { label: "是否结算", render: (row) => statusTag(row) },
      { label: "预估收入", className: "num", render: (row) => moneyCell(row.estimatedRevenue) },
      { label: "结算收入", className: "num", render: (row) => moneyCell(row.settledRevenue) },
      { label: "收入差异", className: "num", render: (row) => formatDiff(diffFields[0], diffValue(row, diffFields[0])) },
      { label: "预估利润", className: "num", render: (row) => moneyCell(row.estimatedProfit) },
      { label: "结算利润", className: "num", render: (row) => moneyCell(row.settledProfit) },
      { label: "利润差异", className: "num", render: (row) => formatDiff(diffFields[14], diffValue(row, diffFields[14])) },
      {
        label: "操作",
        className: "actions-col",
        render: (row) => `<button class="link-btn c-table__action" type="button" data-order="${escapeHtml(row.orderNo)}">查看差异</button>`
      }
    ]
  }
};

const state = {
  page: "revenue",
  platform: "全部",
  shop: "全部",
  settledStatus: "all",
  timeBasis: "ship"
};

const breadcrumb = document.getElementById("breadcrumb");
const pageEyebrow = document.getElementById("pageEyebrow");
const pageTitle = document.getElementById("pageTitle");
const pageDesc = document.getElementById("pageDesc");
const pageHint = document.getElementById("pageHint");
const tableTitle = document.getElementById("tableTitle");
const tableSubTitle = document.getElementById("tableSubTitle");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const emptyState = document.getElementById("emptyState");
const summary = document.getElementById("summary");
const basisSwitch = document.getElementById("basisSwitch");
const basisNote = document.getElementById("basisNote");
const basisSummary = document.getElementById("basisSummary");
const activeFilterText = document.getElementById("activeFilterText");
const settledSwitch = document.getElementById("settledSwitch");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");
const exportCurrentBtn = document.getElementById("exportCurrentBtn");
const exportFullBtn = document.getElementById("exportFullBtn");
const platformSkuFilter = document.getElementById("platformSkuFilter");
const shippingSkuFilter = document.getElementById("shippingSkuFilter");
const shipRange = document.getElementById("shipRange");
const settleRange = document.getElementById("settleRange");
const drawer = document.getElementById("detailDrawer");
const drawerMask = document.getElementById("drawerMask");
const drawerTitle = document.getElementById("drawerTitle");
const drawerMeta = document.getElementById("drawerMeta");
const drawerBody = document.getElementById("drawerBody");
const drawerCloseBtn = document.getElementById("drawerCloseBtn");
const drawerCloseFootBtn = document.getElementById("drawerCloseFootBtn");
const toast = document.getElementById("toast");

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function calcProfit(row, formula) {
  const requiredKeys = [formula.income, formula.addBack, ...formula.deductions];
  if (requiredKeys.some((key) => !isNumber(row[key]))) return null;

  const deducted = formula.deductions.reduce((sum, key) => sum + row[key], 0);
  return roundMoney(row[formula.income] - deducted + row[formula.addBack]);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function moneyText(value, blankText = "-") {
  if (!isNumber(value)) return blankText;
  return value.toFixed(2);
}

function diffValue(row, field) {
  const estimate = row[field.estimateKey];
  const settlement = row[field.settlementKey];
  if (!isNumber(estimate) || !isNumber(settlement)) return null;
  return roundMoney(settlement - estimate);
}

function diffClass(field, value) {
  if (!isNumber(value) || value === 0) return "diff";
  if (field.kind === "income" || field.kind === "profit" || field.kind === "addback") {
    return value > 0 ? "diff diff--profit-positive" : "diff diff--profit-negative";
  }
  return value > 0 ? "diff diff--positive" : "diff diff--negative";
}

function formatDiff(field, value) {
  if (!isNumber(value)) return "-";
  const prefix = value > 0 ? "+" : "";
  return `<span class="${diffClass(field, value)}">${prefix}${moneyText(value)}</span>`;
}

function toDateOnly(value) {
  return value ? value.slice(0, 10) : "";
}

function parseRange(value) {
  const text = (value || "").trim();
  if (!text) return { from: "", to: "" };
  const parts = text.split(/\s*(?:~|至|到)\s*/);
  return {
    from: parts[0] || "",
    to: parts[1] || ""
  };
}

function inRange(dateTime, range) {
  if (!range.from && !range.to) return true;
  const date = toDateOnly(dateTime);
  if (!date) return false;
  if (range.from && date < range.from) return false;
  if (range.to && date > range.to) return false;
  return true;
}

function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

function applyFilters() {
  const ship = parseRange(shipRange.value);
  const settle = parseRange(settleRange.value);
  const platformSku = normalizeText(platformSkuFilter.value);
  const shippingSku = normalizeText(shippingSkuFilter.value);

  return rows.filter((row) => {
    if (state.platform !== "全部" && row.platform !== state.platform) return false;
    if (state.shop !== "全部" && row.shop !== state.shop) return false;
    if (state.settledStatus === "settled" && !row.settled) return false;
    if (state.settledStatus === "unsettled" && row.settled) return false;
    if (platformSku && !row.platformSku.toLowerCase().includes(platformSku)) return false;
    if (shippingSku && !row.shippingSku.toLowerCase().includes(shippingSku)) return false;

    if (state.timeBasis === "settle" && !row.settleTime) return false;
    if (!inRange(row.shipTime, ship)) return false;
    if (!inRange(row.settleTime, settle)) return false;

    return true;
  });
}

function buildSelect(name, options) {
  const root = document.querySelector(`[data-select="${name}"]`);
  root.innerHTML = `
    <button class="select-trigger" type="button" data-action="open-select" aria-expanded="false">
      <span class="select-trigger__label">${escapeHtml(state[name])}</span>
      <span class="select-trigger__arrow">v</span>
    </button>
    <div class="select-menu" role="listbox">
      ${options.map((option) => `
        <button class="select-option ${option === state[name] ? "is-selected" : ""}" type="button" data-action="select-option" data-value="${escapeHtml(option)}">
          ${escapeHtml(option)}
        </button>
      `).join("")}
    </div>
  `;

  root.querySelector(".select-trigger").addEventListener("click", (event) => {
    event.stopPropagation();
    closeSelects(root);
    const open = root.dataset.open !== "true";
    root.dataset.open = open ? "true" : "false";
    root.querySelector(".select-trigger").setAttribute("aria-expanded", String(open));
  });

  root.querySelectorAll(".select-option").forEach((option) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation();
      state[name] = option.dataset.value;
      root.dataset.open = "false";
      buildAllSelects();
    });
  });
}

function closeSelects(except) {
  document.querySelectorAll(".custom-select").forEach((select) => {
    if (select === except) return;
    select.dataset.open = "false";
    select.querySelector(".select-trigger")?.setAttribute("aria-expanded", "false");
  });
}

function buildAllSelects() {
  buildSelect("platform", ["全部", ...new Set(rows.map((row) => row.platform))]);
  buildSelect("shop", ["全部", ...new Set(rows.map((row) => row.shop))]);
}

function statusTag(row) {
  return row.settled
    ? '<span class="tag tag--success">已结算</span>'
    : '<span class="tag tag--warning">未结算</span>';
}

function moneyCell(value) {
  if (isNumber(value)) return moneyText(value);
  return "-";
}

function currentPageConfig() {
  return pageConfigs[state.page] || pageConfigs.revenue;
}

function renderPageChrome() {
  const config = currentPageConfig();
  breadcrumb.textContent = config.breadcrumb;
  pageEyebrow.textContent = config.eyebrow;
  pageTitle.textContent = config.title;
  pageDesc.textContent = config.desc;
  pageHint.textContent = config.hint;
  tableTitle.textContent = config.tableTitle;
  tableSubTitle.textContent = config.tableSubTitle;

  document.querySelectorAll("[data-page]").forEach((item) => {
    const active = item.dataset.page === state.page;
    item.classList.toggle("is-active", active);
    if (active) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function renderTable(list) {
  const { columns } = currentPageConfig();
  tableHead.innerHTML = `
    <tr>
      ${columns.map((column) => `<th${column.className ? ` class="${column.className}"` : ""}>${escapeHtml(column.label)}</th>`).join("")}
    </tr>
  `;
  tableBody.innerHTML = list.map((row) => `
      <tr>
        ${columns.map((column) => `<td${column.className ? ` class="${column.className}"` : ""}>${column.render(row)}</td>`).join("")}
      </tr>
    `).join("");

  emptyState.classList.toggle("hidden", list.length > 0);
}

function sumBy(list, key) {
  return list.reduce((sum, row) => sum + (isNumber(row[key]) ? row[key] : 0), 0);
}

function sumDiff(list, field) {
  return list.reduce((sum, row) => {
    const value = diffValue(row, field);
    return sum + (isNumber(value) ? value : 0);
  }, 0);
}

function renderSummary(list) {
  const settledCount = list.filter((row) => row.settled).length;
  const unsettledCount = list.length - settledCount;
  const profitDiff = roundMoney(sumDiff(list, diffFields[14]));
  const baseMetrics = [
    ["订单总数", list.length, "当前筛选结果"],
    ["已结算", settledCount, "已匹配到账单"],
    ["未结算", unsettledCount, "暂未匹配到账单"],
    ["预估收入合计", moneyText(sumBy(list, "estimatedRevenue")), "ERP 预估口径"],
    ["结算收入合计", moneyText(sumBy(list, "settledRevenue")), "平台账单口径"]
  ];
  const metrics = state.page === "revenue"
    ? [
        ...baseMetrics,
        ["利润差异合计", `${profitDiff > 0 ? "+" : ""}${moneyText(profitDiff)}`, "仅含可计算利润订单"]
      ]
    : baseMetrics;

  summary.innerHTML = metrics.map(([label, value, hint]) => `
    <div class="c-metric-card metric-card">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
      <em>${escapeHtml(hint)}</em>
    </div>
  `).join("");

  basisSummary.textContent = state.timeBasis === "ship" ? "发货时间" : "结算时间";
  activeFilterText.textContent = state.timeBasis === "ship"
    ? "按发货时间口径统计，结算时间可作为辅助筛选"
    : "按结算时间口径统计，未结算订单自动排除";
}

function renderBasis() {
  basisSwitch.querySelectorAll("[data-basis]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.basis === state.timeBasis);
  });
  document.querySelectorAll("[data-range-field]").forEach((field) => {
    field.classList.toggle("field--active", field.dataset.rangeField === state.timeBasis);
  });
  basisNote.textContent = state.timeBasis === "ship"
    ? "默认按发货时间统计；结算时间范围仍可作为辅助筛选。"
    : "当前按结算时间统计；没有结算时间的未结算订单会自动排除。";
}

function renderStatus() {
  settledSwitch.querySelectorAll("[data-status]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.status === state.settledStatus);
  });
}

function render() {
  renderPageChrome();
  renderBasis();
  renderStatus();
  const list = applyFilters();
  renderSummary(list);
  renderTable(list);
}

function setPage(page, updateHash = true) {
  if (!pageConfigs[page] || state.page === page) return;
  state.page = page;
  if (updateHash) {
    window.history.replaceState(null, "", pageConfigs[page].hash);
  }
  render();
}

function comparisonRows(row) {
  return diffFields.map((field) => {
    const estimate = row[field.estimateKey];
    const settlement = row[field.settlementKey];
    const value = diffValue(row, field);
    const label = field.label.replace(/差异$/, "");
    return `
      <tr>
        <td>${escapeHtml(label)}</td>
        <td class="num">${moneyCell(estimate)}</td>
        <td class="num">${moneyCell(settlement)}</td>
        <td class="num">${formatDiff(field, value)}</td>
      </tr>
    `;
  }).join("");
}

function openDrawer(orderNo) {
  const row = rows.find((item) => item.orderNo === orderNo);
  if (!row) return;

  drawerTitle.textContent = `订单详情 ${row.orderNo}`;
  drawerMeta.innerHTML = `
    ${statusTag(row)}
    <span>平台 <strong>${escapeHtml(row.platform)}</strong></span>
    <span>店铺 <strong>${escapeHtml(row.shop)}</strong></span>
    <span>利润差异 <strong>${moneyText(diffValue(row, diffFields[14]))}</strong></span>
  `;

  drawerBody.innerHTML = `
    <section class="detail-section">
      <h3>基础信息</h3>
      <dl class="desc-grid">
        <dt>平台单号</dt><dd>${escapeHtml(row.orderNo)}</dd>
        <dt>平台</dt><dd>${escapeHtml(row.platform)}</dd>
        <dt>店铺</dt><dd>${escapeHtml(row.shop)}</dd>
        <dt>平台 SKU</dt><dd>${escapeHtml(row.platformSku)}</dd>
        <dt>发货 SKU</dt><dd>${escapeHtml(row.shippingSku)}</dd>
        <dt>发货时间</dt><dd>${escapeHtml(row.shipTime)}</dd>
        <dt>结算时间</dt><dd>${escapeHtml(row.settleTime || "-")}</dd>
      </dl>
    </section>

    <section class="detail-section">
      <h3>费用与利润对账明细</h3>
      <p class="detail-section__note">每个字段同一行查看预估金额、账单金额和差异值；差异值 = 账单金额 - 预估金额。</p>
      <table class="detail-table">
        <thead><tr><th>字段</th><th class="num">预估金额</th><th class="num">账单金额</th><th class="num">差异值</th></tr></thead>
        <tbody>${comparisonRows(row)}</tbody>
      </table>
    </section>
  `;

  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  drawerMask.hidden = false;
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  drawerMask.hidden = true;
}

function csvValue(value) {
  if (value === null || value === undefined) return "";
  return isNumber(value) ? value.toFixed(2) : String(value);
}

function escapeCsv(value) {
  const text = csvValue(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function htmlToText(value) {
  const template = document.createElement("template");
  template.innerHTML = String(value ?? "");
  return template.content.textContent || "";
}

function exportCsv(filename, headers, records) {
  const csv = [headers, ...records]
    .map((line) => line.map(escapeCsv).join(","))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  showToast(`已导出 ${records.length} 条数据：${filename}`);
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function exportCurrentList() {
  const list = applyFilters();
  const config = currentPageConfig();
  const exportColumns = config.columns.filter((column) => column.label !== "操作");
  const headers = exportColumns.map((column) => column.label);
  const records = list.map((row) => exportColumns.map((column) => htmlToText(column.render(row))));
  exportCsv(`${config.exportCurrentName}_${today()}.csv`, headers, records);
}

function exportFullDetail() {
  const list = applyFilters();
  const config = currentPageConfig();
  const baseFields = [
    ["平台单号", "orderNo"],
    ["平台", "platform"],
    ["店铺", "shop"],
    ["平台SKU", "platformSku"],
    ["发货SKU", "shippingSku"],
    ["发货时间", "shipTime"],
    ["结算时间", "settleTime"],
    ["是否结算", "settled"]
  ];

  const headers = [
    ...baseFields.map(([label]) => label),
    ...estimateFields.map(([label]) => label),
    ...settlementFields.map(([label]) => label),
    ...diffFields.map((field) => field.label)
  ];

  const records = list.map((row) => [
    ...baseFields.map(([, key]) => key === "settled" ? (row.settled ? "已结算" : "未结算") : row[key]),
    ...estimateFields.map(([, key]) => row[key]),
    ...settlementFields.map(([, key]) => row[key]),
    ...diffFields.map((field) => diffValue(row, field))
  ]);

  exportCsv(`${config.exportFullName}_${today()}.csv`, headers, records);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

applyBtn.addEventListener("click", render);
resetBtn.addEventListener("click", () => {
  state.platform = "全部";
  state.shop = "全部";
  state.settledStatus = "all";
  state.timeBasis = "ship";
  platformSkuFilter.value = "";
  shippingSkuFilter.value = "";
  shipRange.value = "";
  settleRange.value = "";
  buildAllSelects();
  render();
});

document.querySelectorAll("[data-page]").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    setPage(item.dataset.page);
  });
});

basisSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-basis]");
  if (!button) return;
  state.timeBasis = button.dataset.basis;
  render();
});

settledSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("[data-status]");
  if (!button) return;
  state.settledStatus = button.dataset.status;
  render();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-order]");
  if (!button) return;
  openDrawer(button.dataset.order);
});

exportCurrentBtn.addEventListener("click", exportCurrentList);
exportFullBtn.addEventListener("click", exportFullDetail);
drawerMask.addEventListener("click", closeDrawer);
drawerCloseBtn.addEventListener("click", closeDrawer);
drawerCloseFootBtn.addEventListener("click", closeDrawer);
document.addEventListener("click", () => closeSelects());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSelects();
    closeDrawer();
  }
});

const initialPage = Object.entries(pageConfigs).find(([, config]) => config.hash === window.location.hash)?.[0];
if (initialPage) {
  state.page = initialPage;
}

buildAllSelects();
render();
