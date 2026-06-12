# 折扣管理正式原型说明

## 版本与来源

- Wanggen 根项目版本：`origin/main` = `f808e2a`
- 业务来源：`favours-private-repo/docs/prd.md` 与用户后续确认
- UI 权威来源：`ui-library/`、`shared-references/ui-interaction-spec.md`、`shared-references/chinese-b-end-erp-visual-baseline.md`
- 交付类型：正式 HTML 可交互原型，不发布，不生成 Figma

## 页面任务单

| 页面 | 主任务 | 承载方式 |
|---|---|---|
| 折扣活动列表 | 筛选、查看与维护折扣活动 | 标准列表页 |
| 新建折扣活动 | 配置活动、商品和规则并提交审核 | 独立多步骤页面 |
| 活动详情 / 审批记录 / 异常信息 | 保持列表上下文完成查阅 | `DetailDrawer` |
| 趋势分析 | 辅助查看当前筛选口径趋势 | 次级抽屉 |

## 组件映射

| 页面区域 | 项目组件 / Ant Design 基线 |
|---|---|
| 后台壳层 | `ErpShell` / Layout + Menu + Breadcrumb |
| 页面标题与主操作 | `PageHeaderBar` / Typography + Button |
| 高频与更多筛选 | `QueryFilterBar` / Form + Input + Select + DatePicker |
| 平台店铺筛选 | `StoreSelector` / TreeSelect + Checkbox |
| 活动列表 | `DataTablePanel` / Table + Pagination + Tag + Dropdown |
| 活动详情与审批记录 | `DetailDrawer` / Drawer + Descriptions + Tabs + Timeline |
| 成功与轻提示 | `FeedbackState` / Message |

## 正式 UI 契约

- 列表页固定采用“标题区 → 筛选区 → 表格区”三段式结构。
- 一屏只有一个最高优先级主操作：`新建折扣活动`。
- 高频筛选首屏展示，活动时间进入“更多筛选”；提交查询后以 Chip 回显生效条件。
- 平台 / 店铺筛选器仅展示 Shopee 与 Lazada，层级遵循“平台 → 事业部 → 站点 → 店铺”。
- 表格活动名称和 ID 左对齐；平台和活动状态不显示平台原始辅助文本。
- 查看、审批记录和异常信息均在详情抽屉内完成，关闭后保留列表上下文。
- 趋势图不得占据列表首屏，通过表格工具栏的“趋势分析”打开辅助抽屉。
- 正式页面不得出现指标卡看板、演示控制器、角色切换器、状态切换器或活动级删除入口。

## 交互覆盖

- 平台 / 店铺树选择、搜索与父级联动。
- 活动名称 / ID 切换输入、状态和类型筛选、活动开始 / 结束时间切换、快捷日期和日期范围。
- 查询、重置、筛选 Chip、筛选无结果状态。
- 查看详情、审批记录 Tab、异常信息 Tab、趋势分析抽屉。
- 新建活动类型切换、商品选择、保存草稿、必填校验和提交审核。
