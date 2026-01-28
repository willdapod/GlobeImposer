export interface WindFarm {
    id: string;
    name: string;
    lat: number;
    lng: number;
    powerOutputMW: number;
    countryCode: string;
    boundary: number[][][]; // GeoJSON Polygon coordinates
}

// Helper to generate a simple hex polygon around a point
const createHexagon = (lat: number, lng: number, radius: number) => {
    const coords = [];
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60 * Math.PI) / 180;
        // Simple approximation for small areas
        const dLat = radius * Math.cos(angle);
        const dLng = radius * Math.sin(angle);
        coords.push([lng + dLng, lat + dLat]);
    }
    coords.push(coords[0]); // Close loop
    return [coords];
};

export const windFarms: WindFarm[] = [
    {
        id: '1', name: 'London Array', lat: 51.62, lng: 1.48, powerOutputMW: 630, countryCode: 'GB',
        boundary: createHexagon(51.62, 1.48, 0.2)
    },
    {
        id: '2', name: 'Gansu Wind Farm', lat: 40.2, lng: 96.9, powerOutputMW: 7965, countryCode: 'CN',
        boundary: createHexagon(40.2, 96.9, 0.5)
    },
    {
        id: '3', name: 'Alta Wind Energy Center', lat: 35.02, lng: -118.32, powerOutputMW: 1548, countryCode: 'US',
        boundary: createHexagon(35.02, -118.32, 0.3)
    },
    {
        id: '4', name: 'Jaisalmer Wind Park', lat: 26.9, lng: 70.9, powerOutputMW: 1600, countryCode: 'IN',
        boundary: createHexagon(26.9, 70.9, 0.3)
    },
    {
        id: '5', name: 'Muppandal Wind Farm', lat: 8.25, lng: 77.55, powerOutputMW: 1500, countryCode: 'IN',
        boundary: createHexagon(8.25, 77.55, 0.25)
    },
    // Texas
    { id: '6', name: 'Roscoe Wind Farm', lat: 32.26, lng: -100.34, powerOutputMW: 781, countryCode: 'US', boundary: createHexagon(32.26, -100.34, 0.25) },
    { id: '7', name: 'Horse Hollow', lat: 32.18, lng: -100.0, powerOutputMW: 735, countryCode: 'US', boundary: createHexagon(32.18, -100.0, 0.25) },
    { id: '8', name: 'Capricorn Ridge', lat: 31.8, lng: -100.9, powerOutputMW: 662, countryCode: 'US', boundary: createHexagon(31.8, -100.9, 0.2) },
    // UK Offshore
    { id: '9', name: 'Hornsea 1', lat: 53.89, lng: 1.88, powerOutputMW: 1218, countryCode: 'GB', boundary: createHexagon(53.89, 1.88, 0.3) },
    { id: '10', name: 'Hornsea 2', lat: 53.95, lng: 1.6, powerOutputMW: 1320, countryCode: 'GB', boundary: createHexagon(53.95, 1.6, 0.3) },
    { id: '11', name: 'Walney Extension', lat: 54.08, lng: -3.5, powerOutputMW: 659, countryCode: 'GB', boundary: createHexagon(54.08, -3.5, 0.2) },
    { id: '21', name: 'London Array', lat: 51.6, lng: 1.5, powerOutputMW: 630, countryCode: 'GB', boundary: createHexagon(51.6, 1.5, 0.2) },
    { id: '22', name: 'Gwynt y Môr', lat: 53.4, lng: -3.6, powerOutputMW: 576, countryCode: 'GB', boundary: createHexagon(53.4, -3.6, 0.2) },
    { id: '23', name: 'Greater Gabbard', lat: 51.9, lng: 1.9, powerOutputMW: 504, countryCode: 'GB', boundary: createHexagon(51.9, 1.9, 0.2) },
    { id: '24', name: 'Race Bank', lat: 53.2, lng: 0.8, powerOutputMW: 573, countryCode: 'GB', boundary: createHexagon(53.2, 0.8, 0.2) },
    { id: '25', name: 'Rampion', lat: 50.7, lng: -0.2, powerOutputMW: 400, countryCode: 'GB', boundary: createHexagon(50.7, -0.2, 0.15) },
    { id: '26', name: 'West of Duddon Sands', lat: 53.9, lng: -3.4, powerOutputMW: 389, countryCode: 'GB', boundary: createHexagon(53.9, -3.4, 0.15) },
    { id: '27', name: 'Dogger Bank A (Construction)', lat: 54.8, lng: 1.9, powerOutputMW: 1200, countryCode: 'GB', boundary: createHexagon(54.8, 1.9, 0.3) },
    { id: '28', name: 'Seagreen', lat: 56.6, lng: -1.7, powerOutputMW: 1075, countryCode: 'GB', boundary: createHexagon(56.6, -1.7, 0.3) },
];
