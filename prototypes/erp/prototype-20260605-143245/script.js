const products=window.PRODUCTS;
const rows=document.getElementById("productRows");
const selectDefaults={productKeyword:"商品 ID",goodsKeyword:"货品 ID",store:"全部全托管店铺",category:"全部类目",stocking:"全部备货类型",stock:"全部库存状态",binding:"全部绑定状态",activity:"全部活动状态",sort:"创建时间倒序",pageSize:"100 条/页",mapping:"全部",syncStatus:"全部",ruleMethod:"全部",logPageSize:"10 条/页",logModule:"全部模块",logOperator:"全部操作人"};
const selectValues={...selectDefaults};
const skuSelectDefaults={skuKeywordType:"\u5728\u7ebf SKU",skuSaleStatus:"\u5168\u90e8\u9500\u552e\u72b6\u6001",skuStockStatus:"\u5168\u90e8\u5e93\u5b58\u72b6\u6001",skuBindingStatus:"\u5168\u90e8\u7ed1\u5b9a\u72b6\u6001"};
Object.assign(selectValues,skuSelectDefaults);
let activeStatus="全部";
let currentPage=1;
let pageSize=100;
let resultTotal=1488;
let currentLogProduct=null;
let logPage=1;
let logPageSize=10;
let currentView=[...products];
let currentSkuProduct=null;
let skuDrawerView=[];
let batchMethod="local";
let categoryLevels=[];
let logDateTarget="start";
let logCalendarYear=2026;
let logCalendarMonth=5;

const escapeHtml=value=>String(value).replace(/[&<>"\']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","\'":"&#39;"}[char]));
const tag=(text,type="default")=>`<span class="tag tag--${type}">${text}</span>`;
const statusReason=p=>p.status==="审核不通过"?`<span class="c-status-reason c-status-reason--error" data-tooltip="${escapeHtml(p.statusText)}">${escapeHtml(p.statusText)}</span>`:`<span class="c-meta" title="${escapeHtml(p.statusText)}">${escapeHtml(p.statusText)}</span>`;
const statusType=s=>s==="销售中"?"success":s==="审核中"?"warning":s==="审核不通过"?"error":"default";
const itemStatusType=s=>s==="在线"?"success":s==="待审核"?"warning":s==="审核驳回"?"error":"default";
const timeGroup=p=>`<div class="c-time-group"><span><em>后台创建</em><b>${escapeHtml(p.createdAt)}</b></span><span><em>系统更新</em><b>${escapeHtml(p.updatedAt)}</b></span></div>`;
const bindingType=s=>s==="全部已绑定"?"success":s==="未绑定"?"error":"warning";
const activityTag=active=>active?`<span class="c-activity-tag" data-tooltip="商品正在参与平台活动，活动期间库存只能增加，不能减少。">SALE</span>`:"";

function renderTabs(){
  document.getElementById("statusTabs").innerHTML=window.STATUS_TABS.map(x=>`<button class="c-action ${x[0]===activeStatus?"active":""}" data-status="${x[0]}">${x[0]} <em>${x[1]}</em></button>`).join("");
  document.querySelectorAll("[data-status]").forEach(btn=>btn.onclick=()=>{activeStatus=btn.dataset.status;currentPage=1;applyFilters()});
}

function skuIssueSummary(product){
  const soldout=product.skus.filter(s=>s.platform===0).length;
  const unbound=product.skus.filter(s=>s.binding==="未绑定").length;
  return {total:product.skus.length,soldout,unbound};
}
function skuSummaryButton(product){
  const summary=skuIssueSummary(product);
  const risk=[summary.soldout?`\u552e\u7f44 ${summary.soldout}`:"",summary.unbound?`\u672a\u7ed1\u5b9a ${summary.unbound}`:""] .filter(Boolean).join(" \u00b7 ");
  return `<button class="c-link sku-open" data-sku-product="${product.id}">SKU ${summary.total} \u4e2a${risk?` \u00b7 ${risk}`:""}</button>`;
}

function renderProducts(list=currentView){
  rows.innerHTML=list.length?list.map(p=>`
    <tr class="product-row" data-product-id="${p.id}">
      <td><input type="checkbox" class="product-check"></td>
      <td><div class="c-product"><div class="c-product__image"></div><div class="c-product__info"><div class="c-product__title-row"><span class="c-product__title" title="${p.title}">${p.title}</span>${activityTag(p.activity)}</div><span class="c-meta c-meta-line">商品 ID：${p.id}<button class="c-link copy-id" data-copy="${p.id}">复制</button></span><span class="c-meta" title="${p.category}">类目：${p.category}</span>${skuSummaryButton(p)}</div></div></td>
      <td><b>${p.store}</b><span class="c-meta">运营：${p.operator}</span></td>
      <td>${tag(p.stocking)}</td>
      <td>${tag(p.status,statusType(p.status))}${statusReason(p)}</td>
      <td>${tag(p.itemStatus,itemStatusType(p.itemStatus))}</td>
      <td><b>${p.price}</b><span class="c-meta">采购价：${p.purchase}</span></td>
      <td><div class="c-stock"><div><span>平台在售</span><b>${p.platformStock}</b></div><div><span>本地可用</span><b>${p.localStock}</b></div></div></td>
      <td><b>${p.sales}</b><span class="c-meta">${p.salesTrend}</span></td>
      <td>${tag(p.binding,bindingType(p.binding))}<span class="c-meta">${p.bindingText}</span></td>
      <td>${timeGroup(p)}</td>
      <td><div class="c-ops"><button class="btn btn--sm log-btn">日志</button></div></td>
    </tr>`).join(""):`<tr><td colspan="12"><div class="c-empty"><b>暂无符合条件的商品</b><span>请调整筛选条件后重新查询。</span></div></td></tr>`;
  bindRows();
  syncSelection();
}

