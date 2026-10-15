# 影见疗效

**三阴性乳腺癌治疗响应预测与可视化分析平台**

纵向MRI、患者相似关系、三维分割形态、疗效预测与模型解释的交互作品。英文技术名 RespGraph-TNBC。

## 打开网页

在线展示：https://caoyuyang42.github.io/respgraph-tnbc/

解压后可直接打开index.html离线展示，也可双击“启动网页.bat”在本机浏览器预览。启动脚本需要已安装Python。网页无需ChatGPT登录、API密钥或前端依赖安装。

## 修改网页

1. 使用VS Code等编辑器修改下列源文件。
2. 双击“重新生成网页.bat”，或在本目录执行 `python build_frontend.py`。
3. 刷新网页。在线发布时，将完整目录内的文件提交到GitHub仓库main分支。

| 要修改的部分 | 文件 |
| --- | --- |
| 字号、留白、各屏幕排版 | density.css（优先修改） |
| 网页标题、导航、加载时的内容 | index.template.html |
| 七页主要内容、文案与交互 | app.js |
| 疾病背景与研究总览 | overview.js、overview.css |
| 患者探索、证据实验室的内容重组 | refinement.js、refinement.css |
| 模型架构的四个交互视图 | architecture.js |
| 三维患者关系图 | graph3d.js |
| SHAP、注意力图表 | explain.js、attention-flow.js |
| MRI切片与分割形态 | mri-viewer.js、mri-viewer.css |
| 队列稳定性图表 | stability.js |
| 演示路径与案例入口 | discovery.js、discovery.css |
| 基础样式 | style.css |
| 初始加载、失败重试、按需加载 | bootstrap.js |
| 完整展示数据、外部解释结果 | data.json、explain-data.json |

site-runtime.js、site.css、data-core.js、asset-map.js、stability-data.js、cohort-data.js、attention-detail.js和index.html由生成脚本输出。直接修改这些文件，会在下次生成时被覆盖。

## 加载策略

首次载入核心患者数据、SHAP贡献和平均注意力。打开证据实验室时加载重复队列结果，打开沙盒时加载队列示例；选择单个模型注意力时加载完整权重矩阵。构图相同的边在运行时复用，完整数据下载保留原始结构。所有预测概率及图表数值均未重新计算或校准。

MRI和三维分割资源按患者载入；论文架构原图在研究方法页展开查看。网页保留自然滚动。

## 发布与模型

GitHub Settings → Pages → Deploy from a branch，选择main与根目录。.nojekyll使GitHub直接发布静态文件。

在线展示使用已授权公开的38例去标识数据和预计算结果。任意新增、删减队列的真实推理使用本机服务；静态网页可独立展示预计算案例。开发队列I-SPY 2，外部验证队列I-SPY 1。源码包中没有模型权重、原始NIfTI、真实患者编号或密钥。

## 制作说明

ChatGPT/Codex辅助设计、代码实现和文档整理。论文架构原图由用户提供；网页架构视图依据论文图及GCN-Transformer3代码重绘，使用代码中的LayerNorm标注。视频和模型权重保留在本机。
