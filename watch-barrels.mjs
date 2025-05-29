import chokidar from 'chokidar';
import { spawn } from 'child_process';

console.log('👀 Watching for component changes in multiple directories...');

// Функція запуску Barrelsby з конкретним конфігом, повертає Promise
function runBarrelsby(configPath) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 Running barrelsby with config ${configPath}...`);
    const process = spawn('npx', ['barrelsby', '--config', configPath], {
      stdio: 'inherit',
      shell: true,
    });

    process.on('close', code => {
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
    // 1. Одноразово генеруємо barrel-файли на старті
    await runBarrelsby('barrelsby.json');
    // await runBarrelsby("barrelsby.ui.json");

    // 2. Запускаємо watcher для першої директорії
    const watcher1 = chokidar.watch('src/components/**/*.{ts,tsx}', {
      ignored: /icons|index\.ts$/, // ігноруємо згенеровані індекси
      ignoreInitial: true,
    });
    watcher1.on('add', () => runBarrelsby('barrelsby.json'));
    watcher1.on('change', () => runBarrelsby('barrelsby.json'));
    watcher1.on('unlink', () => runBarrelsby('barrelsby.json'));

    // 3. Запускаємо watcher для другої директорії
    // const watcher2 = chokidar.watch("src/components/ui/**/*.{ts,tsx}", {
    //   ignored: /index\.ts$/,
    //   ignoreInitial: true,
    // });
    // watcher2.on("add", () => runBarrelsby("barrelsby.ui.json"));
    // watcher2.on("change", () => runBarrelsby("barrelsby.ui.json"));
    // watcher2.on("unlink", () => runBarrelsby("barrelsby.ui.json"));
  } catch (error) {
    console.error('Error during barrelsby initial run:', error);
    process.exit(1);
  }
}

main();
