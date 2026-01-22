
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    {
        url: 'https://unpkg.com/three-globe/example/img/earth-night.jpg',
        dest: 'public/textures/earth-night.jpg'
    },
    {
        url: 'https://unpkg.com/three-globe/example/img/night-sky.png',
        dest: 'public/textures/night-sky.png'
    },
    {
        url: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
        dest: 'public/datasets/ne_110m_admin_0_countries.geojson'
    }
];

function downloadFile(sourceUrl, dest) {
    const filePath = path.join(__dirname, dest);
    const fileStream = fs.createWriteStream(filePath);

    console.log(`Downloading ${sourceUrl}...`);

    https.get(sourceUrl, (response) => {
        // Handle Redirects
        if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
            let redirectUrl = response.headers.location;

            // Handle relative redirects
            if (!redirectUrl.startsWith('http')) {
                const parsedOriginal = new URL(sourceUrl);
                redirectUrl = `${parsedOriginal.protocol}//${parsedOriginal.host}${redirectUrl}`;
            }

            console.log(`Redirecting to ${redirectUrl}`);
            downloadFile(redirectUrl, dest);
            return;
        }

        if (response.statusCode !== 200) {
            console.error(`Failed to download ${sourceUrl}: Status Code ${response.statusCode}`);
            fileStream.close();
            return;
        }

        response.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            const stats = fs.statSync(filePath);
            console.log(`Downloaded ${dest} (${stats.size} bytes)`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${dest}:`, err.message);
        fileStream.close();
    });
}

files.forEach(file => {
    downloadFile(file.url, file.dest);
});
