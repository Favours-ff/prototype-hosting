const metrics = [
  { key: "sales", name: "有效销售额", value: "¥59,477,208.9", compare: "-12.6%", scale: 1, icon: "¥" },
  { key: "orders", name: "有效订单数", value: "990,231", compare: "-8.4%", scale: 0.00027, icon: "▣" },
  { key: "quantity", name: "有效销售数量", value: "2,719,871", compare: "-10.1%", scale: 0.00078, icon: "◆" },
  { key: "profit", name: "毛利润", value: "¥9,658,448.95", compare: "-15.3%", scale: 0.16, icon: "↗" },
  { key: "margin", name: "毛利润率", value: "16.24%", compare: "-2.2%", scale: 0.0000027, icon: "%" },
  { key: "items", name: "客件数", value: "2.7", compare: "+0.3%", scale: 0.00000046, icon: "▥" },
  { key: "unit", name: "客单价", value: "¥59.2", compare: "-4.5%", scale: 0.00001, icon: "◇" }
];

const periods = ["2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04","2026-05","2026-06"];
const totalData = [1903, 3750137, 3429265, 5412137, 6941649, 6418199, 7764579, 7799623, 7216915, 5703990, 5038172, 5947721];
const metricTrendFactors = {
  sales:    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  orders:   [1.08, .96, 1.03, .94, .91, .97, 1.02, 1.06, 1.01, .95, .90, .93],
  quantity: [.92, .98, 1.05, 1.08, 1.03, 1.01, .96, .99, 1.04, 1.08, 1.02, .97],
  profit:   [.85, .91, .88, .96, 1.04, 1.08, 1.12, 1.06, .98, .93, .89, .95],
  margin:   [.78, .84, .90, .96, 1.02, 1.08, 1.12, 1.10, 1.03, .97, .92, .98],
  items:    [1.02, 1.04, 1.01, .98, .96, .99, 1.03, 1.07, 1.05, 1.01, .97, 1],
  unit:     [.89, .93, .96, 1.01, 1.06, 1.10, 1.08, 1.04, .99, .95, .92, .97]
};
const compareDimensions = {
  division: {
    label: "业务单元",
    objects: [
      { id: "d1", name: "速卖通事业部", path: "四海芯舟 / 工业运营中心", data: [520, 1850000, 1730000, 2860000, 3470000, 3290000, 4010000, 4140000, 3820000, 3050000, 2710000, 3210000] },
      { id: "d2", name: "东南亚项目部", path: "四海芯舟 / 工业运营中心", data: [390, 1410000, 1320000, 2130000, 2580000, 2410000, 2960000, 2890000, 2700000, 2110000, 1910000, 2260000] },
      { id: "d3", name: "亚马逊工业事业部", path: "四海芯舟 / 工业运营中心", data: [260, 990000, 940000, 1510000, 1830000, 1690000, 2110000, 2050000, 1910000, 1520000, 1360000, 1630000] },
      { id: "d4", name: "国内事业部", path: "四海芯舟 / 工业运营中心", data: [180, 730000, 680000, 1120000, 1360000, 1250000, 1530000, 1590000, 1420000, 1160000, 1020000, 1210000] },
      { id: "d5", name: "多平台项目部", path: "四海芯舟 / 工业运营中心", data: [120, 610000, 570000, 930000, 1140000, 1060000, 1280000, 1320000, 1200000, 960000, 850000, 1010000] },
      { id: "d6", name: "武汉得茂事业部", path: "四海芯舟 / 工业运营中心", data: [95, 490000, 455000, 750000, 910000, 840000, 1030000, 1060000, 970000, 770000, 690000, 820000] },
      { id: "d7", name: "亚马逊多品项目部", path: "四海芯舟 / 多品运营中心", data: [70, 350000, 330000, 540000, 650000, 610000, 740000, 760000, 700000, 560000, 500000, 590000] },
      { id: "d8", name: "多品项目部", path: "四海芯舟 / 多品运营中心", data: [55, 280000, 260000, 430000, 520000, 480000, 590000, 610000, 550000, 450000, 400000, 470000] }
    ]
  },
  store: {
    label: "店铺",
    objects: [
      { id: "s1", name: "SPE003_TH_BT", path: "速卖通事业部 / 泰国站", data: [160, 580000, 540000, 880000, 1080000, 990000, 1210000, 1260000, 1130000, 910000, 820000, 970000] },
      { id: "s2", name: "SPE001_TH_BT", path: "速卖通事业部 / 泰国站", data: [145, 530000, 490000, 810000, 970000, 910000, 1110000, 1150000, 1040000, 830000, 740000, 890000] },
      { id: "s3", name: "SPE010_TH_BT", path: "东南亚项目部 / 泰国站", data: [130, 470000, 440000, 720000, 860000, 790000, 980000, 950000, 890000, 710000, 650000, 770000] },
      { id: "s4", name: "SPE058_TH_BT", path: "东南亚项目部 / 泰国站", data: [115, 420000, 390000, 630000, 760000, 710000, 850000, 870000, 810000, 640000, 580000, 700000] },
      { id: "s5", name: "SPE043_TH_BT", path: "多平台项目部 / 泰国站", data: [100, 360000, 340000, 550000, 660000, 620000, 750000, 730000, 680000, 540000, 490000, 590000] },
      { id: "s6", name: "SPE047_TH_BT", path: "多品项目部 / 泰国站", data: [90, 320000, 300000, 490000, 590000, 550000, 680000, 660000, 610000, 490000, 440000, 530000] }
    ]
  },
  operator: {
    label: "运营",
    objects: [
      { id: "o1", name: "曾建杰", path: "速卖通事业部 / 深圳速卖通工具组", data: [80, 290000, 270000, 440000, 540000, 500000, 610000, 630000, 570000, 460000, 410000, 490000] },
      { id: "o2", name: "刘明华", path: "速卖通事业部 / 深圳速卖通元器件组", data: [75, 270000, 250000, 410000, 490000, 460000, 560000, 580000, 520000, 420000, 380000, 450000] },
      { id: "o3", name: "翁晓康", path: "速卖通事业部 / 深圳速卖通全托管组", data: [68, 240000, 230000, 370000, 450000, 410000, 510000, 490000, 460000, 360000, 330000, 390000] },
      { id: "o4", name: "刘文祺", path: "东南亚项目部 / 深圳东南亚跨境组", data: [62, 220000, 205000, 335000, 400000, 375000, 450000, 460000, 425000, 340000, 305000, 365000] },
      { id: "o5", name: "熊梓成", path: "东南亚项目部 / 深圳东南亚本土组", data: [58, 205000, 190000, 310000, 375000, 350000, 420000, 410000, 380000, 300000, 270000, 325000] },
      { id: "o6", name: "潘晶佳", path: "亚马逊工业事业部 / 亚马逊工业-日本组", data: [53, 190000, 175000, 285000, 345000, 320000, 385000, 375000, 350000, 275000, 250000, 300000] },
      { id: "o7", name: "胡冰冰", path: "亚马逊工业事业部 / 亚马逊工业-欧洲组", data: [49, 175000, 165000, 265000, 320000, 295000, 360000, 350000, 325000, 260000, 230000, 280000] },
      { id: "o8", name: "吴亦", path: "亚马逊工业事业部 / 亚马逊工业-北美组", data: [45, 160000, 150000, 245000, 295000, 275000, 330000, 320000, 300000, 235000, 215000, 255000] },
      { id: "o9", name: "黄高雁", path: "国内事业部 / 国内-淘宝组", data: [41, 145000, 135000, 220000, 265000, 250000, 300000, 290000, 270000, 215000, 190000, 230000] },
      { id: "o10", name: "周思远", path: "武汉得茂事业部 / 武汉速卖通工具组", data: [38, 130000, 125000, 200000, 240000, 225000, 275000, 265000, 245000, 195000, 175000, 210000] }
    ]
  }
};

