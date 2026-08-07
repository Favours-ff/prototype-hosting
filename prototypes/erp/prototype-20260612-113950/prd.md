# 折扣管理 PRD

版本：V1.0  
适用范围：Shopee / TikTok 折扣活动管理  
文档目的：明确本期折扣活动的业务范围、平台映射、状态映射、页面要求和验收标准。

## 1. 背景

当前运营在 Shopee 和 TikTok 平台分别配置折扣活动，活动类型、字段、状态和异常反馈不统一。ERP 需要提供一个统一入口，让运营在同一套页面中创建、查看和维护跨平台折扣活动。

本期不做完整营销中心，只聚焦两个平台之间存在共性的折扣能力，先打通“创建活动 -> 绑定商品 -> 查询状态 -> 异常追踪”的主流程。

## 2. 目标

### 2.1 业务目标

| 目标 | 说明 |
|---|---|
| 统一折扣创建入口 | 运营在 ERP 内创建 Shopee / TikTok 折扣活动 |
| 统一折扣类型 | 将平台差异收敛为 ERP 的 3 个统一类型 |
| 统一状态展示 | 页面只展示 5 个 ERP 统一状态 |
| 统一异常追踪 | 接口失败时记录 `code`、`message`、`request_id` |

### 2.2 产品目标

| 目标 | 说明 |
|---|---|
| 降低配置理解成本 | 运营只需要理解 ERP 的统一折扣类型 |
| 避免错误对接 | 非本期范围的活动不展示、不开放入口 |
| 支持后续扩展 | 保留平台原始类型和原始状态，方便后续补充能力 |

## 3. 本期范围

### 3.1 本期对接类型

| ERP 统一折扣类型 | Shopee 对应类型 | TikTok 对应类型 | 本期是否对接 |
|---|---|---|---|
| 产品折扣 | 促销折扣 | 固定价格产品折扣、百分比折扣 | 是 |
| 多买多省 | 捆绑优惠 | 多买多省折扣 | 是 |
| 买X送Y | 附加交易 | 买X送Y活动 | 是 |

### 3.2 本期不对接类型

| 类型 | 处理方式 |
|---|---|
| 代金券 / 优惠券 | 不展示，不创建，不查询 |
| 限时抢购 | 不展示，不创建，不查询 |
| 运费折扣 | 完全隐藏，不在列表和创建入口出现 |
| 平台活动 | 不纳入本期范围 |
| 活动级删除 | 不对接，仅支持关闭 / 停用 |

## 4. 用户角色

| 角色 | 核心操作 | 权限说明 |
|---|---|---|
| 运营 | 创建活动、绑定商品、查看活动状态 | 可创建和编辑草稿 |
| 运营主管 | 审核活动、查看异常、关闭活动 | 可处理待审核和异常活动 |
| 管理员 | 查看接口日志、排查平台返回错误 | 可查看 `request_id` 和接口原始信息 |

## 5. 业务流程

### 5.1 活动创建流程

| 步骤 | 操作 | 成功结果 | 失败处理 |
|---|---|---|---|
| 1 | 选择平台 | 加载对应店铺和类型 | 平台不可用时提示错误 |
| 2 | 选择 ERP 折扣类型 | 展示对应动态表单 | 非本期类型不展示 |
| 3 | 填写活动基础信息 | 完成名称、时间、店铺配置 | 缺必填项时阻止提交 |
| 4 | 选择商品 / SKU | 商品进入待绑定列表 | 不符合平台规则时提示 |
| 5 | 提交创建 | 平台返回活动 ID | 记录接口错误 |
| 6 | 绑定商品 | 活动创建完成 | 绑定失败则支持重试 |
| 7 | 查询状态 | 回写 ERP 统一状态 | 查询失败记录日志 |

### 5.2 异常处理流程

| 异常场景 | 处理方式 |
|---|---|
| 创建活动失败 | 不生成有效活动，记录 `code/message/request_id` |
| 创建成功但绑定失败 | 保存活动 ID，活动标记为异常待处理，允许重新绑定 |
| 平台状态查询失败 | 保留上一次状态，记录查询失败日志 |
| 活动关闭失败 | 保持原状态，提示主管或管理员处理 |

