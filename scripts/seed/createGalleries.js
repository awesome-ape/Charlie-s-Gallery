import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";
import { fileURLToPath } from "url";
import { login } from "./login.js";

const GALLERY_SIZE = process.env.SEED_GALLERY_SIZE || 5;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const API_URL = process.env.BASE_URL || 'http://localhost:3000';

async function run(){
    const token = await login('admin','admin');
    console.log('Logged in as admin, token:',token);
    const res = await fetch(`${API_URL}/photos/myphotos`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await res.json();
    const photos = data.photos;
    console.log(`Fetched ${photos.length} photos for admin.`);

    for (let i = 0; i < photos.length; i += GALLERY_SIZE) {
        const galleryPhotos = photos.slice(i, i + GALLERY_SIZE);
        const title = `Gallery ${i / GALLERY_SIZE + 1}`;
        const content = galleryPhotos.map(p => p._id);
        const accessList = [];
        const galleryRes = await fetch(`${API_URL}/galleries/newGallery`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, accessList })
        });
        if (galleryRes.ok) {
            const galleryData = await galleryRes.json();
            console.log(`Created gallery: ${title}`, galleryData);
        } else {
            console.error(`Failed to create gallery: ${title}`, await galleryRes.text());
        }
    }
    console.log('Gallery creation seeding completed.');
}

run().catch(console.error);