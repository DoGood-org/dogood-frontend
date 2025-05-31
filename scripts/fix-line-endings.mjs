import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Отримуємо абсолютний шлях до кореня проєкту
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..'); // вихід із scripts/

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

walk(rootDir);
console.log('✅ Line endings fixed to LF');
