const products=window.PRODUCTS;
const rows=document.getElementById("productRows");
const selectDefaults={productKeyword:"商品 ID",goodsKeyword:"货品 ID",store:"全部全托管店铺",category:"全部类目",stocking:"全部备货类型",stock:"全部库存状态",binding:"全部绑定状态",sort:"创建时间倒序",mapping:"全部",syncStatus:"全部",ruleMethod:"全部",logPageSize:"10 条/页",logModule:"全部模块",logOperator:"全部操作人"};
const selectValues={...selectDefaults};
let activeStatus="全部";
let currentPage=1;
let currentLogProduct=null;
let logPage=1;
let logPageSize=10;
let currentView=[...products];
let batchMethod="local";
let categoryLevels=[];
let logDateTarget="start";
let logCalendarYear=2026;
let logCalendarMonth=5;

const tag=(text,type="default")=>`<span class="tag tag--${type}">${text}</span>`;
const statusType=s=>s==="销售中"?"success":s==="审核中"?"warning":s==="审核不通过"?"error":"default";
const bindingType=s=>s==="全部已绑定"?"success":s==="未绑定"?"error":"warning";

function renderTabs(){
  document.getElementById("statusTabs").innerHTML=window.STATUS_TABS.map(x=>`<button class="c-action ${x[0]===activeStatus?"active":""}" data-status="${x[0]}">${x[0]} <em>${x[1]}</em></button>`).join("");
  document.querySelectorAll("[data-status]").forEach(btn=>btn.onclick=()=>{activeStatus=btn.dataset.status;currentPage=1;applyFilters()});
}

function skuRows(product){
  return product.skus.map(s=>`<tr><td><div class="c-relation"><b>${s.name}</b><span><strong>在线 SKU：</strong>${s.online}　/　<strong>本地 SKU：</strong>${s.local}</span><span>SKU 编码：${s.code}　货品条码：${s.barcode}　货品 ID：${s.goodsId}</span></div></td><td>${s.spec}</td><td>${tag(s.status,statusType(s.status))}</td><td>${s.price}</td><td><div class="c-stock"><div><span>平台在售</span><b>${s.platform}</b></div><div><span>本地可用</span><b>${s.warehouse} ${s.localStock}</b></div></div></td><td>${tag(s.binding,bindingType(s.binding))}</td></tr>`).join("");
}

function renderProducts(list=currentView){
  rows.innerHTML=list.length?list.map(p=>`
    <tr class="product-row" data-product-id="${p.id}">
      <td><input type="checkbox" class="product-check"></td>
      <td><div class="c-product"><div class="c-product__image"></div><div class="c-product__info"><span class="c-product__title" title="${p.title}">${p.title}</span><span class="c-meta c-meta-line">商品 ID：${p.id}<button class="c-link copy-id" data-copy="${p.id}">复制</button></span><span class="c-meta" title="${p.category}">类目：${p.category}</span><button class="c-link sku-toggle">共 ${p.skus.length} 个 SKU ▼</button></div></div></td>
      <td><b>${p.store}</b><span class="c-meta">运营：${p.operator}</span></td>
      <td>${tag(p.stocking)}</td>
      <td>${tag(p.status,statusType(p.status))}<span class="c-meta" title="${p.statusText}">${p.statusText}</span></td>
      <td><b>${p.price}</b><span class="c-meta">采购价：${p.purchase}</span></td>
      <td><div class="c-stock"><div><span>平台在售</span><b>${p.platformStock}</b></div><div><span>本地可用</span><b>${p.localStock}</b></div></div></td>
      <td><b>${p.sales}</b><span class="c-meta">${p.salesTrend}</span></td>
      <td>${tag(p.binding,bindingType(p.binding))}<span class="c-meta">${p.bindingText}</span></td>
      <td>${tag(p.change,"warning")}<span class="c-meta">${p.changeTime}</span></td>
      <td><div class="c-ops"><button class="btn btn--sm log-btn">日志</button></div></td>
    </tr>
    <tr class="c-sku-row"><td colspan="11"><div class="c-sku-panel"><div class="c-sku-panel__head"><div><b>SKU 明细</b><span>展示该 listing 下全部 SKU，字段与商品列表保持对齐。</span></div></div><table class="c-sku-table"><thead><tr><th>SKU 关系</th><th>规格</th><th>销售状态</th><th>供货价</th><th>库存对照</th><th>货品绑定</th></tr></thead><tbody>${skuRows(p)}</tbody></table></div></td></tr>`).join(""):`<tr><td colspan="11"><div class="c-empty"><b>暂无符合条件的商品</b><span>请调整筛选条件后重新查询。</span></div></td></tr>`;
  bindRows();
  syncSelection();
}

