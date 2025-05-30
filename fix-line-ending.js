import fs from 'fs';
import path from 'path';

const exts = ['.js', '.ts', '.tsx', '.json', '.md'];

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (exts.includes(path.extname(fullPath))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const newContent = content.replace(/\r\n/g, '\n');
      fs.writeFileSync(fullPath, newContent, 'utf8');
    }
  });
}

walk('./');
console.log('✅ Line endings fixed to LF');
