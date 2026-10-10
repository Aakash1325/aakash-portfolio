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
      return;
    }

    detail.style.height = `${currentHeight}px`;
    detail.style.opacity = String(currentOpacity);
    const targetHeight = expanded ? detail.scrollHeight : 0;
    const height = detail.animate([
      { height: `${currentHeight}px`, opacity: currentOpacity },
      { height: `${targetHeight}px`, opacity: expanded ? 1 : 0 }
    ], { duration: expanded ? 590 : 430, easing: ease, fill: 'forwards' });

    const children = [];
    if (expanded) {
      detail.querySelectorAll('.project-details-inner h4, .detail-grid > div, .tags').forEach((item, index) => {
        children.push(item.animate([
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 510, delay: 75 + index * 55, easing: ease, fill: 'both' }));
      });
    }
    const motion = { height, children };
    animations.set(detail, motion);
    height.onfinish = () => {
      if (animations.get(detail) !== motion) return;
      detail.hidden = !expanded;
      height.cancel();
      children.forEach(animation => animation.cancel());
      detail.style.height = '';
      detail.style.opacity = '';
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
