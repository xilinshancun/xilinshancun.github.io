(() => {
  const $ = (selector) => document.querySelector(selector);
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
  const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (value) => { try { const url = new URL(value); return url.protocol === 'https:' ? escape(url.href) : '#projects'; } catch { return '#projects'; } };
  const content = window.siteContent || { projects: [], articles: [] };
  const visual = `<div class="project-visual" role="img" aria-label="婚礼答题项目的概念示意图，非实际应用截图"><div class="phone"><div class="phone-top"><span>9:41</span><span>● ▰</span></div><div class="phone-heading">A little quiz,<br>a lot of love.</div><div class="phone-subtitle">把祝福，变成一场小小的互动。</div><div class="phone-question">01 / 准备好加入这场快乐了吗？</div><div class="phone-option selected">A. 当然，开始吧！</div><div class="phone-option">B. 已经迫不及待了</div><div class="phone-button">提交答案 →</div></div><div class="reward-note"><span>✳</span><strong>一份小小的惊喜</strong><small>MADE WITH LOVE</small></div><span class="visual-caption">WEDDING QUIZ / 概念示意</span></div>`;
  function renderProjects(filter = 'all') {
    $('#project-list').innerHTML = content.projects.filter(p => filter === 'all' || p.kind === filter).map(p => `
      <article class="project-card ${p.featured ? 'featured' : ''}">
        <div class="project-card-content"><span class="project-type">${icon(p.kind === 'original' ? 'code' : 'book')}${escape(p.label)}</span>
        <h3><a href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer">${escape(p.name)} ${icon('arrow-up-right')}</a></h3>
        <p>${escape(p.description)}</p><div class="tags">${p.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div></div>
        ${p.featured ? visual : ''}
      </article>`).join('');
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    renderProjects(button.dataset.filter);
  }));
  renderProjects();

  const themeButton = $('.theme-button');
  const themeMeta = $('meta[name="theme-color"]');
  function refreshTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.innerHTML = icon(dark ? 'sun' : 'moon');
    themeMeta.content = dark ? '#1b2b23' : '#f7faf7';
  }
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('xk-theme', theme); } catch {}
    refreshTheme();
  });
  refreshTheme();

  const menuButton = $('.menu-button');
  const mobileNav = $('#mobile-nav');
  function setMenu(open) {
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  }
  menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) {setMenu(false); menuButton.focus();} });
  document.addEventListener('click', event => { if (!mobileNav.hidden && !$('.site-header').contains(event.target)) setMenu(false); });
  window.matchMedia('(min-width: 721px)').addEventListener('change', event => { if(event.matches) setMenu(false); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.desktop-nav a').forEach(a => {
          const active = a.dataset.section === entry.target.id;
          a.classList.toggle('active', active);
          if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-12% 0px -65% 0px', threshold: 0});
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
  }

  let toastTimeout;
  function notify(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
  }
  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('linjiu1024@gmail.com');
      notify('邮箱已复制，期待你的来信。');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('.email-link'));
      selection.removeAllRanges();
      selection.addRange(range);
      notify('邮箱已选中，请使用系统复制功能。');
    }
  });

  const articles = content.articles || [];
  const dialog = $('#article-dialog');
  function renderArticle(slug) {
    const article = articles.find(a => a.slug === slug);
    if (!article) return;
    $('#article-title').textContent = article.title;
    $('#article-meta').textContent = `${article.date} / ${article.category}`;
    $('#article-body').replaceChildren(...article.paragraphs.map(text => {
      const p = document.createElement('p'); p.textContent = text; return p;
    }));
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  if (articles.length) {
    $('#writing-empty').hidden = true;
    $('#article-list').innerHTML = articles.map(a => `<button class="article-row" data-article="${escape(a.slug)}"><time datetime="${escape(a.date)}">${escape(a.date)}</time><div><h3>${escape(a.title)}</h3><p>${escape(a.excerpt)}</p></div>${icon('arrow-up-right')}</button>`).join('');
    $('#article-list').querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => renderArticle(button.dataset.article)));
  }
  $('#close-article').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => {document.body.style.overflow = '';});
  $('#year').textContent = new Date().getFullYear();
})();