function bindRows(){
  document.querySelectorAll(".sku-toggle").forEach(btn=>btn.onclick=()=>{const skuRow=btn.closest(".product-row").nextElementSibling;skuRow.classList.toggle("open");btn.textContent=btn.textContent.includes("▼")?btn.textContent.replace("▼","▲"):btn.textContent.replace("▲","▼")});
  document.querySelectorAll(".product-check").forEach(x=>x.onchange=syncSelection);
  document.querySelectorAll(".copy-id").forEach(btn=>btn.onclick=()=>{navigator.clipboard?.writeText(btn.dataset.copy).catch(()=>{});showMessage("商品 ID 已复制")});
  document.querySelectorAll(".log-btn").forEach(btn=>btn.onclick=()=>openLog(btn));
}

function productFromButton(btn){
  const row=btn.closest(".product-row")||btn.closest(".c-sku-row")?.previousElementSibling;
  return products.find(p=>p.id===row.dataset.productId);
}
function logsForProduct(product){
  const modules=["商品同步","库存同步","货品绑定","审核状态","库存同步规则","商品列表同步"];
  const dates=["2026-06-08","2026-06-07","2026-06-06"];
  const operators=["系统任务",product.operator,"马丽","李明","张敏"];
  const contents=[
    `平台在售库存：由 10 修改为 ${product.platformStock}；`,
    `商品状态：更新为 ${product.status}；`,
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
function allRuleSkus(){return products.flatMap(p=>p.skus.map(s=>({p,s})))}
function renderRules(){
  const ruleSkus=allRuleSkus();
  document.getElementById("ruleRows").innerHTML=ruleSkus.map(({p,s},index)=>`<tr data-rule-index="${index}" data-mapping="${s.binding==="未绑定"?"未映射":"已映射"}" data-sync="开启" data-method="${s.method}"><td><button class="c-check-btn rule-check" aria-label="选择 ${s.name}"></button></td><td><div class="c-relation"><b>${s.name}</b><span>在线 SKU：${s.online}</span><span>本地 SKU：${s.local}　店铺：${p.store}</span></div></td><td><b>${s.platform}</b></td><td><b>${s.localStock}</b></td><td>${ruleMethodSelect(s,index)}</td><td><div class="c-rule-logic">${ruleLogic(s.method,s)}</div></td></tr>`).join("");
  document.querySelectorAll(".rule-check").forEach(x=>x.onclick=()=>{x.classList.toggle("active");syncRuleSelection()});
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
  if(key==="logPageSize"){logPageSize=Number(value.match(/\d+/)[0]);logPage=1;renderLog()}
  if(key==="logModule"||key==="logOperator"){logPage=1;renderLog()}
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

function matchesFilters(p){
  const productWord=document.getElementById("productKeywordInput").value.trim().toLowerCase();
  const goodsWord=document.getElementById("goodsKeywordInput").value.trim().toLowerCase();
  const productHay=selectValues.productKeyword==="商品标题"?p.title:selectValues.productKeyword==="SKU 编码"?p.skus.map(s=>s.code).join(" "):p.id;
  const goodsHay=selectValues.goodsKeyword==="货品条码"?p.skus.map(s=>s.barcode).join(" "):selectValues.goodsKeyword==="本地 SKU"?p.skus.map(s=>s.local).join(" "):p.skus.map(s=>s.goodsId).join(" ");
  const stockOk=selectValues.stock==="全部库存状态"||(selectValues.stock==="有库存"&&p.platformStock>0)||(selectValues.stock==="库存为 0"&&p.platformStock===0)||(selectValues.stock==="部分 SKU 售罄"&&p.skus.some(s=>s.platform===0)&&p.skus.some(s=>s.platform>0))||(selectValues.stock==="库存异常"&&p.localStock===0);
  return (activeStatus==="全部"||p.status===activeStatus)&&(!productWord||productHay.toLowerCase().includes(productWord))&&(!goodsWord||goodsHay.toLowerCase().includes(goodsWord))&&(selectValues.store==="全部全托管店铺"||p.store===selectValues.store)&&(selectValues.category==="全部类目"||p.category.includes(selectValues.category))&&(selectValues.stocking==="全部备货类型"||p.stocking===selectValues.stocking)&&stockOk&&(selectValues.binding==="全部绑定状态"||p.binding===selectValues.binding);
}
function applyFilters(){
  currentView=products.filter(matchesFilters);
  if(selectValues.sort==="创建时间正序") currentView.reverse();
  if(selectValues.sort==="30 天销量从大到小") currentView.sort((a,b)=>b.sales-a.sales);
  if(selectValues.sort==="30 天销量从小到大") currentView.sort((a,b)=>a.sales-b.sales);
  renderTabs();renderProducts();
  document.getElementById("resultText").textContent=`当前筛选 ${currentView.length} 条，每页展示 10 条`;
  document.getElementById("paginationTotal").textContent=`共 ${currentView.length} 条`;
}
function resetFilters(){
  Object.assign(selectValues,selectDefaults);activeStatus="全部";currentPage=1;
  document.getElementById("productKeywordInput").value="";document.getElementById("goodsKeywordInput").value="";
  Object.entries(selectDefaults).forEach(([key,value])=>{const span=document.querySelector(`[data-select="${key}"] span`);if(span)span.textContent=value});
  resetCategory();
  applyFilters();showMessage("筛选条件已重置");
}
function exportList(){
  showMessage(`导出任务已创建，共 ${currentView.length} 条商品，可前往导出中心下载`);
}
function changePage(page){
  currentPage=Math.max(1,Math.min(149,page));document.querySelectorAll("[data-page]").forEach(x=>x.classList.toggle("btn--color-primary",Number(x.dataset.page)===currentPage));showMessage(`已切换到第 ${currentPage} 页`);
}
function applyRuleFilters(){
  let visible=0;document.querySelectorAll("#ruleRows tr").forEach(row=>{const show=(selectValues.mapping==="全部"||row.dataset.mapping===selectValues.mapping)&&(selectValues.syncStatus==="全部"||row.dataset.sync===selectValues.syncStatus)&&(selectValues.ruleMethod==="全部"||row.dataset.method===selectValues.ruleMethod);row.style.display=show?"":"none";if(show)visible++});syncRuleSelection();showMessage(`筛选出 ${visible} 个 SKU`);
}
function resetRuleFilters(){
  ["mapping","syncStatus","ruleMethod"].forEach(key=>{selectValues[key]="全部";document.querySelector(`[data-select="${key}"] span`).textContent="全部"});document.querySelectorAll("#ruleRows tr").forEach(x=>x.style.display="");syncRuleSelection();showMessage("库存规则筛选已重置");
}
function showMessage(text){const m=document.getElementById("message");m.textContent=text;m.classList.add("open");setTimeout(()=>m.classList.remove("open"),1600)}

renderTabs();renderProducts();renderRules();setupSelects();renderCategoryCascader();
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
document.querySelectorAll("[data-close=log]").forEach(x=>x.onclick=()=>document.getElementById("logMask").classList.remove("open"));
document.querySelectorAll("[data-close=rule]").forEach(x=>x.onclick=()=>document.getElementById("ruleMask").classList.remove("open"));
document.getElementById("logMask").onclick=e=>e.target.id==="logMask"&&e.target.classList.remove("open");
document.getElementById("ruleMask").onclick=e=>e.target.id==="ruleMask"&&e.target.classList.remove("open");
document.getElementById("ruleCheckAll").onclick=e=>{const activate=!e.currentTarget.classList.contains("active");document.querySelectorAll(".rule-check").forEach(x=>{if(x.closest("tr").style.display!=="none")x.classList.toggle("active",activate)});syncRuleSelection()};
document.querySelectorAll("#batchMethods button").forEach(btn=>btn.onclick=()=>{batchMethod=btn.dataset.method;document.querySelectorAll("#batchMethods button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");showMessage(`批量补货方式：${btn.textContent}`)});
document.getElementById("applyRuleBtn").onclick=()=>{const names={local:"本地可用库存",custom:"自定义数量",fallback:"无库存兜底"};document.querySelectorAll(".rule-check.active").forEach(x=>updateRuleMethod(Number(x.closest("tr").dataset.ruleIndex),names[batchMethod]));renderRules();showMessage("批量规则已应用到所选 SKU")};
document.getElementById("ruleSearchBtn").onclick=applyRuleFilters;
document.getElementById("ruleResetBtn").onclick=resetRuleFilters;
document.getElementById("saveRuleBtn").onclick=()=>{document.getElementById("ruleMask").classList.remove("open");showMessage("库存同步规则已保存")};
document.getElementById("logSearchBtn").onclick=()=>{logPage=1;renderLog();showMessage("日志筛选已更新")};
document.getElementById("logResetBtn").onclick=()=>{document.getElementById("logStartDate").value="";document.getElementById("logEndDate").value="";updateLogDateRangeText();selectValues.logModule="全部模块";selectValues.logOperator="全部操作人";document.querySelector('[data-select="logModule"] span').textContent="全部模块";document.querySelector('[data-select="logOperator"] span').textContent="全部操作人";logPage=1;renderLogDatePanel();renderLog();showMessage("日志筛选已重置")};
document.getElementById("logJumpInput").onkeydown=e=>{if(e.key==="Enter"){const total=Math.max(1,Math.ceil(filteredLogs().length/logPageSize)),page=Number(e.currentTarget.value);if(page>=1&&page<=total){logPage=page;renderLog()}else showMessage(`请输入 1-${total} 的页码`)}};
document.querySelectorAll(".page-action").forEach(btn=>btn.onclick=()=>changePage(btn.dataset.pageAction==="prev"?currentPage-1:btn.dataset.pageAction==="next"?currentPage+1:Number(btn.dataset.page)));
