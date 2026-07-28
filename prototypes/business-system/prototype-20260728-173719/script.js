const storesByPlatform = {
  Shopee: [
    ['SPE055_TH_BT', '深圳市云易盒科技有限公司'],
    ['SPE020_TH_BT', '深圳市海创供应链有限公司'],
  ],
  'TikTok Shop': [
    ['TIK025_TH_BT', '深圳市海创供应链有限公司'],
    ['TIK028_TH_BT', '深圳市云易盒科技有限公司'],
  ],
  Lazada: [
    ['LZD019_TH_BT', '深圳市云易盒科技有限公司'],
    ['LZD020_TH_BT', '深圳市海创供应链有限公司'],
  ],
};

const state = { platform: '', store: '', month: '2026-06', fileType: '', fileName: '' };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.remove('is-hidden');
  window.setTimeout(() => toast.classList.add('is-hidden'), 2400);
}

function closeMenus() { $$('.select-menu').forEach((menu) => menu.classList.remove('is-open')); }

function openMenu(trigger) {
  if (trigger.disabled) return;
  const name = trigger.dataset.field;
  const menu = document.querySelector(`[data-menu="${name}"]`);
  closeMenus();
  const box = trigger.getBoundingClientRect();
  menu.style.top = `${box.bottom + 4}px`;
  menu.style.left = `${box.left}px`;
  menu.style.minWidth = `${box.width}px`;
  menu.classList.add('is-open');
}

function setTriggerValue(field, value) {
  const trigger = document.querySelector(`[data-field="${field}"]`);
  if (!trigger) return;
  const target = trigger.querySelector('strong, span:not(.field__arrow)');
  target.textContent = value;
  target.classList.remove('placeholder');
}

function setStoreOptions(platform) {
  const menu = $('[data-menu="import-store"]');
  menu.innerHTML = '';
  (storesByPlatform[platform] || []).forEach(([store, company]) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.dataset.store = store;
    option.dataset.company = company;
    option.textContent = store;
    menu.append(option);
  });
  const trigger = $('[data-field="import-store"]');
  trigger.disabled = false;
  trigger.classList.remove('is-disabled');
  trigger.querySelector('strong').textContent = '请选择店铺';
  trigger.querySelector('strong').classList.add('placeholder');
}

function canValidate() {
  $('#validate-import').disabled = !(state.platform && state.store && state.month && state.fileType && state.fileName);
}

function showCheckStage() {
  $('#import-stage-form').classList.add('is-hidden');
  $('#import-stage-check').classList.remove('is-hidden');
  $('#import-form-footer').classList.add('is-hidden');
  $('#import-check-footer').classList.remove('is-hidden');
  $$('#import-steps .steps__item').forEach((item, index) => item.classList.toggle('steps__item--active', index < 3));
  $('#checked-file-name').textContent = state.fileName;
}

function backToForm() {
  $('#import-stage-form').classList.remove('is-hidden');
  $('#import-stage-check').classList.add('is-hidden');
  $('#import-form-footer').classList.remove('is-hidden');
  $('#import-check-footer').classList.add('is-hidden');
  $$('#import-steps .steps__item').forEach((item, index) => item.classList.toggle('steps__item--active', index === 0));
}

$$('[data-action="open-import"]').forEach((button) => button.addEventListener('click', () => $('#import-modal').classList.remove('is-hidden')));
$$('[data-action="close-import"]').forEach((button) => button.addEventListener('click', () => { $('#import-modal').classList.add('is-hidden'); backToForm(); }));
$$('[data-action="open-records"]').forEach((button) => button.addEventListener('click', () => { $('#records-drawer').classList.remove('is-hidden'); $('#drawer-mask').classList.remove('is-hidden'); }));
$$('[data-action="close-records"]').forEach((button) => button.addEventListener('click', () => { $('#records-drawer').classList.add('is-hidden'); $('#drawer-mask').classList.add('is-hidden'); }));

$$('.select-trigger').forEach((trigger) => trigger.addEventListener('click', (event) => { event.stopPropagation(); openMenu(trigger); }));
$$('.select-menu').forEach((menu) => menu.addEventListener('click', (event) => {
  const option = event.target.closest('button');
  if (!option) return;
  const field = menu.dataset.menu;
  if (field === 'import-platform') {
    state.platform = option.textContent;
    state.store = '';
    setTriggerValue(field, state.platform);
    setStoreOptions(state.platform);
    $('#company-field').textContent = '选择店铺后自动回显';
  } else if (field === 'import-store') {
    state.store = option.dataset.store;
    setTriggerValue(field, state.store);
    $('#company-field').textContent = option.dataset.company;
  } else if (field === 'import-month') {
    state.month = option.textContent;
    setTriggerValue(field, state.month);
  } else if (field === 'file-type') {
    state.fileType = option.textContent;
    setTriggerValue(field, state.fileType);
  } else {
    setTriggerValue(field, option.textContent);
  }
  closeMenus();
  canValidate();
}));

$('#file-input').addEventListener('change', (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  state.fileName = file.name;
  $('#upload-box').querySelector('b').textContent = file.name;
  $('#upload-box').querySelector('p').textContent = '文件已选择，等待开始校验。';
  canValidate();
});
$$('[data-action="choose-file"]').forEach((button) => button.addEventListener('click', () => $('#file-input').click()));
$('#upload-box').addEventListener('dragover', (event) => { event.preventDefault(); $('#upload-box').classList.add('upload-box--drag'); });
$('#upload-box').addEventListener('dragleave', () => $('#upload-box').classList.remove('upload-box--drag'));
$('#upload-box').addEventListener('drop', (event) => { event.preventDefault(); $('#upload-box').classList.remove('upload-box--drag'); const file = event.dataTransfer.files?.[0]; if (file) { state.fileName = file.name; $('#upload-box').querySelector('b').textContent = file.name; $('#upload-box').querySelector('p').textContent = '文件已选择，等待开始校验。'; canValidate(); } });

$('#validate-import').addEventListener('click', showCheckStage);
$$('[data-action="back-to-form"]').forEach((button) => button.addEventListener('click', backToForm));
$$('[data-action="confirm-import"]').forEach((button) => button.addEventListener('click', () => { $('#import-modal').classList.add('is-hidden'); showToast('已提交新增导入任务，处理完成后可在导入/同步记录中下载结果。'); backToForm(); }));
$$('[data-action="download-template"],[data-action="download-original"],[data-action="download-error"],[data-action="download-duplicate"]').forEach((button) => button.addEventListener('click', () => showToast('原型演示：已触发文件下载。')));
document.addEventListener('click', closeMenus);
