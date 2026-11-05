import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const dist = path.resolve('dist');
function walk(dir) { return readdirSync(dir).flatMap(n => { const p = path.join(dir,n); return statSync(p).isDirectory() ? walk(p) : [p]; }); }
const pages = walk(dist).filter(p => p.endsWith('.html'));
assert.equal(pages.length, 4, 'Homepage, both case studies and the 404 page must build');
let localReferences = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: one h1`);
  assert.match(html, /<html[^>]*lang="en"/, 'Language is declared');
  const notFound = path.basename(page) === '404.html';
  assert.ok(html.includes(`name="robots" content="${notFound ? 'noindex' : 'index'}, follow"`), 'Indexing matches the published page type');
  const route = notFound ? '/404.html' : '/' + path.relative(dist, page).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  assert.ok(html.includes(`rel="canonical" href="https://hk0922.github.io${route}"`), `${page}: correct canonical URL`);
  assert.match(html, /data-theme-choice="day"/, 'Day control exists');
  assert.match(html, /data-theme-choice="night"/, 'Night control exists');
  assert.match(html, /data-motion-toggle/, 'Motion control exists');
  assert.match(html, /Skip to content/, 'Skip link exists');
  assert.match(html, /class="sky-background"/, 'Every page shares the sky');
  assert.match(html, /class="sky-sun"/, 'Every page includes the edge sun');
  assert.match(html, /scripts\/loading\.js/, 'Every page includes the finite loading animation');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
  for (const match of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(href)) continue;
    const [url, fragment] = href.split('#');
    const target = url ? (url.startsWith('/') ? path.join(dist,url) : path.resolve(path.dirname(page),url)) : page;
    const file = target.endsWith(path.sep) || (existsSync(target) && statSync(target).isDirectory()) ? path.join(target, 'index.html') : target;
    assert.ok(existsSync(file), `${page}: missing local target ${href}`);
    if (fragment) assert.ok([...readFileSync(file,'utf8').matchAll(/\bid="([^"]+)"/g)].some(m => m[1] === fragment), `${page}: missing anchor ${href}`);
    localReferences++;
  }
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /rel="[^"]*noopener/, 'External new-tab links isolate the opener');
}
const css = walk(path.join(dist, '_astro')).filter(p => p.endsWith('.css')).map(p => readFileSync(p,'utf8')).join('\n');
assert.match(css, /prefers-reduced-motion/, 'Reduced motion CSS is present');
for (const m of css.matchAll(/url\(([^)]+)\)/g)) {
  const url = m[1].replace(/^['"]|['"]$/g,'');
  if (!url.startsWith('data:')) assert.ok(existsSync(path.join(dist, url)), `Missing CSS asset ${url}`);
}
const fontFiles = walk(dist).filter(p => p.endsWith('.woff2'));
assert.equal(fontFiles.length, 2, 'Only two self-hosted Latin variable fonts');
assert.ok(!/https?:\/\/(?:fonts\.googleapis|fonts\.gstatic)/.test(css), 'No remote font dependency');
console.log(`Build checks passed: ${pages.length} pages, ${localReferences} local references, ${fontFiles.length} local fonts.`);
const home = readFileSync(path.join(dist, 'index.html'), 'utf8');
assert.match(home, /London College of Music/);
assert.match(home, /15 years/);
assert.match(home, /<video[^>]*controls[^>]*playsinline[^>]*preload="none"/);
assert.ok(!/<video[^>]*\bautoplay\b/.test(home), 'Performance must never autoplay');
assert.match(home, /media\/harikrishna-keyboard\.mp4/);
assert.match(home, /scripts\/experience\.bundle\.js/);
assert.ok(!/sculpture|data-world/.test(home), 'The 3D object must not remain');
assert.ok(home.indexOf('id="about"') < home.indexOf('id="work"'), 'Journey appears before projects');
assert.ok(home.indexOf('id="work"') < home.indexOf('id="music"'), 'Music retains its own section after work');
assert.match(home, /href="\/work\/patchpilot\/"/);
assert.match(home, /href="https:\/\/github.com\/HK0922\/patchpilot-ai"/);
assert.match(readFileSync(path.join(dist, 'work/patchpilot/index.html'),'utf8'), /id="repair-loop"/);
assert.deepEqual(readFileSync(path.join(dist, 'Harikrishna_Trivedi_Resume.pdf')), readFileSync('public/Harikrishna_Trivedi_Resume.pdf'), 'The supplied résumé survives the build unchanged');
assert.ok(!/data-work-filter/.test(home), 'Removed segmented project filters must not remain');
console.log('Requested content checks passed: global sky, quote, journey order, both case studies, résumé and local music.');
const sitemap = readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls.sort(), ['https://hk0922.github.io/','https://hk0922.github.io/work/carecontext/','https://hk0922.github.io/work/patchpilot/'].sort());
assert.match(readFileSync(path.join(dist, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/hk0922.github.io\/sitemap.xml/);
assert.ok(!existsSync(path.join(dist, 'OPEN_PREVIEW.html')), 'Portable entry is not published into the production site');
console.log('Publishing checks passed: canonical URLs, indexable content, excluded 404 and sitemap.');
