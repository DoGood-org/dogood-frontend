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
