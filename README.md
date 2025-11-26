SiYuan Note Embed Mindmap Plugin


<img width="1906" height="1248" alt="image" src="https://github.com/user-attachments/assets/b6f2eee6-7954-4ecf-a53a-b19174ce0d30" />


<img width="2240" height="1197" alt="image" src="https://github.com/user-attachments/assets/4bd6dc62-5425-4f5d-92da-f250d4b2acd8" />

## 使用

输入 `/mindmap`/`脑图`/`思维导图`,创建图片并打开思维导图编辑器，编辑完成后点击保存即可。


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
