import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowLeft, ArrowRight, ArrowUpRight} from 'lucide-react';
import {caseStudies} from './case-studies.js';
import SplashCursor from './components/SplashCursor.jsx';
import OrbitImages from './components/OrbitImages.jsx';

const featured=['fittex','flyingroots','kamblis','nutalink','toodhu','parking-spot'].map(slug=>caseStudies.find(project=>project.slug===slug));
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
    <div className="orbit-caption" aria-live="polite"><span>{project.kind} · {String(active+1).padStart(2,'0')} / {String(featured.length).padStart(2,'0')}</span><span>{project.category}</span></div>
    <div className="orbit-layout">
      <div className="orbit-react-stage" ref={stageRef} onKeyDown={onKey} role="region" aria-label="Selected projects" aria-roledescription="carousel">
        <OrbitImages images={projectImages} shape="ellipse" radiusX={width<600?Math.max(75,(width-130)/2):Math.min(600,width*.35)} radiusY={width<600?96:width<900?125:165} rotation={-8} duration={30} itemSize={width<600?108:width<900?150:Math.min(205,width*.16)} depth={0.6} showPath pathColor="rgba(23,23,22,.3)" pathWidth={1} height="100%" onItemClick={setActive} centerContent={<h2>Selected<br/>Work</h2>}/>
      </div>
      <div className="orbit-detail" aria-live="polite">
        <span className="eyebrow">{project.category}</span><h3>{project.name}</h3><span className="project-role">{project.role}</span><p>{project.desc}</p><span className="orbit-status">{project.status}</span>
        <a className="case-link star-border" href={`./projects/${project.slug}.html`}><span>Read the case study <ArrowUpRight size={18}/></span></a>
        <div className="orbit-controls"><button type="button" onClick={()=>select(active-1)} aria-label="Previous project"><ArrowLeft size={20}/></button><span>{String(active+1).padStart(2,'0')} / {String(featured.length).padStart(2,'0')}</span><button type="button" onClick={()=>select(active+1)} aria-label="Next project"><ArrowRight size={20}/></button></div>
      </div>
    </div>
  </div>;
}

const toolkit=[
  ['Product & UI/UX Design','Product interfaces, user flows, information hierarchy, and digital experiences.','toolkit-product-design.webp','Illustrative editorial scene of a design team planning product interfaces'],
  ['Figma & Design Systems','Figma components, Auto Layout, reusable systems, and prototyping.','toolkit-design-systems.webp','Illustrative editorial scene of a designer organizing a component system'],
  ['Interaction Design & Prototyping','Interactive states, microinteractions, animations, and prototypes.','toolkit-interaction.webp','Illustrative editorial scene of a tablet and mobile prototype'],
  ['Responsive Frontend Development','Responsive interfaces, HTML, CSS, JavaScript, and implementation.','toolkit-frontend.webp','Illustrative editorial scene of responsive digital design work'],
  ['AI-Assisted Design Workflows','AI-assisted prototyping, creative workflows, visual production, and design refinement.','toolkit-ai-workflows.webp','Illustrative editorial scene of human-led creative work with digital tools'],
  ['Visual Design & Creative Assets','Posters, brochures, websites, typography, and creative marketing assets.','toolkit-visual-assets.webp','Illustrative editorial scene of refined print and visual design assets']
];
function ToolkitRail(){
  const [active,setActive]=useState(0),[reset,setReset]=useState(0),[visible,setVisible]=useState(false),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const root=useRef(null);
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});observer.observe(root.current);const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(mq.matches);mq.addEventListener('change',change);return()=>{observer.disconnect();mq.removeEventListener('change',change)}},[]);
  useEffect(()=>{if(!visible||paused||reduced)return;const timer=setTimeout(()=>setActive(index=>(index+1)%toolkit.length),6000);return()=>clearTimeout(timer)},[active,reset,visible,paused,reduced]);
  const select=index=>{setActive(index);setReset(v=>v+1)};
  return <div className="toolkit-editorial" ref={root} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setPaused(false)}}>
    <div className="toolkit-rail" aria-label="Toolkit capabilities">{toolkit.map(([title,description],index)=><button key={title} type="button" className={'toolkit-step'+(active===index?' is-active':'')} aria-current={active===index?'step':undefined} onClick={()=>select(index)}><span className="toolkit-step-number">{String(index+1).padStart(2,'0')}</span><span className="toolkit-step-copy"><strong>{title}</strong><small>{description}</small></span><span className="toolkit-progress" aria-hidden="true"><span key={active===index?`${index}-${reset}`:index} className={active===index&&visible&&!paused&&!reduced?'is-running':''}/></span></button>)}</div>
    <div className="toolkit-visual" aria-live="polite">{toolkit.map(([title,,image,alt],index)=><img key={image} className={active===index?'is-active':''} src={`./editorial/${image}`} alt={active===index?alt:''} aria-hidden={active!==index} width="1536" height="1024" loading={index===0?'eager':'lazy'}/>)}<span className="toolkit-image-caption">{String(active+1).padStart(2,'0')} / 06 &nbsp;—&nbsp; {toolkit[active][0]}</span></div>
  </div>
}

