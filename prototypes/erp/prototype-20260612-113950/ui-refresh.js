(() => {
  const exactText = (selector, text) =>
    [...document.querySelectorAll(selector)].find((node) => node.textContent.trim() === text);

  const directChildOf = (node, parent) => {
    let current = node;
    while (current && current.parentElement !== parent) current = current.parentElement;
    return current;
  };

  const patchListView = () => {
    const main = document.querySelector("main");
    const listTitle = exactText("h2", "折扣活动列表") || exactText("h2", "活动列表");
    if (!main || !listTitle) return;

    const listPanel = directChildOf(listTitle, main);
    if (!listPanel) return;
    listPanel.dataset.uiListPanel = "true";

    [...main.children].forEach((child) => {
      if (child !== listPanel && !child.hasAttribute("data-ui-page-header")) {
        child.dataset.uiPruned = "true";
      }
    });

    const listHeading = listTitle.parentElement;
    if (listHeading) listHeading.dataset.uiListHeading = "true";
    listTitle.textContent = "活动列表";

    const originalPrimary = exactText("button", "+ 新建活动");
    if (originalPrimary) originalPrimary.dataset.uiOriginalPrimary = "true";

    if (!main.querySelector("[data-ui-page-header]")) {
      const pageHeader = document.createElement("section");
      pageHeader.dataset.uiPageHeader = "true";
      pageHeader.innerHTML = `
        <div>
          <h1>折扣活动</h1>
          <p>统一维护 Shopee 与 TikTok 折扣活动，跟踪审核、执行与异常状态。</p>
        </div>
        <button class="ui-primary-action" type="button">新建折扣活动</button>
      `;
      pageHeader.querySelector("button").addEventListener("click", () => originalPrimary?.click());
      main.insertBefore(pageHeader, listPanel);
    }

    listPanel.querySelectorAll("tbody tr").forEach((row) => {
      const actions = [...row.querySelectorAll("td:last-child button")];
      if (actions.length <= 3) return;
      actions.forEach((button, index) => {
        button.dataset.uiRowActionHidden = index > 1 && index < actions.length - 1 ? "true" : "false";
      });
    });
  };

  const patchShell = () => {
    const brand = exactText("div,span", "Marketing Pro");
    if (brand) {
      brand.textContent = "ERP 运营中心";
      brand.dataset.uiBrand = "true";
    }

    const header = document.querySelector("header");
    const headerTitle = header?.querySelector("h1");
    if (headerTitle) headerTitle.textContent = "销售运营";

    if (header && !header.querySelector(".ui-header-actions")) {
      const actions = document.createElement("div");
      actions.className = "ui-header-actions";
      actions.innerHTML = `
        <button class="ui-header-action" type="button" title="帮助" aria-label="帮助">?</button>
        <button class="ui-header-action" type="button" title="通知" aria-label="通知">◌</button>
      `;
      const admin = [...header.children].find((child) => child.textContent.includes("管理员"));
      header.insertBefore(actions, admin || null);
    }
  };

  const patchPageState = () => {
    const pageHeader = document.querySelector("[data-ui-page-header]");
    if (!pageHeader) return;
    pageHeader.dataset.uiPruned = exactText("h1", "创建新活动") ? "true" : "false";
  };

  let scheduled = false;
  const patch = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      patchShell();
      patchListView();
      patchPageState();
    });
  };

  new MutationObserver(patch).observe(document.documentElement, { childList: true, subtree: true });
  patch();
})();
