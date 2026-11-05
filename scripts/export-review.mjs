import { readFile, writeFile, mkdir, cp, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

// A portable delivery format, not a replacement for browser QA. Each HTML page
// embeds its actual built CSS, scripts and fonts. No local server is required.
const dist = path.resolve('dist');
const review = path.resolve('review');
await rm(review, { recursive: true, force: true });
await mkdir(review, { recursive: true });
await cp(path.join(dist, 'Harikrishna_Trivedi_Resume.pdf'), path.join(review, 'Harikrishna_Trivedi_Resume.pdf'));
await cp(path.join(dist, 'media'), path.join(review, 'media'), { recursive: true });

const mime = { '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
async function dataUri(file) {
  const bytes = await readFile(file);
  return `data:${mime[path.extname(file)] || 'application/octet-stream'};base64,${bytes.toString('base64')}`;
}
async function cssEmbedded(file) {
  let css = await readFile(file, 'utf8');
  const matches = [...css.matchAll(/url\(([^)]+)\)/g)];
  for (const match of matches) {
    const url = match[1].replace(/^['"]|['"]$/g, '');
    if (/^(data:|https?:)/.test(url)) continue;
    const target = url.startsWith('/') ? path.join(dist, url) : path.resolve(path.dirname(file), url);
    css = css.replace(match[0], `url("${await dataUri(target)}")`);
  }
  return css;
}
async function htmlFiles(dir) {
  const output = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await htmlFiles(full));
    else if (entry.name.endsWith('.html')) output.push(full);
  }
  return output;
}
for (const input of await htmlFiles(dist)) {
  const rel = path.relative(dist, input);
  const output = path.join(review, rel);
  let html = await readFile(input, 'utf8');
  for (const match of [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]) {
    const href = match[0].match(/href="([^"]+)"/)?.[1];
    if (!href) throw new Error('Stylesheet without href');
    const css = await cssEmbedded(path.join(dist, href));
    html = html.replace(match[0], () => `<style>${css}</style>`);
  }
  for (const match of [...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)]) {
    const js = await readFile(path.join(dist, match[1]), 'utf8');
    const safeScript = js.replace(/<\/script/gi, tag => '<\\/' + tag.slice(2));
    html = html.replace(match[0], () => `<script>${safeScript}</script>`);
  }
  html = html.replace(/(href|src|poster)="(\/[^"#]*)(#[^"]*)?"/g, (_, attribute, url, fragment = '') => {
    const resource = url.endsWith('/') ? `${url}index.html` : url;
    const target = path.join(review, resource);
    let link = path.relative(path.dirname(output), target).replaceAll(path.sep, '/');
    return `${attribute}="${link || 'index.html'}${fragment}"`;
  });
  // Favicon can be embedded too. Canonical and social metadata stay unchanged.
  html = html.replace(/<link\b[^>]*rel="icon"[^>]*>/g, '');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}
const home = await readFile(path.join(review, 'index.html'), 'utf8');
const portable = home.replace(/(href|src|poster)="([^"#][^"]*)"/g, (match, attribute, href) => {
  if (/^(https?:|mailto:|data:)/.test(href)) return match;
  const [url, fragment] = href.split('#');
  const target = path.resolve(review, url);
  const rel = target === path.join(review, 'index.html') ? 'OPEN_PREVIEW.html' : path.relative(process.cwd(), target).replaceAll(path.sep, '/');
  return `${attribute}="${rel}${fragment ? `#${fragment}` : ''}"`;
});
await writeFile('OPEN_PREVIEW.html', portable);
console.log('Portable review exported: OPEN_PREVIEW.html and both project case studies');
