SiYuan Note Embed Mindmap Plugin


<img width="1906" height="1248" alt="image" src="https://github.com/user-attachments/assets/b6f2eee6-7954-4ecf-a53a-b19174ce0d30" />


<img width="2240" height="1197" alt="image" src="https://github.com/user-attachments/assets/4bd6dc62-5425-4f5d-92da-f250d4b2acd8" />

## 功能特性

- ✅ 支持在思源笔记中嵌入思维导图
- ✅ 支持节点图片粘贴和调整大小
  - 鼠标悬停在图片上显示调整按钮
  - 拖拽右下角按钮调整图片大小
  - 自动保持图片宽高比例
  - 自动吸附到其他图片宽度
  - 详见: [节点图片调整功能说明](./docs/节点图片调整功能.md)
- ✅ 支持大纲复制为 Markdown 多级列表和粘贴多级列表
- ✅ 优化保存图片：节点高亮和折叠按钮隐藏
- ✅ 节点可以直接粘贴多级列表批量创建多个节点

## 最近修复

- 🐛 修复粘贴图片到节点时的 "Assignment to constant variable" 错误

## 如何打包

```bash
cd mind-map/web && npm run build
cd ../.. && npm run build
```

## 致谢

- 基于[mindmap](https://github.com/wanglin2/mind-map): 
  - 魔改部分：https://github.com/Achuan-2/mind-map
    - 支持大纲复制为Markdown多级列表和粘贴多级列表
    - 优化保存图片：节点高亮和折叠按钮隐藏
    - 节点也可以直接选中粘贴多级列表批量粘贴出多个节点
