import { readFileSync, existsSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';

function scripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
}
function visibleText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
const checks = [
  ['dist/index.html', 'review/index.html'],
  ['dist/index.html', 'OPEN_PREVIEW.html'],
  ['dist/work/carecontext/index.html', 'review/work/carecontext/index.html'],
  ['dist/work/patchpilot/index.html', 'review/work/patchpilot/index.html'],
  ['dist/404.html', 'review/404.html'],
];
let scriptCount = 0, fileLinks = 0;
for (const [source, target] of checks) {
  const expected = readFileSync(source, 'utf8');
  const html = readFileSync(target, 'utf8');
  assert.equal(visibleText(html), visibleText(expected), `${target}: exported script or style leaked into visible content`);
  const inlineScripts = scripts(html);
  const expectedScripts = scripts(expected);
  assert.equal(inlineScripts.length, expectedScripts.length, `${target}: script boundaries changed`);
  for (let i = 0; i < inlineScripts.length; i++) {
    const [, attrs, code] = inlineScripts[i];
    const sourcePath = expectedScripts[i][1].match(/\bsrc="([^"]+)"/)?.[1];
    const sourceCode = sourcePath ? readFileSync(path.join('dist', sourcePath), 'utf8') : expectedScripts[i][2];
    const safeSource = sourceCode.replace(/<\/script/gi, tag => '<\\/' + tag.slice(2));
    assert.equal(code, safeSource, `${target}: inline script no longer matches its source`);
    assert.ok(!/\bsrc\s*=/.test(attrs), `${target}: external script remains`);
    new Script(code, { filename: `${target}:inline-${scriptCount}` });
    scriptCount++;
  }
  assert.ok(!/<link\b[^>]*rel="stylesheet"/.test(html), 'Styles must be embedded');
  assert.ok(html.includes('data:font/woff2;base64,'), 'Fonts must be embedded');
  // Check file references outside inline assets. Their contents are validated above.
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  for (const [, url] of markup.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|#)/.test(url)) continue;
    const file = url.split('#')[0];
    assert.ok(existsSync(path.resolve(path.dirname(target), file)), `${target}: missing ${file}`);
    fileLinks++;
  }
}
console.log(`Portable preview verified: ${checks.length} pages, ${scriptCount} parseable inline scripts, ${fileLinks} local links/media, and no code leaked into page text.`);
