# Xu Kang · 康旭

个人主页：[xilinshancun.github.io](https://xilinshancun.github.io/)。

静态 HTML / CSS / JavaScript，由 GitHub Pages 托管，不需要安装依赖。向 `main` 推送后，GitHub Actions 自动发布 `dist/`。

## 本地预览

```sh
python3 -m http.server 4173 --directory dist
```

访问 http://localhost:4173。

## 内容维护

- `dist/index.html`：个人介绍、经历、教育背景、联系方式与 SEO。
- `dist/content.js`：Workfx AI 项目和文章数据。
- `dist/styles.css`：样式与手机适配。
- `dist/app.js`：主题切换、导航、邮箱复制与文章阅读。
- `.github/workflows/pages.yml`：自动部署配置。

## Workfx AI 待补充

目前根据简历提供架构概述，以品牌文字和架构主题作为视觉占位。项目代码在另一台电脑，尚未导入本仓库。获得代码和可公开素材后补充：

1. 产品介绍与用户场景。
2. 真实界面截图或演示。
3. 经确认可公开的项目链接；代码公开并非展示项目的前提。
4. 架构说明与技术复盘。

`content.js` 的 `url` 为空时不会生成可点击项目链接，`pending` 用于显示资料整理状态。

## 添加文章

在 `dist/content.js` 的 `articles` 列表中添加：

```js
{
  slug: 'my-first-note',
  title: '我的第一篇记录',
  date: '2026-10-16',
  category: '系统设计',
  excerpt: '文章简介。',
  paragraphs: ['第一段正文。', '第二段正文。']
}
```

## 内容来源

姓名、联系方式和 GitHub 账号由本人提供；个人经历、技术方向与教育背景来自本人提供的简历。原始简历及电话号码不包含在网站和仓库中。头像来自公开 GitHub 主页。

初版曾使用 Sites 私有预览，现已迁移到 GitHub Pages，旧预览不再同步更新。
