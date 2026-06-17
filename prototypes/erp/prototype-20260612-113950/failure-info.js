(() => {
  const failedActivityName = "黑五电子产品降价";
  const textDetail = "详情";
  const textView = "查看";
  const textViewFailure = "查看失败";
  const textMore = "更多";
  const preferredActions = [
    { status: "待审核", actions: ["通过"] },
    { status: "已拒绝", actions: ["重新提交"] },
    { status: "草稿", actions: ["编辑"] },
    { status: "执行中", actions: [textDetail] },
    { status: "结束", actions: [textView] },
  ];
  let comparisonText = "环比上周期";
  const singleStoreByActivity = {
    "双11鞋服大促": "SPE002_VN_BT",
    "黑五电子产品降价": "TIK201_US_EL",
    "双12预热-台湾站": "SPE088_TW_HM",
    "清仓大处理": "TIK_TH_01",
    "春季上新活动": "VN_STORE_02",
  };
  const storeOptions = ["全部店铺", "SPE002_VN_BT", "TIK201_US_EL", "SPE088_TW_HM", "TIK_TH_01", "VN_STORE_02"];

  const showToast = (message) => {
    document.querySelector(".failure-toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "failure-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  };

  const openFailedActivity = () => {
    const row = [...document.querySelectorAll("tbody tr")].find((item) =>
      item.textContent.includes(failedActivityName)
    );
    const detailButton = [...(row?.querySelectorAll("button") || [])].find(
      (button) => button.textContent.trim() === textDetail
    );
    detailButton?.click();
  };

  const closeActionMenus = (exceptMenu) => {
    document.querySelectorAll(".row-action-menu.is-open").forEach((menu) => {
      if (menu !== exceptMenu) menu.classList.remove("is-open");
    });
  };

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".row-action-compact")) closeActionMenus();
  });

  const createProxyButton = (source, className) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = source.textContent.trim();
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeActionMenus();
      source.click();
    });
    return button;
  };

  const setNativeValue = (element, value) => {
    const descriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, "value");
    descriptor?.set ? descriptor.set.call(element, value) : (element.value = value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const createFilterField = (labelText, control) => {
    const field = document.createElement("label");
    field.className = "top-filter-field";
    const label = document.createElement("span");
    label.textContent = labelText;
    field.append(label, control);
    return field;
  };

  const syncSelectOptions = (proxy, source) => {
    proxy.innerHTML = "";
    [...source.options].forEach((option) => {
      const next = document.createElement("option");
      next.value = option.value;
      next.textContent = option.textContent;
      proxy.appendChild(next);
    });
    proxy.value = source.value;
  };

  const createMonthGrid = (year, month, activeDays = []) => {
    const monthStart = new Date(year, month - 1, 1);
    const startOffset = monthStart.getDay() || 7;
    const daysInMonth = new Date(year, month, 0).getDate();
    let day = 2 - startOffset;
    const table = document.createElement("div");
    table.className = "date-month";
    table.innerHTML = `
      <div class="date-month-title">${year}年 ${month}月</div>
      <div class="date-weekdays"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
    `;
    const grid = document.createElement("div");
    grid.className = "date-days";
    for (let i = 0; i < 42; i += 1) {
      const current = document.createElement("button");
      current.type = "button";
      current.className = "date-day";
      const isCurrentMonth = day >= 1 && day <= daysInMonth;
      current.textContent = String(isCurrentMonth ? day : new Date(year, month - 1, day).getDate());
      if (!isCurrentMonth) current.classList.add("is-muted");
      if (isCurrentMonth && activeDays.includes(day)) current.classList.add("is-active");
      grid.appendChild(current);
      day += 1;
    }
    table.appendChild(grid);
    return table;
  };

  const createDateComparisonControl = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "date-filter-combo c-date-comparison";
    wrapper.dataset.dateFilterCombo = "true";

    const range = document.createElement("input");
    range.type = "text";
    range.readOnly = true;
    range.className = "top-filter-control date-range-trigger";
    range.value = "2026-06-17 ~ 2026-06-17";
    range.setAttribute("aria-label", "统计时间");

    const mode = document.createElement("div");
    mode.className = "compare-mode";
    mode.innerHTML = `
      <button type="button" class="is-active" data-compare-mode="period">环比上周期</button>
      <button type="button" data-compare-mode="year">同比去年同期</button>
      <button type="button" data-compare-mode="none">不对比</button>
    `;

    mode.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        mode.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        comparisonText = button.textContent.trim();
        enhanceMetricComparison();
      });
    });

    wrapper.append(range, mode);
    return wrapper;
  };

  const enhanceMetricComparison = () => {
    const metricGrid = [...document.querySelectorAll("main > div.grid")].find((grid) =>
      grid.textContent.includes("订单数") && grid.textContent.includes("销售额") && grid.textContent.includes("销量")
    );
    if (!metricGrid) return;

    metricGrid.querySelectorAll(":scope > div").forEach((card) => {
      let note = card.querySelector(".metric-compare-note");
      if (!note) {
        note = document.createElement("div");
        note.className = "metric-compare-note";
        card.appendChild(note);
      }
      note.textContent = `对比时间：${comparisonText || "上期同周期"}`;
    });
  };

  const enhanceTopFilters = () => {
    const main = document.querySelector("main");
    const topToolbar = main?.firstElementChild;
    const listRoot = [...document.querySelectorAll("main > div")].find((item) =>
      item.textContent.includes("折扣活动列表")
    );
    const listFilter = [...(listRoot?.children || [])].find((item) =>
      item.textContent.includes("活动名称:") && item.textContent.includes("活动类型:")
    );
    if (!topToolbar || !listFilter) return;

    listFilter.classList.add("list-filter-source-hidden");

    if (!topToolbar.querySelector("[data-top-list-filters]")) {
      topToolbar.classList.add("top-filter-toolbar");
      const sourceInput = listFilter.querySelector("input");
      const sourceSelects = listFilter.querySelectorAll("select");
      const sourceButtons = [...listFilter.querySelectorAll("button")];
      const sourceQuery = sourceButtons.find((button) => button.textContent.trim() === "查询");
      const sourceReset = sourceButtons.find((button) => button.textContent.trim() === "重置");

      const group = document.createElement("div");
      group.className = "top-list-filters c-filter__row";
      group.dataset.topListFilters = "true";

      if (sourceInput) {
        const proxy = document.createElement("input");
        proxy.type = "text";
        proxy.placeholder = sourceInput.placeholder || "请输入";
        proxy.className = "top-filter-control top-filter-input";
        proxy.value = sourceInput.value;
        proxy.addEventListener("input", () => setNativeValue(sourceInput, proxy.value));
        group.appendChild(createFilterField("活动名称", proxy));
      }

      if (sourceSelects[0]) {
        const proxy = document.createElement("select");
        proxy.className = "top-filter-control";
        syncSelectOptions(proxy, sourceSelects[0]);
        proxy.addEventListener("change", () => setNativeValue(sourceSelects[0], proxy.value));
        group.appendChild(createFilterField("活动类型", proxy));
      }

      if (sourceSelects[1]) {
        const proxy = document.createElement("select");
        proxy.className = "top-filter-control";
        syncSelectOptions(proxy, sourceSelects[1]);
        proxy.addEventListener("change", () => setNativeValue(sourceSelects[1], proxy.value));
        group.appendChild(createFilterField("状态", proxy));
      }

      const store = document.createElement("select");
      store.className = "top-filter-control top-store-select";
      storeOptions.forEach((text) => {
        const option = document.createElement("option");
        option.value = text === "全部店铺" ? "" : text;
        option.textContent = text;
        store.appendChild(option);
      });
      group.appendChild(createFilterField("店铺", store));

      const dateField = createFilterField("统计时间", createDateComparisonControl());
      dateField.classList.add("top-filter-field--wide");
      group.appendChild(dateField);

      const chips = document.createElement("div");
      chips.className = "top-filter-chips";
      chips.innerHTML = `
        <span class="top-filter-chip">统计时间：2026-06-17 至 2026-06-17 <button type="button">×</button></span>
        <span class="top-filter-chip">对比：环比上周期 <button type="button">×</button></span>
        <span class="top-filter-clear">全部清空</span>
      `;

      const actionGroup = [...topToolbar.children].find((item) => item.textContent.includes("查询") && item.textContent.includes("重置"));
      [...topToolbar.children].forEach((child) => {
        if (child !== actionGroup && child !== group) child.classList.add("top-source-filter-hidden");
      });
      actionGroup?.classList.add("top-action-group");
      topToolbar.insertBefore(group, actionGroup || null);
      topToolbar.appendChild(chips);

      actionGroup?.querySelectorAll("button").forEach((button) => {
        if (button.dataset.listFilterLinked === "true") return;
        button.dataset.listFilterLinked = "true";
        button.addEventListener("click", () => {
          const text = button.textContent.trim();
          if (text === "查询") sourceQuery?.click();
          if (text === "重置") {
            sourceReset?.click();
            if (sourceInput) setNativeValue(sourceInput, "");
            sourceSelects.forEach((select) => setNativeValue(select, ""));
            group.querySelectorAll("input").forEach((input) => {
              input.value = "";
            });
            group.querySelectorAll("select").forEach((select) => {
              select.selectedIndex = 0;
            });
            comparisonText = "环比上周期";
            group.querySelector(".compare-mode button[data-compare-mode='period']")?.click();
            group.querySelector(".date-range-trigger").value = "2026-06-17 ~ 2026-06-17";
            enhanceMetricComparison();
          }
        });
      });
    }

    const chartRoot = [...document.querySelectorAll("main > div")].find((item) =>
      item.textContent.includes("汇总趋势图")
    );
    const chartHeader = chartRoot?.firstElementChild;
    if (chartHeader) {
      chartHeader.classList.add("chart-filter-source-hidden");
      const chartControls = chartHeader.lastElementChild;
      const metricGroup = chartControls?.firstElementChild;
      const pointGroup = chartControls?.children?.[1];
      if (metricGroup && metricGroup.dataset.metricOrderEnhanced !== "true") {
        metricGroup.dataset.metricOrderEnhanced = "true";
        ["销量", "销售额", "订单数"].forEach((text) => {
          const button = [...metricGroup.querySelectorAll("button")].find((item) => item.textContent.trim() === text);
          if (button) metricGroup.appendChild(button);
        });
      }
      if (pointGroup) {
        pointGroup.classList.add("chart-point-control");
        const label = pointGroup.querySelector("span");
        if (label) label.textContent = "数据点";
        const toggle = pointGroup.querySelector("button");
        if (toggle) {
          toggle.classList.add("chart-point-toggle");
          toggle.classList.toggle("is-active", toggle.className.includes("bg-[#1677ff]"));
        }
      }
    }

    enhanceMetricComparison();
  };

  const removeProductImages = () => {
    const table = [...document.querySelectorAll("table")].find((item) =>
      [...item.querySelectorAll("thead th")].some((header) => header.textContent.trim() === "产品")
    );
    if (!table) return;

    const headers = [...table.querySelectorAll("thead th")];
    const productColumnIndex = headers.findIndex((header) => header.textContent.trim() === "产品");
    if (productColumnIndex < 0) return;

    table.querySelectorAll("tbody tr").forEach((row) => {
      const cell = row.children[productColumnIndex];
      if (!cell || cell.dataset.productImagesRemoved === "true" || !cell.querySelector("img")) return;

      const rawText = cell.textContent.trim();
      const count = rawText.match(/\+?(\d+)/)?.[1] || "0";
      cell.dataset.productImagesRemoved = "true";
      cell.innerHTML = `
        <div class="product-count-summary">
          <span class="product-count-value">${count}</span>
          <span class="product-count-label">个商品</span>
        </div>
      `;
    });
  };

  const enforceSingleStoreActivities = () => {
    const table = [...document.querySelectorAll("table")].find((item) =>
      [...item.querySelectorAll("thead th")].some((header) => header.textContent.trim() === "店铺")
    );
    if (!table) return;

    const headers = [...table.querySelectorAll("thead th")];
    const storeColumnIndex = headers.findIndex((header) => header.textContent.trim() === "店铺");
    if (storeColumnIndex < 0) return;

    table.querySelectorAll("tbody tr").forEach((row) => {
      const activityName = Object.keys(singleStoreByActivity).find((name) => row.textContent.includes(name));
      const cell = row.children[storeColumnIndex];
      if (!activityName || !cell || cell.dataset.singleStoreEnhanced === "true") return;

      const store = singleStoreByActivity[activityName];
      cell.dataset.singleStoreEnhanced = "true";
      cell.innerHTML = `
        <div class="single-store-cell">
          <span>${store}</span>
        </div>
      `;
    });
  };

  const enforceSingleStoreDetail = () => {
    const heading = [...document.querySelectorAll("h2")].find((item) =>
      Object.keys(singleStoreByActivity).includes(item.textContent.trim())
    );
    if (!heading) return;

    const store = singleStoreByActivity[heading.textContent.trim()];
    if (!store) return;

    const detailRoot = heading.closest("main > div") || heading.parentElement?.parentElement?.parentElement;
    const storeBlock = [...(detailRoot?.querySelectorAll("div") || [])].find((item) =>
      item.className.includes("col-span-2") && item.textContent.includes("生效店铺")
    );
    if (!storeBlock || storeBlock.dataset.singleStoreDetail === "true") return;

    storeBlock.dataset.singleStoreDetail = "true";
    storeBlock.innerHTML = `
      <span class="single-detail-label">生效店铺</span>
      <div class="single-detail-store">
        <strong>${store}</strong>
        <span>一个活动仅对应一个店铺，商品结构和价格按店铺独立维护</span>
      </div>
    `;
  };

  const pickPrimaryAction = (row, buttons) => {
    const failureAction = buttons.find((button) => button.textContent.trim() === textViewFailure);
    if (failureAction) return failureAction;

    const statusText = row.textContent;
    for (const rule of preferredActions) {
      if (!statusText.includes(rule.status)) continue;
      const matched = buttons.find((button) => rule.actions.includes(button.textContent.trim()));
      if (matched) return matched;
    }

    return buttons.find((button) => [textDetail, textView].includes(button.textContent.trim())) || buttons[0];
  };

  const compactRowActions = () => {
    document.querySelectorAll("tbody tr").forEach((row) => {
      const actionCell = row.querySelector("td:last-child");
      const actionWrap = actionCell?.querySelector("div");
      if (!actionWrap || actionWrap.dataset.actionCompact === "true") return;

      const sourceButtons = [...actionWrap.children].filter(
        (item) => item.tagName === "BUTTON" && !item.classList.contains("row-action-proxy")
      );
      if (sourceButtons.length <= 1) return;

      const primary = pickPrimaryAction(row, sourceButtons);
      if (!primary) return;

      actionWrap.dataset.actionCompact = "true";
      sourceButtons.forEach((button) => button.classList.add("row-action-source"));

      const compact = document.createElement("div");
      compact.className = "row-action-compact";

      const primaryButton = createProxyButton(primary, "row-action-proxy row-action-primary");
      if (primary.textContent.trim() === textViewFailure) primaryButton.classList.add("is-danger");
      compact.appendChild(primaryButton);

      const menuItems = sourceButtons.filter((button) => button !== primary);
      if (menuItems.length > 0) {
        const more = document.createElement("button");
        more.type = "button";
        more.className = "row-action-proxy row-action-more";
        more.textContent = textMore;

        const menu = document.createElement("div");
        menu.className = "row-action-menu";
        menuItems.forEach((source) => menu.appendChild(createProxyButton(source, "row-action-proxy row-action-menu-item")));

        more.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const nextOpen = !menu.classList.contains("is-open");
          closeActionMenus(menu);
          menu.classList.toggle("is-open", nextOpen);
        });

        compact.appendChild(more);
        compact.appendChild(menu);
      }

      actionWrap.appendChild(compact);
    });
  };

  const enhanceValidTimeRanges = () => {
    const table = [...document.querySelectorAll("table")].find((item) =>
      [...item.querySelectorAll("thead th")].some((header) => header.textContent.trim() === "有效时间")
    );
    if (!table) return;

    const headers = [...table.querySelectorAll("thead th")];
    const timeColumnIndex = headers.findIndex((header) => header.textContent.trim() === "有效时间");
    if (timeColumnIndex < 0) return;

    table.querySelectorAll("tbody tr").forEach((row) => {
      const cell = row.children[timeColumnIndex];
      if (!cell || cell.dataset.validTimeEnhanced === "true") return;

      const matches = [...cell.textContent.matchAll(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})/g)];
      if (matches.length < 2) return;

      const [, startDate, startTime] = matches[0];
      const [, endDate, endTime] = matches[1];
      cell.dataset.validTimeEnhanced = "true";
      cell.setAttribute("title", `${startDate} ${startTime} - ${endDate} ${endTime}`);
      cell.innerHTML = `
        <div class="valid-time-range">
          <div class="valid-time-dates">
            <span>${startDate}</span>
            <span class="valid-time-arrow">→</span>
            <span>${endDate}</span>
          </div>
          <div class="valid-time-hours">
            <span>${startTime}</span>
            <span>至</span>
            <span>${endTime}</span>
          </div>
        </div>
      `;
    });
  };

  const enhanceListLevel = () => {
    const row = [...document.querySelectorAll("tbody tr")].find((item) =>
      item.textContent.includes(failedActivityName)
    );
    if (!row || row.dataset.failureEnhanced) return;
    row.dataset.failureEnhanced = "true";

    const firstCell = row.querySelector("td");
    const tag = document.createElement("div");
    tag.className = "failure-list-tag";
    tag.textContent = "发布失败 · 12 个 SKU";
    firstCell?.appendChild(tag);

    const actionCell = row.querySelector("td:last-child");
    const action = document.createElement("button");
    action.className = "failure-action text-sm font-normal";
    action.textContent = "查看失败";
    action.addEventListener("click", openFailedActivity);
    actionCell?.querySelector("div")?.appendChild(action);
  };

  const createDetailPanel = () => {
    const panel = document.createElement("section");
    panel.className = "failure-detail-panel";
    panel.dataset.failureDetail = "true";
    panel.innerHTML = `
      <div class="failure-detail-summary">
        <div>
          <div class="failure-detail-title">活动发布失败</div>
          <div class="failure-detail-desc">活动已创建，但部分商品未能成功绑定。请修正失败商品后重新发布。</div>
        </div>
        <div class="failure-buttons">
          <button type="button" data-retry-all>重试全部失败项</button>
          <button type="button" data-export>导出失败明细</button>
        </div>
      </div>
      <div class="failure-detail-meta">
        <span>失败环节：<b>商品绑定</b></span>
        <span>影响范围：<b>1 个店铺 / 12 个 SKU</b></span>
        <span>失败时间：<b>2026-06-15 10:24:36</b></span>
        <span>建议处理：<b>调整折扣价、补充库存后重试</b></span>
      </div>
      <div class="failure-sku-title">商品 / SKU 失败明细</div>
      <div class="failure-sku-wrap">
        <table class="failure-sku-table">
          <thead><tr><th>店铺</th><th>商品 / SKU</th><th>业务错误原因</th><th>平台技术信息</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td>TIK201_US_EL</td><td>户外折叠椅<br><code>SKU-CHAIR-BLK</code></td><td>折扣价低于平台最低价格限制</td><td><code>PRICE_BELOW_MIN<br>request_id: req_260615_001</code></td><td><button type="button" data-retry-one>修改后重试</button></td></tr>
            <tr><td>TIK201_US_EL</td><td>蓝牙无线耳机<br><code>SKU-EAR-WHT</code></td><td>活动库存不能大于可售库存</td><td><code>STOCK_NOT_ENOUGH<br>request_id: req_260615_002</code></td><td><button type="button" data-retry-one>修改后重试</button></td></tr>
            <tr><td>TIK201_US_EL</td><td>智能手表<br><code>SKU-WATCH-01</code></td><td>商品当前不可参加平台活动</td><td><code>PRODUCT_NOT_ELIGIBLE<br>request_id: req_260615_003</code></td><td><button type="button" data-retry-one>查看商品</button></td></tr>
          </tbody>
        </table>
      </div>
    `;
    panel.querySelector("[data-retry-all]").addEventListener("click", () => showToast("已提交 12 个失败 SKU 的重试任务"));
    panel.querySelector("[data-export]").addEventListener("click", () => showToast("失败明细导出任务已创建"));
    panel.querySelectorAll("[data-retry-one]").forEach((button) =>
      button.addEventListener("click", () => showToast("已进入该 SKU 的处理流程"))
    );
    return panel;
  };

  const enhanceDetailAndSkuLevels = () => {
    const heading = [...document.querySelectorAll("h2")].find(
      (item) => item.textContent.trim() === failedActivityName
    );
    if (!heading) return;
    const detailRoot = heading.closest("main > div") || heading.parentElement?.parentElement?.parentElement;
    if (!detailRoot || detailRoot.querySelector("[data-failure-detail]")) return;
    const firstPanel = heading.closest(".bg-white") || detailRoot.firstElementChild;
    firstPanel?.insertAdjacentElement("afterend", createDetailPanel());
  };

  let scheduled = false;
  const enhance = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhanceTopFilters();
      enhanceListLevel();
      enhanceValidTimeRanges();
      enforceSingleStoreActivities();
      enforceSingleStoreDetail();
      removeProductImages();
      compactRowActions();
      enhanceDetailAndSkuLevels();
    });
  };

  new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true });
  enhance();
})();
