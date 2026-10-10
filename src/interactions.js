(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveal.forEach(element => observer.observe(element));
  } else reveal.forEach(element => element.classList.add('visible'));

  const projects = [...document.querySelectorAll('.project')];
  // The scroll motion is progressive and follows the page in both directions.
  // The layout and project controls remain usable if the optional CDN fails.
  let scrollMotionReady = false;
  function setupScrollMotion() {
    if (scrollMotionReady || reducedMotion.matches || !window.anime?.onScroll) return;
    scrollMotionReady = true;
    const { animate, onScroll } = window.anime;
    projects.forEach(article => {
      animate(article.querySelector('.project-visual'), {
        y: ['9px', '-9px'],
        ease: 'linear',
        autoplay: onScroll({
          target: article,
          enter: 'bottom-=50 top',
          leave: 'top+=60 bottom',
          sync: .25
        })
      });
    });
  }
  setupScrollMotion();
  document.querySelector('#animejs')?.addEventListener('load', setupScrollMotion);
  const animations = new WeakMap();
  const minus = '<path d="M5 12h14"/>';
  const plus = '<path d="M5 12h14M12 5v14"/>';
  const arrow = '<path d="M7 7h10v10M7 17 17 7"/>';
  const ease = 'cubic-bezier(.22, 1, .36, 1)';

  function setProject(article, expanded) {
    const visual = article.querySelector('.project-visual');
    if ((visual.getAttribute('aria-expanded') === 'true') === expanded) return;

    const button = article.querySelector('.round-button');
    const detail = article.querySelector('.project-details');
    const label = article.querySelector('.project-open');
    const name = article.querySelector('h3').textContent;
    visual.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', `${expanded ? 'Close' : 'Read'} ${name} project`);
    button.querySelector('svg').innerHTML = expanded ? minus : plus;
    label.firstChild.textContent = expanded ? 'Close project' : 'Explore project';
    label.querySelector('svg').innerHTML = expanded ? minus : arrow;
    detail.classList.toggle('expanded', expanded);

    const previous = animations.get(detail);
    const currentHeight = detail.hidden ? 0 : detail.getBoundingClientRect().height;
    const currentOpacity = detail.hidden ? 0 : Number(getComputedStyle(detail).opacity);
    const items = [...detail.querySelectorAll('.project-details-inner h4, .detail-grid > div, .tags')];
    const itemStates = items.map(item => ({
      opacity: detail.hidden ? 0 : Number(getComputedStyle(item).opacity),
      transform: detail.hidden ? 'translateY(12px)' : getComputedStyle(item).transform
    }));
    if (previous) {
      previous.height.cancel();
      previous.children.forEach(animation => animation.cancel());
      animations.delete(detail);
    }
    detail.hidden = false;

    if (reducedMotion.matches || !detail.animate) {
      detail.hidden = !expanded;
      detail.style.height = '';
      detail.style.opacity = '';
      items.forEach(item => { item.style.opacity = ''; item.style.transform = ''; });
      return;
    }

    detail.style.height = `${currentHeight}px`;
    detail.style.opacity = String(currentOpacity);
    const targetHeight = expanded ? detail.scrollHeight : 0;
    const keyframes = expanded ? [
      { height: `${currentHeight}px`, opacity: currentOpacity },
      { height: `${targetHeight}px`, opacity: 1 }
    ] : [
      { height: `${currentHeight}px`, opacity: currentOpacity },
      { height: `${currentHeight}px`, opacity: Math.min(currentOpacity, .8), offset: .16 },
      { height: '0px', opacity: 0 }
    ];
    const height = detail.animate(keyframes, {
      duration: expanded ? 700 : 540,
      easing: expanded ? ease : 'cubic-bezier(.65, 0, .35, 1)',
      fill: 'forwards'
    });

    const children = [];
    items.forEach((item, index) => {
      const from = itemStates[index];
      item.style.opacity = String(from.opacity);
      item.style.transform = from.transform;
      children.push(item.animate([
        { opacity: from.opacity, transform: from.transform },
        { opacity: expanded ? 1 : 0, transform: expanded ? 'translateY(0)' : 'translateY(-8px)' }
      ], {
        duration: expanded ? 410 : 280,
        delay: expanded ? 65 + index * 45 : (items.length - index - 1) * 32,
        easing: ease,
        fill: 'forwards'
      }));
    });
    const motion = { height, children };
    animations.set(detail, motion);
    height.onfinish = () => {
      if (animations.get(detail) !== motion) return;
      detail.hidden = !expanded;
      height.cancel();
      children.forEach(animation => animation.cancel());
      detail.style.height = '';
      detail.style.opacity = '';
      items.forEach(item => { item.style.opacity = ''; item.style.transform = ''; });
      animations.delete(detail);
    };
  }

  projects.forEach(article => {
    const toggle = () => {
      const expanded = article.querySelector('.project-visual').getAttribute('aria-expanded') !== 'true';
      projects.forEach(other => setProject(other, other === article && expanded));
    };
    article.querySelector('.project-visual').addEventListener('click', toggle);
    article.querySelector('.round-button').addEventListener('click', toggle);
  });

  const copy = document.querySelector('.copy');
  let reset;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('aakashh.contact@gmail.com');
      copy.textContent = 'Copied!';
      document.querySelector('[role="status"]').textContent = 'Email copied to clipboard';
      clearTimeout(reset);
      reset = setTimeout(() => { copy.textContent = 'Copy email'; document.querySelector('[role="status"]').textContent = ''; }, 2500);
    } catch { window.location.href = 'mailto:aakashh.contact@gmail.com'; }
  });
})();
