(function(){
  const toggle = document.querySelector('[data-mobile-toggle]');
  const nav = document.querySelector('[data-navlinks]');
  if(toggle && nav){
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Language switching: keep the same page name, switch /en/ <-> /ua/
  const langLinks = document.querySelectorAll('[data-lang]');
  langLinks.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = a.getAttribute('data-lang'); // en or ua
      const path = window.location.pathname;
      // Normalize: if opened from file://, pathname includes full path; handle by simple replace
      let next = path;
      if(path.includes('/en/')) next = path.replace('/en/', `/${target}/`);
      else if(path.includes('/ua/')) next = path.replace('/ua/', `/${target}/`);
      else {
        // root or unknown, send to language home
        next = `/${target}/index.html`;
      }
      try{ localStorage.setItem('aucc_lang', target); }catch(_){}
      window.location.href = next;
    });
  });

  // Set active nav link and active language pill
  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.navlinks a').forEach(a=>{
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href.endsWith(page)) a.classList.add('active');
  });

  const lang = window.location.pathname.includes('/ua/') ? 'ua' : 'en';
  document.querySelectorAll('.lang a').forEach(a=>{
    if(a.getAttribute('data-lang') === lang) a.classList.add('active');
  });
})();
