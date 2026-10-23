(() => {
  'use strict';

  const configElement = document.getElementById('prototype-review-config');
  const config = JSON.parse(configElement?.textContent || '{}');
  const state = {
    annotations: [], filter: 'all', activeId: '', reviewOpen: false,
    navigation: { id: '', status: '', message: '' }, navigationTimer: 0, pinGroupIds: [],
    comments: [], commentFilter: 'open', commentLoading: false, commentError: '',
    session: { authenticated: false, user: null }, sessionToken: '', sessionLoading: false, submitting: false,
    commentDraft: '', commentCategory: 'interaction', replyDrafts: {}, openReplyId: '',
  };
  const categoryLabels = { page: '页面', interaction: '交互', rule: '规则', field: '字段', pending: '待确认', logic: '功能逻辑', data: '数据信息', visual: '视觉说明', todo: '遗留待办' };
  const NAVIGATION_MESSAGE_TYPE = 'prototype-review:navigate';
  const app = document.getElementById('prototype-review-app');
  let renderedAnnotationList = null;
  let renderedFilters = null;

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  function annotationDisplayNumber(item, index) { return item?.displayNumber ?? index + 1; }
  function annotationCategory(item) {
    const category = String(item?.category || 'page');
    return { category, label: categoryLabels[category] || category, className: /^[a-z0-9-]+$/i.test(category) ? category : 'legacy' };
  }
  function annotationDetailsMarkup(item) {
    const sections = Array.isArray(item?.sections) && item.sections.length
      ? `<div class="annotation-sections">${item.sections.map((section) => `<section><h4>${escapeHtml(section.title)}</h4><p>${escapeHtml(section.content)}</p></section>`).join('')}</div>` : '';
    const details = Array.isArray(item?.details) && item.details.length
      ? `<ul class="annotation-details">${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>` : '';
    return `${sections}${details}`;
  }

  const apiBase = () => String(config.reviewApi?.baseUrl || '').replace(/\/$/, '');
  const isLocalPreview = () => ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);

  async function apiFetch(path, options = {}) {
    const method = String(options.method || 'GET').toUpperCase();
    const attempts = method === 'GET' ? 2 : 1;
    let lastFailure;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(`${apiBase()}${path}`, { credentials: 'include', ...options, signal: controller.signal,
          headers: { ...(options.body ? { 'content-type': 'application/json' } : {}),
            ...(state.sessionToken ? { authorization: `Bearer ${state.sessionToken}` } : {}), ...(options.headers || {}) } });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const failure = new Error(data.message || `HTTP ${response.status}`);
          failure.status = response.status;
          failure.code = data.error;
          throw failure;
        }
        return data;
      } catch (error) {
        lastFailure = error;
        const retryable = method === 'GET' && (!error.status || error.status >= 500);
        if (!retryable || attempt === attempts - 1) break;
        await new Promise((resolve) => setTimeout(resolve, 500));
      } finally {
        clearTimeout(timeout);
      }
    }
    if (!navigator.onLine) throw new Error('当前网络不可用，请恢复网络后重试');
    if (lastFailure?.name === 'AbortError') throw new Error('网络响应超时，请检查 VPN 或移动网络后重试');
    throw lastFailure;
  }

  function loginUrl() {
    const query = new URLSearchParams({ returnTo: location.href.split('#')[0], prototypeId: config.prototypeId,
      prototypeVersion: config.prototypeVersion });
    return `${apiBase()}/auth/dingtalk/start?${query}`;
  }

  function renderShell() {
    const documents = Array.isArray(config.documents) ? config.documents : [];
    app.innerHTML = `
      <div class="review-app">
        <header class="review-header">
          <div class="review-brand"><h1>${escapeHtml(config.title || '原型需求说明')}</h1><p>正式需求以 PRD 为准 · 标注与 HTML 文档为默认阅读入口</p></div>
          <div class="review-meta"><span class="review-tag">原型 v${escapeHtml(config.prototypeVersion || '—')}</span><span class="review-tag">${escapeHtml(config.changeId || '—')}</span></div>
          <div class="review-action-group"><button class="primary-button" data-toggle-annotations aria-pressed="false">查看标注</button><button class="secondary-button" data-copy-link>复制分享地址</button></div>
        </header>
        <nav class="review-tabs" aria-label="交付内容">
          <button class="review-tab active" data-tab="prototype">原型与标注</button>
          <button class="review-tab" data-tab="documents">逻辑文档</button>
        </nav>
        <main class="review-content">
          <section class="prototype-view" data-view="prototype">
            <div class="prototype-stage"><iframe class="prototype-frame" title="业务原型" src="../sales-ranking-original-chart.html"></iframe><div class="annotation-layer" aria-label="原型标注点"></div></div>
            <aside class="side-panel" aria-hidden="true">
              <div class="panel-head"><div><h2>原型标注 <span data-count></span></h2><p>点击标注点或说明卡片双向定位</p></div><button class="ghost-button" data-close-annotations aria-label="关闭标注面板">关闭</button></div>
              <div class="filter-row" data-filters></div>
              <div class="annotation-list" data-annotation-list><div class="empty-state">正在读取正式标注…</div></div>
              <details class="comments" open><summary>在线评审意见 <span data-comment-count></span></summary><div class="comment-body" data-comments></div></details>
            </aside>
          </section>
          <section class="documents-view hidden" data-view="documents">
            <nav class="document-nav"><h2>逻辑文档</h2>${documents.map((doc, index) => `<button class="document-link${index === 0 ? ' active' : ''}" data-document="${escapeHtml(doc.target)}">${escapeHtml(doc.title)}</button>`).join('')}</nav>
            <iframe class="document-frame" title="逻辑文档" src="${documents[0] ? `./${escapeHtml(documents[0].target)}` : 'about:blank'}"></iframe>
          </section>
        </main>
      </div>`;
  }

  function filteredAnnotations() {
    const visible = state.filter === 'all' ? state.annotations : state.annotations.filter((item) => item.category === state.filter);
    return state.pinGroupIds.length ? visible.filter((item) => state.pinGroupIds.includes(item.id)) : visible;
  }

  function renderFilters() {
    const categories = ['all', ...Object.keys(categoryLabels)];
    const labels = { all: '全部', ...categoryLabels };
    const filters = app.querySelector('[data-filters]');
    filters.classList.toggle('numbered-filters', state.annotations.some((item) => item.displayNumber !== undefined));
    const markup = categories.map((key) => {
      const count = key === 'all' ? state.annotations.length : state.annotations.filter((item) => item.category === key).length;
      if (key !== 'all' && count === 0) return '';
      return `<button class="filter-button${state.filter === key ? ' active' : ''}" data-filter="${key}">${labels[key]} ${count}</button>`;
    }).join('');
    const nextMarkup = markup + (state.pinGroupIds.length ? '<button class="filter-button" data-reset-pin-group>返回全部标注</button>' : '');
    if (nextMarkup !== renderedFilters) {
      filters.innerHTML = nextMarkup;
      renderedFilters = nextMarkup;
    }
  }

  function frameDocument() {
    const frame = app.querySelector('.prototype-frame');
    try { return frame?.contentDocument || null; } catch { return null; }
  }

  function isRenderableElement(element) {
    if (!element?.isConnected) return false;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    const view = element.ownerDocument?.defaultView;
    const style = view ? view.getComputedStyle(element) : null;
    return style?.display !== 'none' && style?.visibility !== 'hidden' && Number(style?.opacity || 1) !== 0;
  }

  function pageRoot(doc, pageId) {
    if (!doc?.body || !pageId) return null;
    return Array.from(doc.querySelectorAll('[data-page-id]')).find((element) => element.dataset.pageId === pageId && isRenderableElement(element)) || null;
  }

  function currentPageRoot(doc) {
    if (!doc?.body) return null;
    return Array.from(doc.querySelectorAll('[data-page-id]')).find((element) => isRenderableElement(element)) || null;
  }

  function requirementMatches(element, id) {
    return String(element?.getAttribute('data-requirement-id') || '').split(/\s+/).includes(id);
  }

  function elementDepth(element, doc) {
    let depth = 0;
    for (let current = element; current && current !== doc.body; current = current.parentElement) depth += 1;
    return depth;
  }

  function isCoveringContainer(element, doc) {
    return element === doc.documentElement || element === doc.body || element.id === 'root' || element.id === 'app';
  }

  function visibleOverlayRoots(doc) {
    return Array.from(doc.querySelectorAll('.ant-modal-wrap, .ant-drawer, [role="dialog"]'))
      .filter((element) => isRenderableElement(element)
        && !element.classList.contains('ant-zoom-leave')
        && !element.querySelector('.ant-zoom-leave')
        && !element.classList.contains('ant-modal-hidden'));
  }

  function chooseAnchor(candidates, doc) {
    if (!candidates.length) return null;
    const overlays = visibleOverlayRoots(doc);
    const inOverlay = overlays.length
      ? candidates.filter((element) => overlays.some((overlay) => overlay === element || overlay.contains(element)))
      : candidates;
    // A visible Modal/Drawer owns the user's attention. Do not draw background
    // pins over it; only a matching portal anchor may remain locatable.
    if (overlays.length && !inOverlay.length) return null;
    const specific = inOverlay.filter((element) => !isCoveringContainer(element, doc));
    const pool = specific;
    if (!pool.length) return null;
    pool.sort((left, right) => {
      const depthDelta = elementDepth(right, doc) - elementDepth(left, doc);
      if (depthDelta) return depthDelta;
      const leftRect = left.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      const areaDelta = (leftRect.width * leftRect.height) - (rightRect.width * rightRect.height);
      return areaDelta || 0;
    });
    return pool[0] || null;
  }

  function findAnchor(doc, annotation) {
    if (!doc?.body || !annotation?.anchorId) return null;
    // Keep legacy single-page anchors; never fall back across explicit pages.
    const scope = doc.querySelectorAll('[data-page-id]').length ? pageRoot(doc, annotation.pageId) : doc.body;
    if (!scope) return null;
    if (annotation.strictAnchor) {
      if (!annotation.anchorSelector || scope === doc.body) return null;
      try {
        const selected = Array.from(scope.querySelectorAll(annotation.anchorSelector)).filter(isRenderableElement);
        return chooseAnchor(selected, doc);
      } catch {
        return null;
      }
    }
    if (annotation.anchorSelector) {
      try {
        const selected = Array.from(scope.querySelectorAll(annotation.anchorSelector)).filter(isRenderableElement);
        // Ant Design FooterToolbar/Modal content is rendered in a body-level portal,
        // outside the page root. Only accept a visible global match when it is not
        // owned by another page root; this keeps portal anchors locatable without
        // reintroducing a root-container fallback.
        const portalMatches = Array.from(doc.querySelectorAll(annotation.anchorSelector))
          .filter((element) => isRenderableElement(element) && !element.closest('[data-page-id]'));
        const selectorMatch = chooseAnchor([...selected, ...portalMatches], doc);
        if (selected.length || portalMatches.length) return selectorMatch;
      } catch {
        /* malformed selectors are rejected by delivery review; fallback keeps runtime safe */
      }
    }
    const ids = String(annotation.anchorId).trim().split(/\s+/).filter(Boolean);
    const candidates = [];
    const seen = new Set();
    ids.forEach((id) => {
      const scoped = [scope, ...scope.querySelectorAll('[data-requirement-id]')]
        .filter((element) => !seen.has(element) && requirementMatches(element, id) && isRenderableElement(element));
      scoped.forEach((element) => { seen.add(element); candidates.push(element); });
      const portal = Array.from(doc.querySelectorAll('[data-requirement-id]'))
        .filter((element) => !seen.has(element) && !element.closest('[data-page-id]') && requirementMatches(element, id) && isRenderableElement(element));
      portal.forEach((element) => { seen.add(element); candidates.push(element); });
    });
    return chooseAnchor(candidates, doc);
  }

  function annotationAvailability(item) {
    const doc = frameDocument();
    if (!doc) return { known: false, available: true, offPage: false };
    const current = currentPageRoot(doc);
    const currentPageId = current?.dataset.pageId || '';
    if (item.pageId && currentPageId && currentPageId !== item.pageId) {
      return { known: true, available: true, offPage: true };
    }
    const anchor = findAnchor(doc, item);
    return { known: true, available: Boolean(anchor), offPage: false, blocked: !anchor && visibleOverlayRoots(doc).length > 0 };
  }

  function annotationCard(item, index) {
    const availability = annotationAvailability(item);
    const missingAnchor = availability.known && !availability.available && !availability.blocked;
    const navigation = state.navigation.id === item.id ? state.navigation : null;
    const navigationMessage = availability.blocked ? '关闭当前弹层后可定位' : navigation?.status === 'pending'
      ? '正在切换页面并定位…'
      : navigation?.status === 'failed' || missingAnchor
        ? item.unavailableHint || '定位失败，可重试'
        : '';
    const failed = Boolean(navigation?.status === 'failed' || missingAnchor);
    const category = annotationCategory(item);
    const number = annotationDisplayNumber(item,index);
    return `<article class="annotation-card${item.status === 'pending' ? ' pending' : ''}${failed ? ' unavailable' : ''}${navigation?.status === 'pending' ? ' navigation-pending' : ''}${state.activeId === item.id ? ' active' : ''}" data-annotation-id="${escapeHtml(item.id)}" role="button" tabindex="0">
      <span class="annotation-number">${escapeHtml(number)}</span><span><span class="annotation-title"><strong>${escapeHtml(item.title)}</strong><span class="annotation-category category-${category.className}">${escapeHtml(category.label)}</span></span><p class="annotation-summary">${escapeHtml(item.summary)}</p>${navigationMessage ? `<span class="annotation-availability">${escapeHtml(navigationMessage)}</span>` : ''}${state.activeId === item.id ? annotationDetailsMarkup(item) : ''}<a class="annotation-source" data-source-link href="./${escapeHtml(item.sourceRef)}">回溯需求来源 →</a></span>
    </article>`;
  }

  function renderAnnotations(refreshComments = true) {
    const visible = filteredAnnotations();
    app.querySelector('[data-count]').textContent = `(${visible.length})`;
    const nextListMarkup = visible.length
      ? visible.map((item) => annotationCard(item, state.annotations.indexOf(item))).join('')
      : '<div class="empty-state">当前筛选下没有标注</div>';
    const list = app.querySelector('[data-annotation-list]');
    if (nextListMarkup !== renderedAnnotationList) {
      list.innerHTML = nextListMarkup;
      renderedAnnotationList = nextListMarkup;
    }
    renderFilters();
    renderPins();
    syncPins();
    if (refreshComments) renderComments();
  }

  function locatePin(item, index) {
    const frame = app.querySelector('.prototype-frame');
    const stage = app.querySelector('.prototype-stage');
    let doc;
    try { doc = frame.contentDocument; } catch { return null; }
    const anchor = findAnchor(doc, item);
    if (!anchor) return null;
    const anchorRect = anchor.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const frameWidth = frame.clientWidth || frameRect.width;
    const frameHeight = frame.clientHeight || frameRect.height;
    if (anchorRect.right <= 0 || anchorRect.left >= frameWidth || anchorRect.bottom <= 0 || anchorRect.top >= frameHeight) return null;
    const rawLeft = frameRect.left - stageRect.left + anchorRect.right - 12;
    // Never clamp an offscreen anchor to the stage edge: that creates a false
    // pin unrelated to the business element. The selected annotation is
    // scrolled into view before it is rendered again.
    if (rawLeft < 0 || rawLeft > stageRect.width - 18) return null;
    const left = rawLeft;
    const top = frameRect.top - stageRect.top + anchorRect.top;
    return {
      left,
      // Numbered annotations sit immediately above their actual target so they
      // do not cover inputs or adjacent actions; legacy pins keep their offset.
      top: top + (item.displayNumber !== undefined ? -18 : 16),
      highlight: {
        left: Math.max(0, frameRect.left - stageRect.left + anchorRect.left),
        top: Math.max(0, top),
        width: Math.min(anchorRect.width, stageRect.width),
        height: anchorRect.height,
      },
      index,
    };
  }

  function renderPins() {
    const layer = app.querySelector('.annotation-layer');
    if (!state.reviewOpen) { layer.innerHTML = ''; return; }
    const visible = filteredAnnotations();
    const active = visible.find((item) => item.id === state.activeId);
    const activePoint = active ? locatePin(active, state.annotations.indexOf(active)) : null;
    const highlight = activePoint
      ? `<span class="annotation-target-highlight" style="left:${activePoint.highlight.left}px;top:${activePoint.highlight.top}px;width:${activePoint.highlight.width}px;height:${activePoint.highlight.height}px" aria-hidden="true"></span>`
      : '';
    const points = visible.map((item) => {
      const index = state.annotations.indexOf(item);
      const point = locatePin(item, index);
      return point ? { item, index, point } : null;
    }).filter(Boolean);
    const remaining = [...points];
    const groups = [];
    while (remaining.length) {
      const group = [remaining.shift()];
      for (let index = 0; index < group.length; index += 1) {
        for (let other = remaining.length - 1; other >= 0; other -= 1) {
          if (Math.hypot(group[index].point.left - remaining[other].point.left,
            group[index].point.top - remaining[other].point.top) < 24) {
            group.push(remaining.splice(other, 1)[0]);
          }
        }
      }
      groups.push(group.sort((a, b) => a.index - b.index));
    }
    const pins = groups.map((group) => {
      const { item, index, point } = group[0];
      const clustered = group.length > 1;
      const attributes = clustered
        ? 'data-pin-group="' + escapeHtml(group.map((entry) => entry.item.id).join('|')) + '"'
        : 'data-pin-id="' + escapeHtml(item.id) + '"';
      const numbered = group.some((entry) => entry.item.displayNumber !== undefined);
      const numbers = group.map((entry) => String(annotationDisplayNumber(entry.item,entry.index)));
      const label = numbered
        ? (clustered ? group.map((entry, numberIndex) => `${numbers[numberIndex]} ${entry.item.title}`).join('；') : `${numbers[0]} ${item.title}`)
        : (clustered ? `${group.length} 条相邻标注` : item.title);
      const active = group.some((entry) => state.activeId === entry.item.id);
      return '<button class="annotation-pin' + (numbered ? ' numbered' : '') + (clustered ? ' clustered' : '')
        + (item.status === 'pending' ? ' pending' : '') + (active ? ' active' : '')
        + '" style="left:' + point.left + 'px;top:' + point.top + 'px" '
        + attributes + ' aria-label="' + escapeHtml(label) + '">'
        + escapeHtml(numbered ? numbers.join(' · ') : (clustered ? group.length : index + 1)) + '</button>';
    }).join('');
    layer.innerHTML = `${highlight}${pins}`;
  }

  let syncFrame = 0;
  function syncPins(attempt = 0) {
    cancelAnimationFrame(syncFrame);
    syncFrame = requestAnimationFrame(() => {
      renderPins();
      const layer = app.querySelector('.annotation-layer');
      if (state.reviewOpen && state.annotations.length && !layer.children.length && attempt < 20) {
        setTimeout(() => syncPins(attempt + 1), 100);
      }
    });
  }

  function setReviewOpen(open) {
    state.reviewOpen = Boolean(open);
    const view = app.querySelector('.prototype-view');
    const panel = app.querySelector('.side-panel');
    const trigger = app.querySelector('[data-toggle-annotations]');
    view.classList.toggle('annotations-open', state.reviewOpen);
    panel.setAttribute('aria-hidden', String(!state.reviewOpen));
    trigger.setAttribute('aria-pressed', String(state.reviewOpen));
    trigger.textContent = state.reviewOpen ? '操作原型' : `查看标注${state.annotations.length ? ` (${state.annotations.length})` : ''}`;
    if (state.reviewOpen) {
      renderAnnotations();
    } else {
      window.clearTimeout(state.navigationTimer);
      state.navigation = { id: '', status: '', message: '' };
      state.pinGroupIds = [];
      state.activeId = '';
      app.querySelector('.annotation-layer').innerHTML = '';
      app.querySelector('[data-filters]').innerHTML = '';
      app.querySelector('[data-annotation-list]').innerHTML = '<div class="empty-state">点击“查看标注”加载正式标注</div>';
      app.querySelector('[data-comments]').innerHTML = '';
      app.querySelector('[data-count]').textContent = '';
      app.querySelector('[data-comment-count]').textContent = '';
      renderedFilters = '';
      renderedAnnotationList = '<div class="empty-state">点击“查看标注”加载正式标注</div>';
    }
  }

  function failNavigation(item) {
    window.clearTimeout(state.navigationTimer);
    state.navigation = { id: item.id, status: 'failed', message: '定位失败，可重试' };
    renderAnnotations();
  }

  function startNavigation(item) {
    const frame = app.querySelector('.prototype-frame');
    if (!frame?.contentWindow || !item.pageId) { failNavigation(item); return; }
    window.clearTimeout(state.navigationTimer);
    state.activeId = item.id;
    state.navigation = { id: item.id, status: 'pending', message: '正在切换页面并定位…' };
    renderAnnotations();
    try {
      frame.contentWindow.postMessage({ type: NAVIGATION_MESSAGE_TYPE, pageId: item.pageId, anchorId: item.anchorId, anchorSelector: item.anchorSelector || '' }, location.origin);
    } catch {
      failNavigation(item);
      return;
    }
    const startedAt = Date.now();
    const attempt = () => {
      if (state.navigation.id !== item.id || state.navigation.status !== 'pending') return;
      let anchor = null;
      try { anchor = findAnchor(frame.contentDocument, item); } catch { /* same-origin guard */ }
      if (anchor) {
        state.navigation = { id: item.id, status: 'success', message: '' };
        anchor.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        renderAnnotations();
        setTimeout(syncPins, 360);
        return;
      }
      if (Date.now() - startedAt >= 5000) { failNavigation(item); return; }
      state.navigationTimer = window.setTimeout(attempt, 120);
    };
    state.navigationTimer = window.setTimeout(attempt, 80);
  }

  function selectAnnotation(id) {
    const item = state.annotations.find((candidate) => candidate.id === id);
    if (!item) return;
    const availability = annotationAvailability(item);
    const doc = frameDocument();
    const currentPageId = currentPageRoot(doc)?.dataset.pageId || '';
    if ((currentPageId && currentPageId !== item.pageId) || availability.offPage) {
      startNavigation(item);
      return;
    }
    if (!availability.available) {
      state.activeId = item.id;
      state.navigation = { id: item.id, status: 'failed', message: '定位失败，可重试' };
      renderAnnotations();
      return;
    }
    window.clearTimeout(state.navigationTimer);
    state.activeId = state.activeId === id ? '' : id;
    state.navigation = { id: '', status: '', message: '' };
    renderAnnotations();
    if (state.activeId) {
      const frame = app.querySelector('.prototype-frame');
      const focusAnchor = () => {
        if (state.activeId !== item.id || state.navigation.status) return;
        try {
          findAnchor(frame.contentDocument, item)?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
          renderPins();
        } catch { /* same-origin guard */ }
        syncPins();
      };
      requestAnimationFrame(() => {
        focusAnchor();
        window.setTimeout(focusAnchor, 180);
        // ProLayout/Affix can perform a late layout pass after a long-form
        // section becomes active. Re-apply the deterministic position once
        // that pass has settled so the selected anchor is actually visible.
        window.setTimeout(focusAnchor, 720);
      });
    }
  }

  function showView(viewName) {
    app.querySelectorAll('[data-tab]').forEach((item) => item.classList.toggle('active', item.dataset.tab === viewName));
    app.querySelectorAll('[data-view]').forEach((view) => view.classList.toggle('hidden', view.dataset.view !== viewName));
  }

  function openDocument(target) {
    const fileName = String(target || '').replace(/^\.\//, '').split('#')[0];
    showView('documents');
    app.querySelectorAll('[data-document]').forEach((item) => item.classList.toggle('active', item.dataset.document === fileName));
    app.querySelector('.document-frame').src = target;
  }

  async function loadComments() {
    if (isLocalPreview() || !config.reviewApi?.baseUrl || config.reviewApi?.onlineReviewApiStatus === 'pending') return;
    state.commentLoading = true;
    state.commentError = '';
    renderComments();
    const query = new URLSearchParams({ prototypeId: config.prototypeId, prototypeVersion: config.prototypeVersion });
    try {
      const data = await apiFetch(`/api/reviews?${query}`);
      state.comments = Array.isArray(data.items) ? data.items : [];
    } catch (error) {
      state.commentError = `在线评审暂不可用，正式需求仍可查看。${error.message ? `（${error.message}）` : ''}`;
    }
    state.commentLoading = false;
    renderComments();
  }

  async function loadSession() {
    if (isLocalPreview() || !config.reviewApi?.baseUrl || config.reviewApi?.onlineReviewApiStatus === 'pending') return;
    state.sessionLoading = true;
    renderComments();
    try {
      state.session = await apiFetch('/api/session');
    } catch {
      state.session = { authenticated: false, user: null };
    }
    state.sessionLoading = false;
    renderComments();
  }

  async function consumePublisherClaim() {
    if (isLocalPreview() || !config.reviewApi?.baseUrl || config.reviewApi?.onlineReviewApiStatus === 'pending') return;
    const params = new URLSearchParams(location.hash.replace(/^#/, ''));
    const claim = params.get('publisher_claim');
    if (!claim) return;
    history.replaceState(null, '', `${location.pathname}${location.search}`);
    try {
      state.session = await apiFetch('/api/publisher/session', { method: 'POST', body: JSON.stringify({ claim }) });
      state.sessionToken = state.session.sessionToken || '';
      state.commentError = '';
    } catch (error) {
      state.commentError = error.message || '发布者身份链接无效。';
    }
  }

  function consumeEmployeeSession() {
    const params = new URLSearchParams(location.hash.replace(/^#/, ''));
    const token = params.get('review_session');
    if (!token) return false;
    state.sessionToken = token;
    history.replaceState(null, '', `${location.pathname}${location.search}`);
    return true;
  }

  function roleLabel(role) {
    return role === 'publisher' ? '发布者' : '企业员工';
  }

  function replyMarkup(item) {
    const replies = Array.isArray(item.replies) ? item.replies : [];
    if (!replies.length) return '';
    return `<div class="comment-replies">${replies.map((reply) => `<div class="comment-reply"><div class="comment-meta"><span><strong>${escapeHtml(reply.authorName)}</strong><span class="identity-tag">${roleLabel(reply.authorRole)}</span></span><span>${escapeHtml(reply.createdAt)}</span></div><p>${escapeHtml(reply.content)}</p></div>`).join('')}</div>`;
  }

  function commentActions(item) {
    if (!state.session.authenticated) return '';
    const statusAction = state.session.user?.role === 'publisher'
      ? `<button class="comment-action" data-review-status="${item.status === 'open' ? 'resolved' : 'open'}" data-comment-id="${escapeHtml(item.id)}" data-revision="${item.revision}">${item.status === 'open' ? '解决' : '重开'}</button>` : '';
    const replyOpen = state.openReplyId === item.id;
    return `<div class="comment-actions"><button class="comment-action" data-reply-to="${escapeHtml(item.id)}">回复</button>${statusAction}</div>
      <form class="reply-form${replyOpen ? '' : ' hidden'}" data-reply-form="${escapeHtml(item.id)}"><textarea maxlength="2000" aria-label="回复内容" placeholder="回复这条评审意见">${escapeHtml(state.replyDrafts[item.id] || '')}</textarea><div class="form-actions"><button type="button" class="ghost-button" data-cancel-reply="${escapeHtml(item.id)}">取消</button><button type="submit" class="primary-button">提交回复</button></div></form>`;
  }

  function renderComments() {
    const container = app.querySelector('[data-comments]');
    const scoped = state.activeId ? state.comments.filter((item) => !item.annotationId || item.annotationId === state.activeId) : state.comments;
    const current = state.commentFilter === 'all' ? scoped : scoped.filter((item) => item.status === state.commentFilter);
    const openCount = scoped.filter((item) => item.status === 'open').length;
    const onlineReviewUrl = config.reviewApi?.onlineReviewUrl || '';
    const onlineReviewPending = config.reviewApi?.onlineReviewStatus !== 'published';
    const onlineReviewApiPending = config.reviewApi?.onlineReviewApiStatus === 'pending';
    const countLabel = state.commentError ? '(读取失败)' : state.commentLoading ? '(读取中…)' : `(${openCount} 未解决)`;
    app.querySelector('[data-comment-count]').textContent = !isLocalPreview() && config.reviewApi?.baseUrl ? countLabel : '';
    if (isLocalPreview()) {
      const link = onlineReviewUrl
        ? `<a class="review-online-link" href="${escapeHtml(onlineReviewUrl)}" target="_blank" rel="noopener">线上评审入口${onlineReviewPending ? '（待发布）' : ''}</a>`
        : '';
      const onlineHint = onlineReviewPending
        ? '线上页面发布后可用'
        : onlineReviewApiPending
          ? '页面已发布；评审 API allowlist 待部署'
          : '使用钉钉扫码登录后评论或回复';
      container.innerHTML = `<div class="comment-notice">本地预览可读；写入评审请打开线上分享地址。</div>${link ? `<div class="comment-online-entry">${link}<span class="identity-note">${onlineHint}</span></div>` : ''}`;
      return;
    }
    if (!config.reviewApi?.baseUrl) {
      container.innerHTML = '<div class="comment-notice">在线评审服务尚未配置。正式标注可正常阅读。</div>';
      return;
    }
    if (onlineReviewApiPending) {
      app.querySelector('[data-comment-count]').textContent = '(尚未启用)';
      container.innerHTML = '<div class="comment-notice">原型已发布，评审服务尚未启用；正式标注和文档可正常阅读。</div><button class="primary-button review-login-button" disabled>钉钉扫码登录（服务启用后可用）</button>';
      return;
    }
    const identity = state.sessionLoading ? '<span class="identity-note">正在确认身份…</span>'
      : state.session.authenticated
        ? `<span class="identity-note"><strong>${escapeHtml(state.session.user.authorName)}</strong> · ${roleLabel(state.session.user.role)}</span><button class="comment-retry" data-review-logout>退出</button>`
        : '<button class="primary-button review-login-button" data-review-login>钉钉扫码登录</button>';
    const toolbar = `<div class="comment-toolbar">${['open', 'resolved', 'all'].map((status) => `<button class="comment-filter${state.commentFilter === status ? ' active' : ''}" data-comment-filter="${status}">${status === 'open' ? '未解决' : status === 'resolved' ? '已解决' : '全部'}</button>`).join('')}<button class="comment-retry" data-retry-comments>刷新</button></div><div class="review-identity">${identity}</div>`;
    const items = current.map((item) => `<article class="comment-item" data-comment-id="${escapeHtml(item.id)}"><div class="comment-meta"><span class="comment-head"><strong>${escapeHtml(item.authorName)}</strong><span class="identity-tag">${roleLabel(item.authorRole)}</span><span class="comment-status ${escapeHtml(item.status)}">${item.status === 'resolved' ? '已解决' : '未解决'}</span></span><span>${escapeHtml(item.updatedAt || item.createdAt)}</span></div><div class="comment-scope">${item.annotationId ? `关联 ${escapeHtml(item.annotationId)}` : '页面级意见'} · ${escapeHtml(categoryLabels[item.category] || item.category || '评审')}</div><p>${escapeHtml(item.content)}</p>${replyMarkup(item)}${commentActions(item)}</article>`).join('');
    const content = state.commentLoading
      ? '<div class="comment-notice">正在加载当前版本评审意见…</div>'
      : state.commentError
        ? `<div class="comment-notice">${escapeHtml(state.commentError)}</div>`
        : items || '<div class="comment-notice">暂无当前版本评审意见。</div>';
    const categoryOption = (value, label) => `<option value="${value}"${state.commentCategory === value ? ' selected' : ''}>${label}</option>`;
    const composer = state.session.authenticated ? `<form class="new-comment-form"><label for="new-review-content">新增评审意见${state.activeId ? ` · 关联 ${escapeHtml(state.activeId)}` : ' · 页面级'}</label><select aria-label="评审分类">${categoryOption('interaction', '交互')}${categoryOption('page', '页面')}${categoryOption('rule', '规则')}${categoryOption('field', '字段')}${categoryOption('pending', '待确认')}</select><textarea id="new-review-content" maxlength="2000" placeholder="描述问题、预期结果或需要确认的规则">${escapeHtml(state.commentDraft)}</textarea><div class="form-actions"><span class="form-hint">保存到服务端；弱网失败时本页保留草稿</span><button type="submit" class="primary-button"${state.submitting ? ' disabled' : ''}>${state.submitting ? '提交中…' : '提交意见'}</button></div></form>`
      : '<div class="comment-notice">登录后可评论和回复；仅本企业员工可以写入。</div>';
    container.innerHTML = `${toolbar}${composer}${content}`;
  }

  async function submitNewComment(form) {
    const textarea = form.querySelector('textarea');
    const content = textarea.value.trim();
    if (!content) { textarea.focus(); return; }
    state.commentDraft = textarea.value;
    state.commentCategory = form.querySelector('select').value;
    state.submitting = true;
    renderComments();
    try {
      await apiFetch('/api/reviews', { method: 'POST', body: JSON.stringify({ prototypeId: config.prototypeId,
        prototypeVersion: config.prototypeVersion, changeId: config.changeId, annotationId: state.activeId || null,
        pageId: (() => {
          const currentPage = currentPageRoot(frameDocument())?.dataset.pageId;
          const active = state.annotations.find((item) => item.id === state.activeId);
          return currentPage || active?.pageId || config.pageId || 'P-001';
        })(), category: state.commentCategory, content }) });
      state.commentDraft = '';
      state.commentError = '';
      await loadComments();
    } catch (error) {
      state.commentError = `评审意见未保存，草稿已保留在本页。${error.message ? `（${error.message}）` : ''}`;
      if (error.status === 401) await loadSession();
    } finally {
      state.submitting = false;
      renderComments();
    }
  }

  async function submitReply(form) {
    const commentId = form.dataset.replyForm;
    const textarea = form.querySelector('textarea');
    const content = textarea.value.trim();
    if (!content) { textarea.focus(); return; }
    state.replyDrafts[commentId] = textarea.value;
    try {
      await apiFetch(`/api/reviews/${encodeURIComponent(commentId)}/replies`, { method: 'POST', body: JSON.stringify({ content }) });
      delete state.replyDrafts[commentId];
      state.openReplyId = '';
      state.commentError = '';
      await loadComments();
    } catch (error) {
      state.commentError = `回复未保存，草稿已保留在本页。${error.message ? `（${error.message}）` : ''}`;
      if (error.status === 401) await loadSession();
      renderComments();
    }
  }

  async function updateCommentStatus(button) {
    const targetStatus = button.dataset.reviewStatus;
    const verb = targetStatus === 'resolved' ? '解决' : '重开';
    if (!window.confirm(`确认${verb}这条评审意见？`)) return;
    try {
      await apiFetch(`/api/reviews/${encodeURIComponent(button.dataset.commentId)}`, { method: 'PATCH',
        body: JSON.stringify({ status: targetStatus, revision: Number(button.dataset.revision) }) });
      state.commentError = '';
      await loadComments();
    } catch (error) {
      state.commentError = error.message || `意见${verb}失败。`;
      if (error.status === 409) await loadComments();
      renderComments();
    }
  }

  function bindEvents() {
    app.addEventListener('click', async (event) => {
      const tab = event.target.closest('[data-tab]');
      if (tab) {
        if (tab.dataset.tab === 'documents') {
          const logicDocument = app.querySelector('[data-document="logic-document.html"]');
          if (logicDocument) openDocument(`./${logicDocument.dataset.document}`);
          else showView('documents');
        } else {
          showView(tab.dataset.tab);
        }
        return;
      }
      const group = event.target.closest('[data-pin-group]');
      if (group) { state.pinGroupIds = group.dataset.pinGroup.split('|'); state.activeId = ''; renderAnnotations(); return; }
      if (event.target.closest('[data-reset-pin-group]')) { state.pinGroupIds = []; renderAnnotations(); return; }
      const filter = event.target.closest('[data-filter]');
      if (filter) { state.pinGroupIds = []; state.filter = filter.dataset.filter; renderAnnotations(); return; }
      const commentFilter = event.target.closest('[data-comment-filter]');
      if (commentFilter) { state.commentFilter = commentFilter.dataset.commentFilter; renderComments(); return; }
      if (event.target.closest('[data-retry-comments]')) { loadComments(); return; }
      if (event.target.closest('[data-review-login]')) { location.assign(loginUrl()); return; }
      if (event.target.closest('[data-review-logout]')) { await apiFetch('/api/session', { method: 'DELETE' }); state.sessionToken = ''; await loadSession(); renderComments(); return; }
      const replyButton = event.target.closest('[data-reply-to]');
      if (replyButton) { state.openReplyId = replyButton.dataset.replyTo; renderComments(); return; }
      const cancelReply = event.target.closest('[data-cancel-reply]');
      if (cancelReply) { state.openReplyId = ''; renderComments(); return; }
      const statusButton = event.target.closest('[data-review-status]');
      if (statusButton) { await updateCommentStatus(statusButton); return; }
      if (event.target.closest('[data-toggle-annotations]')) { setReviewOpen(!state.reviewOpen); return; }
      if (event.target.closest('[data-close-annotations]')) { setReviewOpen(false); return; }
      const sourceLink = event.target.closest('[data-source-link]');
      if (sourceLink) { event.preventDefault(); openDocument(sourceLink.getAttribute('href')); return; }
      const target = event.target.closest('[data-annotation-id],[data-pin-id]');
      if (target) { event.preventDefault(); selectAnnotation(target.dataset.annotationId || target.dataset.pinId); return; }
      const documentLink = event.target.closest('[data-document]');
      if (documentLink) {
        openDocument(`./${documentLink.dataset.document}`);
        return;
      }
      if (event.target.closest('[data-copy-link]')) navigator.clipboard?.writeText(location.href);
    });
    app.addEventListener('submit', async (event) => {
      const newComment = event.target.closest('.new-comment-form');
      if (newComment) { event.preventDefault(); await submitNewComment(newComment); return; }
      const reply = event.target.closest('[data-reply-form]');
      if (reply) { event.preventDefault(); await submitReply(reply); }
    });
    app.addEventListener('input', (event) => {
      if (event.target.id === 'new-review-content') state.commentDraft = event.target.value;
      const replyForm = event.target.closest('[data-reply-form]');
      if (replyForm && event.target.tagName === 'TEXTAREA') state.replyDrafts[replyForm.dataset.replyForm] = event.target.value;
    });
    app.addEventListener('change', (event) => {
      if (event.target.matches('.new-comment-form select')) state.commentCategory = event.target.value;
    });
    app.addEventListener('keydown', (event) => {
      if (event.target.closest('[data-source-link]')) return;
      const card = event.target.closest('[data-annotation-id]');
      if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); selectAnnotation(card.dataset.annotationId); }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (state.reviewOpen) setReviewOpen(false);
    });
    const frame = app.querySelector('.prototype-frame');
    let observer;
    let mutationFrame = 0;
    frame.addEventListener('load', () => {
      syncPins();
      if (state.reviewOpen) renderAnnotations();
      try {
        frame.contentWindow.addEventListener('scroll', () => syncPins(), { passive: true, capture: true });
        frame.contentWindow.addEventListener('resize', () => syncPins());
        if (frame.contentDocument?.body) {
          observer?.disconnect();
          observer = new MutationObserver(() => {
            cancelAnimationFrame(mutationFrame);
            mutationFrame = requestAnimationFrame(() => { if (state.reviewOpen) renderAnnotations(false); else syncPins(); });
          });
          observer.observe(frame.contentDocument.body, { childList: true, subtree: true, attributes: true,
            attributeFilter: ['class', 'style', 'hidden', 'aria-hidden', 'data-page-id'] });
        }
      } catch { /* same-origin check handled by missing pins */ }
    });
    window.addEventListener('message', (event) => {
      if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
      const message = event.data;
      if (!message || !['prototype-review:navigate:ready','prototype-review:navigate:cancelled'].includes(message.type)) return;
      const item = state.annotations.find((candidate) => candidate.id === state.navigation.id);
      if (!item || message.pageId !== item.pageId || message.anchorId !== item.anchorId) return;
      if (message.type === 'prototype-review:navigate:cancelled') {
        window.clearTimeout(state.navigationTimer);
        state.navigation = { id: '', status: '', message: '' };
        state.activeId = '';
        renderAnnotations();
        return;
      }
      if (state.navigation.status !== 'pending') return;
      const anchor = findAnchor(frame.contentDocument, item);
      if (!anchor) return;
      window.clearTimeout(state.navigationTimer);
      state.navigation = { id: item.id, status: 'success', message: '' };
      anchor.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
      renderAnnotations();
      setTimeout(() => {
        if (state.activeId !== item.id || state.navigation.id !== item.id || state.navigation.status !== 'success') return;
        const stableAnchor = findAnchor(frame.contentDocument, item);
        stableAnchor?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        syncPins();
      }, 180);
    });
    window.addEventListener('resize', () => syncPins());
  }

  async function start() {
    renderShell();
    bindEvents();
    try {
      const response = await fetch('./annotations.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const manifest = await response.json();
      state.annotations = Array.isArray(manifest.annotations) ? manifest.annotations : [];
      renderAnnotations();
      setReviewOpen(false);
      if (!isLocalPreview()) {
        if (!consumeEmployeeSession()) await consumePublisherClaim();
        await loadSession();
        await loadComments();
      }
    } catch (error) {
      renderedAnnotationList = `<div class="empty-state">正式标注读取失败：${escapeHtml(error.message)}</div>`;
      app.querySelector('[data-annotation-list]').innerHTML = renderedAnnotationList;
    }
  }

  if (globalThis.__PROTOTYPE_REVIEW_TEST_MODE__) {
    globalThis.__PROTOTYPE_REVIEW_TEST_EXPORTS__ = { findAnchor, annotationDisplayNumber, annotationCategory, annotationDetailsMarkup };
    return;
  }
  start();
})();
