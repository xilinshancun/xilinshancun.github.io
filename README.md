# Xu Kang · 康旭的个人主页

无需安装依赖的静态网站。页面内容基于用户提供的姓名、邮箱、GitHub 及公开仓库；个人介绍为可修改的初稿，不包含未经提供的职业、学历或履历。文章列表为空，添加文章后自动替换空状态。婚礼项目配图为原创概念示意，页面已标注，并非实际应用截图。

## 本地预览

在当前目录运行 `python3 -m http.server 4173 --directory dist`，然后访问 http://localhost:4173。

## 修改内容

- `dist/index.html`：姓名、个人介绍、联系方式、SEO 元信息。
- `dist/content.js`：项目和文章。Fork 项目明确标记为学习收藏。
- `dist/styles.css`：主题、排版、手机适配。
- `dist/assets/avatar.png`：来自用户公开 GitHub 的头像。

在 `articles` 中加入如下对象即可显示可阅读的文章：

```js
{
  slug: 'my-first-note',
  title: '我的第一篇记录',
  date: '2026-10-16',
  category: '随笔',
  excerpt: '用一句话描述文章。',
  paragraphs: ['第一段正文。', '第二段正文。']
}
```

## 托管

Sites 的静态发布目录是 `dist`，站点身份保存在 `.openai/hosting.json`。如需改用 GitHub Pages，可直接将 `dist` 内容作为站点文件发布；当前没有向用户的 GitHub 账号创建或推送仓库。

## 内容来源

- https://github.com/xilinshancun
- https://github.com/xilinshancun/wedding-quiz-app
- https://github.com/xilinshancun/helloflask （Fork，原作者 greyli）
- https://github.com/xilinshancun/go-gin-example （Fork，原作者 eddycjy）

布局参考 https://vyokky.github.io/ 的浅色个人主页、青绿配色和分区导航，代码与视觉排版独立实现。