## 6. 折扣类型说明

### 6.1 产品折扣

产品折扣用于单个商品或 SKU 的直接折扣。Shopee 对应“促销折扣”，TikTok 对应“固定价格产品折扣”和“百分比折扣”。

| 子类型 | 说明 |
|---|---|
| 固定价格 | 直接指定商品折后最终价 |
| 百分比折扣 | 按原价百分比计算折扣 |

关键字段：

- 活动名称
- 开始时间、结束时间
- 商品 / SKU
- 折后价或折扣比例

### 6.2 多买多省

多买多省用于“买多件享优惠”的活动。Shopee 对应“捆绑优惠”，TikTok 对应“多买多省折扣”。

| 规则 | 说明 |
|---|---|
| 阶梯数量 | 最多 3 层 |
| 阶梯关系 | 后一层购买数量必须大于前一层 |
| 优惠方式 | 可按固定金额、百分比或固定套装价配置 |

关键字段：

- 活动名称
- 开始时间、结束时间
- 商品 / SKU
- 阶梯数量
- 阶梯折扣值

### 6.3 买X送Y

买X送Y用于购买指定商品后获得赠品或附加优惠。Shopee 对应“附加交易”，TikTok 对应“买X送Y活动”。

| 配置项 | 说明 |
|---|---|
| X 商品 | 购买商品 |
| X 数量 | 触发赠送的购买数量 |
| Y 商品 | 赠品或附加商品 |
| Y 数量 | 赠送数量 |

关键字段：

- 活动名称
- 开始时间、结束时间
- 购买商品 / SKU
- 购买数量
- 赠品商品 / SKU
- 赠送数量

## 7. 状态映射

### 7.1 ERP 统一状态

页面和 PRD 只展示以下 5 个状态。

| ERP 状态 | 说明 |
|---|---|
| 草稿 | 活动未提交审核或仍在编辑 |
| 待审核 | ERP 内部审核中 |
| 执行中 | 平台活动已生效 |
| 已拒绝 | ERP 内部审核拒绝 |
| 结束 | 活动自然结束、关闭或停用 |

### 7.2 平台状态映射

| ERP 状态 | Shopee 状态 | TikTok 状态 | 映射说明 |
|---|---|---|---|
| 草稿 | ERP 本地态 | `DRAFT` | Shopee 未确认公开草稿态，按 ERP 本地草稿处理 |
| 待审核 | ERP 内部审核态 | ERP 内部审核态 | 不依赖平台状态 |
| 执行中 | `ongoing` / `ONGOING` | `ONGOING` | 平台活动已生效 |
| 已拒绝 | ERP 内部审核态 | ERP 内部审核态 | 不依赖平台状态 |
| 结束 | `expired` / `EXPIRED` / 已关闭 | `EXPIRED` / `DEACTIVATED` / `NOT_EFFECTIVE` | 自然过期、卖家停用、平台终止均归入结束 |

### 7.3 状态展示规则

| 规则 | 说明 |
|---|---|
| 页面展示 | 只展示 ERP 统一状态 |
| 平台原始状态 | 可在详情或日志中保留，不直接暴露给运营 |
| 审核状态 | `待审核` 和 `已拒绝` 均由 ERP 内部审核流产生 |

## 8. 页面需求

### 8.1 活动列表页

| 模块 | 说明 |
|---|---|
| 筛选区 | 支持平台、店铺、ERP折扣类型、ERP状态、活动名称、时间筛选 |
| 列表区 | 展示活动名称、平台、类型、状态、时间、商品数 |
| 操作区 | 查看详情、编辑草稿、提交审核、关闭活动、重试失败绑定 |

列表中不得出现：

- 代金券
- 限时抢购
- 运费折扣
- 活动级删除入口

### 8.2 创建活动页

| 模块 | 说明 |
|---|---|
| 基础信息 | 平台、店铺、活动名称、开始时间、结束时间 |
| 类型选择 | 只显示产品折扣、多买多省、买X送Y |
| 商品选择 | 选择商品和 SKU |
| 规则配置 | 根据折扣类型展示不同字段 |
| 提交结果 | 展示创建结果、绑定结果和失败原因 |

