export interface WindFarm {
    id: string;
    name: string;
    lat: number;
    lng: number;
    powerOutputMW: number;
}

export const windFarms: WindFarm[] = [
    { id: '1', name: 'London Array', lat: 51.62, lng: 1.48, powerOutputMW: 630 },
    { id: '2', name: 'Gansu Wind Farm', lat: 40.2, lng: 96.9, powerOutputMW: 7965 },
    { id: '3', name: 'Alta Wind Energy Center', lat: 35.02, lng: -118.32, powerOutputMW: 1548 },
    { id: '4', name: 'Jaisalmer Wind Park', lat: 26.9, lng: 70.9, powerOutputMW: 1600 },
    { id: '5', name: 'Muppandal Wind Farm', lat: 8.25, lng: 77.55, powerOutputMW: 1500 },
];
