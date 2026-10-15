import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { caseStudies } from '../src/case-studies.js';
const require = createRequire(import.meta.url);
const { build } = require('esbuild');
const root = resolve(import.meta.dirname, '..');
const temp = resolve(root, 'scripts/.render.cjs');
await build({stdin:{contents:`import React from 'react'; import {renderToString} from 'react-dom/server'; import Home from './src/page'; export const html = renderToString(React.createElement(Home));`,resolveDir:root,loader:'tsx'},bundle:true,platform:'node',format:'cjs',jsx:'automatic',outfile:temp,nodePaths:process.env.NODE_PATH?.split(':')||[],define:{'process.env.NODE_ENV':'"production"'},logLevel:'warning'});
const {html}=require(temp);unlinkSync(temp);
const css=readFileSync(resolve(root,'src/styles.css'),'utf8');
const js=readFileSync(resolve(root,'src/interactions.js'),'utf8');
const version=createHash('sha256').update(css+js+html).digest('hex').slice(0,12);
writeFileSync(resolve(root,'styles.css'),css);writeFileSync(resolve(root,'script.js'),js);
writeFileSync(resolve(root,'index.html'),`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Aakash P — UI/UX & Product Designer</title><meta name="description" content="Aakash P designs responsive products and B2B workflows. Explore professional website work and independent product concepts."><link rel="canonical" href="https://aakash1325.github.io/aakash-portfolio/"><meta property="og:title" content="Aakash P — UI/UX & Product Designer"><meta property="og:description" content="Complex products. Clear experiences. Explore the work and design decisions of Aakash P."><meta property="og:type" content="website"><meta property="og:url" content="https://aakash1325.github.io/aakash-portfolio/"><link rel="icon" href="./favicon.svg"><link rel="preload" href="./fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="./styles.css?v=${version}"><script id="animejs" src="./vendor/anime.umd.min.js" async></script><script src="./script.js?v=${version}" defer></script><noscript><style>.reveal{opacity:1;translate:none}.project-details[hidden]{display:block}</style></noscript></head><body>${html}</body></html>`);
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const projectDir = resolve(root, 'projects');
mkdirSync(projectDir, {recursive:true});
for (const [index, p] of caseStudies.entries()) {
  const next = caseStudies[(index + 1) % caseStudies.length];
  const decisions = p.decisions.map(([heading, body], i) => `<article class="case-decision"><span class="eyebrow">0${i + 1} / DESIGN DECISION</span><h3>${escape(heading)}</h3><p>${escape(body)}</p></article>`).join('');
  writeFileSync(resolve(projectDir, `${p.slug}.html`), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(p.name)} — Aakash P</title><meta name="description" content="${escape(p.desc)}"><link rel="canonical" href="https://aakash1325.github.io/aakash-portfolio/projects/${p.slug}.html"><link rel="icon" href="../favicon.svg"><link rel="stylesheet" href="../styles.css?v=${version}"></head><body class="case-page">
<header class="nav"><a class="brand" href="../index.html#top" aria-label="Aakash home">Aakash P</a><nav aria-label="Main navigation"><a href="../index.html#work">Work</a><a href="../index.html#about">About</a><a href="../index.html#experience">Experience</a></nav><a class="nav-contact" href="../index.html#contact">Let’s talk ↗</a></header>
<main><section class="case-hero wrap"><a class="case-back" href="../index.html#work">← Back to selected work</a><span class="eyebrow">${escape(p.type)} · ${escape(p.kind)}</span><h1>${escape(p.title)}</h1><p class="case-lede">${escape(p.desc)}</p><div class="case-meta"><div><span class="eyebrow">MY ROLE</span><p>${escape(p.role)}</p></div><div><span class="eyebrow">STATUS</span><p>${escape(p.status)}</p></div></div></section>
<section class="case-image wrap" aria-label="${escape(p.name)} project visual"><img src="../project-covers/${escape(p.image)}" width="${p.width}" height="${p.height}" alt="Full ${escape(p.name)} website design preview"></section>
<section class="case-body wrap"><div class="case-statement"><span class="eyebrow">THE CONTEXT</span><h2>What needed<br><em>to change.</em></h2><p>${escape(p.problem)}</p></div><div class="case-statement"><span class="eyebrow">MY RESPONSE</span><h2>How I approached<br><em>the design.</em></h2><p>${escape(p.approach)}</p></div><div class="case-section"><span class="eyebrow">THE THINKING BEHIND THE SCREEN</span><h2>Three decisions<br><em>that shaped it.</em></h2><div class="case-decisions">${decisions}</div></div><div class="case-outcome"><span class="eyebrow">INTENDED VALUE & CURRENT LIMITS</span><h2>What this work<br><em>can show.</em></h2><p>${escape(p.delivery)}</p><p>${escape(p.next)}</p></div><div class="case-next"><span class="eyebrow">NEXT PROJECT</span><a href="./${next.slug}.html">${escape(next.name)} <span aria-hidden="true">↗</span></a></div></section></main>
<footer class="case-footer"><div class="wrap"><a href="../index.html#work">← All work</a><a href="mailto:aakashh.contact@gmail.com">aakashh.contact@gmail.com ↗</a></div></footer></body></html>`);
}
console.log('Static portfolio built:',version);
