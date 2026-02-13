import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Read the zip filename from album-config.json
const configPath = path.join(rootDir, 'public', 'album-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const zipName = config.downloadZip;

if (!zipName) {
  console.log('No downloadZip configured in album-config.json, skipping zip creation.');
  process.exit(0);
}

console.log('Creating album zip file...');

const zip = new AdmZip();

// Add images directory
const imagesDir = path.join(rootDir, 'images');
if (fs.existsSync(imagesDir)) {
  console.log('Adding images...');
  zip.addLocalFolder(imagesDir, 'images');
}

// Add songs directory from public
const songsDir = path.join(rootDir, 'public', 'songs');
if (fs.existsSync(songsDir)) {
  console.log('Adding songs...');
  zip.addLocalFolder(songsDir, 'songs');
}

const outputPath = path.join(rootDir, 'public', zipName);
zip.writeZip(outputPath);

console.log(`Album zip created at: ${outputPath}`);
console.log(`  File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
