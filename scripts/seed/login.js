import fetch from 'node-fetch';

const API_URL = process.env.BASE_URL || "http://localhost:3000";

export async function login(username, password) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}`);
    }
    return res.json().then(data => data.token);
}