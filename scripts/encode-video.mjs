import { spawnSync, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Locate ffmpeg and ffprobe
function findBinary(name) {
  try {
    execSync(`where.exe ${name}`, { stdio: 'pipe' });
    return name;
  } catch {
    // Check known WinGet path
    const localAppData = process.env.LOCALAPPDATA || '';
    const wingetPkg = path.join(
      localAppData,
      'Microsoft/WinGet/Packages/Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-essentials_build/bin',
      `${name}.exe`
    );
    if (fs.existsSync(wingetPkg)) {
      return wingetPkg;
    }
    const wingetLink = path.join(localAppData, 'Microsoft/WinGet/Links', `${name}.exe`);
    if (fs.existsSync(wingetLink)) {
      return wingetLink;
    }
    return name;
  }
}

const ffmpeg = findBinary('ffmpeg');
const ffprobe = findBinary('ffprobe');

console.log(`Using ffmpeg: ${ffmpeg}`);
console.log(`Using ffprobe: ${ffprobe}`);

const rawDir = path.resolve('raw');
const heroDir = path.resolve('public/hero');
const framesDir = path.join(heroDir, 'frames');
const inputVideo = path.join(rawDir, 'walkthrough.mp4');

fs.mkdirSync(heroDir, { recursive: true });
fs.mkdirSync(framesDir, { recursive: true });

// Check if raw/walkthrough.mp4 exists; if not, build temporary placeholder
if (!fs.existsSync(inputVideo)) {
  console.warn('⚠️ raw/walkthrough.mp4 not found! Generating temporary placeholder clip with ffmpeg...');
  fs.mkdirSync(rawDir, { recursive: true });
  // Generate 6 room color clips of 5s each (30s total) labelled PLACEHOLDER 1..6
  const colors = [
    { name: '1: Living Space', color: '#2b2a27' },
    { name: '2: Dining Room', color: '#1f2421' },
    { name: '3: Kitchen', color: '#25282a' },
    { name: '4: Primary Suite', color: '#2a2325' },
    { name: '5: Garden Room', color: '#1e2820' },
    { name: '6: Bath', color: '#1f272b' }
  ];

  const partFiles = [];
  colors.forEach((c, idx) => {
    const partPath = path.join(rawDir, `part_${idx + 1}.mp4`);
    partFiles.push(partPath);
    spawnSync(ffmpeg, [
      '-y',
      '-f', 'lavfi',
      '-i', `color=c=${c.color}:s=1920x1080:d=5:r=30`,
      '-vf', `drawtext=text='PLACEHOLDER ${c.name}':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=(h-text_h)/2`,
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      partPath
    ], { stdio: 'inherit' });
  });

  // Concat parts into raw/walkthrough.mp4
  const listFile = path.join(rawDir, 'parts.txt');
  fs.writeFileSync(listFile, partFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n'));
  spawnSync(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', inputVideo], { stdio: 'inherit' });
  fs.unlinkSync(listFile);
  partFiles.forEach(f => fs.existsSync(f) && fs.unlinkSync(f));
  console.log('✅ Temporary placeholder raw/walkthrough.mp4 created.');
}

// Probe input video details
let duration = 29.57;
let rawWidth = 1920;
let rawHeight = 1080;
try {
  const probeOut = execSync(`"${ffprobe}" -v error -select_streams v:0 -show_entries stream=width,height,duration -of default=noprint_wrappers=1 "${inputVideo}"`, { encoding: 'utf-8' });
  const lines = probeOut.trim().split('\n');
  lines.forEach(line => {
    const [k, v] = line.split('=');
    if (k === 'width') rawWidth = parseInt(v, 10);
    if (k === 'height') rawHeight = parseInt(v, 10);
    if (k === 'duration') duration = parseFloat(v);
  });
  console.log(`Video metadata: ${rawWidth}x${rawHeight}, duration=${duration.toFixed(2)}s`);
} catch (e) {
  console.warn('Could not probe video, using defaults (1920x1080, 29.57s)', e.message);
}

const force = process.argv.includes('--force');

// 1. poster.webp (first frame)
const posterPath = path.join(heroDir, 'poster.webp');
if (force || !fs.existsSync(posterPath)) {
  console.log('\n--- 1/5: Generating poster.webp ---');
  spawnSync(ffmpeg, [
    '-y',
    '-ss', '00:00:00',
    '-i', inputVideo,
    '-vframes', '1',
    '-vf', 'scale=1920:-2',
    '-c:v', 'libwebp',
    '-quality', '85',
    posterPath
  ], { stdio: 'inherit' });
} else {
  console.log('--- 1/5: poster.webp already exists (skipping, pass --force to re-encode) ---');
}

// 2. walkthrough.mp4 (H.264, every frame a keyframe -g 1, CRF 24)
const mp4Path = path.join(heroDir, 'walkthrough.mp4');
if (force || !fs.existsSync(mp4Path)) {
  console.log('\n--- 2/5: Encoding walkthrough.mp4 (Desktop H.264, -g 1) ---');
  spawnSync(ffmpeg, [
    '-y',
    '-i', inputVideo,
    '-vf', 'scale=1920:-2,fps=30',
    '-c:v', 'libx264',
    '-g', '1',
    '-crf', '24',
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    mp4Path
  ], { stdio: 'inherit' });
} else {
  console.log('--- 2/5: walkthrough.mp4 already exists (skipping, pass --force to re-encode) ---');
}

// 3. walkthrough-mobile.mp4 (1080 wide, -g 1, crf 28 to hit 6-10 MB target)
const mobileMp4Path = path.join(heroDir, 'walkthrough-mobile.mp4');
if (force || !fs.existsSync(mobileMp4Path)) {
  console.log('\n--- 3/5: Encoding walkthrough-mobile.mp4 (Mobile 1080w, -g 1) ---');
  spawnSync(ffmpeg, [
    '-y',
    '-i', inputVideo,
    '-vf', 'scale=1080:-2,fps=30',
    '-c:v', 'libx264',
    '-g', '1',
    '-crf', '28',
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    mobileMp4Path
  ], { stdio: 'inherit' });
} else {
  console.log('--- 3/5: walkthrough-mobile.mp4 already exists (skipping, pass --force to re-encode) ---');
}

// 4. walkthrough.webm (VP9, -g 1, -crf 34, -b:v 0, multi-threaded fast pass)
const webmPath = path.join(heroDir, 'walkthrough.webm');
if (force || !fs.existsSync(webmPath) || fs.statSync(webmPath).size < 10000000) {
  console.log('\n--- 4/5: Encoding walkthrough.webm (VP9, -g 1) ---');
  spawnSync(ffmpeg, [
    '-y',
    '-i', inputVideo,
    '-vf', 'scale=1920:-2,fps=30',
    '-c:v', 'libvpx-vp9',
    '-g', '1',
    '-crf', '34',
    '-b:v', '0',
    '-cpu-used', '4',
    '-row-mt', '1',
    '-threads', '0',
    '-an',
    webmPath
  ], { stdio: 'inherit' });
} else {
  console.log('--- 4/5: walkthrough.webm already exists (skipping, pass --force to re-encode) ---');
}

// 5. frames/: WebP sequence at 1280 px wide, quality 70, capped at ~240 frames
console.log('\n--- 5/5: Extracting WebP frame sequence (1280w, capped ~240 frames) ---');
// Clean existing frames
const existingFiles = fs.readdirSync(framesDir);
for (const f of existingFiles) {
  if (f.startsWith('f') && f.endsWith('.webp')) {
    fs.unlinkSync(path.join(framesDir, f));
  }
}

// Calculate target fps to produce ~240 frames across the video duration
const targetFrames = 240;
const frameFps = Math.max(1, (targetFrames / duration));
console.log(`Extracting at ~${frameFps.toFixed(3)} fps over ${duration.toFixed(2)}s to produce ~${targetFrames} frames...`);

spawnSync(ffmpeg, [
  '-y',
  '-i', inputVideo,
  '-vf', `scale=1280:-2,fps=${frameFps.toFixed(4)}`,
  '-c:v', 'libwebp',
  '-quality', '70',
  path.join(framesDir, 'f%04d.webp')
], { stdio: 'inherit' });

// Count actual extracted frames
const frameList = fs.readdirSync(framesDir).filter(f => f.startsWith('f') && f.endsWith('.webp')).sort();
const count = frameList.length;

// Get dimensions of first frame
let frameWidth = 1280;
let frameHeight = 720;
if (count > 0) {
  try {
    const probeFrame = execSync(`"${ffprobe}" -v error -select_streams v:0 -show_entries stream=width,height -of default=noprint_wrappers=1 "${path.join(framesDir, frameList[0])}"`, { encoding: 'utf-8' });
    probeFrame.trim().split('\n').forEach(line => {
      const [k, v] = line.split('=');
      if (k === 'width') frameWidth = parseInt(v, 10);
      if (k === 'height') frameHeight = parseInt(v, 10);
    });
  } catch {}
}

const framesMeta = {
  count,
  fps: Number(frameFps.toFixed(3)),
  width: frameWidth,
  height: frameHeight,
  duration: Number(duration.toFixed(2))
};

fs.writeFileSync(path.join(heroDir, 'frames.json'), JSON.stringify(framesMeta, null, 2));

// Summary Report
console.log('\n=========================================');
console.log('ENCODING SUMMARY & PAYLOAD AUDIT:');
console.log('=========================================');

function formatSize(filePath) {
  if (!fs.existsSync(filePath)) return 'MISSING';
  const bytes = fs.statSync(filePath).size;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB (${bytes.toLocaleString()} bytes)`;
}

function getDirSize(dir) {
  let total = 0;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isFile()) total += fs.statSync(full).size;
  });
  return total;
}

const mp4SizeMB = fs.existsSync(mp4Path) ? fs.statSync(mp4Path).size / (1024 * 1024) : 0;
const mobileMp4SizeMB = fs.existsSync(mobileMp4Path) ? fs.statSync(mobileMp4Path).size / (1024 * 1024) : 0;
const webmSizeMB = fs.existsSync(webmPath) ? fs.statSync(webmPath).size / (1024 * 1024) : 0;
const framesTotalBytes = getDirSize(framesDir);
const framesTotalMB = framesTotalBytes / (1024 * 1024);

console.log(`1. Poster:             ${formatSize(posterPath)}`);
console.log(`2. Desktop MP4:        ${formatSize(mp4Path)}`);
console.log(`3. Mobile MP4:         ${formatSize(mobileMp4Path)}`);
console.log(`4. Desktop WebM:       ${formatSize(webmPath)}`);
console.log(`5. Frames directory:   ${framesTotalMB.toFixed(2)} MB (${count} frames, ${framesMeta.width}x${framesMeta.height})`);

if (mp4SizeMB > 30) {
  console.warn(`⚠️ WARNING: Desktop MP4 is ${mp4SizeMB.toFixed(2)} MB, which is over 30 MB limit.`);
} else {
  console.log(`✅ Desktop MP4 is within budget (${mp4SizeMB.toFixed(2)} MB <= 30 MB).`);
}

if (mobileMp4SizeMB > 12) {
  console.warn(`⚠️ WARNING: Mobile MP4 is ${mobileMp4SizeMB.toFixed(2)} MB, which is over 12 MB limit.`);
} else {
  console.log(`✅ Mobile MP4 is within budget (${mobileMp4SizeMB.toFixed(2)} MB <= 12 MB).`);
}

if (framesTotalMB > 12) {
  console.warn(`⚠️ WARNING: Frames sequence is ${framesTotalMB.toFixed(2)} MB, which is over 12 MB limit.`);
} else {
  console.log(`✅ Frames sequence is within budget (${framesTotalMB.toFixed(2)} MB <= 12 MB).`);
}
console.log('=========================================\n');