const salespeople = [
  { name: "曾建杰", hireDate: "2022-03-14", tenure: "4年2个月", sales: [423662.24, 483129.06], profit: [68342.18, 72917.43], margin: [16.13, 15.09] },
  { name: "刘明华", hireDate: "2023-07-03", tenure: "2年11个月", sales: [410846.91, 474763.42], profit: [65518.46, 70821.31], margin: [15.95, 14.92] },
  { name: "翁晓康", hireDate: "2021-11-22", tenure: "4年6个月", sales: [345198.01, 304367.47], profit: [57231.74, 48190.64], margin: [16.58, 15.83] },
  { name: "无", hireDate: "暂无人员归属", tenure: "-", sales: [320558.42, 347051.07], profit: [43888.31, 46621.82], margin: [13.69, 13.43] },
  { name: "刘文祺", hireDate: "2024-01-08", tenure: "2年5个月", sales: [318552.47, 379549.92], profit: [50877.12, 57963.25], margin: [15.97, 15.27] },
  { name: "熊梓成", hireDate: "2020-08-17", tenure: "5年9个月", sales: [200757.89, 192629.26], profit: [32127.44, 28764.19], margin: [16.00, 14.93] },
  { name: "潘晶佳", hireDate: "2026-03-10", tenure: "3个月", sales: [186736.71, 177545.06], profit: [27184.39, 24987.55], margin: [14.56, 14.07] },
  { name: "胡冰冰", hireDate: "2023-05-15", tenure: "3年1个月", sales: [180234.64, 180965.02], profit: [29372.64, 28155.47], margin: [16.30, 15.56] },
  { name: "吴亦", hireDate: "2026-01-05", tenure: "5个月", sales: [170033.50, 227887.34], profit: [24518.22, 31896.42], margin: [14.42, 14.00] },
  { name: "黄高雁", hireDate: "2022-09-19", tenure: "3年8个月", sales: [168908.97, 133426.14], profit: [25690.18, 19773.64], margin: [15.21, 14.82] }
];

