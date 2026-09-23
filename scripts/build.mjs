import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
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
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Aakash P — UI/UX & Product Designer</title><meta name="description" content="UI/UX and product designer in Coimbatore. Figma expertise, responsive websites and thoughtful product interfaces. Open to freelance design and website projects."><link rel="canonical" href="https://aakash1325.github.io/aakash-portfolio/"><meta property="og:title" content="Aakash P — UI/UX & Product Designer"><meta property="og:description" content="Thoughtful design. Made for people. Explore selected work and get in touch for freelance projects."><meta property="og:type" content="website"><meta property="og:url" content="https://aakash1325.github.io/aakash-portfolio/"><link rel="icon" href="./favicon.svg"><link rel="preload" href="./fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="./styles.css?v=${version}"><script src="./script.js?v=${version}" defer></script><noscript><style>.reveal{opacity:1;translate:none}.project-details[hidden]{display:block}</style></noscript></head><body>${html}</body></html>`);
console.log('Static portfolio built:',version);
