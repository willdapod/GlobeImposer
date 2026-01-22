
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1x1 Blue Pixel for Earth
const earthBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWKz9HmYAAxwC5+052eMAAAAASUVORK5CYII=";
// 1x1 Starry(ish) / Dark Pixel for Sky
const skyBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAfhAJ/wlseOgAAAABJRU5ErkJggg==";

const textures = [
    { dest: 'public/textures/earth-night.jpg', data: earthBase64 },
    { dest: 'public/textures/night-sky.png', data: skyBase64 }
];

textures.forEach(tex => {
    const filePath = path.join(__dirname, tex.dest);
    const buffer = Buffer.from(tex.data, 'base64');
    fs.writeFile(filePath, buffer, (err) => {
        if (err) console.error(`Error writing ${tex.dest}:`, err);
        else console.log(`Generated ${tex.dest}`);
    });
});