const businessUnits = [
  { id: "bu0", level: 0, name: "四海芯舟", count: "78人", selected: true, toggle: "⌄" },
  { id: "bu1", level: 1, name: "工业运营中心", count: "66人", selected: true, toggle: "⌄" },
  { id: "bu2", level: 2, name: "速卖通事业部", count: "19人", selected: true, toggle: "⌄" },
  { id: "bu3", level: 3, name: "深圳速卖通工具组", count: "7人", selected: true },
  { id: "bu4", level: 3, name: "深圳速卖通元器件组", count: "8人", selected: true },
  { id: "bu5", level: 3, name: "深圳速卖通全托管组", count: "6人", selected: true },
  { id: "bu6", level: 3, name: "阿里国际组", count: "0人", selected: true },
  { id: "bu7", level: 3, name: "shopify组", count: "0人", selected: true },
  { id: "bu8", level: 2, name: "东南亚项目部", count: "8人", selected: true, toggle: "⌄" },
  { id: "bu9", level: 3, name: "深圳东南亚跨境组", count: "3人", selected: true },
  { id: "bu10", level: 3, name: "深圳东南亚本土组", count: "5人", selected: true },
  { id: "bu11", level: 2, name: "亚马逊工业事业部", count: "9人", selected: true, toggle: "⌄" },
  { id: "bu12", level: 3, name: "亚马逊工业-日本组", count: "1人", selected: true },
  { id: "bu13", level: 3, name: "亚马逊工业-欧洲组", count: "5人", selected: true },
  { id: "bu14", level: 3, name: "亚马逊工业-北美组", count: "3人", selected: true },
  { id: "bu15", level: 2, name: "国内事业部", count: "9人", selected: true, toggle: "⌄" },
  { id: "bu16", level: 3, name: "国内-淘宝组", count: "7人", selected: true },
  { id: "bu17", level: 3, name: "国内-天猫组", count: "3人", selected: true },
  { id: "bu18", level: 3, name: "国内-1688组", count: "1人", selected: true },
  { id: "bu19", level: 3, name: "国内-京东组", count: "1人", selected: true },
  { id: "bu20", level: 3, name: "国内-拼多多组", count: "1人", selected: true },
  { id: "bu21", level: 2, name: "多平台项目部", count: "5人", selected: true, toggle: "⌄" },
  { id: "bu22", level: 3, name: "eBay工业组", count: "4人", selected: true },
  { id: "bu23", level: 3, name: "Temu工业半托管组", count: "1人", selected: true },
  { id: "bu24", level: 3, name: "Temu工业全托管组", count: "0人", selected: true },
  { id: "bu25", level: 2, name: "武汉得茂事业部", count: "14人", selected: true, toggle: "⌄" },
  { id: "bu26", level: 3, name: "武汉速卖通全托管工业组", count: "3人", selected: true },
  { id: "bu27", level: 3, name: "武汉速卖通工具组", count: "7人", selected: true },
  { id: "bu28", level: 3, name: "武汉速卖通电子元器件组", count: "3人", selected: true },
  { id: "bu29", level: 3, name: "武汉-东南亚", count: "2人", selected: true },
  { id: "bu30", level: 1, name: "东南亚本土运营中心", count: "1人", selected: true },
  { id: "bu31", level: 1, name: "多品运营中心", count: "12人", selected: true, toggle: "⌄" },
  { id: "bu32", level: 2, name: "亚马逊多品项目部", count: "4人", selected: true, toggle: "⌄" },
  { id: "bu33", level: 3, name: "亚马逊多品-欧洲组", count: "2人", selected: true },
  { id: "bu34", level: 3, name: "亚马逊多品-北美组", count: "2人", selected: true },
  { id: "bu35", level: 2, name: "多品项目部", count: "7人", selected: true, toggle: "⌄" },
  { id: "bu36", level: 3, name: "速卖通多品组", count: "2人", selected: true },
  { id: "bu37", level: 3, name: "Temu多品半托管组", count: "4人", selected: true },
  { id: "bu38", level: 3, name: "速卖通多品全托管组", count: "2人", selected: true },
  { id: "bu39", level: 3, name: "eBay多品组", count: "3人", selected: true }
];

const parentUnitShares = { bu0: 1, bu1: .76, bu30: .03, bu31: .21 };
businessUnits.filter(unit => unit.level < 2).forEach(unit => {
  const share = parentUnitShares[unit.id];
  compareDimensions.division.objects.push({
    id: `unit-${unit.id}`,
    name: unit.name,
    path: unit.level === 0 ? "业务单元根节点" : "四海芯舟",
    data: totalData.map(value => Math.round(value * share))
  });
});

let parentDivision = null;
businessUnits.forEach((unit, index) => {
  if (unit.level === 2) {
    parentDivision = compareDimensions.division.objects.find(group => group.name === unit.name) || null;
    return;
  }
  if (unit.level < 2) {
    parentDivision = null;
    return;
  }
  if (unit.level !== 3 || !parentDivision) return;
  const headcount = Number.parseInt(unit.count, 10);
  const share = headcount ? .18 + ((index * 7) % 18) / 100 : 0;
  compareDimensions.division.objects.push({
    id: `group-${unit.id}`,
    name: unit.name,
    path: `${parentDivision.path} / ${parentDivision.name}`,
    data: parentDivision.data.map((value, periodIndex) => Math.round(value * share * (.96 + (periodIndex % 3) * .02)))
  });
});

const state = {
  metric: "sales",
  summaryMetrics: ["sales"],
  mode: "total",
  dimension: "division",
  selected: ["d1", "d2"],
  showTotal: true,
  hiddenSeries: new Set(),
  ranking: "sales",
  tenureFilter: "all",
  storeFilter: null,
  operatorFilter: null
};

