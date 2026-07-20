const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const packagePath = path.join(rootDir, 'package.json');
const outputDir = path.join(rootDir, 'docs', '_data');
const outputPath = path.join(outputDir, 'package.json');

const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const docsPackageData = {
  name: packageJson.name,
  version: packageJson.version
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(docsPackageData, null, 2)}\n`);

console.log(`Synced docs package data: v${docsPackageData.version}`);