function bindRows(){
  document.querySelectorAll(".product-check").forEach(x=>x.onchange=syncSelection);
  document.querySelectorAll(".copy-id").forEach(btn=>btn.onclick=()=>{navigator.clipboard?.writeText(btn.dataset.copy).catch(()=>{});showMessage("商品 ID 已复制")});
  document.querySelectorAll(".log-btn").forEach(btn=>btn.onclick=()=>openLog(btn));
  document.querySelectorAll(".sku-open").forEach(btn=>btn.onclick=e=>{e.preventDefault();openSkuDrawer(btn)});
}

function productFromButton(btn){
  const row=btn.closest(".product-row");
  return products.find(p=>p.id===row.dataset.productId);
}
function skuKeywordValue(s){
  const key=selectValues.skuKeywordType;
  if(key==="\u672c\u5730 SKU") return s.local;
  if(key==="SKU \u7f16\u7801") return s.code;
  if(key==="\u8d27\u54c1\u6761\u7801") return s.barcode;
  if(key==="\u8d27\u54c1 ID") return s.goodsId;
  return s.online;
}
function matchesDrawerSku(s){
  const input=document.getElementById("skuKeywordInput");
  const word=(input?.value||"").trim().toLowerCase();
  const keywordOk=!word||skuKeywordValue(s).toLowerCase().includes(word);
  const saleOk=selectValues.skuSaleStatus==="\u5168\u90e8\u9500\u552e\u72b6\u6001"||s.status===selectValues.skuSaleStatus;
  const stockOk=selectValues.skuStockStatus==="\u5168\u90e8\u5e93\u5b58\u72b6\u6001"||
    (selectValues.skuStockStatus==="\u5e73\u53f0\u6709\u5e93\u5b58"&&s.platform>0)||
    (selectValues.skuStockStatus==="\u5e73\u53f0\u552e\u7f44"&&s.platform===0)||
    (selectValues.skuStockStatus==="\u672c\u5730\u6709\u5e93\u5b58"&&s.localStock>0)||
    (selectValues.skuStockStatus==="\u672c\u5730\u65e0\u5e93\u5b58"&&s.localStock===0);
  const bindingOk=selectValues.skuBindingStatus==="\u5168\u90e8\u7ed1\u5b9a\u72b6\u6001"||s.binding===selectValues.skuBindingStatus;
  return keywordOk&&saleOk&&stockOk&&bindingOk;
}
function renderSkuDrawerContext(){
  document.getElementById("skuDrawerContext").innerHTML=`<div class="c-product"><div class="c-product__image"></div><div class="c-product__info"><div class="c-product__title-row"><span class="c-product__title" title="${escapeHtml(currentSkuProduct.title)}">${escapeHtml(currentSkuProduct.title)}</span>${activityTag(currentSkuProduct.activity)}</div><div class="c-product-meta-list"><span><em>商品 ID</em><b>${currentSkuProduct.id}</b></span><span><em>店铺</em><b>${escapeHtml(currentSkuProduct.store)}</b></span><span><em>运营</em><b>${escapeHtml(currentSkuProduct.operator)}</b></span></div><span class="c-meta" title="${escapeHtml(currentSkuProduct.category)}">\u7c7b\u76ee\uff1a${escapeHtml(currentSkuProduct.category)}</span></div></div>`;
}
function warehouseEditor(s){
  const warehouses=s.warehouses?.length?s.warehouses:[{code:s.warehouse||"默认仓",name:s.warehouse||"默认仓",stock:s.platform}];
  return `<div class="c-warehouse-editor" data-sku-online="${escapeHtml(s.online)}">${warehouses.map(w=>`<label class="c-warehouse-stock"><span><b>${escapeHtml(w.name)}</b><small>${escapeHtml(w.code)}</small></span><input class="input c-warehouse-stock__input" type="number" min="0" step="1" value="${w.stock}" data-warehouse-code="${escapeHtml(w.code)}" data-original="${w.stock}" aria-label="${escapeHtml(w.name)}库存"></label>`).join("")}<div class="c-warehouse-editor__footer"><span>${s.activity?"活动中，仅可增加库存":"可分别调整各仓库存"}</span><button class="btn btn--sm save-warehouse-stock" type="button">保存</button></div><span class="c-warehouse-error"></span></div>`;
}
function renderSkuDrawerRows(){
  document.getElementById("skuDrawerRows").innerHTML=skuDrawerView.length?skuDrawerView.map(s=>`
    <tr>
      <td><div class="c-sku-cell"><div class="c-sku-thumb" data-spec="${escapeHtml(s.spec)}"></div><div class="c-relation"><div class="c-sku-name-row"><b>${s.name}</b></div><span><strong>\u5728\u7ebf SKU\uff1a</strong>${s.online}</span><span><strong>\u672c\u5730 SKU\uff1a</strong>${s.local}</span><span>SKU \u7f16\u7801\uff1a${s.code}\u3000\u8d27\u54c1\u6761\u7801\uff1a${s.barcode}</span><span>\u8d27\u54c1 ID\uff1a${s.goodsId}</span></div></div></td>
      <td>${s.spec}</td>
      <td>${tag(s.status,statusType(s.status))}</td>
      <td>${s.price}</td>
      <td>${warehouseEditor(s)}</td>
      <td><div class="c-stock"><div><span>${s.warehouse}</span><b>${s.localStock}</b></div></div></td>
      <td>${tag(s.binding,bindingType(s.binding))}</td>
      <td>${s.method}</td>
    </tr>
  `).join(""):`<tr><td colspan="8"><div class="c-empty"><b>\u6682\u65e0\u7b26\u5408\u6761\u4ef6\u7684 SKU</b><span>\u8bf7\u8c03\u6574\u7b5b\u9009\u6761\u4ef6\u540e\u91cd\u65b0\u67e5\u8be2\u3002</span></div></td></tr>`;
  bindSkuWarehouseEditors();
  document.getElementById("skuResultText").textContent=`\u5f53\u524d\u7b5b\u9009 ${skuDrawerView.length} \u6761`;
  document.getElementById("skuPaginationTotal").textContent=`\u5171 ${skuDrawerView.length} \u6761`;
}
function bindSkuWarehouseEditors(){
  document.querySelectorAll(".c-warehouse-stock__input").forEach(input=>input.oninput=()=>{
    const editor=input.closest(".c-warehouse-editor");
    const value=Number(input.value),minimum=Number(input.dataset.original);
    const invalid=!Number.isInteger(value)||value<0||(currentSkuProduct.activity&&value<minimum);
    input.classList.toggle("is-error",invalid);
    editor.querySelector(".c-warehouse-error").textContent=currentSkuProduct.activity&&value<minimum?`活动库存不可低于 ${minimum}`:(!Number.isInteger(value)||value<0?"请输入大于等于 0 的整数":"");
  });
  document.querySelectorAll(".save-warehouse-stock").forEach(btn=>btn.onclick=()=>saveWarehouseStock(btn.closest(".c-warehouse-editor")));
}
function saveWarehouseStock(editor){
  const sku=currentSkuProduct.skus.find(s=>s.online===editor.dataset.skuOnline);
  const inputs=[...editor.querySelectorAll(".c-warehouse-stock__input")];
  const invalid=inputs.find(input=>{const value=Number(input.value),warehouse=sku.warehouses.find(w=>w.code===input.dataset.warehouseCode);return !Number.isInteger(value)||value<0||(sku.activity&&value<warehouse.stock)});
  if(invalid){invalid.classList.add("is-error");invalid.focus();editor.querySelector(".c-warehouse-error").textContent=sku.activity&&Number(invalid.value)<Number(invalid.dataset.original)?`该 SKU 正在参加活动，${invalid.getAttribute("aria-label").replace("库存","")}库存不得低于 ${invalid.dataset.original}`:"请输入大于等于 0 的整数";showMessage("库存保存失败，请检查红色输入项");return}
  const changes=inputs.map(input=>{const warehouse=sku.warehouses.find(w=>w.code===input.dataset.warehouseCode),next=Number(input.value);return warehouse.stock===next?"":`${warehouse.name} ${warehouse.stock} → ${next}`}).filter(Boolean);
  inputs.forEach(input=>{const warehouse=sku.warehouses.find(w=>w.code===input.dataset.warehouseCode);warehouse.stock=Number(input.value)});
  sku.platform=sku.warehouses.reduce((sum,w)=>sum+w.stock,0);
  currentSkuProduct.platformStock=currentSkuProduct.skus.reduce((sum,item)=>sum+item.platform,0);
  if(changes.length){currentSkuProduct.lastWarehouseChange=`${sku.name}：${changes.join("，")}`;currentSkuProduct.change="多仓库存更新";currentSkuProduct.changeTime="刚刚"}
  renderProducts(currentView);
  applySkuDrawerFilters();
  showMessage(changes.length?`${sku.name} 多仓库存已保存`:"库存数量没有变化");
}
function applySkuDrawerFilters(){
  if(!currentSkuProduct)return;
  skuDrawerView=currentSkuProduct.skus.filter(matchesDrawerSku);
  renderSkuDrawerRows();
}
function resetSkuDrawerFilters(){
  Object.assign(selectValues,skuSelectDefaults);
  const input=document.getElementById("skuKeywordInput");
  if(input)input.value="";
  Object.entries(skuSelectDefaults).forEach(([key,value])=>{const span=document.querySelector(`[data-select="${key}"] span`);if(span)span.textContent=value});
  applySkuDrawerFilters();
  showMessage("SKU \u7b5b\u9009\u6761\u4ef6\u5df2\u91cd\u7f6e");
}
function openSkuDrawer(btn){
  const product=productFromButton(btn)||products.find(p=>p.id===btn.dataset.skuProduct);
  if(!product)return;
  currentSkuProduct=product;
  resetSkuDrawerFilters();
  renderSkuDrawerContext();
  applySkuDrawerFilters();
  document.getElementById("skuMask").classList.add("open");
}
function logsForProduct(product){
  const modules=["商品同步","库存同步","货品绑定","审核状态","库存同步规则","商品列表同步"];
  const dates=["2026-06-08","2026-06-07","2026-06-06"];
  const operators=["系统任务",product.operator,"马丽","李明","张敏"];
  const contents=[
    product.lastWarehouseChange?`多仓库存：${product.lastWarehouseChange}；`:`平台在售库存：当前汇总为 ${product.platformStock}；`,
    `商品状态：更新为 ${product.itemStatus}；`,
    `供货价：同步为 ${product.price}；`,
    `本地 SKU 绑定关系：完成校验；`,
    `最近 30 天销量：更新为 ${product.sales}；`,
    `商品基础信息：同步完成；`
  ];
  return Array.from({length:87},(_,index)=>{
    const date=dates[Math.floor(index/30)%dates.length];
    const minute=30-Math.floor(index/3),second=((40-index*7)%60+60)%60;
    return {time:`${date} 15:${String(Math.max(0,minute)).padStart(2,"0")}:${String(second).padStart(2,"0")}`,module:modules[index%modules.length],content:contents[index%contents.length],operator:operators[index%operators.length]};
  });
}
function filteredLogs(){
  if(!currentLogProduct)return [];
  const start=document.getElementById("logStartDate").value;
  const end=document.getElementById("logEndDate").value;
  return logsForProduct(currentLogProduct).filter(log=>
    (!start||log.time.slice(0,10)>=start)&&
    (!end||log.time.slice(0,10)<=end)&&
    (selectValues.logModule==="全部模块"||log.module===selectValues.logModule)&&
    (selectValues.logOperator==="全部操作人"||log.operator===selectValues.logOperator)
  );
}
function renderLog(){
  const logs=filteredLogs(),totalPages=Math.max(1,Math.ceil(logs.length/logPageSize));
  logPage=Math.min(logPage,totalPages);
  const start=(logPage-1)*logPageSize,end=Math.min(start+logPageSize,logs.length);
  document.getElementById("logRows").innerHTML=logs.length?logs.slice(start,end).map(log=>`<tr><td>${log.time}</td><td>${log.module}</td><td>${log.content}</td><td>${log.operator}</td></tr>`).join(""):`<tr><td colspan="4"><div class="c-empty"><b>暂无日志</b><span>请调整筛选条件后重新查询。</span></div></td></tr>`;
  document.getElementById("logRangeText").textContent=logs.length?`第 ${start+1}-${end} 条 / 共 ${logs.length} 条`:`第 0-0 条 / 共 0 条`;
  const pages=[1,2,3,4,5,totalPages].filter((page,index,list)=>page<=totalPages&&list.indexOf(page)===index);
  document.getElementById("logPages").innerHTML=`<button class="btn btn--sm log-page-action" data-log-action="prev" ${logPage===1?"disabled":""}>‹</button>${pages.map((page,index)=>`${index===pages.length-1&&page>6?"<span>...</span>":""}<button class="btn btn--sm log-page-action ${page===logPage?"btn--outlined btn--color-primary":""}" data-log-page="${page}">${page}</button>`).join("")}<button class="btn btn--sm log-page-action" data-log-action="next" ${logPage===totalPages?"disabled":""}>›</button>`;
  document.querySelectorAll(".log-page-action").forEach(btn=>btn.onclick=()=>{logPage=btn.dataset.logAction==="prev"?logPage-1:btn.dataset.logAction==="next"?logPage+1:Number(btn.dataset.logPage);renderLog()});
}
function openLog(btn){
  currentLogProduct=productFromButton(btn);logPage=1;
  document.getElementById("logSubtitle").textContent=`商品 ID：${currentLogProduct.id} · ${currentLogProduct.title}`;
  renderLog();document.getElementById("logMask").classList.add("open");
}
function updateLogDateRangeText(){
  const start=document.getElementById("logStartDate").value,end=document.getElementById("logEndDate").value;
  document.getElementById("logDateRangeInput").value=start&&end?`${start} 至 ${end}`:start||end||"";
}
function renderLogDatePanel(){
  const title=document.getElementById("logDateTitle"),days=document.getElementById("logDateDays");
  title.textContent=`${logCalendarYear} 年 ${logCalendarMonth+1} 月`;
  const firstDay=new Date(logCalendarYear,logCalendarMonth,1).getDay();
  const totalDays=new Date(logCalendarYear,logCalendarMonth+1,0).getDate();
  const prevTotal=new Date(logCalendarYear,logCalendarMonth,0).getDate();
  const cells=[];
  for(let i=firstDay-1;i>=0;i--)cells.push({day:prevTotal-i,muted:true,date:new Date(logCalendarYear,logCalendarMonth-1,prevTotal-i)});
  for(let day=1;day<=totalDays;day++)cells.push({day,muted:false,date:new Date(logCalendarYear,logCalendarMonth,day)});
  while(cells.length<42){const day=cells.length-firstDay-totalDays+1;cells.push({day,muted:true,date:new Date(logCalendarYear,logCalendarMonth+1,day)})}
  const start=document.getElementById("logStartDate").value,end=document.getElementById("logEndDate").value;
  days.innerHTML=cells.map(cell=>{
    const value=formatDate(cell.date);
    const inRange=start&&end&&value>=start&&value<=end;
    const selected=value===start||value===end;
    return `<button class="c-date-day ${cell.muted?"muted":""} ${selected?"selected":""} ${inRange?"in-range":""}" data-date="${value}">${cell.day}</button>`;
  }).join("");
  document.querySelectorAll("[data-date]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();selectLogDate(btn.dataset.date)});
}
function formatDate(date){
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
function openLogDatePanel(target){
  logDateTarget=target;
  document.getElementById("logDatePanel").classList.add("open");
  renderLogDatePanel();
}
function selectLogDate(value){
  const startInput=document.getElementById("logStartDate"),endInput=document.getElementById("logEndDate");
  if(logDateTarget==="start"||!startInput.value){startInput.value=value;logDateTarget="end";if(endInput.value&&startInput.value>endInput.value)endInput.value="";}
  else{endInput.value=value;if(startInput.value&&endInput.value<startInput.value){const old=startInput.value;startInput.value=endInput.value;endInput.value=old}document.getElementById("logDatePanel").classList.remove("open")}
  logPage=1;updateLogDateRangeText();renderLogDatePanel();renderLog();
}

function syncSelection(){
  const checks=[...document.querySelectorAll(".product-check")],selected=checks.filter(x=>x.checked);
  document.getElementById("selectedText").textContent=`已选 ${selected.length} 条`;
  document.getElementById("syncRuleBtn").disabled=!selected.length;
  document.getElementById("checkAll").checked=checks.length>0&&selected.length===checks.length;
}

function ruleMethodSelect(s,index){
  const id=`rowMethod${index}`;
  return `<div class="c-select"><button class="c-select__trigger" data-select="${id}"><span>${s.method}</span><i></i></button><div class="c-select__popup" data-popup="${id}" data-rule-index="${index}"><button class="c-action" data-value="本地可用库存">本地可用库存</button><button class="c-action" data-value="自定义数量">自定义数量</button><button class="c-action" data-value="无库存兜底">无库存兜底</button></div></div>`;
}
function ruleSyncSwitch(s,index){
  if(typeof s.syncEnabled!=="boolean") s.syncEnabled=s.status!=="停售";
  return `<button type="button" class="c-switch rule-sync${s.syncEnabled?" active":""}" role="switch" aria-checked="${s.syncEnabled}" aria-label="${s.name} 库存同步" data-rule-sync="${index}"><span></span></button>`;
}
function allRuleSkus(){return products.flatMap(p=>p.skus.map(s=>({p,s})))}
function renderRules(){
  const ruleSkus=allRuleSkus();
  document.getElementById("ruleRows").innerHTML=ruleSkus.map(({p,s},index)=>{if(typeof s.syncEnabled!=="boolean")s.syncEnabled=s.status!=="停售";return `<tr data-rule-index="${index}" data-mapping="${s.binding==="未绑定"?"未映射":"已映射"}" data-sync="${s.syncEnabled?"开启":"关闭"}" data-method="${s.method}"><td><button class="c-check-btn rule-check" aria-label="选择 ${s.name}"></button></td><td><div class="c-relation"><b>${s.name}</b><span>在线 SKU：${s.online}</span><span>本地 SKU：${s.local}　店铺：${p.store}</span></div></td><td><b>${s.platform}</b></td><td><b>${s.localStock}</b></td><td>${ruleSyncSwitch(s,index)}</td><td>${ruleMethodSelect(s,index)}</td><td><div class="c-rule-logic">${ruleLogic(s.method,s)}</div></td></tr>`}).join("");
  document.querySelectorAll(".rule-check").forEach(x=>x.onclick=()=>{x.classList.toggle("active");syncRuleSelection()});
  document.querySelectorAll(".rule-sync").forEach(x=>x.onclick=()=>{
    const index=Number(x.dataset.ruleSync),item=allRuleSkus()[index];
    item.s.syncEnabled=!item.s.syncEnabled;
    x.classList.toggle("active",item.s.syncEnabled);
    x.setAttribute("aria-checked",String(item.s.syncEnabled));
    x.closest("tr").dataset.sync=item.s.syncEnabled?"开启":"关闭";
    showMessage(`${item.s.name} 库存同步已${item.s.syncEnabled?"开启":"关闭"}`);
  });
  setupSelects();
}
function ruleLogic(method,s){
  if(method==="本地可用库存") return `按本地仓可用库存同步，推送 <b>${s.localStock}</b> 库存数量`;
  if(method==="无库存兜底") return `在线库存低于 <input class="input" value="5"> 且系统无可用库存时，补 <input class="input" value="10"> 库存数量`;
  return `在线库存低于 <input class="input" value="5"> 时，补 <input class="input" value="10"> 库存数量`;
}
function updateRuleMethod(index,method){
  const item=allRuleSkus()[index]; item.s.method=method;
  const row=document.querySelector(`[data-rule-index="${index}"]`); row.dataset.method=method;
  row.querySelector(".c-rule-logic").innerHTML=ruleLogic(method,item.s);
  showMessage(`已将 ${item.s.name} 设置为“${method}”`);
}
function syncRuleSelection(){
  const checks=[...document.querySelectorAll(".rule-check")].filter(x=>x.closest("tr").style.display!=="none"),n=checks.filter(x=>x.classList.contains("active")).length;
  document.getElementById("ruleSelectedText").textContent=`已选 ${n} 个 SKU`;
  document.getElementById("applyRuleBtn").disabled=!n;
  document.getElementById("ruleCheckAll").classList.toggle("active",checks.length>0&&n===checks.length);
}

function selectOption(key,value,popup){
  selectValues[key]=value;
  document.querySelector(`[data-select="${key}"] span`).textContent=value;
  if(popup.dataset.ruleIndex!==undefined) updateRuleMethod(Number(popup.dataset.ruleIndex),value);
  if(key==="sort"){applyFilters();showMessage(`已按“${value}”排序`)}
  if(key==="pageSize"){pageSize=Number(value.match(/\d+/)[0]);currentPage=1;renderPagination();document.getElementById("resultText").textContent=`当前筛选 ${resultTotal.toLocaleString()} 条，每页展示 ${pageSize} 条`;showMessage(`已切换为每页 ${pageSize} 条`)}
  if(key==="logPageSize"){logPageSize=Number(value.match(/\d+/)[0]);logPage=1;renderLog()}
  if(key==="logModule"||key==="logOperator"){logPage=1;renderLog()}
  if(key.startsWith("sku")&&document.getElementById("skuMask")?.classList.contains("open")) applySkuDrawerFilters()
}
function setupSelects(){
  document.querySelectorAll("[data-select]").forEach(trigger=>trigger.onclick=e=>{e.stopPropagation();const popup=document.querySelector(`[data-popup="${trigger.dataset.select}"]`);document.querySelectorAll(".c-select__popup.open").forEach(x=>x!==popup&&x.classList.remove("open"));popup?.classList.toggle("open")});
  document.querySelectorAll(".c-select__popup button").forEach(opt=>opt.onclick=e=>{e.stopPropagation();const popup=opt.parentElement;selectOption(popup.dataset.popup,opt.dataset.value,popup);popup.classList.remove("open")});
}

function categoryNodeAt(level,index){
  let nodes=window.CATEGORY_TREE,node=null;
  for(let i=0;i<=level;i++){node=nodes[categoryLevels[i]??0];nodes=node?.children||[]}
  return level===0?window.CATEGORY_TREE[index]:node?.children?.[index];
}
function categoryNodesForLevel(level){
  if(level===0)return window.CATEGORY_TREE;
  let nodes=window.CATEGORY_TREE;
  for(let i=0;i<level;i++){const node=nodes[categoryLevels[i]];nodes=node?.children||[]}
  return nodes;
}
function categoryPathNames(){
  let nodes=window.CATEGORY_TREE,names=[];
  for(const index of categoryLevels){const node=nodes[index];if(!node)break;names.push(node.name);nodes=node.children||[]}
  return names;
}
function renderCategoryCascader(){
  const columns=document.getElementById("categoryColumns");const columnCount=Math.min(3,categoryLevels.length+1);
  columns.innerHTML=Array.from({length:columnCount},(_,level)=>{
    const nodes=categoryNodesForLevel(level);
    return `<div class="c-cascader__column">${nodes.map((node,index)=>`<button class="c-cascader__option ${categoryLevels[level]===index?"active":""}" data-category-level="${level}" data-category-index="${index}"><span>${node.name}</span>${node.children?.length?"<i></i>":""}</button>`).join("")}</div>`;
  }).join("");
  const names=categoryPathNames();
  document.getElementById("categoryPath").textContent=names.length?names.join(" / "):"全部类目";
  document.querySelectorAll("[data-category-level]").forEach(btn=>btn.onclick=e=>{
    e.stopPropagation();const level=Number(btn.dataset.categoryLevel),index=Number(btn.dataset.categoryIndex);categoryLevels=categoryLevels.slice(0,level);categoryLevels[level]=index;
    const node=categoryNodesForLevel(level)[index];
    if(node.children?.length)renderCategoryCascader();else{const path=categoryPathNames();selectValues.category=node.name;document.querySelector("#categoryTrigger span").textContent=path.join(" / ");document.getElementById("categoryPopup").classList.remove("open");showMessage(`已选择类目：${path.join(" / ")}`)}
  });
}
function resetCategory(){
  categoryLevels=[];selectValues.category="全部类目";document.querySelector("#categoryTrigger span").textContent="请选择类目";renderCategoryCascader();
}

function matchesStatusTab(p){
  if(activeStatus==="全部") return true;
  if(activeStatus==="售罄") return p.platformStock===0||p.skus.some(s=>s.platform===0);
  if(activeStatus==="货品未绑定") return p.binding==="未绑定"||p.skus.some(s=>s.binding==="未绑定");
  return p.status===activeStatus;
}
function matchesFilters(p){
  const productWord=document.getElementById("productKeywordInput").value.trim().toLowerCase();
  const goodsWord=document.getElementById("goodsKeywordInput").value.trim().toLowerCase();
  const productHay=selectValues.productKeyword==="商品标题"?p.title:selectValues.productKeyword==="SKU 编码"?p.skus.map(s=>s.code).join(" "):p.id;
  const goodsHay=selectValues.goodsKeyword==="货品条码"?p.skus.map(s=>s.barcode).join(" "):selectValues.goodsKeyword==="本地 SKU"?p.skus.map(s=>s.local).join(" "):p.skus.map(s=>s.goodsId).join(" ");
  const stockOk=selectValues.stock==="全部库存状态"||(selectValues.stock==="有库存"&&p.platformStock>0)||(selectValues.stock==="库存为 0"&&p.platformStock===0);
  const activityOk=selectValues.activity==="全部活动状态"||(selectValues.activity==="参加活动"&&p.activity)||(selectValues.activity==="未参加活动"&&!p.activity);
  return matchesStatusTab(p)&&(!productWord||productHay.toLowerCase().includes(productWord))&&(!goodsWord||goodsHay.toLowerCase().includes(goodsWord))&&(selectValues.store==="全部全托管店铺"||p.store===selectValues.store)&&(selectValues.category==="全部类目"||p.category.includes(selectValues.category))&&(selectValues.stocking==="全部备货类型"||p.stocking===selectValues.stocking)&&stockOk&&(selectValues.binding==="全部绑定状态"||p.binding===selectValues.binding)&&activityOk;
}
function applyFilters(){
  currentView=products.filter(matchesFilters);
  if(selectValues.sort==="创建时间倒序") currentView.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  if(selectValues.sort==="创建时间正序") currentView.sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
  if(selectValues.sort==="30 天销量从大到小") currentView.sort((a,b)=>b.sales-a.sales);
  if(selectValues.sort==="30 天销量从小到大") currentView.sort((a,b)=>a.sales-b.sales);
  resultTotal=currentView.length;
  renderTabs();renderProducts();renderPagination();
  document.getElementById("resultText").textContent=`当前筛选 ${resultTotal.toLocaleString()} 条，每页展示 ${pageSize} 条`;
}
function resetFilters(){
  Object.assign(selectValues,selectDefaults);activeStatus="全部";currentPage=1;
  selectValues.pageSize=`${pageSize} 条/页`;
  document.getElementById("productKeywordInput").value="";document.getElementById("goodsKeywordInput").value="";
  Object.entries(selectDefaults).forEach(([key,value])=>{if(key==="pageSize")return;const span=document.querySelector(`[data-select="${key}"] span`);if(span)span.textContent=value});
  resetCategory();
  applyFilters();showMessage("筛选条件已重置");
}
function exportList(){
  showMessage(`导出任务已创建，共 ${currentView.length} 条商品，可前往导出中心下载`);
}
function changePage(page){
  const totalPages=Math.max(1,Math.ceil(resultTotal/pageSize));currentPage=Math.max(1,Math.min(totalPages,page));renderPagination();showMessage(`已切换到第 ${currentPage} 页`);
}
function renderPagination(){
  const totalPages=Math.max(1,Math.ceil(resultTotal/pageSize));
  currentPage=Math.min(currentPage,totalPages);
  const pageSet=new Set([1,totalPages,currentPage-1,currentPage,currentPage+1]);
  const pages=[...pageSet].filter(page=>page>=1&&page<=totalPages).sort((a,b)=>a-b);
  let last=0,html=`<button class="btn btn--sm page-action" data-page-action="prev" ${currentPage===1?"disabled":""}>上一页</button>`;
  pages.forEach(page=>{if(last&&page-last>1)html+="<span>...</span>";html+=`<button class="btn btn--sm page-action ${page===currentPage?"btn--outlined btn--color-primary":""}" data-page="${page}">${page}</button>`;last=page});
  html+=`<button class="btn btn--sm page-action" data-page-action="next" ${currentPage===totalPages?"disabled":""}>下一页</button>`;
  document.getElementById("paginationButtons").innerHTML=html;
  document.getElementById("paginationTotal").textContent=`共 ${resultTotal.toLocaleString()} 条`;
  document.querySelectorAll(".page-action").forEach(btn=>btn.onclick=()=>changePage(btn.dataset.pageAction==="prev"?currentPage-1:btn.dataset.pageAction==="next"?currentPage+1:Number(btn.dataset.page)));
}
function applyRuleFilters(){
  let visible=0;document.querySelectorAll("#ruleRows tr").forEach(row=>{const show=(selectValues.mapping==="全部"||row.dataset.mapping===selectValues.mapping)&&(selectValues.syncStatus==="全部"||row.dataset.sync===selectValues.syncStatus)&&(selectValues.ruleMethod==="全部"||row.dataset.method===selectValues.ruleMethod);row.style.display=show?"":"none";if(show)visible++});syncRuleSelection();showMessage(`筛选出 ${visible} 个 SKU`);
}
function resetRuleFilters(){
  ["mapping","syncStatus","ruleMethod"].forEach(key=>{selectValues[key]="全部";document.querySelector(`[data-select="${key}"] span`).textContent="全部"});document.querySelectorAll("#ruleRows tr").forEach(x=>x.style.display="");syncRuleSelection();showMessage("库存规则筛选已重置");
}
function showMessage(text){const m=document.getElementById("message");m.textContent=text;m.classList.add("open");setTimeout(()=>m.classList.remove("open"),1600)}

renderTabs();renderProducts();renderRules();renderPagination();setupSelects();renderCategoryCascader();
renderLogDatePanel();
document.onclick=()=>{document.querySelectorAll(".c-select__popup.open").forEach(x=>x.classList.remove("open"));document.getElementById("categoryPopup").classList.remove("open");document.getElementById("logDatePanel").classList.remove("open")};
document.getElementById("categoryTrigger").onclick=e=>{e.stopPropagation();document.querySelectorAll(".c-select__popup.open").forEach(x=>x.classList.remove("open"));document.getElementById("categoryPopup").classList.toggle("open");renderCategoryCascader()};
document.getElementById("categoryPopup").onclick=e=>e.stopPropagation();
document.getElementById("categoryClear").onclick=e=>{e.stopPropagation();resetCategory();document.getElementById("categoryPopup").classList.remove("open");showMessage("类目筛选已清空")};
document.getElementById("logDateRange").onclick=e=>e.stopPropagation();
document.getElementById("logDateRangeInput").onclick=()=>openLogDatePanel(document.getElementById("logStartDate").value?"end":"start");
document.getElementById("logStartDate").onclick=()=>openLogDatePanel("start");
document.getElementById("logEndDate").onclick=()=>openLogDatePanel("end");
document.getElementById("logDateArrow").onclick=()=>openLogDatePanel(document.getElementById("logStartDate").value?"end":"start");
document.querySelectorAll("[data-date-nav]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();const step=btn.dataset.dateNav==="prev"?-12:-1;const next=new Date(logCalendarYear,logCalendarMonth+step,1);logCalendarYear=next.getFullYear();logCalendarMonth=next.getMonth();renderLogDatePanel()});
const collapseBtn=document.getElementById("collapseBtn");
if(collapseBtn)collapseBtn.onclick=()=>{document.querySelector(".c-shell").classList.toggle("collapsed");showMessage(document.querySelector(".c-shell").classList.contains("collapsed")?"菜单已收起":"菜单已展开")};
document.getElementById("advancedBtn").onclick=()=>{const p=document.getElementById("advancedFilters");p.classList.toggle("open");advancedBtn.textContent=p.classList.contains("open")?"收起更多筛选":"展开更多筛选"};
document.getElementById("searchBtn").onclick=()=>{applyFilters();showMessage(`查询完成，共 ${currentView.length} 条`)};
document.getElementById("resetBtn").onclick=resetFilters;
document.getElementById("exportBtn").onclick=exportList;
document.getElementById("checkAll").onchange=e=>{document.querySelectorAll(".product-check").forEach(x=>x.checked=e.target.checked);syncSelection()};
document.getElementById("syncRuleBtn").onclick=()=>document.getElementById("ruleMask").classList.add("open");
document.querySelectorAll("[data-close=sku]").forEach(x=>x.onclick=()=>document.getElementById("skuMask").classList.remove("open"));
document.querySelectorAll("[data-close=log]").forEach(x=>x.onclick=()=>document.getElementById("logMask").classList.remove("open"));
document.querySelectorAll("[data-close=rule]").forEach(x=>x.onclick=()=>document.getElementById("ruleMask").classList.remove("open"));
document.getElementById("skuMask").onclick=e=>e.target.id==="skuMask"&&e.target.classList.remove("open");
document.getElementById("logMask").onclick=e=>e.target.id==="logMask"&&e.target.classList.remove("open");
document.getElementById("ruleMask").onclick=e=>e.target.id==="ruleMask"&&e.target.classList.remove("open");
document.getElementById("ruleCheckAll").onclick=e=>{const activate=!e.currentTarget.classList.contains("active");document.querySelectorAll(".rule-check").forEach(x=>{if(x.closest("tr").style.display!=="none")x.classList.toggle("active",activate)});syncRuleSelection()};
document.querySelectorAll("#batchMethods button").forEach(btn=>btn.onclick=()=>{batchMethod=btn.dataset.method;document.querySelectorAll("#batchMethods button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");showMessage(`批量补货方式：${btn.textContent}`)});
document.getElementById("applyRuleBtn").onclick=()=>{const names={local:"本地可用库存",custom:"自定义数量",fallback:"无库存兜底"};document.querySelectorAll(".rule-check.active").forEach(x=>updateRuleMethod(Number(x.closest("tr").dataset.ruleIndex),names[batchMethod]));renderRules();showMessage("批量规则已应用到所选 SKU")};
document.getElementById("ruleSearchBtn").onclick=applyRuleFilters;
document.getElementById("ruleResetBtn").onclick=resetRuleFilters;
document.getElementById("saveRuleBtn").onclick=()=>{document.getElementById("ruleMask").classList.remove("open");showMessage("库存同步规则已保存")};
document.getElementById("skuSearchBtn").onclick=()=>{applySkuDrawerFilters();showMessage(`\u67e5\u8be2\u5b8c\u6210\uff0c\u5171 ${skuDrawerView.length} \u4e2a SKU`)};
document.getElementById("skuResetBtn").onclick=resetSkuDrawerFilters;
document.getElementById("logSearchBtn").onclick=()=>{logPage=1;renderLog();showMessage("日志筛选已更新")};
document.getElementById("logResetBtn").onclick=()=>{document.getElementById("logStartDate").value="";document.getElementById("logEndDate").value="";updateLogDateRangeText();selectValues.logModule="全部模块";selectValues.logOperator="全部操作人";document.querySelector('[data-select="logModule"] span').textContent="全部模块";document.querySelector('[data-select="logOperator"] span').textContent="全部操作人";logPage=1;renderLogDatePanel();renderLog();showMessage("日志筛选已重置")};
document.getElementById("logJumpInput").onkeydown=e=>{if(e.key==="Enter"){const total=Math.max(1,Math.ceil(filteredLogs().length/logPageSize)),page=Number(e.currentTarget.value);if(page>=1&&page<=total){logPage=page;renderLog()}else showMessage(`请输入 1-${total} 的页码`)}};
