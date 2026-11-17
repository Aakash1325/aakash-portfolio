import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import {caseStudies} from './case-studies.js';
import SplashCursor from './components/SplashCursor.jsx';
import OrbitImages from './components/OrbitImages.jsx';

const featured=['fittex','kamblis','nutalink','toodhu','parking-spot'].map(slug=>caseStudies.find(project=>project.slug===slug));
const projectImages=featured.map(project=>({src:`./project-covers/${project.image}`,alt:project.name}));

function SelectedWorkOrbit(){
  const [active,setActive]=useState(0);
  const [width,setWidth]=useState(700);
  const stageRef=useRef(null);
  const project=featured[active];
  useEffect(()=>{
    const element=stageRef.current;
    if(!element)return;
    const observer=new ResizeObserver(([entry])=>setWidth(entry.contentRect.width));
    observer.observe(element);
    return()=>observer.disconnect();
  },[]);
  const select=index=>{
    const next=(index+featured.length)%featured.length;
    stageRef.current?.querySelector(`[data-orbit-item="${next}"]`)?.click();
    setActive(next);
  };
  const onKey=event=>{
    if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
    event.preventDefault();
    const next=(active+(event.key==='ArrowRight'?1:-1)+featured.length)%featured.length;
    select(next);
    stageRef.current?.querySelector(`[data-orbit-item="${next}"]`)?.focus();
  };
  return <div className="orbit orbit-react">
    <div className="orbit-caption" aria-live="polite"><span>{project.kind} · {String(active+1).padStart(2,'0')} / 05</span><span>{project.category}</span></div>
    <div className="orbit-layout">
      <div className="orbit-react-stage" ref={stageRef} onKeyDown={onKey} role="region" aria-label="Selected projects" aria-roledescription="carousel">
        <OrbitImages images={projectImages} shape="ellipse" radiusX={width<760?Math.max(110,Math.min(300,(width-140)/2)):340} radiusY={width<600?100:80} rotation={-8} duration={30} itemSize={width<760?110:90} depth={0.6} showPath pathColor="rgba(23,23,22,.3)" pathWidth={1} height="100%" onItemClick={setActive} centerContent={<h2>Selected<br/>Work</h2>}/>
      </div>
      <div className="orbit-detail" aria-live="polite">
        <span className="eyebrow">{project.category}</span><h3>{project.name}</h3><span className="project-role">{project.role}</span><p>{project.desc}</p><span className="orbit-status">{project.status}</span>
        <a className="case-link star-border" href={`./projects/${project.slug}.html`}><span>Read the case study <ArrowUpRight size={18}/></span></a>
        <div className="orbit-controls"><button type="button" onClick={()=>select(active-1)} aria-label="Previous project"><ArrowLeft size={20}/></button><span>{String(active+1).padStart(2,'0')} / 05</span><button type="button" onClick={()=>select(active+1)} aria-label="Next project"><ArrowRight size={20}/></button></div>
      </div>
    </div>
  </div>;
}

const orbitRoot=document.getElementById('orbit-react-root');
if(orbitRoot)createRoot(orbitRoot).render(<SelectedWorkOrbit/>);

const splashRoot=document.getElementById('splash-react-root');
if(splashRoot){
  const root=createRoot(splashRoot);
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const render=()=>root.render(fine.matches&&!reduced.matches&&'WebGL2RenderingContext' in window?<SplashCursor rainbow size={1} force={1} swirl={3} trail={1} clickSplash theme="light" zIndex={70}/>:null);
  fine.addEventListener('change',render);
  reduced.addEventListener('change',render);
  render();
}
