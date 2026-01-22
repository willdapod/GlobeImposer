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
    // Europe
    { id: '12', name: 'Fantanele-Cogealac', lat: 44.58, lng: 28.56, powerOutputMW: 600, countryCode: 'RO', boundary: createHexagon(44.58, 28.56, 0.2) },
    { id: '13', name: 'Gode Wind', lat: 54.05, lng: 7.03, powerOutputMW: 582, countryCode: 'DE', boundary: createHexagon(54.05, 7.03, 0.2) },
    { id: '14', name: 'Gemini Wind Farm', lat: 54.03, lng: 5.95, powerOutputMW: 600, countryCode: 'NL', boundary: createHexagon(54.03, 5.95, 0.2) },
    // China
    { id: '15', name: 'Dabancheng', lat: 43.5, lng: 87.8, powerOutputMW: 500, countryCode: 'CN', boundary: createHexagon(43.5, 87.8, 0.2) },
    { id: '16', name: 'Huitengxile', lat: 41.0, lng: 112.5, powerOutputMW: 300, countryCode: 'CN', boundary: createHexagon(41.0, 112.5, 0.15) },
    // Other
    { id: '17', name: 'Macarthur Wind Farm', lat: -38.05, lng: 142.0, powerOutputMW: 420, countryCode: 'AU', boundary: createHexagon(-38.05, 142.0, 0.2) },
    { id: '18', name: 'Canoa Quebrada', lat: -4.56, lng: -37.78, powerOutputMW: 200, countryCode: 'BR', boundary: createHexagon(-4.56, -37.78, 0.15) },
    { id: '19', name: 'Tarfaya', lat: 27.9, lng: -12.9, powerOutputMW: 300, countryCode: 'MA', boundary: createHexagon(27.9, -12.9, 0.2) },
    { id: '20', name: 'Lake Turkana', lat: 2.5, lng: 36.8, powerOutputMW: 310, countryCode: 'KE', boundary: createHexagon(2.5, 36.8, 0.2) },
];
