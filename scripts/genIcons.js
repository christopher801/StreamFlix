// genIcons.js (vèsyon ES modules)
// Kouri: node genIcons.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

// Pou __dirname nan ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ikon sizes
const sizes = [72, 96, 128, 144, 152, 192, 256, 384, 512];
const faviconSizes = [16, 32, 96];

// Koulè StreamFlix
const colors = {
  background: '#0f0f0f',
  accent: '#e50914',
  accentLight: '#ff0a1a',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  border: '#333333'
};

// Fonksyon pou kreye yon ikon
function createIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, size, size);
  
  // Gradient border
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.accent);
  gradient.addColorStop(1, colors.accentLight);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(2, size * 0.03);
  ctx.strokeRect(size * 0.08, size * 0.08, size * 0.84, size * 0.84);
  
  // Inner background with glass effect
  ctx.fillStyle = 'rgba(26, 26, 26, 0.5)';
  ctx.fillRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);
  
  // TV Icon
  ctx.fillStyle = colors.text;
  ctx.strokeStyle = colors.text;
  ctx.lineWidth = Math.max(1, size * 0.03);
  
  const tvWidth = size * 0.55;
  const tvHeight = size * 0.4;
  const tvX = (size - tvWidth) / 2;
  const tvY = (size - tvHeight) / 2 - size * 0.05;
  
  // TV Body
  ctx.fillRect(tvX, tvY, tvWidth, tvHeight);
  
  // TV Screen
  ctx.fillStyle = colors.background;
  ctx.fillRect(tvX + size * 0.05, tvY + size * 0.05, tvWidth - size * 0.1, tvHeight - size * 0.12);
  
  // TV Screen shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(tvX + size * 0.05, tvY + size * 0.05, tvWidth - size * 0.1, size * 0.05);
  
  // TV Stand
  ctx.fillStyle = colors.text;
  const standWidth = size * 0.2;
  const standHeight = size * 0.06;
  const standX = (size - standWidth) / 2;
  const standY = tvY + tvHeight;
  ctx.fillRect(standX, standY, standWidth, standHeight);
  
  // TV Legs
  const legWidth = size * 0.05;
  const legHeight = size * 0.08;
  const legY = standY + standHeight;
  ctx.fillRect(standX - legWidth, legY, legWidth, legHeight);
  ctx.fillRect(standX + standWidth, legY, legWidth, legHeight);
  
  // Play Button
  ctx.fillStyle = colors.accent;
  const playSize = size * 0.12;
  const playX = (size - playSize) / 2;
  const playY = (size - playSize) / 2 + size * 0.08;
  
  ctx.beginPath();
  ctx.moveTo(playX + playSize * 0.3, playY + playSize * 0.2);
  ctx.lineTo(playX + playSize * 0.3, playY + playSize * 0.8);
  ctx.lineTo(playX + playSize * 0.75, playY + playSize * 0.5);
  ctx.fill();
  
  // StreamFlix Text SF
  ctx.font = `Bold ${Math.max(12, size * 0.08)}px "Segoe UI", "Helvetica Neue", Arial`;
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = size * 0.02;
  ctx.fillText('SF', size / 2, tvY - size * 0.03);
  ctx.shadowColor = 'transparent';
  
  // Gradient overlay for premium look
  const gradientOverlay = ctx.createLinearGradient(0, 0, size, size);
  gradientOverlay.addColorStop(0, 'rgba(229, 9, 20, 0.1)');
  gradientOverlay.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradientOverlay;
  ctx.fillRect(0, 0, size, size);
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✓ Created ${path.basename(outputPath)} (${size}x${size})`);
}

// Favicon
function createFavicon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, size, size);
  
  // Gradient circle
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.accent);
  gradient.addColorStop(1, colors.accentLight);
  ctx.fillStyle = gradient;
  
  const circleMargin = size * 0.15;
  const circleSize = size - (circleMargin * 2);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, circleSize / 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner circle
  ctx.fillStyle = colors.background;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, (circleSize / 2) - (size * 0.05), 0, Math.PI * 2);
  ctx.fill();
  
  // Letter S
  ctx.fillStyle = gradient;
  ctx.font = `Bold ${size * 0.55}px "Segoe UI", "Helvetica Neue", Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', size / 2, size / 2);
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✓ Created ${path.basename(outputPath)} (${size}x${size})`);
}

// Apple Touch Icon
function createAppleTouchIcon() {
  const size = 180;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background with gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.accent);
  gradient.addColorStop(1, colors.accentLight);
  ctx.fillStyle = gradient;
  
  // Rounded corners
  const radius = size * 0.2;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  
  // White border
  ctx.strokeStyle = colors.text;
  ctx.lineWidth = size * 0.02;
  ctx.beginPath();
  ctx.moveTo(radius * 0.8, 0);
  ctx.lineTo(size - radius * 0.8, 0);
  ctx.quadraticCurveTo(size, 0, size, radius * 0.8);
  ctx.lineTo(size, size - radius * 0.8);
  ctx.quadraticCurveTo(size, size, size - radius * 0.8, size);
  ctx.lineTo(radius * 0.8, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius * 0.8);
  ctx.lineTo(0, radius * 0.8);
  ctx.quadraticCurveTo(0, 0, radius * 0.8, 0);
  ctx.stroke();
  
  // Text SF
  ctx.fillStyle = colors.text;
  ctx.font = `Bold ${size * 0.25}px "Segoe UI", "Helvetica Neue", Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SF', size / 2, size / 2);
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'public/apple-touch-icon.png'), buffer);
  console.log('  ✓ Created apple-touch-icon.png (180x180)');
}