活动类型选择区需要展示类型说明和示例，帮助运营理解类型用途。

| ERP 类型 | 页面说明 | 示例 |
|---|---|---|
| 产品折扣 | 对单个商品或 SKU 设置固定价格或百分比折扣 | 清仓商品统一设置为 5 折，或指定 SKU 促销价 99 元 |
| 多买多省 | 按购买件数设置阶梯优惠，适合提升客单件数 | 买 5 件立减 20 元，买 10 件享 88 折 |
| 买X送Y | 购买指定商品后，获得赠品或指定 Y 商品优惠 | 买 2 件洗护套装，送 1 件旅行装赠品 |

### 8.3 活动详情页

| 模块 | 说明 |
|---|---|
| 活动信息 | 活动 ID、平台、店铺、类型、时间 |
| 状态信息 | ERP统一状态、平台原始状态 |
| 商品信息 | 商品、SKU、折扣配置、赠品配置 |
| 异常信息 | `code`、`message`、`request_id` |
| 审批信息 | 审批记录、审批人、审批时间、审批意见 |

### 8.4 审批详情页

| 模块 | 说明 |
|---|---|
| 活动摘要 | 展示活动名称、平台、类型、提交人、提交时间 |
| 审批结果 | 展示当前审批状态、审批人、审批时间 |
| 审批意见 | 展示通过/拒绝原因和备注 |
| 操作记录 | 展示提交、通过、拒绝、重新提交等记录 |

## 9. 接口范围

### 9.1 Shopee

| ERP 类型 | Shopee 模块 | 主要操作 |
|---|---|---|
| 产品折扣 | Discount | 获取、创建、添加商品、修改、关闭 |
| 多买多省 | Bundle Deal | 获取、创建、编辑SKU、删除SKU、关闭 |
| 买X送Y | Add-on Deal | 获取、创建、主商品维护、子商品维护、关闭 |

#### 9.1.1 Shopee Bundle Deal endpoint

| 操作 | Endpoint |
|---|---|
| 获取捆绑优惠列表 | `GET /api/v2/bundle_deal/get_bundle_deal_list` |
| 获取捆绑优惠详情 | `GET /api/v2/bundle_deal/get_bundle_deal` |
| 获取捆绑优惠商品 | `POST /api/v2/bundle_deal/get_bundle_deal_item` |
| 创建捆绑优惠 | `POST /api/v2/bundle_deal/add_bundle_deal` |
| 添加捆绑优惠商品 | `POST /api/v2/bundle_deal/add_bundle_deal_item` |
| 更新捆绑优惠 | `POST /api/v2/bundle_deal/update_bundle_deal` |
| 更新捆绑优惠商品 | `POST /api/v2/bundle_deal/update_bundle_deal_item` |
| 关闭捆绑优惠 | `POST /api/v2/bundle_deal/end_bundle_deal` |
| 移除捆绑优惠商品 | `POST /api/v2/bundle_deal/delete_bundle_deal_item` |

#### 9.1.2 Shopee Add-on Deal endpoint

| 操作 | Endpoint |
|---|---|
| 获取附加交易列表 | `POST /api/v2/add_on_deal/get_add_on_deal_list` |
| 获取附加交易详情 | `POST /api/v2/add_on_deal/get_add_on_deal` |
| 获取主商品 | `POST /api/v2/add_on_deal/get_add_on_deal_main_item` |
| 获取子商品 | `POST /api/v2/add_on_deal/get_add_on_deal_sub_item` |
| 创建附加交易 | `POST /api/v2/add_on_deal/add_add_on_deal` |
| 添加主商品 | `POST /api/v2/add_on_deal/add_add_on_deal_main_item` |
| 添加子商品 | `POST /api/v2/add_on_deal/add_add_on_deal_sub_item` |
| 更新附加交易 | `POST /api/v2/add_on_deal/update_add_on_deal` |
| 更新主商品 | `POST /api/v2/add_on_deal/update_add_on_deal_main_item` |
| 更新子商品 | `POST /api/v2/add_on_deal/update_add_on_deal_sub_item` |
| 关闭附加交易 | `POST /api/v2/add_on_deal/end_add_on_deal` |
| 移除主商品 | `POST /api/v2/add_on_deal/delete_add_on_deal_main_item` |
| 移除子商品 | `POST /api/v2/add_on_deal/delete_add_on_deal_sub_item` |