const milestones=[
  {id:'esutra',year:'2025',range:'JUL — NOV 2025',label:'The foundation',image:'experience-esutra.webp',alt:'Illustrative editorial scene of an early-career designer learning with a mentor',name:'E-Sutra Technologies Pvt. Ltd.',role:'UI/UX Designer Intern',description:'Responsive web and application interfaces, wireframes, prototypes, and developer collaboration.'},
  {id:'vidmagin',year:'2025–26',range:'NOV 2025 — FEB 2026',label:'Finding my voice',image:'experience-vidmagin.webp',alt:'Illustrative editorial scene of a creative designer refining interface layouts',name:'Vidmagin Innovations Pvt. Ltd.',role:'UI/UX Designer',description:'Responsive website layouts, content hierarchy, interface design, and visual communication.'},
  {id:'jeevan',year:'2026',range:'JUL 2026 — PRESENT',label:'Designing with depth',image:'experience-jeevan.webp',alt:'Illustrative editorial scene of a product design team collaborating',name:'Jeevan Infotech India Pvt. Ltd.',role:'Junior Designer',description:'Designed the live FITTEX website; contributed selected new and redesigned screens to its existing ERP; co-designed Kamblis and Toodhu; completed NutaLink’s UI/UX design, prototypes, and frontend implementation.'}
];
function CareerTimeline(){const [active,setActive]=useState(2);return <div className="career-timeline"><div className="career-years" role="tablist" aria-label="Career years">{milestones.map((item,index)=><button key={item.id} type="button" role="tab" id={`year-tab-${item.id}`} aria-selected={active===index} aria-controls={`year-panel-${item.id}`} onClick={()=>setActive(index)} onKeyDown={event=>{if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:-1)+milestones.length)%milestones.length;setActive(next);document.getElementById(`year-tab-${milestones[next].id}`)?.focus()}}><span>{item.year}</span><small>{item.role}</small></button>)}</div><div className="career-stage">{milestones.map((item,index)=><div key={item.id} className={'career-image'+(active===index?' is-active':'')} aria-hidden={active!==index}><img src={`./editorial/${item.image}`} alt="" width="1536" height="1024" loading="lazy"/></div>)}<div className="career-image-label">ILLUSTRATIVE EDITORIAL IMAGE / {milestones[active].year}</div></div>{milestones.map((item,index)=><div key={item.id} role="tabpanel" id={`year-panel-${item.id}`} aria-labelledby={`year-tab-${item.id}`} hidden={active!==index} className="career-milestones"><div><span className="eyebrow">{item.range}</span><h3>{item.label}.</h3></div><div className="career-events"><span>{item.role}</span><h4>{item.name}</h4><p>{item.description}</p></div></div>)}</div>}

const orbitRoot=document.getElementById('orbit-react-root');
if(orbitRoot)createRoot(orbitRoot).render(<SelectedWorkOrbit/>);

const toolkitRoot=document.getElementById('toolkit-react-root');
if(toolkitRoot)createRoot(toolkitRoot).render(<ToolkitRail/>);

const journeyRoot=document.getElementById('journey-react-root');
if(journeyRoot)createRoot(journeyRoot).render(<CareerTimeline/>);

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
