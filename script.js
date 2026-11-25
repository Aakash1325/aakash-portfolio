(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const video = document.querySelector('.hero-video');
  if (video) {
    const playback = () => {
      if (reduce.matches || document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    reduce.addEventListener?.('change', playback);
    document.addEventListener('visibilitychange', playback);
    playback();
  }

  const nav = document.querySelector('[data-home-nav]');
  if (nav) {
    const toggle = nav.querySelector('.nav-toggle');
    const close = (restore = false) => {
      nav.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      if (restore) toggle.focus();
    };
    const update = () => nav.classList.toggle('is-scrolled', scrollY > 84);
    addEventListener('scroll', update, {passive: true});
    update();
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('menu-open');
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) nav.querySelector('nav a')?.focus();
    });
    nav.querySelectorAll('nav a, .brand, .nav-contact').forEach(link => link.addEventListener('click', () => close()));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('menu-open')) close(true); });
    addEventListener('resize', () => { if (innerWidth > 700) close(); }, {passive:true});
  }

  if (fine.matches) document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (reduce.matches) return;
      const box=button.getBoundingClientRect();
      const x=event.clientX-box.left,y=event.clientY-box.top;
      button.style.setProperty('--pointer-x',`${x}px`);
      button.style.setProperty('--pointer-y',`${y}px`);
      button.style.setProperty('--magnet-x',`${(x/box.width-.5)*7}px`);
      button.style.setProperty('--magnet-y',`${(y/box.height-.5)*7}px`);
    });
    button.addEventListener('pointerleave', () => { button.style.setProperty('--magnet-x','0px'); button.style.setProperty('--magnet-y','0px'); });
  });

  const aboutScroll=document.querySelector('[data-about-scroll]');
  if (aboutScroll) {
    const track=aboutScroll.querySelector('[data-about-track]');
    const progressLine=aboutScroll.querySelector('[data-about-progress]');
    let queued=false,travel=0;
    const measure=() => { travel=Math.max(0,track.scrollWidth-innerWidth); queue(); };
    const paint=() => {
      queued=false;
      if (reduce.matches) { track.style.transform=''; progressLine.style.transform=''; return; }
      const bounds=aboutScroll.getBoundingClientRect();
      const distance=Math.max(1,bounds.height-innerHeight);
      const progress=Math.max(0,Math.min(1,-bounds.top/distance));
      track.style.transform=`translate3d(${-progress*travel}px,0,0)`;
      progressLine.style.transform=`scaleX(${progress})`;
    };
    const queue=() => { if (!queued) { queued=true; requestAnimationFrame(paint); } };
    addEventListener('scroll',queue,{passive:true});
    addEventListener('resize',measure,{passive:true});
    reduce.addEventListener?.('change',queue);
    document.fonts.ready.then(measure);
    measure();
  }

  const reveal=document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');observer.unobserve(entry.target);
    }),{threshold:.1});
    reveal.forEach(element => observer.observe(element));
  } else reveal.forEach(element => element.classList.add('visible'));

  const roles=[...document.querySelectorAll('.journey-role')];
  if (roles.length && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-current',entry.isIntersecting)),{rootMargin:'-30% 0px -45% 0px'});
    roles.forEach(role => observer.observe(role));
  }

  const copy=document.querySelector('.copy');let reset;
  copy?.addEventListener('click',async () => {
    const address=document.querySelector('a.email[href^="mailto:"]')?.getAttribute('href')?.replace(/^mailto:/,'');
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      copy.textContent='Copied!';
      document.querySelector('[role="status"]').textContent='Email copied to clipboard';
      clearTimeout(reset);
      reset=setTimeout(() => {copy.textContent='Copy email';document.querySelector('[role="status"]').textContent='';},2500);
    } catch { copy.textContent='Copy manually'; }
  });


})();
