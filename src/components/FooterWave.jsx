import React, {useEffect, useRef} from 'react';

const LETTERING='AAKASH P · PRODUCT DESIGNER · ';
const TAU=Math.PI*2;

function blend(a,b,t){return Math.round(a+(b-a)*t);}
function rowColor(t){const k=Math.min(1,Math.max(0,(t-.16)/.84));return `rgb(${blend(124,255,k)},${blend(92,255,k)},${blend(255,255,k)})`;}

export default function FooterWave(){
  const stageRef=useRef(null);
  const canvasRef=useRef(null);
  useEffect(()=>{
    const stage=stageRef.current,canvas=canvasRef.current,ctx=canvas.getContext('2d',{alpha:false});
    if(!ctx)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const motion={active:false,visible:false,width:0,height:0,dpr:1,frame:0,lastDraw:0,rows:[],pointer:null,ripples:[]};

    function prepare(){
      cancelAnimationFrame(motion.frame);motion.frame=0;
      const {width,height}=stage.getBoundingClientRect();
      if(!width||!height)return;
      motion.width=width;motion.height=height;motion.dpr=Math.min(devicePixelRatio||1,2);
      canvas.width=Math.round(width*motion.dpr);canvas.height=Math.round(height*motion.dpr);
      canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;
      ctx.setTransform(motion.dpr,0,0,motion.dpr,0,0);
      const count=width<600?22:30;
      motion.rows=Array.from({length:count},(_,index)=>{
        const t=index/(count-1);
        const size=(width<600?8.5:9)+t*t*(width<600?12:15);
        const strip=document.createElement('canvas');
        const measure=strip.getContext('2d');
        measure.font=`500 ${size}px "Instrument Sans", sans-serif`;
        measure.letterSpacing=`${size*.08}px`;
        const period=Math.max(1,Math.floor(measure.measureText(LETTERING).width-8));
        const stripHeight=Math.ceil(size*1.8);
        strip.width=Math.ceil(period*2*motion.dpr);
        strip.height=Math.ceil(stripHeight*motion.dpr);
        const ink=strip.getContext('2d');
        ink.scale(motion.dpr,motion.dpr);
        ink.font=measure.font;ink.letterSpacing=measure.letterSpacing;
        ink.textBaseline='middle';ink.fillStyle=rowColor(t);
        ink.fillText(LETTERING,0,stripHeight/2);
        ink.fillText(LETTERING,period,stripHeight/2);
        return {t,size,period,strip,stripHeight,offset:(index%7)*period/7};
      });
      draw(performance.now());
    }

    function draw(now){
      motion.frame=0;
      if(motion.active&&now-motion.lastDraw<32){motion.frame=requestAnimationFrame(draw);return;}
      motion.lastDraw=now;
      const {width,height,rows,pointer,ripples}=motion;
      if(!width||!height)return;
      const seconds=now/1000;
      ctx.fillStyle='#0A0A0A';ctx.fillRect(0,0,width,height);
      const top=height*(width<600?.28:.15),span=height-top+25;
      const focus=pointer&&{x:pointer.x,y:pointer.y};
      for(const row of rows){
        const {t,size,period,strip,stripHeight,offset}=row;
        const baseY=top+span*Math.pow(t,1.72);
        const amplitude=(5+22*t*t)*(width<600?.7:1);
        const drift=reduced.matches?0:seconds*11*(t+.4);
        const slice=width<600?28:42;
        for(let x=0;x<width;x+=slice){
          const sw=Math.min(slice,width-x);
          const center=x+sw/2;
          let y=baseY+amplitude*(Math.sin(center*.0065+seconds*.7+t*2.8)+.34*Math.sin(center*.013-seconds*.43+t*9));
          if(reduced.matches)y=baseY+amplitude*(Math.sin(center*.0065+t*2.8)+.34*Math.sin(center*.013+t*9));
          for(const ripple of ripples){
            const age=(now-ripple.time)/1000;
            const distance=Math.hypot((center-ripple.x)*.84,(baseY-ripple.y)*.9);
            const ring=distance-age*385;
            y+=Math.sin(ring/19)*Math.exp(-Math.abs(ring)/92)*Math.exp(-age/1.15)*(8+25*t)*ripple.strength;
          }
          if(y<-stripHeight||y>height+stripHeight)continue;
          let alpha=.2+.8*Math.pow(t,1.3);
          if(focus){const proximity=Math.max(0,1-Math.hypot((center-focus.x)*.83,(y-focus.y)*1.2)/240);alpha=Math.min(1,alpha+proximity*proximity*.4);}
          ctx.globalAlpha=alpha;
          const source=((center+offset+drift)%period+period)%period;
          ctx.drawImage(strip,Math.floor(source*motion.dpr),0,Math.ceil(sw*motion.dpr),strip.height,x,y-stripHeight/2,sw,stripHeight);
        }
      }
      ctx.globalAlpha=1;
      motion.ripples=ripples.filter(ripple=>now-ripple.time<2300);
      if(motion.active&&!reduced.matches)motion.frame=requestAnimationFrame(draw);
    }

    function run(){
      motion.active=motion.visible&&!document.hidden&&!reduced.matches;
      cancelAnimationFrame(motion.frame);motion.frame=0;
      if(motion.active)motion.frame=requestAnimationFrame(draw);
      else draw(performance.now());
    }
    function onMove(event){const box=stage.getBoundingClientRect();motion.pointer={x:event.clientX-box.left,y:event.clientY-box.top};}
    function onLeave(){motion.pointer=null;}
    function ripple(x,y){if(reduced.matches)return;motion.ripples.push({x,y,time:performance.now(),strength:1});if(!motion.active)draw(performance.now());}
    function onDown(event){if(event.target.closest('button'))return;const box=stage.getBoundingClientRect();ripple(event.clientX-box.left,event.clientY-box.top);}
    function onButton(){ripple(motion.width*.5,motion.height*.64);}
    const trigger=stage.querySelector('.footer-wave-trigger');
    const resize=new ResizeObserver(prepare);resize.observe(stage);
    const observer=new IntersectionObserver(([entry])=>{motion.visible=entry.isIntersecting;run();},{rootMargin:'100px'});observer.observe(stage);
    stage.addEventListener('pointermove',onMove,{passive:true});stage.addEventListener('pointerleave',onLeave);
    stage.addEventListener('pointerdown',onDown);trigger.addEventListener('click',onButton);
    document.addEventListener('visibilitychange',run);reduced.addEventListener('change',run);
    document.fonts.ready.then(()=>{if(stage.isConnected)prepare();});
    return()=>{cancelAnimationFrame(motion.frame);resize.disconnect();observer.disconnect();stage.removeEventListener('pointermove',onMove);stage.removeEventListener('pointerleave',onLeave);stage.removeEventListener('pointerdown',onDown);trigger.removeEventListener('click',onButton);document.removeEventListener('visibilitychange',run);reduced.removeEventListener('change',run);};
  },[]);
  return <div className="footer-wave-stage" ref={stageRef}>
    <canvas ref={canvasRef} className="footer-wave-canvas" aria-hidden="true"/>
    <div className="footer-wave-top"><span>AAKASH P / PRODUCT DESIGNER</span><button className="footer-wave-trigger" type="button" aria-label="Create a ripple in the lettering">CLICK TO MAKE A WAVE <span aria-hidden="true">↗</span></button></div>
  </div>;
}
