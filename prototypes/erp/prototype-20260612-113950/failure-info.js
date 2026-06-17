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
        <span>影响范围：<b>3 个店铺 / 12 个 SKU</b></span>
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
            <tr><td>TIK202_TH_EL</td><td>智能手表<br><code>SKU-WATCH-01</code></td><td>商品当前不可参加平台活动</td><td><code>PRODUCT_NOT_ELIGIBLE<br>request_id: req_260615_003</code></td><td><button type="button" data-retry-one>查看商品</button></td></tr>
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
      enhanceListLevel();
      compactRowActions();
      enhanceDetailAndSkuLevels();
    });
  };

  new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true });
  enhance();
})();
