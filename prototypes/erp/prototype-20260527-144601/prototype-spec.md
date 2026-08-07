# 已发货订单结算对账原型说明

## 页面信息

- 页面名称：已发货订单结算对账
- 页面编号：P1
- 原型等级：prototype-draft
- 对应 PRD：`intake/prd/order-settlement-reconciliation.md`
- 本地路径：`prototype/order-settlement-reconciliation/index.html`

## 1. 页面目标

按平台单号把 ERP 已发货订单与平台后台结算账单进行匹配，在同一页面识别已结算、未结算订单，并核对预估口径、结算口径和每项差异值。

## 2. 用户入口

- 入口：财务对账 / 发货确认收入 / 已发货订单结算对账
- 左侧导航：上方保留“订单结算匹配”入口，下方为当前“发货确认收入”入口。
- 目标用户：财务、运营、业务负责人、系统管理员
- 本轮仅实现单页 HTML 原型，不新增导入流程、自动调账流程、Figma 设计稿或在线发布。

## 3. 页面结构

页面采用 ERP 后台列表页结构：

1. ERP 壳层与面包屑
2. 页面标题与口径提示
3. 查询筛选区
4. 汇总指标区（仅发货确认收入页展示，订单结算匹配页已按截图反馈去掉）
5. 订单对账明细表
6. 订单差异明细抽屉
7. 导出成功反馈

### 3.1 页面来源映射

| 可见元素 | 来源章节 / 用户确认 | 是否必需 | 备注 |
|---|---|---|---|
| 页面标题“已发货订单结算对账” | PRD 10.2 / 用户需求 | 是 | 页面主题 |
| 订单结算匹配筛选项：已结算 / 未结算 / 全部、平台、店铺、平台单号 | 用户截图反馈 | 是 | 状态切换展示对应订单数量 |
| 发货确认收入筛选项：平台、店铺主体、店铺、是否结算、发货时间、结算时间 | 用户截图反馈 | 是 | 去掉平台单号、平台 SKU、发货 SKU；是否结算改为筛选区条件 |
| 汇总指标 | PRD 10.2A / 10.3 / 用户截图反馈 | 是 | 两个页面均去掉汇总卡片；订单结算匹配由顶部状态按钮承载数量 |
| 主表核心字段 | PRD 4.2 / 10.3 / 用户截图反馈 | 是 | 发货确认收入展示主体公司、平台、店铺、币种、是否结算、全部费用字段和字段级差异 |
| 导出当前列表 | PRD 4.3 / 7 / 10.5 | 是 | 导出当前筛选结果核心字段 |
| 导出完整对账明细 | PRD 4.3 / 7 / 10.5 | 是 | 导出全部字段和全部差异字段 |
| 查看差异抽屉 | PRD 4.4 / 10.3 | 是 | 展示基础信息，以及字段级预估金额、账单金额、差异值合并明细 |

### 3.2 组件映射

| 页面区域 | ERP 公共组件 | Ant Design 映射 | 状态覆盖 |
|---|---|---|---|
| 壳层 | ErpShell | Layout / Menu / Breadcrumb | active menu / overflow |
| 标题区 | PageHeaderBar | Typography / Space | 默认 |
| 查询区 | QueryFilterBar | Form / Input / Select / DatePicker / Button | default / reset / searching |
| 时间口径 | DateComparisonControl 临时组合 | RangePicker / Segmented | 仅发货确认收入页展示 |
| 汇总区 | MetricComparisonCard | Card / Statistic | 当前按用户反馈隐藏 |
| 结果区 | DataTablePanel | Table / Tag / Empty | default / empty / filtered empty |
| 详情区 | DetailDrawer | Drawer / Descriptions / Table | open / close |
| 导出反馈 | FeedbackState | Message / Notification | success |

### 3.3 设计基础映射

| 设计项 | 默认规则 | 本页面取值 |
|---|---|---|
| 主色 | Ant Design blue | `var(--color-primary-6)` |
| 页面背景 | ERP 浅灰背景 | `var(--color-bg-layout)` |
| 面板 | 白底、细边框、弱阴影 | `surface-panel` |
| 字体 | ERP token 字号 | `tokens.css` 字体 token |
| 间距 | token 间距 | `var(--space-*)` |
| 圆角 | token 圆角 | `var(--radius)` / `var(--radius-lg)` |
| 状态色 | success / warning / error / processing | `.tag tag--*` |

## 4. 核心操作

| 操作 | 触发位置 | 交互结果 |
|---|---|---|
| 切换结算状态 | 订单结算匹配顶部状态按钮 | 按已结算、未结算、全部过滤，并展示各状态订单数量 |
| 切换时间口径 | 发货确认收入页的发货时间 / 结算时间 Segmented | 列表和导出统一按当前口径计算；结算时间口径自动排除未结算订单 |
| 筛选 | 筛选区按钮 | 订单结算匹配按平台、店铺、平台单号、是否结算过滤；发货确认收入按平台、店铺主体、店铺、是否结算和时间筛选 |
| 重置 | 筛选区按钮 | 清空所有筛选；订单结算匹配恢复未结算状态，发货确认收入不按结算状态过滤 |
| 查看差异 | 表格操作列 | 打开右侧抽屉，展示完整费用项和差异项 |
| 导出当前列表 | 表格工具栏 | 导出当前筛选结果的核心字段 CSV |
| 导出完整对账明细 | 表格工具栏 | 导出当前筛选结果的全部字段和全部差异字段 CSV |

## 5. 权限差异

- 财务：可查看全部金额字段，可执行两类导出。
- 运营：可查看授权店铺数据，可导出当前列表，完整导出权限待确认。
- 业务负责人：可查看汇总、利润差异和当前列表。
- 系统管理员：可查看全部字段，后续可扩展重跑匹配能力。

当前 HTML 原型不提供角色切换器，避免把权限状态实现成页面内调试控件。

## 6. 状态变化

- 默认态：展示全部订单，时间口径为发货时间，结算状态为全部。
- 加载态：保留 `loadingState` 组件 hook，当前静态数据默认不展示。
- 空状态：当前筛选无结果时展示 filtered empty。
- 错误态：保留 `errorState` 组件 hook，当前静态数据默认不展示。
- 成功反馈态：导出后展示顶部/底部反馈提示。
- 禁用态：本轮不模拟权限禁用，后续接入权限后按 PRD 10.6 控制。

## 7. 页面跳转

- 无页面跳转。
- 订单详情优先使用 `DetailDrawer`，不跳新页面。

## 8. 利润与差异口径

- 差异统一为：`结算值 - 预估值`。
- 预估利润和结算利润都按 PRD 公式计算。
- `退件补成本` 是利润加项。
- 退款、推广费用、店铺杂费、平台佣金、广告费、罚款金额、商品成本、东莞仓/中转仓处理费、物流运费、VAT、平台回款费用、资产减值损失都是利润扣减项。

## 9. 校验记录

- JS 语法检查：`C:\Program Files\nodejs\node.exe --check prototype/order-settlement-reconciliation/script.js`
- 原型守门：`npm run prototype:guard -- --source prototype/order-settlement-reconciliation`
- 守门结果：0 个错误，0 个警告

