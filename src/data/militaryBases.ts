export interface MilitaryBase {
    id: string;
    name: string;
    lat: number;
    lng: number;
    country: string;
    type: string;
}

export const militaryBases: MilitaryBase[] = [
    { id: '1', name: 'Ramstein Air Base', lat: 49.43, lng: 7.60, country: 'USA', type: 'Air Force' },
    { id: '2', name: 'Guantanamo Bay', lat: 19.90, lng: -75.10, country: 'USA', type: 'Naval' },
    { id: '3', name: 'Diego Garcia', lat: -7.31, lng: 72.41, country: 'UK/USA', type: 'Naval/Air' },
    { id: '4', name: 'Khmeimim Air Base', lat: 35.40, lng: 35.95, country: 'Russia', type: 'Air Force' },
    { id: '5', name: 'Djibouti Base', lat: 11.58, lng: 43.14, country: 'China', type: 'Naval' },
];