说明：

- 不对接活动级删除。
- 删除 SKU / 移除商品可作为商品绑定维护能力保留。
- 关闭活动用于终止活动，并保留历史数据。

### 9.2 TikTok

| ERP 类型 | TikTok 类型 | 主要操作 |
|---|---|---|
| 产品折扣 | `FIXED_PRICE` / `DIRECT_DISCOUNT` | 创建、查询、更新、停用、更新商品 |
| 多买多省 | `BUY_MORE_SAVE_MORE` | 创建、查询、更新、停用、更新商品 |
| 买X送Y | `BUY_X_GET_Y` | 创建、查询、更新、停用、更新商品 |

#### 9.2.1 TikTok Promotion endpoint

| 操作 | Endpoint |
|---|---|
| 创建活动 | `POST /promotion/202309/activities` |
| 查询活动列表 | `POST /promotion/202309/activities/search` |
| 获取活动详情 | `GET /promotion/202309/activities/{activity_id}` |
| 更新活动基础信息 | `PUT /promotion/202309/activities/{activity_id}` |
| 停用活动 | `POST /promotion/202309/activities/deactivate` |
| 更新活动商品 / SKU | `PUT /promotion/202309/activities/{activity_id}/products` |
| 移除活动商品 / SKU | `DELETE /promotion/202309/activities/{activity_id}/products` |

#### 9.2.2 TikTok 买X送Y字段

| ERP 字段 | TikTok 字段 |
|---|---|
| 活动类型 | `activity_type = BUY_X_GET_Y` |
| 购买商品 | `products[].id` |
| 赠品 / Y 商品 | `benefit_product_ids` |
| 排除商品 | `exclude_product_ids` |
| 购买数量 X | `discount.bxgy_discount.threshold_value` |
| 赠品数量 Y | `discount.bxgy_discount.benefit_max_applicable_quantity` |
| 优惠方式 | `discount.bxgy_discount.discount_type` |
| 优惠值 | `discount.bxgy_discount.discount_value` |

说明：

- 运费折扣完全隐藏。
- 限时抢购不进入本期接口范围。
- 优惠券 / 代金券不进入本期接口范围。

## 10. 校验规则

| 规则 | 说明 |
|---|---|
| 时间校验 | 开始时间必须早于结束时间 |
| 类型校验 | 只允许产品折扣、多买多省、买X送Y |
| 状态校验 | 只允许草稿、待审核、执行中、已拒绝、结束 |
| 多买多省 | 阶梯数量最多 3 层，且数量递增 |
| 买X送Y | 购买商品和赠品商品均不能为空 |
| 活动删除 | 不支持活动级删除 |
| 接口失败 | 必须记录 `code/message/request_id` |

## 11. 验收标准

1. 创建活动时，类型选择只展示产品折扣、多买多省、买X送Y。
2. 运费折扣、限时抢购、代金券在页面中完全不可见。
3. 产品折扣能正确映射到 Shopee 促销折扣和 TikTok 产品折扣。
4. 多买多省能正确映射到 Shopee 捆绑优惠和 TikTok 多买多省。
5. 买X送Y能正确映射到 Shopee 附加交易和 TikTok 买X送Y。
6. 活动列表只展示草稿、待审核、执行中、已拒绝、结束 5 个状态。
7. 待审核和已拒绝只由 ERP 内部审核流产生。
8. 平台返回 `EXPIRED`、`DEACTIVATED`、`NOT_EFFECTIVE` 等结束类状态时，ERP 统一展示为结束。
9. 接口失败时必须展示或记录 `code/message/request_id`。
10. 页面不提供活动级删除入口。
11. 待审核和已拒绝活动必须有审批记录。
12. 用户可进入审批详情页查看审批人、审批时间和审批意见。
