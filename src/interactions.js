(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const reveal = document.querySelectorAll('.reveal');
 if ('IntersectionObserver' in window && !reduced.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
  reveal.forEach(element=>observer.observe(element));
 } else reveal.forEach(element=>element.classList.add('visible'));
 const toggle=document.querySelector('.menu-toggle'); const nav=document.querySelector('#primary-nav');
 if(toggle && nav){
  const close=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')};
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();toggle.focus()}});
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))close()});
 }
})();
