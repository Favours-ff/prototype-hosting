(() => {
  const addressHeaders = ['对象名称', '联系人', '电话', '完整地址', '地址角色', '状态', '最近成功同步', '操作'];
  const platformShopHeaders = ['后台店铺名称', '所属平台', '店铺类型', '后台经营表现', '操作'];
  const systemShopNames = new Map([
    ['SPE055', 'SHP-TH-000055'],
  ]);
  const shopSites = new Map([
    ['SPE055', 'TH'],
    ['LAZ-TH-001', 'TH'],
    ['TTS-UK-002', 'UK'],
  ]);
  const mappings = new Map([['sp-address-001', '泰国曼谷中心仓']]);
  let activeRow = null;
  let observerScheduled = false;

  function textOf(element) {
    return element ? element.textContent.trim() : '';
  }

  function isAddressTable(table) {
    const headers = [...table.querySelectorAll('thead th')].map(textOf);
    return addressHeaders.every((header, index) => headers[index] === header);
  }

  function isPlatformShopTable(table) {
    const headers = [...table.querySelectorAll('thead th')].map(textOf);
    const isOriginal = platformShopHeaders.every((header, index) => headers[index] === header);
    const isPatched = headers[0] === '系统店铺名称'
      && headers[1] === '后台店铺名称'
      && headers[2] === '站点';
    return isOriginal || isPatched;
  }

  function makeCell(tagName, text, className = '') {
    const cell = document.createElement(tagName);
    cell.className = `ant-table-cell${className ? ` ${className}` : ''}`;
    cell.textContent = text;
    return cell;
  }

  function insertColumn(table) {
    if (table.dataset.systemWarehousePatched === 'true') return;
    table.dataset.systemWarehousePatched = 'true';

    const width = Number.parseInt(table.style.width, 10);
    if (Number.isFinite(width)) table.style.width = `${width + 140}px`;

    const colgroup = table.querySelector('colgroup');
    if (colgroup) {
      const col = document.createElement('col');
      col.style.width = '140px';
      colgroup.insertBefore(col, colgroup.children[1] || null);
    }

    const headerRow = table.querySelector('thead tr');
    if (headerRow) {
      const header = makeCell('th', '系统仓库');
      header.setAttribute('scope', 'col');
      headerRow.insertBefore(header, headerRow.children[1] || null);
    }

    table.querySelectorAll('tbody tr').forEach((row) => patchRow(row));
  }

  function patchPlatformShopTable(table) {
    if (table.dataset.platformShopPatched === 'true') return;
    table.dataset.platformShopPatched = 'true';

    const width = Number.parseInt(table.style.width, 10);
    if (Number.isFinite(width)) table.style.width = `${width + 240}px`;

    const colgroup = table.querySelector('colgroup');
    if (colgroup) {
      const col = document.createElement('col');
      col.style.width = '150px';
      colgroup.insertBefore(col, colgroup.children[1] || null);
      const siteCol = document.createElement('col');
      siteCol.style.width = '90px';
      colgroup.insertBefore(siteCol, colgroup.children[2] || null);
    }

    const headerRow = table.querySelector('thead tr');
    if (headerRow) {
      headerRow.children[0].textContent = '系统店铺名称';
      const backendShopHeader = makeCell('th', '后台店铺名称');
      headerRow.insertBefore(backendShopHeader, headerRow.children[1] || null);
      const siteHeader = makeCell('th', '站点');
      siteHeader.setAttribute('scope', 'col');
      headerRow.insertBefore(siteHeader, headerRow.children[2] || null);
    }

    table.querySelectorAll('tbody tr').forEach((row) => {
      if (row.dataset.shopSiteRowPatched === 'true') return;
      row.dataset.shopSiteRowPatched = 'true';
      const cells = row.children;
      if (!cells.length) return;
      if (row.classList.contains('ant-table-measure-row')) {
        const measureCell = document.createElement('td');
        measureCell.style.cssText = 'padding-top:0;padding-bottom:0;border-top:0;border-bottom:0;height:0';
        measureCell.innerHTML = '<div style="height:0;overflow:hidden;font-weight:bold">后台店铺名称</div>';
        row.insertBefore(measureCell, cells[1] || null);
        const siteMeasureCell = document.createElement('td');
        siteMeasureCell.style.cssText = 'padding-top:0;padding-bottom:0;border-top:0;border-bottom:0;height:0';
        siteMeasureCell.innerHTML = '<div style="height:0;overflow:hidden;font-weight:bold">站点</div>';
        row.insertBefore(siteMeasureCell, cells[2] || null);
        return;
      }
      const backendShopName = textOf(cells[0]);
      row.insertBefore(makeCell('td', systemShopNames.get(backendShopName) || '—'), cells[0] || null);
      row.insertBefore(makeCell('td', shopSites.get(backendShopName) || '—'), cells[2] || null);
    });
  }

  function patchRow(row) {
    if (row.dataset.systemWarehouseRowPatched === 'true') return;
    row.dataset.systemWarehouseRowPatched = 'true';

    const cells = row.children;
    if (!cells.length) return;

    if (row.classList.contains('ant-table-measure-row')) {
      const measureCell = document.createElement('td');
      measureCell.style.cssText = 'padding-top:0;padding-bottom:0;border-top:0;border-bottom:0;height:0';
      measureCell.innerHTML = '<div style="height:0;overflow:hidden;font-weight:bold">系统仓库</div>';
      row.insertBefore(measureCell, cells[1] || null);
      return;
    }

    const rowKey = row.dataset.rowKey || '';
    const roleText = textOf(cells[4]);
    const canMap = roleText.includes('揽收/发货地址');
    const systemWarehouse = canMap ? (mappings.get(rowKey) || '-') : '-';
    const systemCell = makeCell('td', systemWarehouse, 'wm-system-warehouse');
    row.insertBefore(systemCell, cells[1] || null);

    if (!canMap) return;
    const actionCell = row.lastElementChild;
    const actionGroup = actionCell && actionCell.firstElementChild;
    if (!actionGroup || actionGroup.querySelector('.wm-match-action')) return;

    const templateAction = actionGroup.querySelector('a');
    const action = document.createElement('a');
    action.className = `${templateAction ? templateAction.className : ''} wm-match-action`.trim();
    action.textContent = '匹配系统仓库';
    action.href = 'javascript:void(0)';
    action.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openDrawer(row, rowKey);
    });
    actionGroup.appendChild(action);
  }

  function ensureDrawer() {
    if (document.querySelector('.wm-drawer')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="wm-mask" hidden></div>
      <aside class="wm-drawer" hidden aria-label="匹配系统仓库">
        <header class="wm-drawer__header">
          <div><h2>匹配系统仓库</h2><p>为当前店铺后台发货仓库选择对应的系统仓库。</p></div>
          <button class="wm-close" type="button" aria-label="关闭">×</button>
        </header>
        <div class="wm-drawer__body">
          <div class="wm-context">
            <div><span>平台</span><strong data-wm="platform">—</strong></div>
            <div><span>店铺</span><strong data-wm="shop">—</strong></div>
            <div><span>站点</span><strong data-wm="site">—</strong></div>
          </div>
          <label class="wm-field"><span>后台仓库</span><input data-wm="external" readonly></label>
          <label class="wm-field"><span><b class="wm-required">*</b> 系统仓库</span>
            <select data-wm="select">
              <option value="">请选择系统仓库</option>
              <option value="泰国曼谷中心仓">泰国曼谷中心仓</option>
              <option value="顺友泰国仓">顺友泰国仓</option>
              <option value="东南亚自营仓">东南亚自营仓</option>
            </select>
          </label>
          <div class="wm-error" data-wm="error" hidden>请选择系统仓库</div>
        </div>
        <footer class="wm-drawer__footer">
          <button class="wm-button" type="button" data-wm-action="cancel">取消</button>
          <button class="wm-button wm-button--primary" type="button" data-wm-action="save">保存</button>
        </footer>
      </aside>`);

    document.querySelector('.wm-mask').addEventListener('click', closeDrawer);
    document.querySelector('.wm-close').addEventListener('click', closeDrawer);
    document.querySelector('[data-wm-action="cancel"]').addEventListener('click', closeDrawer);
    document.querySelector('[data-wm-action="save"]').addEventListener('click', saveMapping);
  }

  function detailValue(label) {
    const labels = [...document.querySelectorAll('.ant-descriptions-item-label')];
    const labelElement = labels.find((element) => textOf(element) === label);
    const container = labelElement && labelElement.closest('.ant-descriptions-item-container');
    const content = container && container.querySelector('.ant-descriptions-item-content');
    return textOf(content) || '—';
  }

  function openDrawer(row, rowKey) {
    ensureDrawer();
    activeRow = { row, rowKey };
    const drawer = document.querySelector('.wm-drawer');
    const mask = document.querySelector('.wm-mask');
    const warehouseName = textOf(row.children[0]).replace(/地址$|仓库$/, '').trim();
    drawer.querySelector('h2').textContent = `匹配系统仓库 · ${warehouseName}`;
    drawer.querySelector('[data-wm="platform"]').textContent = detailValue('所属平台');
    drawer.querySelector('[data-wm="shop"]').textContent = detailValue('后台店铺名称');
    drawer.querySelector('[data-wm="site"]').textContent = detailValue('站点');
    drawer.querySelector('[data-wm="external"]').value = warehouseName;
    drawer.querySelector('[data-wm="select"]').value = mappings.get(rowKey) || '';
    drawer.querySelector('[data-wm="error"]').hidden = true;
    mask.hidden = false;
    drawer.hidden = false;
  }

  function closeDrawer() {
    const drawer = document.querySelector('.wm-drawer');
    const mask = document.querySelector('.wm-mask');
    if (drawer) drawer.hidden = true;
    if (mask) mask.hidden = true;
    activeRow = null;
  }

  function saveMapping() {
    if (!activeRow) return;
    const select = document.querySelector('[data-wm="select"]');
    const error = document.querySelector('[data-wm="error"]');
    if (!select.value) {
      error.hidden = false;
      return;
    }
    mappings.set(activeRow.rowKey, select.value);
    const systemCell = activeRow.row.querySelector('.wm-system-warehouse');
    if (systemCell) systemCell.textContent = select.value;
    closeDrawer();
  }

  function patchShopDetailLabel() {
    [...document.querySelectorAll('.ant-descriptions-item-label')].forEach((label) => {
      if (textOf(label) === '店铺 ID') label.textContent = '系统店铺名称';
      if (textOf(label) === '站点') {
        const container = label.closest('.ant-descriptions-item-container');
        const content = container && container.querySelector('.ant-descriptions-item-content');
        const siteCodes = new Map([['泰国站', 'TH'], ['英国站', 'UK']]);
        if (content && siteCodes.has(textOf(content))) content.textContent = siteCodes.get(textOf(content));
      }
    });
  }

  function applyPatch() {
    observerScheduled = false;
    [...document.querySelectorAll('table')].filter(isAddressTable).forEach(insertColumn);
    [...document.querySelectorAll('table')].filter(isPlatformShopTable).forEach(patchPlatformShopTable);
    patchShopDetailLabel();
  }

  const observer = new MutationObserver(() => {
    if (observerScheduled) return;
    observerScheduled = true;
    requestAnimationFrame(applyPatch);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  applyPatch();
})();