// Maskable Icon
function createMaskableIcon() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, size, size);
  
  // Mask shape (rounded square)
  const margin = size * 0.1;
  const maskSize = size - (margin * 2);
  const radius = size * 0.15;
  
  ctx.beginPath();
  ctx.moveTo(margin + radius, margin);
  ctx.lineTo(margin + maskSize - radius, margin);
  ctx.quadraticCurveTo(margin + maskSize, margin, margin + maskSize, margin + radius);
  ctx.lineTo(margin + maskSize, margin + maskSize - radius);
  ctx.quadraticCurveTo(margin + maskSize, margin + maskSize, margin + maskSize - radius, margin + maskSize);
  ctx.lineTo(margin + radius, margin + maskSize);
  ctx.quadraticCurveTo(margin, margin + maskSize, margin, margin + maskSize - radius);
  ctx.lineTo(margin, margin + radius);
  ctx.quadraticCurveTo(margin, margin, margin + radius, margin);
  ctx.closePath();
  
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.accent);
  gradient.addColorStop(1, colors.accentLight);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Play button
  ctx.fillStyle = colors.text;
  const playSize = size * 0.25;
  const playX = (size - playSize) / 2;
  const playY = (size - playSize) / 2;
  
  ctx.beginPath();
  ctx.moveTo(playX + playSize * 0.35, playY + playSize * 0.25);
  ctx.lineTo(playX + playSize * 0.35, playY + playSize * 0.75);
  ctx.lineTo(playX + playSize * 0.75, playY + playSize * 0.5);
  ctx.fill();
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'public/mask-icon.png'), buffer);
  console.log('  ✓ Created mask-icon.png (512x512)');
  
  // Also create SVG version
  const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="100" fill="${colors.accent}"/>
    <polygon points="210,180 210,332 330,256" fill="${colors.text}"/>
  </svg>`;
  fs.writeFileSync(path.join(__dirname, 'public/mask-icon.svg'), svgContent);
  console.log('  ✓ Created mask-icon.svg');
}

// Progress indicator
function showProgress(current, total, message) {
  const percent = Math.round((current / total) * 100);
  const bars = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5));
  process.stdout.write(`\r  [${bars}] ${percent}% - ${message}`);
  if (current === total) console.log('');
}

// Main function
async function generateIcons() {
  console.log('\n🎨 StreamFlix Icon Generator\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Create directories
  const iconsDir = path.join(__dirname, 'public/icons');
  const screenshotsDir = path.join(__dirname, 'public/screenshots');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
    console.log('📁 Created /public/icons directory\n');
  }
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log('📁 Created /public/screenshots directory\n');
  }
  
  // Generate PWA icons
  console.log('📱 Generating PWA Icons...\n');
  let generated = 0;
  const total = sizes.length;
  
  for (const size of sizes) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    createIcon(size, outputPath);
    generated++;
    showProgress(generated, total, `Generating ${size}x${size} icon`);
  }
  
  // Generate favicons
  console.log('\n\n🔖 Generating Favicons...\n');
  for (const size of faviconSizes) {
    const outputPath = path.join(__dirname, `public/favicon-${size}x${size}.png`);
    createFavicon(size, outputPath);
  }
  
  // Generate special icons
  console.log('\n✨ Generating Special Icons...\n');
  createAppleTouchIcon();
  createMaskableIcon();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✅ All icons generated successfully!\n');
  
  // Summary
  console.log('📊 Summary:');
  console.log(`  • PWA Icons: ${sizes.length} files`);
  console.log(`  • Favicons: ${faviconSizes.length} files`);
  console.log(`  • Special Icons: 3 files`);
  console.log(`  • Total: ${sizes.length + faviconSizes.length + 3} files\n`);
  
  console.log('📁 File locations:');
  console.log('  • /public/icons/icon-*.png');
  console.log('  • /public/favicon-*.png');
  console.log('  • /public/apple-touch-icon.png');
  console.log('  • /public/mask-icon.png');
  console.log('  • /public/mask-icon.svg\n');
}

// Run
generateIcons().catch(err => {
  console.error('\n❌ Error generating icons:', err.message);
  console.log('\n💡 Make sure you have canvas installed: npm install canvas --save-dev\n');
  process.exit(1);
});