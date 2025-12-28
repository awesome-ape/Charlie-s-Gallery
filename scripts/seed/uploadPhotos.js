import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";
import { fileURLToPath } from "url";
import { login } from "./login.js";

const IMAGE_COUNT = process.env.SEED_PHOTO_NUM || 75;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const API_URL = process.env.BASE_URL || 'http://localhost:3000';

async function run(){
    const token = await login('admin','admin');
    console.log('Logged in as admin, token:',token);
    for (let i= 1; i <= IMAGE_COUNT; i++) {
        const filePath = path.join(__dirname, '..', 'images', `image_${i}.jpg`);
        const formData = new FormData();
        formData.append('photo', fs.createReadStream(filePath));
        formData.append('title', `Sample Photo ${i}`);
        formData.append('tags', 'sample,seed');
        const res = await fetch(`${API_URL}/photos/upload`, {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...formData.getHeaders()
            },
            body: formData
        }
        );
        if (res.ok) {
            const data = await res.json();
            console.log(`Uploaded image_${i}.jpg successfully:`, data);
        } else {
            console.error(`Failed to upload image_${i}.jpg:`, await res.text());
        }
    }
    console.log('Photo upload seeding completed.');
}
run().catch(console.error);