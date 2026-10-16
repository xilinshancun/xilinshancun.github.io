# Xu Kang · 康旭

个人主页：[xilinshancun.github.io](https://xilinshancun.github.io/)。

以工程经历与技术工作为核心的个人主页。英文优先，支持中文切换；没有内容的文章区和项目资源链接不会显示。原生 HTML / CSS / JavaScript，无构建依赖。向 `main` 推送后，GitHub Actions 自动发布 `dist/`。

## 本地预览

```sh
python3 -m http.server 4173 --directory dist
```

打开 http://localhost:4173。

## 内容维护

- `dist/index.html`：英文正文、身份介绍、工程实践、工作经历和教育背景。关闭 JavaScript 仍可完整阅读。
- `dist/content.js`：与 `data-i18n` 对应的中文文案，以及项目资源和文章数据。
- `dist/styles.css`：阅读排版、响应式布局、深浅色样式。
- `dist/app.js`：语言切换、主题偏好、导航与文章阅读。
- `.github/workflows/pages.yml`：GitHub Pages 自动部署。

修改英文段落时，同步修改 `content.js` 中相同键对应的中文文案。

## Workfx AI 后续补充

目前按本人提供的简历，介绍 Agent 平台及两次架构演进；未读取或导入另一台电脑上的项目代码。后续补充实现细节、架构图、真实截图和技术文章，避免在公开页面展示空白占位。

公开链接通过 `workfxResources` 添加，没有链接时不渲染资源区：

```js
{
  label: { en: 'Technical write-up', zh: '技术文章' },
  url: 'https://your-real-public-link'
}
```

项目代码是否公开取决于后续明确指示；介绍项目不要求把项目源码放进本仓库。

## 文章

`articles` 为空时整个写作区隐藏。添加时使用如下结构，双语字段也可以只填字符串：

```js
{
  slug: 'first-note',
  date: '2026-10-16',
  title: { en: 'Article title', zh: '文章标题' },
  excerpt: { en: 'Short introduction.', zh: '简短介绍。' },
  paragraphs: {
    en: ['First paragraph.', 'Second paragraph.'],
    zh: ['第一段正文。', '第二段正文。']
  }
}
```

## 来源与公开范围

个人身份、工作经历、任职日期、工程成果及竞赛记录均依据本人提供的资料。原始简历、电话号码及未提供的项目代码不在本站仓库中。没有虚构论文、演示、仓库链接或当前任职信息。

站点托管于 GitHub Pages。旧 Sites 私有预览不再同步更新。