const metricGrid = document.querySelector("#metricGrid");
const chart = document.querySelector("#trendChart");
const toolbar = document.querySelector("#comparisonToolbar");
const selectedGroups = document.querySelector("#selectedGroups");
const groupDropdown = document.querySelector("#groupDropdown");
const groupTrigger = document.querySelector("#groupTrigger");
const totalSwitch = document.querySelector("#totalSwitch");
const tooltip = document.querySelector("#chartTooltip");
const toast = document.querySelector("#toast");
const rankingChart = document.querySelector("#rankingChart");
const rankingTooltip = document.querySelector("#rankingTooltip");
const rankingModalMask = document.querySelector("#rankingModalMask");
const rankingModalChart = document.querySelector("#rankingModalChart");
const businessUnitDropdown = document.querySelector("#businessUnitDropdown");
const storeFilterDropdown = document.querySelector("#storeFilterDropdown");
const operatorFilterDropdown = document.querySelector("#operatorFilterDropdown");
const tenureFilterDropdown = document.querySelector("#tenureFilterDropdown");

function currentMetric(key = state.metric) {
  return metrics.find(metric => metric.key === key);
}

function formatValue(value, key = state.metric) {
  if (key === "margin") return `${value.toFixed(2)}%`;
  if (key === "items") return value.toFixed(1);
  if (key === "orders" || key === "quantity") return Math.round(value).toLocaleString("zh-CN");
  return `¥${value.toLocaleString("zh-CN", { maximumFractionDigits: 1 })}`;
}

function scaled(values, key = state.metric) {
  return values.map(value => value * currentMetric(key).scale);
}

function totalMetricValues(key) {
  return scaled(totalData.map((value, index) => value * metricTrendFactors[key][index]), key);
}

function currentDimension() {
  return compareDimensions[state.dimension];
}

function employeeType(person) {
  if (person.hireDate === "暂无人员归属") return "unknown";
  return new Date(person.hireDate) > new Date("2025-12-15") ? "new" : "old";
}

function employeeTypeLabel(person) {
  return { new: "新员工", old: "老员工", unknown: "未归属" }[employeeType(person)];
}

function renderBusinessUnitTree(query = "") {
  const keyword = query.trim().toLowerCase();
  const rows = businessUnits.filter(item => !keyword || item.name.toLowerCase().includes(keyword));
  businessUnitDropdown.innerHTML = `
    <input class="business-tree__search" id="businessUnitSearch" placeholder="请输入业务单元名称搜索" value="${query}">
    ${rows.map(item => `
      <div class="tree-row ${item.selected ? "is-selected" : ""}" data-business-unit="${item.id}" data-level="${item.level}">
        <span class="tree-row__toggle">${item.toggle || ""}</span>
        <span class="tree-row__check">${item.selected ? "✓" : ""}</span>
        <span>${item.name}</span>
        <span class="tree-row__count">${item.count}</span>
      </div>
    `).join("")}
  `;
  businessUnitDropdown.querySelector("#businessUnitSearch").addEventListener("input", event => renderBusinessUnitTree(event.target.value));
  businessUnitDropdown.querySelectorAll("[data-business-unit]").forEach(row => row.addEventListener("click", () => {
    const item = businessUnits.find(unit => unit.id === row.dataset.businessUnit);
    item.selected = !item.selected;
    renderBusinessUnitTree(query);
    renderBusinessUnitValue();
  }));
}

function renderBusinessUnitValue() {
  const selected = businessUnits.filter(item => item.selected && item.level === 2);
  document.querySelector("#businessUnitValue").innerHTML = selected.length
    ? selected.slice(0, 2).map(item => `<span class="tag tag--processing">${item.name}</span>`).join("") + (selected.length > 2 ? `<span class="tag">+${selected.length - 2}</span>` : "")
    : `<span class="filter-control__placeholder">请选择业务单元</span>`;
}

function renderFilterOptions(container, objects, selectedId, type, query = "") {
  const keyword = query.trim().toLowerCase();
  const filtered = objects.filter(item => !keyword || `${item.name}${item.path}`.toLowerCase().includes(keyword));
  container.innerHTML = `
    <input class="option-dropdown__search" placeholder="搜索${type === "store" ? "店铺、事业部或站点" : "运营人员"}" value="${query}">
    ${filtered.map(item => `
      <button class="option-item ${selectedId === item.id ? "is-selected" : ""}" type="button" data-filter-option="${item.id}">
        <strong>${item.name}</strong><span>${item.path}</span>
      </button>
    `).join("")}
  `;
  container.querySelector(".option-dropdown__search").addEventListener("input", event => renderFilterOptions(container, objects, selectedId, type, event.target.value));
  container.querySelectorAll("[data-filter-option]").forEach(button => button.addEventListener("click", () => {
    const item = objects.find(object => object.id === button.dataset.filterOption);
    if (type === "store") {
      state.storeFilter = item.id;
      document.querySelector("#storeFilterValue").textContent = `${item.name} · ${item.path}`;
    } else {
      state.operatorFilter = item.id;
      document.querySelector("#operatorFilterValue").textContent = `${item.name} · ${item.path}`;
    }
    container.classList.add("is-hidden");
  }));
}

