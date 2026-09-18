/* 原型说明层：只标注交互与约束，不修改业务数据和表单行为。 */
(() => {
  const notes = [
    { id: 1, title: "规则名称", area: "基础信息", selector: '[data-bind="rule-form"] [name="name"]', text: "必填，最多 30 个字符；保存时去除首尾空格，不可为空。用于列表检索和辨识规则。" },
    { id: 2, title: "优先级", area: "基础信息", selector: '[data-bind="rule-form"] [name="priority"]', text: "必填，只允许输入纯数字，数值须大于 0；数值越大越优先。保存或启用时，平台及适用范围可能重叠的启用规则不可同优先级。" },
    { id: 3, title: "状态", area: "基础信息", selector: '[data-segmented="status"]', text: "启用才参与匹配；停用不参与。由停用切为启用时也校验同优先级冲突。原型中的状态修改仅为当前会话演示。" },
    { id: 4, title: "业务场景", area: "基础信息", selector: '[data-form-select="scenario"]', text: "必选且只可单选。测评换货：替换后人工审单；运营换货：替换后进入现有审单规则。规则命中本身不会标记测评订单或填写测评费用。" },
    { id: 5, title: "平台", area: "适用范围", selector: '[data-form-select="platform"]', text: "必选，支持多选；命中任一所选平台即可继续判断店铺、站点和条件。店铺、站点不选不代表跨未选平台生效。原型选项为演示数据，正式系统应读取平台字典。" },
    { id: 6, title: "店铺、站点", area: "适用范围", selector: '[data-form-select="shop"]', text: "均非必填，均支持多选。不选即不限该维度；选中时命中任一所选值。店铺与站点都选时，两维须同时满足，并受已选平台限制。", extraSelector: '[data-form-select="site"]' },
    { id: 7, title: "规则备注", area: "基础信息", selector: '[data-bind="rule-form"] [name="remark"]', text: "选填，最多 30 个字符；仅供维护人员查看，不参与订单匹配。与条件字段“订单备注”不同。" },
    { id: 8, title: "条件组与条件行", area: "命中条件", selector: '[data-action="add-condition-group"]', text: "至少保留一个非空条件组。组内条件为 AND，组间为 OR；每个条件都要填完整。选择“只替换命中的 SKU”时，每个 OR 组必须含已填写的平台 SKU 或发货 SKU 条件。" },
    { id: 9, title: "条件字段", area: "命中条件", selector: '.c-condition-row [data-row-select="field"]', text: "按字段类型联动操作符：金额、利润、利润率仅区间；订单类型、物流渠道、订单备注、发货仓库、目的国家仅包含/排除；平台 SKU、发货 SKU、item_id 可选存在/包含任一/等于。系统 SKU 即发货 SKU，不重复配置。" },
    { id: 10, title: "条件操作符", area: "命中条件", selector: '.c-condition-row [data-row-select="operator"], .c-condition-row .c-static-operator', text: "切换字段时操作符随之切换。订单备注包含/排除区分大小写。原型没有定义多值分隔符在所有字段下的统一语义；文本类每个条件输入一个值，多个条件用 AND/OR 组合。" },
    { id: 11, title: "条件值或区间", area: "命中条件", selector: '.c-condition-row [data-condition-value], .c-condition-row .c-range-inputs', text: "非区间值不可留空。金额、利润、利润率可只填一个端点，至少填一个；上下限均填时下限不得大于上限，端点包含在区间内。订单备注按输入原文区分大小写。" },
    { id: 12, title: "替换范围", area: "SKU 替换", selector: '[data-segmented="scope"]', text: "必选。只替换命中的 SKU：仅处理当前包裹中命中 SKU 条件的发货 SKU；替换全部发货 SKU：包裹命中规则后处理包裹内全部原发货 SKU。按包裹执行，每包裹只执行一次。" },
    { id: 13, title: "目标发货 SKU", area: "SKU 替换", selector: '.c-action-row [data-sku-value]', text: "使用输入框输入关键字模糊搜索产品库 SKU，再从结果中选取；至少配置一条，可添加多条。保存时校验输入值确属产品库。仅改变发货 SKU 与订单成本，不改平台 SKU、售价。" },
    { id: 14, title: "每件原 SKU 换货数量", area: "SKU 替换", selector: '.c-action-row [data-qty-value]', text: "必填正整数。对每个被替换的原发货 SKU 分别计算：目标数量＝原发货 SKU 数量 × 此处填写数量；多 SKU 和同 SKU 多件均按此计算。" },
    { id: 15, title: "保存规则", area: "提交校验", selector: '[data-action="save-rule"]', text: "原型在保存时检查必填、正整数优先级、同优先级范围冲突、条件组完整性、区间上下限、目标 SKU 是否在演示产品库及数量。正式系统须在服务端再次校验，不能仅依赖页面。" },
    { id: 16, title: "执行明细筛选与导出", area: "执行记录", selector: '[data-execution-filter="keyword"], [data-execution-filter="shop"], [data-execution-filter="start"], [data-execution-filter="end"]', text: "订单号、包裹号可一次输入多个，以逗号或换行分隔，最多 1000 个，按完整编号匹配；店铺支持筛选。日期按年月日选择起止日，开始日不得晚于结束日。导出当前筛选结果。" },
    { id: 17, title: "列表规则名称", area: "列表筛选", selector: '[data-filter="keyword"]', text: "支持模糊搜索，输入内容和字数均不限制；空值表示不限。查询按钮应用条件，重置按钮清空筛选。" },
    { id: 18, title: "列表业务场景", area: "列表筛选", selector: '[data-filter="scenario"]', text: "默认为全部，支持多选测评换货、运营换货；选择多个时命中其中任一场景即可。仅影响列表查询。" },
    { id: 19, title: "列表平台", area: "列表筛选", selector: '[data-filter="platform"]', text: "选填，可筛全部或单个平台；仅用于列表查询，不改变规则适用范围。" },
    { id: 20, title: "列表状态", area: "列表筛选", selector: '[data-filter="status"]', text: "默认为全部，支持多选启用、停用；选择多个时命中其中任一状态即可。筛选不影响规则实际状态。" }
  ];

  const panel = document.querySelector('[data-notes-list]');
  const drawer = document.querySelector('[data-bind="rule-form"]');
  const toggle = document.querySelector('[data-notes-toggle]');
  const shell = document.querySelector('#prototype-notes');
  let activeId = null;
  const grouped = new Map();
  notes.forEach((note) => {
    if (!grouped.has(note.area)) grouped.set(note.area, []);
    grouped.get(note.area).push(note);
  });
  grouped.forEach((items, area) => {
    const group = document.createElement('section');
    group.className = 'c-notes-group';
    const heading = document.createElement('h3');
    heading.textContent = area;
    group.append(heading);
    items.forEach((note) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'c-notes-item';
      item.dataset.noteItem = String(note.id);
      const badge = document.createElement('span');
      badge.className = 'c-notes-item__number';
      badge.textContent = String(note.id);
      const content = document.createElement('span');
      const title = document.createElement('strong');
      title.textContent = note.title;
      const body = document.createElement('span');
      body.textContent = note.text;
      content.append(title, body);
      item.append(badge, content);
      group.append(item);
    });
    panel.append(group);
  });

  function decorate() {
    notes.forEach((note) => {
      document.querySelectorAll([note.selector, note.extraSelector].filter(Boolean).join(',')).forEach((target) => {
        if (target.dataset.noteId === String(note.id)) return;
        target.dataset.noteId = String(note.id);
        let anchor = target;
        if (target.matches('button')) anchor = target.parentElement;
        if (target.matches('input, select, textarea')) {
          anchor = target.closest('.c-field');
          if (!anchor) {
            anchor = document.createElement('span');
            anchor.className = 'c-note-control-wrap';
            target.before(anchor);
            anchor.append(target);
          }
        }
        if (anchor.querySelector(`:scope > .c-note-marker[data-note="${note.id}"]`)) return;
        anchor.classList.add('c-note-anchor');
        const marker = document.createElement('button');
        marker.type = 'button';
        marker.className = 'c-note-marker';
        marker.dataset.note = String(note.id);
        marker.textContent = String(note.id);
        marker.setAttribute('aria-label', `查看备注 ${note.id}：${note.title}`);
        marker.title = `备注 ${note.id}：${note.title}`;
        anchor.append(marker);
      });
    });
  }

  function showNote(id, fromList = false) {
    activeId = id;
    shell.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.querySelectorAll('[data-note-item]').forEach((item) => item.classList.toggle('is-active', Number(item.dataset.noteItem) === id));
    document.querySelectorAll('.c-note-marker').forEach((marker) => marker.classList.toggle('is-active', Number(marker.dataset.note) === id));
    const item = panel.querySelector(`[data-note-item="${id}"]`);
    item?.scrollIntoView({ block: 'nearest' });
    if (fromList) {
      const targets = [...document.querySelectorAll(`[data-note-id="${id}"]`)];
      const visible = targets.find((target) => target.getClientRects().length && !target.closest('[data-open="false"], [hidden]'));
      visible?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  document.addEventListener('click', (event) => {
    const marker = event.target.closest('.c-note-marker');
    if (marker) {
      event.preventDefault();
      event.stopPropagation();
      showNote(Number(marker.dataset.note));
      return;
    }
    const item = event.target.closest('[data-note-item]');
    if (item) showNote(Number(item.dataset.noteItem), true);
    if (event.target.closest('[data-notes-toggle]')) {
      shell.hidden = !shell.hidden;
      toggle.setAttribute('aria-expanded', String(!shell.hidden));
      if (!shell.hidden && activeId) showNote(activeId);
    }
    if (event.target.closest('[data-notes-close]')) {
      shell.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  }, true);

  const observer = new MutationObserver(decorate);
  observer.observe(drawer, { childList: true, subtree: true });
  decorate();
})();
