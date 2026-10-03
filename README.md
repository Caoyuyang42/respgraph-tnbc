# 影应图谱 · RespGraph-TNBC

三阴性乳腺癌治疗变化与患者关系的交互可视化。此目录包含2026-10-03修改后的完整静态网页。

## 浏览与编辑

直接打开index.html可离线展示。无需Node构建、ChatGPT账号或API密钥。

- app.js：七页内容与核心交互
- graph3d.js：三维患者关系图
- explain.js：SHAP及注意力图表
- discovery.js / discovery.css：真实案例、预测排序、实验比较和八幕演示
- narrative.js / narrative.css：背景时间线、真实病例变化和四步研究故事
- stability.js：队列均值/波动视图与逐患者实际分布
- attention-flow.js：真实注意力权重的信息流图
- style.css：全站样式
- data.js / data.json：已授权公开的38例去标识展示结果
- explain-data.js / explain-data.json：外部队列解释结果

仅修改外观和文案，无需重新运行模型。修改数值应重新计算导出，不在前端伪造结果。

## GitHub Pages发布

新建公开仓库respgraph-tnbc，将本目录内文件上传至main分支根目录。
在Settings → Pages → Build and deployment选择Deploy from a branch，分支main，目录/(root)，保存。
.nojekyll使GitHub直接发布静态文件。等待Pages部署成功，以设置页显示的地址为准。
以后提交网页修改，GitHub会自动更新展示。

## 数据与模型

I-SPY 1外部展示队列38例；模型开发使用I-SPY 2。概率为十折模型原始输出均值。
公开网站展示预计算结果；任意新增/删减患者的实时计算使用独立本地服务。
本仓库不包含模型权重、原始患者标识、原始数据文件、旧Sites账号配置或任何密钥。
在线源码和展示数据可被访问者下载。GitHub Pages不依赖ChatGPT，但各地网络可达性需实测。

## 制作说明

ChatGPT/Codex辅助设计、代码实现和文档整理。正式参赛请结合团队真实贡献与第三方数据许可完善披露记录。