function renderMetrics() {
  metricGrid.innerHTML = metrics.map(metric => `
    <button class="metric-card ${(state.mode === "total" ? state.summaryMetrics.includes(metric.key) : metric.key === state.metric) ? "active" : ""}" type="button" data-metric="${metric.key}">
      <span class="metric-card__selection">${state.mode === "total" && state.summaryMetrics.includes(metric.key) ? state.summaryMetrics.indexOf(metric.key) + 1 : "✓"}</span>
      <span class="metric-card__name"><span class="metric-card__icon">${metric.icon}</span>${metric.name}</span>
      <strong class="metric-card__value">${metric.value}</strong>
      <span class="metric-card__compare"><span>环比</span><em>${metric.compare}</em></span>
    </button>
  `).join("");
  document.querySelectorAll("[data-metric]").forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.metric;
    if (state.mode === "total") {
      if (state.summaryMetrics.includes(key)) {
        if (state.summaryMetrics.length === 1) {
          showToast("汇总趋势至少保留1个指标。");
          return;
        }
        state.summaryMetrics = state.summaryMetrics.filter(item => item !== key);
      } else if (state.summaryMetrics.length < 4) {
        state.summaryMetrics.push(key);
      } else {
        showToast("汇总趋势最多选择4个指标，请取消已有指标后再选择。");
        return;
      }
    } else {
      state.metric = key;
    }
    state.hiddenSeries.clear();
    render();
    showToast(state.mode === "total" ? `汇总趋势已选择${state.summaryMetrics.length}个指标` : `分组对比指标已切换为：${currentMetric().name}`);
  }));
}

function renderDropdown() {
  const reachedLimit = state.selected.length >= 10;
  if (state.dimension === "division") {
    const divisionByName = new Map(currentDimension().objects.map(group => [group.name, group]));
    groupDropdown.classList.add("group-dropdown--tree");
    groupDropdown.innerHTML = businessUnits.map(unit => {
      const group = divisionByName.get(unit.name);
      const selected = group && state.selected.includes(group.id);
      const disabled = group && reachedLimit && !selected;
      const latest = group ? scaled(group.data).at(-1) : null;
      return group ? `
        <button class="group-tree-row group-tree-row--selectable ${selected ? "is-selected" : ""}" type="button" data-group="${group.id}" data-level="${unit.level}" ${disabled ? "disabled" : ""}>
          <span class="group-tree-row__toggle">${unit.toggle || ""}</span>
          <span class="group-option__check">${selected ? "✓" : ""}</span>
          <strong>${unit.name}</strong>
          <span class="group-tree-row__meta">${unit.count}</span>
          <span class="group-option__value">${formatValue(latest)}</span>
        </button>
      ` : "";
    }).join("");
  } else {
    groupDropdown.classList.remove("group-dropdown--tree");
    groupDropdown.innerHTML = currentDimension().objects.map(group => {
      const selected = state.selected.includes(group.id);
      const disabled = reachedLimit && !selected;
      const latest = scaled(group.data).at(-1);
      return `
        <button class="group-option ${selected ? "is-selected" : ""}" type="button" data-group="${group.id}" ${disabled ? "disabled" : ""}>
          <span class="group-option__check">${selected ? "✓" : ""}</span>
          <span><strong>${group.name}</strong><span class="group-option__path">${group.path}</span></span>
          <span class="group-option__value">${formatValue(latest)}</span>
        </button>
      `;
    }).join("");
  }
  groupDropdown.querySelectorAll("[data-group]").forEach(button => button.addEventListener("click", () => toggleGroup(button.dataset.group)));
}

function toggleGroup(id) {
  if (state.selected.includes(id)) {
    state.selected = state.selected.filter(groupId => groupId !== id);
  } else if (state.selected.length < 10) {
    state.selected.push(id);
  } else {
    showToast(`最多选择10个${currentDimension().label}进行趋势对比，请移除已有对象后再选择。`);
    return;
  }
  state.hiddenSeries.delete(id);
  render();
}

function renderSelectedGroups() {
  const selected = currentDimension().objects.filter(group => state.selected.includes(group.id));
  selectedGroups.innerHTML = selected.map((group, index) => `
    <span class="selected-group selected-group--${index}" title="${group.path} / ${group.name}">
      ${group.name}<button type="button" data-remove="${group.id}" aria-label="移除${group.name}">×</button>
    </span>
  `).join("");
  selectedGroups.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => toggleGroup(button.dataset.remove)));
  const dimensionLabel = currentDimension().label;
  document.querySelector("#selectedGroupText").textContent = selected.length ? `已选择 ${selected.length} 个${dimensionLabel}` : `请选择对比${dimensionLabel}`;
  document.querySelector("#compareObjectLabel").textContent = `对比${dimensionLabel}`;
  const limit = document.querySelector("#groupLimit");
  limit.textContent = selected.length >= 10 ? `已达到10个${dimensionLabel}上限` : `已选${selected.length}/10个${dimensionLabel}`;
  limit.classList.toggle("is-limit", selected.length >= 10);
}

