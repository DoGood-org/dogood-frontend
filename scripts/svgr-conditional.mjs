import fs from 'fs/promises';
import path from 'path';
import { transform } from '@svgr/core';
import { fileURLToPath } from 'url';
import jsx from '@svgr/plugin-jsx';
import svgo from '@svgr/plugin-svgo';
import prettier from '@svgr/plugin-prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateModule = await import('./svgr-template.mjs');
const template = templateModule.default;

const INPUT_DIR = path.resolve(__dirname, '..', 'src/assets/svg');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src/components/icons');
const INDEX_FILE = path.join(OUTPUT_DIR, 'index.ts');

const options = {
  icon: true,
  typescript: true,
  jsxRuntime: 'automatic',
  template,
  plugins: [svgo, jsx, prettier],
};

function toPascalCase(filename) {
  const name = path.basename(filename, '.svg');
  return name.replace(/(^\w|[_-]\w)/g, (match) =>
    match.replace(/[_-]/, '').toUpperCase()
  );
}

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const processIcons = async () => {
  const files = await fs.readdir(INPUT_DIR);
  await ensureDir(OUTPUT_DIR);

  const exportedComponents = [];

  for (const file of files) {
    if (!file.endsWith('.svg')) continue;

    const svgPath = path.join(INPUT_DIR, file);
    const componentName = toPascalCase(file);
    const outPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

    try {
      const [svgContent, existing] = await Promise.all([
        fs.readFile(svgPath, 'utf8'),
        fs.readFile(outPath, 'utf8').catch(() => null),
      ]);

      if (existing) {
        // console.log(`🟡 Пропущено: ${componentName} (вже існує)`);
      } else {
        const jsxCode = await transform(svgContent, options, {
          componentName,
        });
        await fs.writeFile(outPath, jsxCode, 'utf8');
        console.log(`✅ Створено: ${componentName}`);
      }

      exportedComponents.push(
        `export { default as ${componentName} } from './${componentName}';`
      );
    } catch (e) {
      console.error(`❌ Помилка при обробці ${file}:`, e.message);
    }
  }

  // Генеруємо index.ts з експортами
  const indexContent = exportedComponents.join('\n') + '\n';
  await fs.writeFile(INDEX_FILE, indexContent, 'utf8');
  console.log(
    `📦 Оновлено: index.ts (${exportedComponents.length} компонентів)`
  );
};

processIcons();
