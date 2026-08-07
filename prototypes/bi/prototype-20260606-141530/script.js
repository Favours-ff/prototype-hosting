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
    label: "事业部",
    objects: [
      { id: "d1", name: "深圳速卖通事业部", path: "华南区域 / 跨境电商中心", data: [520, 1850000, 1730000, 2860000, 3470000, 3290000, 4010000, 4140000, 3820000, 3050000, 2710000, 3210000] },
      { id: "d2", name: "广州Shopee事业部", path: "华南区域 / 跨境电商中心", data: [390, 1410000, 1320000, 2130000, 2580000, 2410000, 2960000, 2890000, 2700000, 2110000, 1910000, 2260000] },
      { id: "d3", name: "深圳Lazada事业部", path: "华南区域 / 跨境电商中心", data: [260, 990000, 940000, 1510000, 1830000, 1690000, 2110000, 2050000, 1910000, 1520000, 1360000, 1630000] },
      { id: "d4", name: "杭州亚马逊事业部", path: "华东区域 / 跨境电商中心", data: [180, 730000, 680000, 1120000, 1360000, 1250000, 1530000, 1590000, 1420000, 1160000, 1020000, 1210000] }
    ]
  },
  store: {
    label: "店铺",
    objects: [
      { id: "s1", name: "SPE003_TH_BT", path: "深圳速卖通事业部 / 泰国站", data: [160, 580000, 540000, 880000, 1080000, 990000, 1210000, 1260000, 1130000, 910000, 820000, 970000] },
      { id: "s2", name: "SPE001_TH_BT", path: "深圳速卖通事业部 / 泰国站", data: [145, 530000, 490000, 810000, 970000, 910000, 1110000, 1150000, 1040000, 830000, 740000, 890000] },
      { id: "s3", name: "SPE010_TH_BT", path: "广州Shopee事业部 / 泰国站", data: [130, 470000, 440000, 720000, 860000, 790000, 980000, 950000, 890000, 710000, 650000, 770000] },
      { id: "s4", name: "SPE058_TH_BT", path: "广州Shopee事业部 / 泰国站", data: [115, 420000, 390000, 630000, 760000, 710000, 850000, 870000, 810000, 640000, 580000, 700000] },
      { id: "s5", name: "SPE043_TH_BT", path: "深圳Lazada事业部 / 泰国站", data: [100, 360000, 340000, 550000, 660000, 620000, 750000, 730000, 680000, 540000, 490000, 590000] },
      { id: "s6", name: "SPE047_TH_BT", path: "深圳Lazada事业部 / 泰国站", data: [90, 320000, 300000, 490000, 590000, 550000, 680000, 660000, 610000, 490000, 440000, 530000] }
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
  { name: "潘晶佳", hireDate: "2025-02-10", tenure: "1年4个月", sales: [186736.71, 177545.06], profit: [27184.39, 24987.55], margin: [14.56, 14.07] },
  { name: "胡冰冰", hireDate: "2023-05-15", tenure: "3年1个月", sales: [180234.64, 180965.02], profit: [29372.64, 28155.47], margin: [16.30, 15.56] },
  { name: "吴亦", hireDate: "2024-06-24", tenure: "1年11个月", sales: [170033.50, 227887.34], profit: [24518.22, 31896.42], margin: [14.42, 14.00] },
  { name: "黄高雁", hireDate: "2022-09-19", tenure: "3年8个月", sales: [168908.97, 133426.14], profit: [25690.18, 19773.64], margin: [15.21, 14.82] }
];

const state = {
  metric: "sales",
  summaryMetrics: ["sales"],
  mode: "total",
  dimension: "division",
  selected: ["d1", "d2"],
  showTotal: true,
  hiddenSeries: new Set(),
  ranking: "sales"
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
  const reachedLimit = state.selected.length >= 5;
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
  groupDropdown.querySelectorAll("[data-group]").forEach(button => button.addEventListener("click", () => toggleGroup(button.dataset.group)));
}

function toggleGroup(id) {
  if (state.selected.includes(id)) {
    state.selected = state.selected.filter(groupId => groupId !== id);
  } else if (state.selected.length < 5) {
    state.selected.push(id);
  } else {
    showToast(`最多选择5个${currentDimension().label}进行趋势对比，请移除已有对象后再选择。`);
    return;
  }
  state.hiddenSeries.delete(id);
  render();
}

function renderSelectedGroups() {
  const selected = currentDimension().objects.filter(group => state.selected.includes(group.id));
  selectedGroups.innerHTML = selected.map(group => `
    <span class="selected-group" title="${group.path} / ${group.name}">
      ${group.name}<button type="button" data-remove="${group.id}" aria-label="移除${group.name}">×</button>
    </span>
  `).join("");
  selectedGroups.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => toggleGroup(button.dataset.remove)));
  const dimensionLabel = currentDimension().label;
  document.querySelector("#selectedGroupText").textContent = selected.length ? `已选择 ${selected.length} 个${dimensionLabel}` : `请选择对比${dimensionLabel}`;
  document.querySelector("#compareObjectLabel").textContent = `对比${dimensionLabel}`;
  const limit = document.querySelector("#groupLimit");
  limit.textContent = selected.length >= 5 ? `已达到5个${dimensionLabel}上限` : `已选${selected.length}/5个${dimensionLabel}`;
  limit.classList.toggle("is-limit", selected.length >= 5);
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
    return `<path class="trend-area fill-${item.className}" d="${areaPath(item.chartData)}"></path>
      <path class="trend-line trend-${item.className}" d="${linePath(item.chartData)}"></path>${points}`;
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
  const rows = [...salespeople].sort((a, b) => b[state.ranking][0] - a[state.ranking][0]);
  const max = Math.max(...rows.flatMap(person => person[state.ranking]));
  rankingChart.innerHTML = rows.map((person, index) => {
    const current = person[state.ranking][0];
    const compare = person[state.ranking][1];
    return `
      <div class="ranking-row" data-person="${person.name}">
        <div class="ranking-person">
          <span>${index + 1}. ${person.name}</span>
          <span class="hire-info" aria-label="${person.name}入职信息" title="${person.name}｜入职时间：${person.hireDate}｜司龄：${person.tenure}">i
            <span class="hire-info__popover"><strong>${person.name}</strong><br>入职时间：${person.hireDate}<br>司龄：${person.tenure}</span>
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
}

function showRankingTooltip(event, name) {
  const person = salespeople.find(item => item.name === name);
  const values = person[state.ranking];
  rankingTooltip.innerHTML = `
    <div class="ranking-tooltip__title">${person.name}</div>
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
  state.selected = currentDimension().objects.slice(0, 2).map(item => item.id);
  state.hiddenSeries.clear();
  document.querySelectorAll("[data-dimension]").forEach(item => item.classList.toggle("active", item === button));
  render();
  showToast(`对比维度已切换为${currentDimension().label}，请按需选择对比对象。`);
}));
groupTrigger.addEventListener("click", event => {
  event.stopPropagation();
  groupDropdown.classList.toggle("is-hidden");
});
document.addEventListener("click", event => {
  if (!groupDropdown.contains(event.target)) groupDropdown.classList.add("is-hidden");
});
totalSwitch.addEventListener("change", () => {
  state.showTotal = totalSwitch.checked;
  state.hiddenSeries.delete("total");
  render();
});
document.querySelectorAll("[data-ranking]").forEach(button => button.addEventListener("click", () => {
  state.ranking = button.dataset.ranking;
  document.querySelectorAll("[data-ranking]").forEach(item => item.classList.toggle("active", item === button));
  renderRanking();
}));
document.querySelector("#searchBtn").addEventListener("click", () => showToast("已按顶部筛选条件重新计算汇总趋势和对比对象数据"));
document.querySelector("#resetBtn").addEventListener("click", () => {
  state.metric = "sales";
  state.summaryMetrics = ["sales"];
  state.mode = "total";
  state.dimension = "division";
  state.selected = ["d1", "d2"];
  state.showTotal = true;
  totalSwitch.checked = true;
  state.hiddenSeries.clear();
  document.querySelectorAll("[data-dimension]").forEach(item => item.classList.toggle("active", item.dataset.dimension === "division"));
  render();
  showToast("筛选与趋势设置已重置");
});

render();
