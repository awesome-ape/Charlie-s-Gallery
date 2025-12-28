import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const IMAGE_COUNT = process.env.SEED_PHOTO_NUM || 75;
const IMAGE_DIR = path.join(__dirname, '..', 'images');

if(!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}
async function downloadImage(index) {
    const url = `https://picsum.photos/seed/${index}/800/600`;
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    const filePath = path.join(IMAGE_DIR, `image_${index}.jpg`);
    fs.writeFileSync(filePath,Buffer.from(buffer))
    console.log(`Downloaded image ${index}.jpg`);
}

async function downloadImages() {
    for (let i= 1; i <= IMAGE_COUNT; i++) {
        await downloadImage(i);
    }
    console.log('All images downloaded.');
}
downloadImages().catch(console.error);