window.PRODUCTS = [
  {
    id: "1005009448608090", title: "USB Expansion Board Hub 1 In 4 Out High Speed Adapter with Extended Long Product Title",
    category: "电子元器件 / USB 集线器", store: "SMT01全托管", operator: "王更", stocking: "JIT 即时补货",
    status: "销售中", statusText: "处于正常销售状态。", price: "CNY 18.80-22.50", purchase: "CNY 12.60-15.20",
    platformStock: 3, localStock: 11, sales: 128, salesTrend: "环比 +12%", binding: "部分绑定中", bindingText: "未绑定 1 / 绑定中 1",
    change: "库存 10 → 3", changeTime: "10:18", skuCount: 3,
    skus: [
      {name:"USB-HUB-4P-BLK", online:"AEO-1005009448608090-BLK", local:"SKU-USB-HUB-BLK", code:"050972", barcode:"697113956719", goodsId:"979113956719", spec:"黑色", status:"销售中", price:"CNY 18.80", platform:3, localStock:8, warehouse:"CSC207", binding:"绑定中", method:"本地可用库存"},
      {name:"USB-HUB-4P-WHT", online:"AEO-1005009448608090-WHT", local:"SKU-USB-HUB-WHT", code:"050973", barcode:"697113956720", goodsId:"979113956720", spec:"白色", status:"停售", price:"CNY 22.50", platform:0, localStock:3, warehouse:"CSC207", binding:"未绑定", method:"自定义数量"},
      {name:"USB-HUB-4P-GRY", online:"AEO-1005009448608090-GRY", local:"SKU-USB-HUB-GRY", code:"050974", barcode:"697113956721", goodsId:"979113956721", spec:"灰色", status:"销售中", price:"CNY 20.00", platform:0, localStock:0, warehouse:"CSC207", binding:"绑定中", method:"无库存兜底"}
    ]
  },
  {
    id:"1005009561158752", title:"LM2596 Adjustable Step Down Power Module", category:"电子元器件 / 电源模块", store:"SMT02全托管", operator:"李明", stocking:"仓发",
    status:"审核中", statusText:"等待平台审核中。", price:"CNY 8.80", purchase:"CNY 5.40", platformStock:1, localStock:16, sales:24, salesTrend:"环比 -8%",
    binding:"全部已绑定", bindingText:"已绑定 1", change:"状态变更", changeTime:"待上架 → 审核中", skuCount:1,
    skus:[{name:"LM2596-BLU",online:"AEO-1005009561158752-BLU",local:"SKU-LM2596-BLU",code:"060181",barcode:"697113956811",goodsId:"979113956811",spec:"蓝色",status:"审核中",price:"CNY 8.80",platform:1,localStock:16,warehouse:"CN-HZ-01",binding:"绑定中",method:"本地可用库存"}]
  },
  {
    id:"1005012097534664", title:"Buck Converter 600W 25A DC Power Supply", category:"工具 / DC 电源", store:"SMT03全托管", operator:"张敏", stocking:"JIT 即时补货",
    status:"审核不通过", statusText:"商品标题包含平台限制词，请修改后重新提交审核。", price:"CNY 29.80", purchase:"CNY 21.30", platformStock:0, localStock:0, sales:7, salesTrend:"环比 -22%",
    binding:"未绑定", bindingText:"未绑定 4", change:"审核结果更新", changeTime:"09:42", skuCount:4,
    skus:[{name:"BUCK-600W-25A",online:"AEO-1005012097534664-25A",local:"SKU-BUCK-600W-25A",code:"070625",barcode:"697113957001",goodsId:"979113957001",spec:"25A",status:"停售",price:"CNY 29.80",platform:0,localStock:0,warehouse:"CSC207",binding:"未绑定",method:"无库存兜底"}]
  }
];

window.STATUS_TABS = [
  ["全部",1488],["销售中",452],["审核中",2],["审核不通过",219],["已下架",815]
];

window.CATEGORY_TREE = [
  {name:"电子元器件",children:[
    {name:"连接器与转接",children:[{name:"USB 集线器"},{name:"USB 转接器"},{name:"接口转换器"}]},
    {name:"电源与稳压",children:[{name:"电源模块"},{name:"稳压模块"},{name:"降压模块"}]},
    {name:"开发板与模块",children:[{name:"传感器模块"},{name:"无线通信模块"},{name:"电机驱动模块"}]}
  ]},
  {name:"工具",children:[
    {name:"电源工具",children:[{name:"DC 电源"},{name:"可调电源"},{name:"电源适配器"}]},
    {name:"测量工具",children:[{name:"万用表"},{name:"示波器"},{name:"电流表"}]},
    {name:"焊接工具",children:[{name:"电烙铁"},{name:"焊台"},{name:"焊接配件"}]}
  ]},
  {name:"家用电器",children:[
    {name:"个护小家电",children:[{name:"电动剃须刀"},{name:"电吹风"},{name:"美容仪"}]},
    {name:"厨房家电",children:[{name:"咖啡机"},{name:"搅拌机"},{name:"空气炸锅"}]},
    {name:"清洁家电",children:[{name:"吸尘器"},{name:"扫地机器人"},{name:"蒸汽拖把"}]}
  ]},
  {name:"电脑和办公",children:[
    {name:"电脑配件",children:[{name:"键盘"},{name:"鼠标"},{name:"扩展坞"}]},
    {name:"办公设备",children:[{name:"打印机"},{name:"标签机"},{name:"扫描仪"}]}
  ]},
  {name:"家装（硬装）",children:[
    {name:"照明",children:[{name:"灯带"},{name:"灯泡"},{name:"台灯"}]},
    {name:"五金",children:[{name:"螺丝"},{name:"门锁"},{name:"工具箱"}]}
  ]}
];
