(() => {
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    reveal.forEach(element => observer.observe(element));
  } else reveal.forEach(element => element.classList.add('visible'));
  const projects = [...document.querySelectorAll('.project')];
  const minus = '<path d="M5 12h14"/>';
  const plus = '<path d="M5 12h14M12 5v14"/>';
  const arrow = '<path d="M7 7h10v10M7 17 17 7"/>';
  function setProject(article, expanded) {
    const visual = article.querySelector('.project-visual');
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
    detail.hidden = !expanded;
    detail.classList.toggle('expanded', expanded);
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
      await navigator.clipboard.writeText('aakashprince2004@gmail.com');
      copy.textContent = 'Copied!';
      document.querySelector('[role="status"]').textContent = 'Email copied to clipboard';
      clearTimeout(reset);
      reset = setTimeout(() => { copy.textContent = 'Copy email'; document.querySelector('[role="status"]').textContent = ''; }, 2500);
    } catch { window.location.href = 'mailto:aakashprince2004@gmail.com'; }
  });
})();
