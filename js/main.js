// ===== Anurudh Studio - main script =====
document.addEventListener('DOMContentLoaded', () => {
  const S = window.SITE || {};
  const PROJECTS = window.PROJECTS || [];
  const LABELS = window.CATEGORY_LABELS || {};

  // Small helper so text from projects.js can never break the page
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  // 1) Mobile menu toggle
  const btn = document.getElementById('menu-btn');
  const links = document.getElementById('nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }

  // 2) Highlight the current page in the nav
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  // 3) Footer year + fill links/email from config.js
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = S.email;
    el.setAttribute('href', 'mailto:' + S.email);
  });
  document.querySelectorAll('[data-github]').forEach(el => el.setAttribute('href', S.github));
  document.querySelectorAll('[data-linkedin]').forEach(el => el.setAttribute('href', S.linkedin));
  document.querySelectorAll('[data-playstore]').forEach(el => el.setAttribute('href', S.playStore));
  document.querySelectorAll('[data-project-count]').forEach(el => el.textContent = PROJECTS.length);

  // 4) Profile photo: if images/profile.jpg is missing, show the initial instead
  document.querySelectorAll('.photo').forEach(box => {
    const img = box.querySelector('img');
    if (!img) return;
    const fallback = () => box.classList.add('no-img');
    img.addEventListener('error', fallback);
    if (img.complete && img.naturalWidth === 0) fallback();
  });

  // 5) Build project cards from js/projects.js
  function cardHTML(p) {
    const thumb = p.image
      ? '<div class="thumb"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy"></div>'
      : '<div class="thumb">' + esc(p.emoji || '📱') + '</div>';
    const status = p.status ? '<span class="tag status">' + esc(p.status) + '</span>' : '';
    const tags = (p.tags || []).map(t => '<span class="tag">' + esc(t) + '</span>').join('');
    const link = p.link
      ? '<div class="card-link"><a class="btn btn-outline btn-sm" href="' + esc(p.link) +
        '" target="_blank" rel="noopener">' + esc(p.linkLabel || 'View project') + '</a></div>'
      : '';
    return '<div class="card reveal" data-cat="' + esc(p.category || 'app') + '">' +
      thumb + '<h3>' + esc(p.title) + '</h3><p>' + esc(p.description) + '</p>' +
      '<div class="tag-row">' + status + tags + '</div>' + link + '</div>';
  }

  const grid = document.getElementById('projects-grid');
  if (grid) {
    grid.innerHTML = PROJECTS.map(cardHTML).join('');

    // Filter buttons are created from the categories you actually use
    const filterRow = document.getElementById('filter-row');
    if (filterRow) {
      const cats = [];
      PROJECTS.forEach(p => { const c = p.category || 'app'; if (cats.indexOf(c) === -1) cats.push(c); });
      const label = (c) => LABELS[c] || (c.charAt(0).toUpperCase() + c.slice(1));
      let html = '<button class="btn btn-primary" data-filter="all">All</button>';
      cats.forEach(c => { html += '<button class="btn btn-outline" data-filter="' + esc(c) + '">' + esc(label(c)) + '</button>'; });
      filterRow.innerHTML = html;

      const filterBtns = filterRow.querySelectorAll('[data-filter]');
      filterBtns.forEach(b => b.addEventListener('click', () => {
        filterBtns.forEach(x => { x.classList.remove('btn-primary'); x.classList.add('btn-outline'); });
        b.classList.remove('btn-outline');
        b.classList.add('btn-primary');
        const f = b.getAttribute('data-filter');
        grid.querySelectorAll('[data-cat]').forEach(c => {
          c.style.display = (f === 'all' || c.getAttribute('data-cat') === f) ? '' : 'none';
        });
      }));
    }
  }

  const featured = document.getElementById('featured-grid');
  if (featured) {
    featured.innerHTML = PROJECTS.filter(p => p.featured).slice(0, 3).map(cardHTML).join('');
  }

  // 6) Scroll reveal animation (runs after the cards exist)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('show'));
  }

  // 7) Skill bars animation (About page)
  document.querySelectorAll('.bar i').forEach(bar => {
    const w = bar.getAttribute('data-w');
    setTimeout(() => { bar.style.width = w + '%'; }, 300);
  });

  // 8) Contact form
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        status.className = 'err';
        status.textContent = 'Please fill in all the fields.';
        return;
      }

      // If a Formspree endpoint is set, send the message there
      if (S.formEndpoint) {
        status.className = '';
        status.textContent = 'Sending...';
        try {
          const res = await fetch(S.formEndpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
          });
          if (res.ok) {
            status.className = 'ok';
            status.textContent = 'Thank you! Your message has been sent. I will reply soon.';
            form.reset();
          } else {
            throw new Error('bad response');
          }
        } catch (err) {
          status.className = 'err';
          status.textContent = 'Something went wrong. Please email me directly: ' + S.email;
        }
        return;
      }

      // Fallback: mailto (opens the visitor's email app)
      const subject = encodeURIComponent('Portfolio enquiry from ' + name);
      const body = encodeURIComponent(message + '\n\n- ' + name + ' (' + email + ')');
      window.location.href = 'mailto:' + S.email + '?subject=' + subject + '&body=' + body;
      status.className = 'ok';
      status.textContent = 'Opening your email app...';
    });
  }
});
