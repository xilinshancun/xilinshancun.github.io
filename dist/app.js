(() => {
  const $ = selector => document.querySelector(selector);
  const content = window.siteContent || { zh: {}, workfxResources: [], articles: [] };
  const textNodes = [...document.querySelectorAll('[data-i18n]')];
  const english = new Map(textNodes.map(node => [node.dataset.i18n, node.innerHTML]));
  let language = 'en';
  try { if (localStorage.getItem('xk-language') === 'zh') language = 'zh'; } catch {}
  const localize = value => typeof value === 'string' ? value : (value?.[language] || value?.en || '');
  const safeUrl = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };

  function renderResources() {
    const container = $('#workfx-resources');
    container.replaceChildren();
    for (const item of content.workfxResources || []) {
      const url = safeUrl(item.url);
      if (!url) continue;
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = localize(item.label);
      container.append(a);
    }
    container.hidden = container.childElementCount === 0;
  }

  let lastArticleTrigger = null;
  const dialog = $('#article-dialog');
  function renderArticles() {
    const articles = content.articles || [];
    $('#writing').hidden = articles.length === 0;
    $('#article-list').replaceChildren();
    articles.forEach(article => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'article-row';
      const date = document.createElement('time'); date.dateTime = article.date; date.textContent = article.date;
      const h3 = document.createElement('h3'); h3.textContent = localize(article.title);
      const p = document.createElement('p'); p.textContent = localize(article.excerpt);
      button.append(date, h3, p);
      button.addEventListener('click', () => {
        lastArticleTrigger = button;
        $('#article-title').textContent = localize(article.title);
        $('#article-meta').textContent = article.date;
        const paragraphs = Array.isArray(article.paragraphs) ? article.paragraphs : (article.paragraphs?.[language] || article.paragraphs?.en || []);
        $('#article-body').replaceChildren(...paragraphs.map(text => { const el = document.createElement('p'); el.textContent = text; return el; }));
        dialog.showModal(); document.body.style.overflow = 'hidden';
      });
      $('#article-list').append(button);
    });
  }

  function updateTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const button = $('.theme-button');
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', language === 'zh' ? (dark ? '切换到浅色模式' : '切换到深色模式') : (dark ? 'Switch to light theme' : 'Switch to dark theme'));
    button.querySelector('use').setAttribute('href', dark ? '#sun' : '#moon');
    $('meta[name="theme-color"]').content = dark ? '#171b22' : '#ffffff';
  }

  function setLanguage(next) {
    language = next === 'zh' ? 'zh' : 'en';
    // These HTML translations are authored locally in content.js, never fetched or entered by visitors.
    textNodes.forEach(node => {node.innerHTML = language === 'zh' ? (content.zh[node.dataset.i18n] || english.get(node.dataset.i18n)) : english.get(node.dataset.i18n);});
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? '康旭 Xu Kang | 软件工程师' : 'Xu Kang | Software Engineer';
    $('meta[name="description"]').content = language === 'zh' ? '康旭，关注 AI Agent 系统与开发者基础设施的软件工程师。曾任 Microsoft SDE II，参与 Workfx AI 核心架构建设。' : 'Xu Kang — Software engineer focused on AI agent systems and developer infrastructure. Former Microsoft SDE II and core architect for Workfx AI.';
    $('.profile').setAttribute('aria-label', language === 'zh' ? '个人资料' : 'Profile');
    $('.section-nav').setAttribute('aria-label', language === 'zh' ? '页面导航' : 'Page sections');
    $('.language-switch').setAttribute('aria-label', language === 'zh' ? '语言' : 'Language');
    $('#close-article').setAttribute('aria-label', language === 'zh' ? '关闭文章' : 'Close article');
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    renderResources(); renderArticles(); updateTheme();
    try { localStorage.setItem('xk-language', language); } catch {}
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  $('.theme-button').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('xk-theme', theme); } catch {}
    updateTheme();
  });
  $('#close-article').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {document.body.style.overflow = ''; lastArticleTrigger?.focus();});
  dialog.addEventListener('click', event => {if(event.target === dialog) {const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();}});
  setLanguage(language);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        document.querySelectorAll('.section-nav a').forEach(a => {
          const active = a.hash === '#' + entry.target.id;
          a.classList.toggle('active', active);
          if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      }
    }, {rootMargin: '-5% 0px -70% 0px', threshold: 0});
    document.querySelectorAll('main > section:not([hidden])').forEach(section => observer.observe(section));
  }
  $('#year').textContent = new Date().getFullYear();
})();
