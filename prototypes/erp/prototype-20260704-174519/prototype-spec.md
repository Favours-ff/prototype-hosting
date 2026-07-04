# 售后挽损模块 - 包裹丢失与运费多扣最终逻辑

## 页面来源映射

- 来源文件：`C:\Users\Administrator\Desktop\售后挽损模块-包裹丢失与运费多扣最终逻辑-v1.0.html`
- 发布目录：`prototype/after-sales-loss-recovery-logistics/index.html`
- 页面类型：业务逻辑说明 HTML，不是交互式业务表单。

## 组件映射

- 页面壳层：按发布守卫要求标记 `c-shell`，正文保持业务说明文档布局。
- 内容结构：Header、目录、Section、Table、Card、Formula、SVG 流程图。
- 临时组合：业务说明页暂未使用标准列表页、筛选区、抽屉等 ERP 操作组件。

## 数据与接口说明

- 包裹丢失赔付：Shopee 使用 `payment/get_escrow_detail`；TikTok 使用 `GET /finance/202309/statements` + `GET /finance/202501/statements/{statement_id}/statement_transactions`。
- 运费多扣：基于已结算订单，判断 `actual_shipping_fee > estimated_shipping_fee`。

## 交付说明

- 本页用于培训和方案说明，重点是最终业务口径，不承载真实接口调用。
