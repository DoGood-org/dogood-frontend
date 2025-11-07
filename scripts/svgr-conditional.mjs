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
  await ensureDir(OUTPUT_DIR);

  const svgFiles = await fs.readdir(INPUT_DIR).catch(() => []);

  const svgMap = new Map(
    svgFiles.filter((f) => f.endsWith('.svg')).map((f) => [toPascalCase(f), f])
  );

  const exportedComponents = [];

  // 1️⃣ Генеруємо нові іконки з assets/svg
  for (const [componentName, svgFile] of svgMap.entries()) {
    const svgPath = path.join(INPUT_DIR, svgFile);
    const outPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

    const svgContent = await fs.readFile(svgPath, 'utf8');
    const existing = await fs.readFile(outPath, 'utf8').catch(() => null);

    // якщо існує, але не має default export — пропускаємо
    if (existing && !existing.includes('export default')) {
      console.log(`⚙️ Пропущено іменний експорт: ${componentName}`);
      continue;
    }

    // якщо існує з дефолтним експортом — не чіпаємо
    if (existing) continue;

    try {
      const jsxCode = await transform(svgContent, options, { componentName });
      await fs.writeFile(outPath, jsxCode, 'utf8');
      console.log(`✅ Створено: ${componentName}`);
    } catch (e) {
      console.error(`❌ Помилка при створенні ${componentName}:`, e.message);
    }
  }

  // 2️⃣ Генеруємо index.ts з усіх актуальних файлів у components/icons
  const icons = await fs.readdir(OUTPUT_DIR);
  for (const file of icons) {
    if (!file.endsWith('.tsx')) continue;

    const outPath = path.join(OUTPUT_DIR, file);
    const content = await fs.readFile(outPath, 'utf8');

    // пропускаємо іменні експорти
    if (!content.includes('export default')) continue;

    const componentName = path.basename(file, '.tsx');
    exportedComponents.push(
      `export { default as ${componentName} } from './${componentName}';`
    );
  }

  const indexContent = exportedComponents.join('\n') + '\n';
  await fs.writeFile(INDEX_FILE, indexContent, 'utf8');
  console.log(
    `📦 Оновлено index.ts (${exportedComponents.length} компонентів)`
  );
};

processIcons();
