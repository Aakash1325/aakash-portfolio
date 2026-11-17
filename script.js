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

  const orbit = document.querySelector('[data-orbit]');
  if (orbit) {
    const stage = orbit.querySelector('.orbit-stage');
    const path = stage.querySelector('.orbit-track path');
    const cards = [...stage.querySelectorAll('.orbit-card')];
    const length = path.getTotalLength();
    const caption = orbit.querySelector('.orbit-caption');
    let active = 0, phase = 0, last = 0, visible = false, engaged = false, dragX = null, ticking = false;
    const update = index => {
      active = (index + cards.length) % cards.length;
      const card = cards[active];
      cards.forEach((item,i) => item.setAttribute('aria-pressed', String(i === active)));
      const count = `${String(active+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
      orbit.querySelector('[data-orbit-kind]').textContent = `${card.dataset.kind} · ${count}`;
      orbit.querySelector('[data-orbit-category]').textContent = card.dataset.category;
      orbit.querySelector('[data-orbit-label]').textContent = card.dataset.category;
      orbit.querySelector('[data-orbit-name]').textContent = card.dataset.name;
      orbit.querySelector('[data-orbit-role]').textContent = card.dataset.role;
      orbit.querySelector('[data-orbit-description]').textContent = card.dataset.description;
      orbit.querySelector('[data-orbit-status]').textContent = card.dataset.status;
      orbit.querySelector('[data-orbit-link]').href = card.dataset.href;
      orbit.querySelector('[data-orbit-count]').textContent = count;
      if (!reduce.matches && caption.animate) caption.animate([{opacity:.4,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'ease-out'});
    };
    const frame = now => {
      if (reduce.matches || !visible || document.hidden) { ticking = false; return; }
      const dt = Math.min(now-last, 50);
      last = now;
      if (!engaged) phase = (phase + dt / 48000) % 1;
      cards.forEach((card,i) => {
        const point = path.getPointAtLength(((i/cards.length + phase) % 1) * length);
        card.style.left = `${point.x/10}%`;
        card.style.top = `${point.y/6.4}%`;
        card.style.zIndex = String(Math.round(point.y)+ (i===active?1000:0));
      });
      requestAnimationFrame(frame);
    };
    const resume = () => { if (!ticking && !reduce.matches && visible && !document.hidden) { ticking = true; last = performance.now(); requestAnimationFrame(frame); } };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); },{rootMargin:'150px'});
    observer.observe(stage);
    document.addEventListener('visibilitychange', resume);
    stage.addEventListener('pointerenter', () => { engaged = true; });
    stage.addEventListener('pointerleave', () => { engaged = false; });
    stage.addEventListener('focusin', () => { engaged = true; });
    stage.addEventListener('focusout', event => { if (!stage.contains(event.relatedTarget)) engaged = false; });
    cards.forEach((card,i) => card.addEventListener('click', () => {
      if (Math.abs((dragX ?? 0) - (stage.dataset.releaseX ? Number(stage.dataset.releaseX) : (dragX ?? 0))) > 45) return;
      if (i===active) location.href=card.dataset.href; else update(i);
    }));
    orbit.querySelector('[data-orbit-prev]').addEventListener('click', () => update(active-1));
    orbit.querySelector('[data-orbit-next]').addEventListener('click', () => update(active+1));
    stage.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      update(active+(event.key==='ArrowRight'?1:-1));
      cards[active].focus();
    });
    stage.addEventListener('pointerdown', event => { dragX=event.clientX; stage.dataset.releaseX=String(event.clientX); });
    stage.addEventListener('pointerup', event => {
      if (dragX===null) return;
      const delta=event.clientX-dragX;
      stage.dataset.releaseX=String(event.clientX);
      if (Math.abs(delta)>45) update(active+(delta<0?1:-1));
      setTimeout(() => { dragX=null; },0);
    });
    stage.addEventListener('pointercancel', () => { dragX=null; });
    reduce.addEventListener?.('change', () => { if (reduce.matches) cards.forEach(card => { card.style.left='';card.style.top=''; }); else resume(); });
    update(0);
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

  document.querySelectorAll('.star-border').forEach(link => {
    const line=document.createElementNS('http://www.w3.org/2000/svg','svg');
    line.setAttribute('class','star-outline');line.setAttribute('aria-hidden','true');
    line.innerHTML='<rect x="1" y="1" width="99%" height="96%" rx="16" pathLength="100"/>';
    link.append(line);
  });

  const aboutScroll=document.querySelector('[data-about-scroll]');
  if (aboutScroll) {
    const track=aboutScroll.querySelector('[data-about-track]');
    const progressLine=aboutScroll.querySelector('[data-about-progress]');
    let queued=false;
    const paint=() => {
      queued=false;
      if (reduce.matches) { track.style.transform=''; progressLine.style.transform=''; return; }
      const bounds=aboutScroll.getBoundingClientRect();
      const distance=Math.max(1,bounds.height-innerHeight);
      const progress=Math.max(0,Math.min(1,-bounds.top/distance));
      const travel=Math.max(0,track.scrollWidth-innerWidth);
      track.style.transform=`translate3d(${-progress*travel}px,0,0)`;
      progressLine.style.transform=`scaleX(${progress})`;
    };
    const queue=() => { if (!queued) { queued=true; requestAnimationFrame(paint); } };
    addEventListener('scroll',queue,{passive:true});
    addEventListener('resize',queue,{passive:true});
    reduce.addEventListener?.('change',queue);
    queue();
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

  if (fine.matches && !reduce.matches) {
    const canvas=document.createElement('canvas');canvas.className='splash-cursor';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
    const ctx=canvas.getContext('2d',{alpha:true});let drops=[],running=false,lastX=0,lastY=0;
    const resize=() => {const ratio=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*ratio;canvas.height=innerHeight*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);};
    resize();addEventListener('resize',resize,{passive:true});
    const draw=() => {
      ctx.clearRect(0,0,innerWidth,innerHeight);
      drops=drops.filter(d => d.life>0);
      drops.forEach(d => {
        d.x+=d.vx;d.y+=d.vy;d.vx*=.97;d.vy*=.97;d.life-=.025;
        const radius=d.r*(1.8-d.life);
        const glow=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,radius);
        glow.addColorStop(0,`rgba(103,110,112,${d.life*.12})`);
        glow.addColorStop(.5,`rgba(168,174,174,${d.life*.055})`);
        glow.addColorStop(1,'rgba(180,180,180,0)');
        ctx.fillStyle=glow;ctx.beginPath();ctx.arc(d.x,d.y,radius,0,Math.PI*2);ctx.fill();
      });
      if (drops.length && !document.hidden) requestAnimationFrame(draw);else running=false;
    };
    const add=(x,y,burst=false) => {
      if (document.hidden || reduce.matches) return;
      for(let i=0;i<(burst?6:1);i++) drops.push({x,y,vx:burst?(Math.random()-.5)*4:(x-lastX)*.06,vy:burst?(Math.random()-.5)*4:(y-lastY)*.06,r:burst?30:22,life:1});
      drops=drops.slice(-28);lastX=x;lastY=y;
      if (!running) {running=true;requestAnimationFrame(draw);}
    };
    addEventListener('pointermove',event => add(event.clientX,event.clientY),{passive:true});
    addEventListener('pointerdown',event => add(event.clientX,event.clientY,true),{passive:true});
    reduce.addEventListener?.('change',() => { if (reduce.matches) {drops=[];canvas.remove();} });
  }
})();
