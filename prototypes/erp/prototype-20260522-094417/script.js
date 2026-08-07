const rows = [
  { orderNo: "AMZ-20260501-0001", platform: "Amazon", shop: "US-旗舰店", shipTime: "2026-05-01 10:23", estRevenue: 128.6, settledRevenue: 126.9, estProfit: 24.1, settledProfit: 22.8, settleTime: "2026-05-08 18:35", settled: true },
  { orderNo: "AMZ-20260502-0002", platform: "Amazon", shop: "US-旗舰店", shipTime: "2026-05-02 09:12", estRevenue: 95.0, settledRevenue: null, estProfit: 18.7, settledProfit: null, settleTime: "", settled: false },
  { orderNo: "SHP-20260503-0088", platform: "Shopee", shop: "SG-跨境店", shipTime: "2026-05-03 15:40", estRevenue: 70.2, settledRevenue: 69.1, estProfit: 13.9, settledProfit: 12.6, settleTime: "2026-05-10 09:20", settled: true },
  { orderNo: "TK-20260503-0166", platform: "TikTok", shop: "UK-直播店", shipTime: "2026-05-03 20:18", estRevenue: 210.0, settledRevenue: null, estProfit: 55.2, settledProfit: null, settleTime: "", settled: false },
  { orderNo: "SHP-20260504-0110", platform: "Shopee", shop: "PH-本地店", shipTime: "2026-05-04 11:05", estRevenue: 45.5, settledRevenue: 44.0, estProfit: 7.8, settledProfit: 6.9, settleTime: "2026-05-11 11:30", settled: true }
];

const tableBody = document.getElementById("tableBody");
const emptyState = document.getElementById("emptyState");
const summary = document.getElementById("summary");

const platformFilter = document.getElementById("platformFilter");
const shopFilter = document.getElementById("shopFilter");
const shipRange = document.getElementById("shipRange");
const settleRange = document.getElementById("settleRange");
const statusSwitch = document.getElementById("statusSwitch");
const statusButtons = Array.from(document.querySelectorAll(".status-btn"));

const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
let statusValue = "false";

function toDateOnly(value) {
  if (!value) return "";
  return value.slice(0, 10);
}

function inRange(dateStr, from, to) {
  if (!dateStr) return false;
  const d = toDateOnly(dateStr);
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

function parseRange(value) {
  const text = (value || "").trim();
  if (!text) return { from: "", to: "" };
  const parts = text.split("~").map((x) => x.trim());
  return {
    from: parts[0] || "",
    to: parts[1] || ""
  };
}

function asMoney(value) {
  if (value === null || value === undefined || value === "") return "-";
  return Number(value).toFixed(2);
}

function buildOptions() {
  const platforms = ["全部", ...new Set(rows.map(r => r.platform))];
  const shops = ["全部", ...new Set(rows.map(r => r.shop))];

  platformFilter.innerHTML = platforms.map(v => `<option value="${v}">${v}</option>`).join("");
  shopFilter.innerHTML = shops.map(v => `<option value="${v}">${v}</option>`).join("");
}

function applyFilters() {
  const pf = platformFilter.value;
  const sf = shopFilter.value;
  const st = statusValue;
  const ship = parseRange(shipRange.value);
  const settle = parseRange(settleRange.value);

  return rows.filter((row) => {
    if (pf !== "全部" && row.platform !== pf) return false;
    if (sf !== "全部" && row.shop !== sf) return false;

    if (ship.from || ship.to) {
      if (!inRange(row.shipTime, ship.from, ship.to)) return false;
    }

    if (settle.from || settle.to) {
      if (!row.settled) return false;
      if (!inRange(row.settleTime, settle.from, settle.to)) return false;
    }

    if (st === "true" && !row.settled) return false;
    if (st === "false" && row.settled) return false;

    return true;
  });
}

function render(list) {
  tableBody.innerHTML = list.map((row) => `
    <tr>
      <td>${row.orderNo}</td>
      <td>${row.platform}</td>
      <td>${row.shop}</td>
      <td>${row.shipTime}</td>
      <td>${asMoney(row.estRevenue)}</td>
      <td>${asMoney(row.settledRevenue)}</td>
      <td>${asMoney(row.estProfit)}</td>
      <td>${asMoney(row.settledProfit)}</td>
      <td>${row.settleTime || "-"}</td>
      <td><span class="tag ${row.settled ? "tag--ok" : "tag--warn"}">${row.settled ? "已结算" : "未结算"}</span></td>
    </tr>
  `).join("");

  emptyState.classList.toggle("hidden", list.length > 0);

  const settledCount = list.filter(x => x.settled).length;
  const unsettledCount = list.length - settledCount;
  const estIncome = list.reduce((sum, x) => sum + (x.estRevenue || 0), 0);
  const settledIncome = list.reduce((sum, x) => sum + (x.settledRevenue || 0), 0);

  summary.innerHTML = `
    <div class="metric"><strong>${list.length}</strong><span>订单总数</span></div>
    <div class="metric"><strong>${settledCount}</strong><span>已匹配/已结算</span></div>
    <div class="metric"><strong>${unsettledCount}</strong><span>未匹配/未结算</span></div>
    <div class="metric"><strong>${asMoney(estIncome)}</strong><span>预估收入合计</span></div>
    <div class="metric"><strong>${asMoney(settledIncome)}</strong><span>结算收入合计</span></div>
  `;
}

function toCsv(list) {
  const headers = ["平台单号", "平台", "店铺", "发货时间", "预估收入", "结算收入", "预估利润", "结算利润", "结算时间", "是否结算"];
  const lines = list.map(r => [
    r.orderNo,
    r.platform,
    r.shop,
    r.shipTime,
    asMoney(r.estRevenue),
    asMoney(r.settledRevenue),
    asMoney(r.estProfit),
    asMoney(r.settledProfit),
    r.settleTime || "",
    r.settled ? "已结算" : "未结算"
  ]);

  const escapeCell = (val) => {
    const text = String(val ?? "");
    if (text.includes(",") || text.includes("\n") || text.includes("\"")) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  };

  const csv = [headers, ...lines].map(row => row.map(escapeCell).join(",")).join("\n");
  return "\uFEFF" + csv;
}

function exportCurrent() {
  const list = applyFilters();
  const csv = toCsv(list);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `结算匹配结果_${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

applyBtn.addEventListener("click", () => render(applyFilters()));
resetBtn.addEventListener("click", () => {
  platformFilter.value = "全部";
  shopFilter.value = "全部";
  shipRange.value = "";
  settleRange.value = "";
  statusValue = "false";
  setActiveStatusButton();
  render(applyFilters());
});
exportBtn.addEventListener("click", exportCurrent);

function setActiveStatusButton() {
  statusButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.status === statusValue);
  });
}

statusSwitch.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (!target.classList.contains("status-btn")) return;
  statusValue = target.dataset.status || "all";
  setActiveStatusButton();
  render(applyFilters());
});

buildOptions();
setActiveStatusButton();
render(applyFilters());
