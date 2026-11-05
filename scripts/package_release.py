"""Package only the portfolio deliverables, never dependency/runtime directories."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parents[1]
output = root.parent / 'output' / 'HK_Portfolio_Remake.zip'
archive_root = 'HK_Portfolio_Remake/'
top_files = {
    'README.md', 'START_HERE.md', 'package.json', 'package-lock.json',
    'astro.config.mjs', 'tsconfig.json', '.gitignore', '.nvmrc', 'OPEN_PREVIEW.html',
}
directories = {'src', 'public', 'scripts', 'tests', 'docs', 'dist', 'review', '.openai', '.github'}
files = sorted(p for p in root.rglob('*') if p.is_file() and not p.is_symlink()
               and ((len(p.relative_to(root).parts) == 1 and p.name in top_files)
                    or p.relative_to(root).parts[0] in directories)
               and '__pycache__' not in p.parts)
assert files and (root / 'OPEN_PREVIEW.html').exists(), 'Build and export the review first'
manifest = {
    'project': 'Harikrishna Trivedi portfolio',
    'phase': 3,
    'version': '1.0.0',
    'revision': 5,
    'status': 'approved design; prepared for owner publication; not deployed',
    'files': [{'path': p.relative_to(root).as_posix(), 'bytes': p.stat().st_size,
               'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in files],
}
output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(output, 'w', compression=zipfile.ZIP_DEFLATED) as archive:
    for p in files:
        archive.write(p, archive_root + p.relative_to(root).as_posix())
    archive.writestr(archive_root + 'SOURCE_MANIFEST.json', json.dumps(manifest, indent=2) + '\n')
with zipfile.ZipFile(output) as archive:
    assert archive.testzip() is None
    for item in manifest['files']:
        data = archive.read(archive_root + item['path'])
        assert hashlib.sha256(data).hexdigest() == item['sha256']
print(json.dumps({'path': str(output), 'files': len(files) + 1, 'bytes': output.stat().st_size,
                  'sha256': hashlib.sha256(output.read_bytes()).hexdigest()}, indent=2))
