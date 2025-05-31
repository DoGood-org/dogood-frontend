// import chokidar from 'chokidar';
// import { spawn } from 'child_process';

// console.log('👀 Watching for component changes in multiple directories...');

// // Функція запуску Barrelsby з конкретним конфігом, повертає Promise
// function runBarrelsby(configPath) {
//   return new Promise((resolve, reject) => {
//     console.log(`🔄 Running barrelsby with config ${configPath}...`);
//     const process = spawn(
//       'npx',
//       ['barrelsby', '--config', configPath, '--singleQuotes'],
//       {
//         stdio: 'inherit',
//         shell: true,
//       }
//     );

//     process.on('close', (code) => {
//       if (code === 0) {
//         console.log(`✅ Barrels generated using ${configPath}`);
//         resolve();
//       } else {
//         console.error(
//           `❌ Barrelsby failed with code ${code} using ${configPath}`
//         );
//         reject(new Error(`Barrelsby failed with code ${code}`));
//       }
//     });
//   });
// }

// async function main() {
//   try {
//     // 1. Одноразово генеруємо barrel-файли на старті
//     await runBarrelsby('barrelsby.json');

//     // 2. Запускаємо watcher для першої директорії
//     const watcher1 = chokidar.watch('src/components/**/*.{ts,tsx}', {
//       ignored: /icons|index\.ts$/, // ігноруємо згенеровані індекси
//       ignoreInitial: true,
//     });
//     watcher1.on('add', () => runBarrelsby('barrelsby.json'));
//     watcher1.on('change', () => runBarrelsby('barrelsby.json'));
//     watcher1.on('unlink', () => runBarrelsby('barrelsby.json'));
//   } catch (error) {
//     console.error('Error during barrelsby initial run:', error);
//     process.exit(1);
//   }
// }

// main();

import chokidar from 'chokidar';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('👀 Watching for component changes in multiple directories...');

// Абсолютний шлях до кореня проєкту
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function runBarrelsby(configPath) {
  return new Promise((resolve, reject) => {
    const fullConfigPath = path.join(rootDir, configPath);
    console.log(`🔄 Running barrelsby with config ${fullConfigPath}...`);
    const process = spawn(
      'npx',
      ['barrelsby', '--config', fullConfigPath, '--singleQuotes'],
      {
        stdio: 'inherit',
        shell: true,
      }
    );

    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Barrels generated using ${configPath}`);
        resolve();
      } else {
        console.error(
          `❌ Barrelsby failed with code ${code} using ${configPath}`
        );
        reject(new Error(`Barrelsby failed with code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    await runBarrelsby('barrelsby.json');

    const componentsPath = path.join(rootDir, 'src/components/**/*.{ts,tsx}');
    const watcher = chokidar.watch(componentsPath, {
      ignored: /icons|index\.ts$/,
      ignoreInitial: true,
    });

    watcher.on('add', () => runBarrelsby('barrelsby.json'));
    watcher.on('change', () => runBarrelsby('barrelsby.json'));
    watcher.on('unlink', () => runBarrelsby('barrelsby.json'));
  } catch (error) {
    console.error('Error during barrelsby initial run:', error);
    process.exit(1);
  }
}

main();