function seriesList() {
  const series = [];
  if (state.mode === "total") {
    state.summaryMetrics.forEach((key, index) => {
      series.push({ id: `metric-${key}`, name: currentMetric(key).name, className: `group-${index}`, metricKey: key, data: totalMetricValues(key) });
    });
  } else if (state.showTotal) {
    series.push({ id: "total", name: "筛选范围总计", className: "total", metricKey: state.metric, data: totalMetricValues(state.metric) });
  }
  if (state.mode === "compare") {
    currentDimension().objects.filter(group => state.selected.includes(group.id)).forEach((group, index) => {
      series.push({ id: group.id, name: group.name, className: `group-${index}`, metricKey: state.metric, data: scaled(group.data) });
    });
  }
  return series;
}

function renderLegend() {
  const visibleSeries = seriesList();
  document.querySelector("#chartLegend").innerHTML = visibleSeries.map(series => `
    <button class="legend-item ${state.hiddenSeries.has(series.id) ? "is-hidden-line" : ""}" type="button" data-series="${series.id}">
      <span class="legend-item__line ${series.className}"></span>${series.name}
    </button>
  `).join("");
  document.querySelectorAll("[data-series]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.series;
    state.hiddenSeries.has(id) ? state.hiddenSeries.delete(id) : state.hiddenSeries.add(id);
    renderChart();
    renderLegend();
  }));
}

