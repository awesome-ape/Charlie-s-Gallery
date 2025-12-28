import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const API_URL = process.env.BASE_URL || "http://localhost:3000";
const IMAGE_PATH = path.join(_dirname, "..", "..", "test_images", "test.jpg");

async function run(){
    const formData = new FormData();
    formData.append("username", "admin");
    formData.append("password", "admin");
    formData.append("firstname", "Admin");
    formData.append("secondname", "User");
    formData.append("photo", fs.createReadStream(IMAGE_PATH));

    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: formData,
        headers: formData.getHeaders()
    });

    const data = await res.json();
    console.log("status:", res.status);
    console.log("response:", data);

}
run().catch(console.error);