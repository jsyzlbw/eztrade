# Quotient 报价星

面向制造企业的外贸询盘、报价与客户跟进助手。此仓库为项目的静态宣传网站。

网站：https://jsyzlbw.github.io/quotient/

## 本地预览

在仓库目录运行 `python3 -m http.server 8080`，浏览器访问 `http://localhost:8080`。
无需安装依赖或构建；HTML、CSS、JavaScript均为本地文件。

## 发布

GitHub Pages 使用 `main` 分支根目录。更新后提交并推送，Pages会自动重新发布。

## 内容与状态

- 产品处于开发与需求验证阶段；页面没有声称已上线、已有合作客户或已验证性能。
- 四个可切换的报价场景为模拟数据，不构成实际报价。
- 联系按钮通过访客本地邮件应用发起邮件，复制按钮复制公开业务邮箱。没有后台表单、账户注册、分析追踪或第三方脚本。
- Logo使用团队选定的深色冰蓝版本。
- 图片和项目标识由团队保留权利。

主要文件：`index.html`、`styles.css`、`app.js`、`assets/quotient-logo.png`。

## 中英文切换

导航栏提供中文 / EN 切换，覆盖静态文案、报价演示、FAQ、无障碍标签、页面标题及联系邮件主题。默认中文，访客选择可在本地记忆；`?lang=en` 或 `?lang=zh` 可直接分享指定语言页面。英文文案位于 `i18n.js`，中文源文案保留在 `index.html`；演示场景与短状态文案在 `app.js`。

## 当前品牌与产品信息

2026年9月20日，项目更名为 **Quotient（报价星）**。网站以最新商业计划书为依据，补充四周限定试点计划、首次配置范围、采购暂缓后的跟进处理，以及收费方式说明。试点仍处于招募阶段，未展示虚构客户或已实现的效果。

公开仓库：https://github.com/jsyzlbw/quotient
网站：https://jsyzlbw.github.io/quotient/
中文：https://jsyzlbw.github.io/quotient/?lang=zh
English：https://jsyzlbw.github.io/quotient/?lang=en

## 可读性更新

调整正文与次要说明字号，并为小屏幕采用两列流程、可换行审核标签；中英文同步。修正静态联系邮件主题、开发阶段表述和交期变更示例，保留原有品牌、交互与公开联系邮箱。
