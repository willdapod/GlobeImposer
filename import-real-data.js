
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL for the Global Power Plant Database (CSV)
// Using a reliable GitHub dataset mirror for easy CSV access
const CSV_URL = 'https://raw.githubusercontent.com/datasets/global-power-plants/master/data/global-power-plants.csv';
const DEST_FILE = path.join(__dirname, 'global_power_plants.csv');

console.log('Downloading Global Power Plant Database...');

https.get(CSV_URL, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download: ${res.statusCode}`);
        return;
    }

    const fileStream = fs.createWriteStream(DEST_FILE);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
        fileStream.close();
        console.log('Download complete. Processing...');
        processCSV();
    });
}).on('error', (err) => {
    console.error('Error downloading:', err.message);
});

function processCSV() {
    const content = fs.readFileSync(DEST_FILE, 'utf-8');
    const lines = content.split('\n');
    const headers = lines[0].split(',');

    // Find indices
    const nameIdx = headers.indexOf('name');
    const capIdx = headers.indexOf('capacity_mw');
    const latIdx = headers.indexOf('latitude');
    const lngIdx = headers.indexOf('longitude');
    const fuelIdx = headers.indexOf('primary_fuel');
    const countryIdx = headers.indexOf('country');

    const windFarms = [];
    let count = 0;

    // Helper to generate hex (reusing logic)
    const createHexagon = (lat, lng, radius) => {
        const coords = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60 * Math.PI) / 180;
            const dLat = radius * Math.cos(angle);
            const dLng = radius * Math.sin(angle);
            coords.push([lng + dLng, lat + dLat]);
        }
        coords.push(coords[0]);
        return [coords];
    };

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // Simple CSV parse (handling quotes roughly)
        // ideally use a library, but minimal dep is better here
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        // fallback to split if simple
        const cols = line.split(',');

        // Locate Wind
        // We look for 'Wind' in the fuel column
        if (cols[fuelIdx] && cols[fuelIdx].includes('Wind')) {
            const name = cols[nameIdx].replace(/"/g, '');
            const lat = parseFloat(cols[latIdx]);
            const lng = parseFloat(cols[lngIdx]);
            const mw = parseFloat(cols[capIdx]);
            const country = cols[countryIdx];

            if (!isNaN(lat) && !isNaN(lng) && !isNaN(mw)) {
                windFarms.push({
                    id: `wf-${i}`,
                    name: name,
                    lat: lat,
                    lng: lng,
                    powerOutputMW: mw,
                    countryCode: country,
                    boundary: createHexagon(lat, lng, 0.15) // Fixed size for now
                });
                count++;
            }
        }
    }

    console.log(`Found ${count} Wind Farms.`);

    // Write TS file
    const tsContent = `export interface WindFarm {
    id: string;
    name: string;
    lat: number;
    lng: number;
    powerOutputMW: number;
    countryCode: string;
    boundary: number[][][];
}

export const windFarms: WindFarm[] = ${JSON.stringify(windFarms, null, 2)};
`;

    fs.writeFileSync(path.join(__dirname, 'src/data/windFarms.ts'), tsContent);
    console.log('Updated src/data/windFarms.ts');
}
