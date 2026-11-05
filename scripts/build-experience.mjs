import { build } from 'esbuild';
await build({
  entryPoints: ['src/scripts/experience.js'], outfile: 'public/scripts/experience.bundle.js',
  bundle: true, format: 'iife', target: ['es2022'], minify: true,
  legalComments: 'eof', sourcemap: false,
});
console.log('Bundled smooth scrolling locally. Sky and typography use native HTML/CSS.');