function renderChart() {
  const rawSeries = seriesList().filter(item => !state.hiddenSeries.has(item.id));
  const useIndex = state.mode === "total" && rawSeries.length > 1;
  const series = rawSeries.map(item => ({
    ...item,
    chartData: useIndex ? item.data.map(value => value / Math.max(item.data[1], .000001) * 100) : item.data
  }));
  const width = 1440;
  const height = 430;
  const margin = { top: 25, right: 35, bottom: 45, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const allValues = series.flatMap(item => item.chartData);
  const rawMax = Math.max(...allValues, 1);
  const max = rawMax * 1.18;
  const x = index => margin.left + index * (innerWidth / (periods.length - 1));
  const y = value => margin.top + innerHeight - (value / max) * innerHeight;
  const linePath = values => values.map((value, index) => `${index ? "L" : "M"} ${x(index)} ${y(value)}`).join(" ");
  const areaPath = values => `${linePath(values)} L ${x(values.length - 1)} ${margin.top + innerHeight} L ${x(0)} ${margin.top + innerHeight} Z`;

  const labels = periods.map((period, index) => `<text class="axis-label" x="${x(index)}" y="${height - 16}" text-anchor="middle">${period}</text>`).join("");
  const axisFormat = value => useIndex ? `${value.toFixed(0)}` : formatValue(value, series[0]?.metricKey);
  const gridWithFormat = Array.from({ length: 6 }, (_, index) => {
    const value = max * (5 - index) / 5;
    const position = margin.top + index * innerHeight / 5;
    return `<line class="grid-line" x1="${margin.left}" y1="${position}" x2="${width - margin.right}" y2="${position}"></line>
      <text class="axis-label" x="${margin.left - 12}" y="${position + 4}" text-anchor="end">${axisFormat(value)}</text>`;
  }).join("");
  const paths = series.map(item => {
    const points = item.chartData.map((value, index) => `<circle class="trend-point fill-${item.className}" cx="${x(index)}" cy="${y(value)}" r="5" data-point="${item.id}" data-index="${index}"></circle>`).join("");
    const area = series.length <= 4 && (series.length === 1 || item.id === "total")
      ? `<path class="trend-area fill-${item.className}" d="${areaPath(item.chartData)}"></path>`
      : "";
    return `${area}<path class="trend-line trend-${item.className}" d="${linePath(item.chartData)}"></path>${points}`;
  }).join("");
  chart.innerHTML = `${gridWithFormat}${labels}${paths}`;

  chart.querySelectorAll("[data-point]").forEach(point => {
    point.addEventListener("mouseenter", event => showTooltip(event, Number(point.dataset.index), series));
    point.addEventListener("mouseleave", () => tooltip.classList.add("is-hidden"));
  });
}

function rankingValue(value) {
  if (state.ranking === "margin") return `${value.toFixed(2)}%`;
  return value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderRanking() {
  const rows = salespeople
    .filter(person => state.tenureFilter === "all" || employeeType(person) === state.tenureFilter)
    .sort((a, b) => b[state.ranking][0] - a[state.ranking][0]);
  if (!rows.length) {
    rankingChart.innerHTML = `<div class="empty-state">当前入职年限条件下暂无销售员数据</div>`;
    return;
  }
  const max = Math.max(...rows.flatMap(person => person[state.ranking]));
  rankingChart.innerHTML = rows.map((person, index) => {
    const current = person[state.ranking][0];
    const compare = person[state.ranking][1];
    const type = employeeType(person);
    return `
      <div class="ranking-row" data-person="${person.name}">
        <div class="ranking-person">
          <span>${index + 1}. ${person.name}</span>
          <span class="employee-badge employee-badge--${type}">${employeeTypeLabel(person)}</span>
          <span class="hire-info" aria-label="${person.name}入职信息" title="${person.name}｜入职时间：${person.hireDate}｜司龄：${person.tenure}">i
            <span class="hire-info__popover"><strong>${person.name}</strong><br>员工类型：${employeeTypeLabel(person)}<br>入职时间：${person.hireDate}<br>司龄：${person.tenure}</span>
          </span>
        </div>
        <div class="ranking-bars">
          <span class="ranking-bar ranking-bar--current" style="width:${current / max * 88}%"><b class="ranking-value">${rankingValue(current)}</b></span>
          <span class="ranking-bar ranking-bar--compare" style="width:${compare / max * 88}%"><b class="ranking-value">${rankingValue(compare)}</b></span>
        </div>
      </div>
    `;
  }).join("");
  rankingChart.querySelectorAll("[data-person]").forEach(row => {
    row.addEventListener("mouseenter", event => showRankingTooltip(event, row.dataset.person));
    row.addEventListener("mousemove", event => positionRankingTooltip(event));
    row.addEventListener("mouseleave", () => rankingTooltip.classList.add("is-hidden"));
  });
  if (!rankingModalMask.classList.contains("is-hidden")) renderRankingModal();
}

function renderRankingModal() {
  const rows = salespeople
    .filter(person => state.tenureFilter === "all" || employeeType(person) === state.tenureFilter)
    .sort((a, b) => b[state.ranking][0] - a[state.ranking][0]);
  if (!rows.length) {
    rankingModalChart.innerHTML = `<div class="empty-state">当前入职年限条件下暂无运营人员数据</div>`;
    return;
  }
  const max = Math.max(...rows.flatMap(person => person[state.ranking]));
  rankingModalChart.innerHTML = rows.map((person, index) => {
    const current = person[state.ranking][0];
    const compare = person[state.ranking][1];
    const type = employeeType(person);
    return `
      <div class="ranking-row" data-modal-person="${person.name}">
        <div class="ranking-person"><span>${index + 1}. ${person.name}</span></div>
        <div class="ranking-modal__employee-type"><span class="employee-badge employee-badge--${type}">${employeeTypeLabel(person)}</span></div>
        <div class="ranking-modal__hire-date">${person.hireDate}</div>
        <div class="ranking-bars">
          <span class="ranking-bar ranking-bar--current" style="width:${current / max * 88}%"><b class="ranking-value">${rankingValue(current)}</b></span>
          <span class="ranking-bar ranking-bar--compare" style="width:${compare / max * 88}%"><b class="ranking-value">${rankingValue(compare)}</b></span>
        </div>
      </div>
    `;
  }).join("");
}

function openRankingModal() {
  rankingModalMask.classList.remove("is-hidden");
  document.body.style.overflow = "hidden";
  renderRankingModal();
}

function closeRankingModal() {
  rankingModalMask.classList.add("is-hidden");
  document.body.style.overflow = "";
}

function showRankingTooltip(event, name) {
  const person = salespeople.find(item => item.name === name);
  const values = person[state.ranking];
  rankingTooltip.innerHTML = `
    <div class="ranking-tooltip__title">${person.name}</div>
    <div class="ranking-tooltip__row"><span>员工类型</span><strong>${employeeTypeLabel(person)}</strong></div>
    <div class="ranking-tooltip__row"><span>入职时间</span><strong>${person.hireDate}</strong></div>
    <div class="ranking-tooltip__row"><span>统计时间（2026-06-01 ~ 2026-06-06）</span><strong>${rankingValue(values[0])}</strong></div>
    <div class="ranking-tooltip__row"><span>对比时间（2026-05-26 ~ 2026-05-31）</span><strong>${rankingValue(values[1])}</strong></div>
  `;
  positionRankingTooltip(event);
  rankingTooltip.classList.remove("is-hidden");
}

function positionRankingTooltip(event) {
  rankingTooltip.style.left = `${Math.min(event.clientX + 14, window.innerWidth - 320)}px`;
  rankingTooltip.style.top = `${Math.max(event.clientY - 80, 12)}px`;
}

function showTooltip(event, index, series) {
  tooltip.innerHTML = `<strong>${periods[index]}</strong>${series.map(item => `
    <div class="tooltip-row"><span>${item.name}</span><b>${formatValue(item.data[index], item.metricKey)}</b></div>
  `).join("")}`;
  const rect = document.querySelector(".chart-wrap").getBoundingClientRect();
  tooltip.style.left = `${Math.min(event.clientX - rect.left + 12, rect.width - 240)}px`;
  tooltip.style.top = `${Math.max(event.clientY - rect.top - 30, 10)}px`;
  tooltip.classList.remove("is-hidden");
}

function render() {
  const compare = state.mode === "compare";
  toolbar.classList.toggle("is-hidden", !compare);
  selectedGroups.classList.toggle("is-hidden", !compare);
  document.querySelectorAll("[data-mode]").forEach(button => button.classList.toggle("active", button.dataset.mode === state.mode));
  document.querySelector("#chartTitle").textContent = compare ? `${currentMetric().name}趋势` : "汇总指标趋势";
  document.querySelector("#chartSubtitle").textContent = compare ? `${currentDimension().label}对比 · 单指标 · 已选${state.selected.length}个` : `已选${state.summaryMetrics.length}/4个指标`;
  document.querySelector("#chartNoteText").textContent = compare ? "分组对比仅支持1个指标，点击上方业务指标卡可切换" : (state.summaryMetrics.length > 1 ? "多指标单位不同，纵轴使用趋势指数；悬浮数据点展示原始业务值" : "点击上方业务指标卡可选择最多4个汇总趋势指标");
  renderMetrics();
  renderSelectedGroups();
  renderDropdown();
  renderLegend();
  renderChart();
  renderRanking();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("is-hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("is-hidden"), 2400);
}

document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
  state.mode = button.dataset.mode;
  if (state.mode === "compare") state.metric = state.summaryMetrics[0];
  state.hiddenSeries.clear();
  render();
}));
document.querySelectorAll("[data-dimension]").forEach(button => button.addEventListener("click", () => {
  state.dimension = button.dataset.dimension;
  state.selected = currentDimension().objects.slice(0, state.dimension === "operator" ? 10 : 2).map(item => item.id);
  state.hiddenSeries.clear();
  document.querySelectorAll("[data-dimension]").forEach(item => item.classList.toggle("active", item === button));
  render();
  showToast(`对比维度已切换为${currentDimension().label}，已选择${state.selected.length}个同级对象。`);
}));
groupTrigger.addEventListener("click", event => {
  event.stopPropagation();
  groupDropdown.classList.toggle("is-hidden");
});
document.addEventListener("click", event => {
  if (!groupDropdown.contains(event.target)) groupDropdown.classList.add("is-hidden");
});
[
  ["#businessUnitTrigger", businessUnitDropdown],
  ["#storeFilterTrigger", storeFilterDropdown],
  ["#operatorFilterTrigger", operatorFilterDropdown],
  ["#tenureFilterTrigger", tenureFilterDropdown]
].forEach(([selector, dropdown]) => {
  document.querySelector(selector).addEventListener("click", event => {
    event.stopPropagation();
    [businessUnitDropdown, storeFilterDropdown, operatorFilterDropdown, tenureFilterDropdown].forEach(item => {
      if (item !== dropdown) item.classList.add("is-hidden");
    });
    dropdown.classList.toggle("is-hidden");
  });
  dropdown.addEventListener("click", event => event.stopPropagation());
});
document.addEventListener("click", () => {
  [businessUnitDropdown, storeFilterDropdown, operatorFilterDropdown, tenureFilterDropdown].forEach(item => item.classList.add("is-hidden"));
});
document.querySelectorAll("[data-tenure-filter]").forEach(button => button.addEventListener("click", () => {
  state.tenureFilter = button.dataset.tenureFilter;
  document.querySelector("#tenureFilterValue").textContent = button.textContent;
  document.querySelectorAll("[data-tenure-filter]").forEach(item => item.classList.toggle("is-selected", item === button));
  tenureFilterDropdown.classList.add("is-hidden");
  renderRanking();
  showToast(`销售员排名已筛选：${button.textContent}`);
}));
totalSwitch.addEventListener("change", () => {
  state.showTotal = totalSwitch.checked;
  state.hiddenSeries.delete("total");
  render();
});
document.querySelectorAll("[data-ranking]").forEach(button => button.addEventListener("click", () => {
  state.ranking = button.dataset.ranking;
  document.querySelectorAll("[data-ranking]").forEach(item => item.classList.toggle("active", item.dataset.ranking === state.ranking));
  renderRanking();
}));
document.querySelector("#rankingFullscreenBtn").addEventListener("click", openRankingModal);
document.querySelector("#rankingModalClose").addEventListener("click", closeRankingModal);
rankingModalMask.addEventListener("click", event => {
  if (event.target === rankingModalMask) closeRankingModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !rankingModalMask.classList.contains("is-hidden")) closeRankingModal();
});
document.querySelector("#searchBtn").addEventListener("click", () => {
  const selectedUnits = businessUnits.filter(item => item.selected && item.level === 2).length;
  showToast(`已按 ${selectedUnits} 个业务单元、店铺、运营人员及入职年限条件重新计算数据`);
});
document.querySelector("#resetBtn").addEventListener("click", () => {
  state.metric = "sales";
  state.summaryMetrics = ["sales"];
  state.mode = "total";
  state.dimension = "division";
  state.selected = ["d1", "d2"];
  state.showTotal = true;
  state.tenureFilter = "all";
  state.storeFilter = null;
  state.operatorFilter = null;
  businessUnits.forEach(item => item.selected = true);
  totalSwitch.checked = true;
  document.querySelector("#tenureFilterValue").textContent = "全部员工";
  document.querySelector("#storeFilterValue").textContent = "请选择店铺";
  document.querySelector("#operatorFilterValue").textContent = "请选择运营人员";
  renderBusinessUnitValue();
  renderBusinessUnitTree();
  renderFilterOptions(storeFilterDropdown, compareDimensions.store.objects, null, "store");
  renderFilterOptions(operatorFilterDropdown, compareDimensions.operator.objects, null, "operator");
  state.hiddenSeries.clear();
  document.querySelectorAll("[data-dimension]").forEach(item => item.classList.toggle("active", item.dataset.dimension === "division"));
  render();
  showToast("筛选与趋势设置已重置");
});

renderBusinessUnitTree();
renderFilterOptions(storeFilterDropdown, compareDimensions.store.objects, state.storeFilter, "store");
renderFilterOptions(operatorFilterDropdown, compareDimensions.operator.objects, state.operatorFilter, "operator");
render();
