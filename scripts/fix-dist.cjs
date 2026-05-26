const fs = require('fs');
const path = require('path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const client = path.join(root, 'dist', 'client');

function ensureClientDir() {
  if (!fs.existsSync(dist)) return;
  if (fs.existsSync(client)) return;

  fs.mkdirSync(client, { recursive: true });

  for (const name of fs.readdirSync(dist)) {
    const src = path.join(dist, name);
    const dest = path.join(client, name);
    if (src === client) continue;
    try {
      fs.renameSync(src, dest);
    } catch (err) {
      const stat = fs.statSync(src);
      if (stat.isDirectory()) {
        copyDir(src, dest);
        removeDir(src);
      } else {
        fs.copyFileSync(src, dest);
        fs.unlinkSync(src);
      }
    }
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function removeDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) removeDir(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

try {
  ensureClientDir();
  console.log('fix-dist: ensured dist/client exists');
} catch (err) {
  console.error('fix-dist: failed', err);
  process.exitCode = 1;
}
