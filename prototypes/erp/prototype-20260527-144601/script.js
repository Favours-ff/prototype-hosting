const rawRows = [
  {
    orderNo: "AMZ-20260501-0001",
    platform: "Amazon",
    shop: "US-旗舰店",
    shopSubject: "深圳海拓贸易有限公司",
    currency: "USD",
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
    shopSubject: "深圳海拓贸易有限公司",
    currency: "USD",
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
    shopSubject: "香港星海科技有限公司",
    currency: "SGD",
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
    shopSubject: "深圳海拓贸易有限公司",
    currency: "GBP",
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
    shopSubject: "香港星海科技有限公司",
    currency: "PHP",
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
    shopSubject: "东莞晨风供应链有限公司",
    currency: "EUR",
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
    navLabel: "已发货订单结算匹配",
    breadcrumb: "财务对账 / 已发货订单结算匹配",
    eyebrow: "订单结算 / 结算匹配",
    title: "已发货订单结算匹配",
    desc: "",
    hint: "",
    compactFilter: true,
    statusFilter: true,
    visibleFilters: ["orderNo"],
    tableTitle: "已发货订单结算匹配",
    tableSubTitle: "展示订单是否匹配到账单，以及预估收入、结算收入和结算状态。",
    emptyText: "请调整平台、店铺、平台单号或结算状态后重试。",
    exportCurrentName: "订单结算匹配_当前列表",
    exportFullName: "订单结算匹配_完整明细",
    columns: [
      { label: "平台单号", render: (row) => escapeHtml(row.orderNo) },
      { label: "平台", render: (row) => escapeHtml(row.platform) },
      { label: "店铺", render: (row) => escapeHtml(row.shop) },
      { label: "发货时间", className: "time-col", render: (row) => escapeHtml(row.shipTime) },
      { label: "预估收入", className: "num", render: (row) => moneyCell(row.estimatedRevenue) },
      { label: "结算收入", className: "num", render: (row) => moneyCell(row.settledRevenue) },
      { label: "结算时间", className: "time-col", render: (row) => escapeHtml(row.settleTime || "-") },
      { label: "是否结算", className: "status-col", render: (row) => statusTag(row) }
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
    statusFilter: false,
    settledFilterField: true,
    visibleFilters: ["shopSubject", "settledFilter", "shipRange", "settleRange"],
    tableTitle: "发货确认收入明细",
    tableSubTitle: "按主体公司、平台、店铺、币种展示收入、费用和利润明细。",
    emptyText: "请调整平台、店铺主体、店铺或时间范围后重试。",
    exportCurrentName: "发货确认收入_当前列表",
    exportFullName: "发货确认收入_完整明细",
    columns: [
      { label: "主体公司", render: (row) => escapeHtml(row.shopSubject) },
      { label: "平台", render: (row) => escapeHtml(row.platform) },
      { label: "店铺", render: (row) => escapeHtml(row.shop) },
      { label: "币种", render: (row) => escapeHtml(row.currency) },
      { label: "发货时间", className: "time-col", exportValue: (row) => toMonthOnly(row.shipTime), render: (row) => escapeHtml(toMonthOnly(row.shipTime)) },
      { label: "结算时间", className: "time-col", exportValue: (row) => toMonthOnly(row.settleTime) || "-", render: (row) => escapeHtml(toMonthOnly(row.settleTime) || "-") },
      { label: "是否结算", className: "status-col", render: (row) => statusTag(row) },
      { label: "收入", className: "num amount-col", exportValue: (row) => displayAmount(row, "estimatedRevenue", "settledRevenue"), render: (row) => amountWithDiffCell(row, "estimatedRevenue", "settledRevenue", diffFields[0]) },
      { label: "退款", className: "num amount-col", exportValue: (row) => displayAmount(row, "refundAmount", "settledRefundAmount"), render: (row) => amountWithDiffCell(row, "refundAmount", "settledRefundAmount", diffFields[1]) },
      { label: "推广费用", className: "num amount-col", exportValue: (row) => displayAmount(row, "promotionFee", "settledPromotionFee"), render: (row) => amountWithDiffCell(row, "promotionFee", "settledPromotionFee", diffFields[2]) },
      { label: "店铺杂费", className: "num amount-col", exportValue: (row) => displayAmount(row, "shopMiscFee", "settledShopMiscFee"), render: (row) => amountWithDiffCell(row, "shopMiscFee", "settledShopMiscFee", diffFields[3]) },
      { label: "平台佣金", className: "num amount-col", exportValue: (row) => displayAmount(row, "platformCommission", "settledPlatformCommission"), render: (row) => amountWithDiffCell(row, "platformCommission", "settledPlatformCommission", diffFields[4]) },
      { label: "广告费", className: "num amount-col", exportValue: (row) => displayAmount(row, "adFee", "settledAdFee"), render: (row) => amountWithDiffCell(row, "adFee", "settledAdFee", diffFields[5]) },
      { label: "罚款金额", className: "num amount-col", exportValue: (row) => displayAmount(row, "fineAmount", "settledFineAmount"), render: (row) => amountWithDiffCell(row, "fineAmount", "settledFineAmount", diffFields[6]) },
      { label: "商品成本", className: "num amount-col", exportValue: (row) => displayAmount(row, "productCost", "settledProductCost"), render: (row) => amountWithDiffCell(row, "productCost", "settledProductCost", diffFields[7]) },
      { label: "东莞仓/中转仓处理费", className: "num amount-col", exportValue: (row) => displayAmount(row, "warehouseHandlingFee", "settledWarehouseHandlingFee"), render: (row) => amountWithDiffCell(row, "warehouseHandlingFee", "settledWarehouseHandlingFee", diffFields[8]) },
      { label: "退件补成本", className: "num amount-col", exportValue: (row) => displayAmount(row, "returnSupplementCost", "settledReturnSupplementCost"), render: (row) => amountWithDiffCell(row, "returnSupplementCost", "settledReturnSupplementCost", diffFields[9]) },
      { label: "物流运费", className: "num amount-col", exportValue: (row) => displayAmount(row, "logisticsFreight", "settledLogisticsFreight"), render: (row) => amountWithDiffCell(row, "logisticsFreight", "settledLogisticsFreight", diffFields[10]) },
      { label: "VAT", className: "num amount-col", exportValue: (row) => displayAmount(row, "vat", "settledVat"), render: (row) => amountWithDiffCell(row, "vat", "settledVat", diffFields[11]) },
      { label: "平台回款费用", className: "num amount-col", exportValue: (row) => displayAmount(row, "platformPaymentFee", "settledPlatformPaymentFee"), render: (row) => amountWithDiffCell(row, "platformPaymentFee", "settledPlatformPaymentFee", diffFields[12]) },
      { label: "资产减值损失", className: "num amount-col", exportValue: (row) => displayAmount(row, "assetImpairmentLoss", "settledAssetImpairmentLoss"), render: (row) => amountWithDiffCell(row, "assetImpairmentLoss", "settledAssetImpairmentLoss", diffFields[13]) },
      { label: "利润", className: "num amount-col", exportValue: (row) => displayAmount(row, "estimatedProfit", "settledProfit"), render: (row) => amountWithDiffCell(row, "estimatedProfit", "settledProfit", diffFields[14]) }
    ]
  }
};

const state = {
  page: "settlement",
  platform: "全部",
  shopSubject: "全部",
  shop: "全部",
  settledFilter: "全部",
  settledStatus: "unsettled",
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
const emptyStateText = emptyState.querySelector("span");
const summary = document.getElementById("summary");
const basisSummary = document.getElementById("basisSummary");
const activeFilterText = document.getElementById("activeFilterText");
const settledSwitch = document.getElementById("settledSwitch");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");
const exportCurrentBtn = document.getElementById("exportCurrentBtn");
const exportFullBtn = document.getElementById("exportFullBtn");
const orderNoMultiInput = document.getElementById("orderNoMultiInput");
const orderNoFilter = document.getElementById("orderNoFilter");
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

function toMonthOnly(value) {
  return value ? value.slice(0, 7) : "";
}

function parseRange(value) {
  const text = (value || "").trim();
  if (!text) return { from: "", to: "" };
  const parts = text.split(/\s*(?:~|至|到)\s*/);
  return {
    from: toMonthOnly(parts[0] || ""),
    to: toMonthOnly(parts[1] || "")
  };
}

function inRange(dateTime, range) {
  if (!range.from && !range.to) return true;
  const month = toMonthOnly(dateTime);
  if (!month) return false;
  if (range.from && month < range.from) return false;
  if (range.to && month > range.to) return false;
  return true;
}

function normalizeText(value) {
  return (value || "").trim().toLowerCase();
}

function parseMultiValues(value) {
  return normalizeText(value)
    .split(/[\s,，;；]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderOrderNoCount() {
  const count = parseMultiValues(orderNoFilter.value).length;
  const countNode = document.getElementById("orderNoCount");
  if (countNode) countNode.textContent = `${count}个`;
}

function syncOrderNoInputState(expanded = false) {
  const hasValues = parseMultiValues(orderNoFilter.value).length > 0;
  orderNoMultiInput.classList.toggle("is-expanded", expanded || hasValues);
  orderNoFilter.rows = expanded || hasValues ? 3 : 1;
}

function applyFilters(options = {}) {
  const { includeStatus = true } = options;
  const compactFilter = currentPageConfig().compactFilter;
  const ship = parseRange(shipRange.value);
  const settle = parseRange(settleRange.value);
  const orderNos = parseMultiValues(orderNoFilter.value);
  const platformSku = normalizeText(platformSkuFilter.value);
  const shippingSku = normalizeText(shippingSkuFilter.value);

  return rows.filter((row) => {
    if (state.platform !== "全部" && row.platform !== state.platform) return false;
    if (state.shopSubject !== "全部" && row.shopSubject !== state.shopSubject) return false;
    if (state.shop !== "全部" && row.shop !== state.shop) return false;
    if (currentPageConfig().settledFilterField) {
      if (state.settledFilter === "已结算" && !row.settled) return false;
      if (state.settledFilter === "未结算" && row.settled) return false;
    } else if (currentPageConfig().statusFilter !== false) {
      if (includeStatus && state.settledStatus === "settled" && !row.settled) return false;
      if (includeStatus && state.settledStatus === "unsettled" && row.settled) return false;
    }
    if (orderNos.length && !orderNos.some((orderNo) => row.orderNo.toLowerCase().includes(orderNo))) return false;

    if (!compactFilter) {
      if (platformSku && !row.platformSku.toLowerCase().includes(platformSku)) return false;
      if (shippingSku && !row.shippingSku.toLowerCase().includes(shippingSku)) return false;
      if (!inRange(row.shipTime, ship)) return false;
      if (!inRange(row.settleTime, settle)) return false;
    }

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
  buildSelect("shopSubject", ["全部", ...new Set(rows.map((row) => row.shopSubject))]);
  buildSelect("shop", ["全部", ...new Set(rows.map((row) => row.shop))]);
  buildSelect("settledFilter", ["全部", "未结算", "已结算"]);
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

function displayAmount(row, estimateKey, settlementKey) {
  return isNumber(row[settlementKey]) ? row[settlementKey] : row[estimateKey];
}

function amountWithDiffCell(row, estimateKey, settlementKey, field) {
  const amount = displayAmount(row, estimateKey, settlementKey);
  const diff = diffValue(row, field);
  const diffMarkup = isNumber(diff) && diff !== 0
    ? `<span class="amount-cell__diff">差异 ${formatDiff(field, diff)}</span>`
    : "";
  return `<span class="amount-cell">${moneyCell(amount)}${diffMarkup}</span>`;
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
  pageDesc.hidden = !config.desc;
  pageHint.hidden = !config.hint;
  document.body.dataset.page = state.page;
  document.title = config.title;
  tableTitle.textContent = config.tableTitle;
  tableSubTitle.textContent = config.tableSubTitle;
  emptyStateText.textContent = config.emptyText;

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

function renderFilterLayout() {
  const config = currentPageConfig();
  const visibleFilters = new Set(config.visibleFilters || []);
  document.querySelectorAll("[data-filter-field]").forEach((field) => {
    field.hidden = !visibleFilters.has(field.dataset.filterField);
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
  if (basisSummary) basisSummary.textContent = "发货时间";
  if (activeFilterText) activeFilterText.textContent = "按发货时间口径统计差异。";
}

function renderBasis() {
  document.querySelectorAll("[data-range-field]").forEach((field) => {
    field.classList.toggle("field--active", field.dataset.rangeField === "ship");
  });
}

function renderStatus() {
  const countScope = applyFilters({ includeStatus: false });
  const counts = {
    all: countScope.length,
    settled: countScope.filter((row) => row.settled).length,
    unsettled: countScope.filter((row) => !row.settled).length
  };
  const labels = {
    unsettled: "未结算",
    settled: "已结算",
    all: "全部"
  };

  settledSwitch.querySelectorAll("[data-status]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.status === state.settledStatus);
    button.innerHTML = `<span>${labels[button.dataset.status]}</span><span class="status-filter__count">（${counts[button.dataset.status]}）</span>`;
  });
}

function render() {
  renderPageChrome();
  renderFilterLayout();
  renderBasis();
  renderOrderNoCount();
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
        <td class="num ratio-col">${percentText(estimate, row.estimatedRevenue)}</td>
        <td class="num">${moneyCell(settlement)}</td>
        <td class="num ratio-col">${percentText(settlement, row.settledRevenue)}</td>
        <td class="num">${formatDiff(field, value)}</td>
      </tr>
    `;
  }).join("");
}

function percentText(value, total) {
  if (!isNumber(value) || !isNumber(total)) return "-";
  if (total === 0) return value === 0 ? "0%" : "-";
  return `${(value / total * 100).toFixed(3)}%`;
}

function openDrawer(orderNo) {
  const row = rows.find((item) => item.orderNo === orderNo);
  if (!row) return;

  drawerTitle.textContent = `${row.shopSubject} / ${row.platform} / ${row.shop}`;
  drawerMeta.innerHTML = `
    ${statusTag(row)}
    <span>币种 <strong>${escapeHtml(row.currency)}</strong></span>
    <span>利润差异 <strong>${moneyText(diffValue(row, diffFields[14]))}</strong></span>
  `;

  drawerBody.innerHTML = `
    <section class="detail-section">
      <h3>对账维度</h3>
      <dl class="desc-grid">
        <dt>主体公司</dt><dd>${escapeHtml(row.shopSubject)}</dd>
        <dt>平台</dt><dd>${escapeHtml(row.platform)}</dd>
        <dt>店铺</dt><dd>${escapeHtml(row.shop)}</dd>
        <dt>币种</dt><dd>${escapeHtml(row.currency)}</dd>
        <dt>是否结算</dt><dd>${row.settled ? "已结算" : "未结算"}</dd>
      </dl>
    </section>

    <section class="detail-section">
      <h3>费用与利润对账明细</h3>
      <p class="detail-section__note">每个字段同一行查看金额、占收入比例和差异值；差异值 = 账单金额 - 预估金额。</p>
      <table class="detail-table">
        <thead><tr><th>字段</th><th class="num">预估金额</th><th class="num">预估占比</th><th class="num">账单金额</th><th class="num">账单占比</th><th class="num">差异值</th></tr></thead>
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
  const records = list.map((row) => exportColumns.map((column) => {
    if (column.exportValue) return column.exportValue(row);
    return htmlToText(column.render(row));
  }));
  exportCsv(`${config.exportCurrentName}_${today()}.csv`, headers, records);
}

function exportFullDetail() {
  const list = applyFilters();
  const config = currentPageConfig();
  const baseFields = [
    ["平台单号", "orderNo"],
    ["主体公司", "shopSubject"],
    ["平台", "platform"],
    ["店铺", "shop"],
    ["币种", "currency"],
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
  state.shopSubject = "全部";
  state.shop = "全部";
  state.settledFilter = "全部";
  state.settledStatus = "unsettled";
  orderNoFilter.value = "";
  syncOrderNoInputState(false);
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
orderNoFilter.addEventListener("focus", () => syncOrderNoInputState(true));
orderNoFilter.addEventListener("blur", () => syncOrderNoInputState(false));
orderNoFilter.addEventListener("input", () => {
  renderOrderNoCount();
  syncOrderNoInputState(true);
});
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
