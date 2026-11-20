const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const platformMap = {
  win32: { x64: 'win32-x64-msvc', arm64: 'win32-arm64-msvc' },
  linux: { x64: 'linux-x64-gnu', arm64: 'linux-arm64-gnu' },
  darwin: { x64: 'darwin-x64', arm64: 'darwin-arm64' },
};

const platformKey = platformMap[process.platform]?.[process.arch];
if (!platformKey) {
  process.exit(0);
}

const sourcePackage = `lightningcss-${platformKey}`;
const sourceFile = path.join(rootDir, 'node_modules', sourcePackage, `lightningcss.${platformKey}.node`);
const targetFile = path.join(rootDir, 'node_modules', 'lightningcss', `lightningcss.${platformKey}.node`);

if (!fs.existsSync(sourceFile) || fs.existsSync(targetFile)) {
  process.exit(0);
}

fs.copyFileSync(sourceFile, targetFile);
