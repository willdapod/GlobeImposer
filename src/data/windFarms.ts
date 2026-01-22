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
];
