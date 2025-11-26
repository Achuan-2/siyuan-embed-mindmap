# 跨Tab复制粘贴图片节点改进

## 问题描述

在跨Tab复制粘贴节点时,如果节点包含图片,由于只复制了图片的key(smm_img_key_*),而没有复制对应的base64数据,导致在另一个Tab粘贴时图片丢失。

## 解决方案

### 1. 复制时收集图片数据

在 `Render.js` 中添加了 `collectImagesFromNodes` 方法:

- 遍历被复制的节点树
- 收集所有图片节点的 `smm_img_key_*` 
- 从根节点的 `imgMap` 中获取对应的 base64 数据
- 返回包含所有图片key和base64的对象

### 2. 修改剪贴板数据格式

更新了 `utils/index.js` 中的 `createSmmFormatData` 函数:

```javascript
export const createSmmFormatData = (data, imgMap = {}) => {
  return {
    simpleMindMap: true,
    data,
    imgMap  // 新增imgMap字段
  }
}
```

### 3. 粘贴时合并图片数据

在 `Render.js` 中添加了 `mergeImgMapToCanvas` 方法:

- 检查剪贴板数据中是否包含 `imgMap`
- 将 `imgMap` 中的图片数据合并到当前画布的根节点 `imgMap` 中
- 只添加当前画布中不存在的图片key,避免重复

### 4. 更新粘贴逻辑

修改了 `checkSmmFormatData` 函数以返回 `imgMap`:

```javascript
return {
  isSmm,
  data: isSmm ? smmData : String(data),
  imgMap: isSmm ? imgMap : {}  // 新增imgMap返回
}
```

在粘贴处理中调用 `mergeImgMapToCanvas`:

```javascript
if (checkRes.isSmm) {
  smmData = checkRes.data
  // 合并imgMap到当前画布
  if (checkRes.imgMap && Object.keys(checkRes.imgMap).length > 0) {
    this.mergeImgMapToCanvas(checkRes.imgMap)
  }
}
```

## 修改的文件

1. `mind-map/simple-mind-map/src/core/render/Render.js`
   - 修改 `copy()` 方法
   - 修改 `cut()` 方法  
   - 新增 `collectImagesFromNodes()` 方法
   - 新增 `mergeImgMapToCanvas()` 方法
   - 更新 `paste()` 方法中的两处粘贴逻辑

2. `mind-map/simple-mind-map/src/utils/index.js`
   - 修改 `createSmmFormatData()` 函数
   - 修改 `checkSmmFormatData()` 函数

## 工作流程

### 复制流程

1. 用户选中包含图片的节点并复制
2. `copy()` 调用 `copyNode()` 获取节点数据
3. `collectImagesFromNodes()` 遍历节点树,收集所有图片key及其base64数据
4. `createSmmFormatData()` 将节点数据和imgMap一起打包
5. 数据写入剪贴板

### 粘贴流程

1. 用户在另一个Tab粘贴
2. `paste()` 从剪贴板读取数据
3. `checkSmmFormatData()` 解析数据,提取节点数据和imgMap
4. `mergeImgMapToCanvas()` 将imgMap合并到当前画布的根节点imgMap中
5. 执行插入节点命令
6. 节点渲染时,可以从当前画布的imgMap中找到对应的图片base64数据

## 优势

- ✅ 支持跨Tab复制粘贴带图片的节点
- ✅ 避免图片数据重复存储(相同key不会重复添加)
- ✅ 向后兼容(不影响现有的复制粘贴功能)
- ✅ 同时支持自定义剪贴板处理器
