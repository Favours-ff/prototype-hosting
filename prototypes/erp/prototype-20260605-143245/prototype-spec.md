# 速卖通全托管商品原型 v3

## 页面来源

- 用户已确认的全托管商品只读列表需求
- 用户已确认的 SKU 展开、在线 SKU 与本地 SKU 映射、库存对照需求
- 用户已确认的批量库存同步规则需求
- `wanggeng826-bot/erp-product-manager-workflow` 最新 UI 规范

## 主任务

在同一列表上下文中筛选并查看全托管商品、SKU、货品绑定和库存，并对勾选 listing 下的 SKU 设置库存同步规则。

## 组件映射

- `ErpShell`: ERP 后台壳层
- `PageHeaderBar`: 页面标题
- `QueryFilterBar`: 等宽高频筛选和折叠低频筛选
- `DataTablePanel`: 状态 Tab、结果统计、批量操作、商品表格、分页
- `OperationLog`: listing 操作日志，支持滚动表格、分页、每页条数和跳页
- `RiskConfirm`: 库存同步规则弹窗
- `FeedbackState`: 保存与复制反馈

## 业务约束

- 每页展示 10 条。
- 批量操作仅在勾选 listing 后可用。
- SKU 参加活动时，目标库存不得低于当前平台在售库存。
- 一个 listing 的 SKU 可以分别使用不同补货方式。
- 页面不提供商品编辑和修改入口。
