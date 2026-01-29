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

    // US - Asia Pacific
    { id: '6', name: 'Kadena Air Base', lat: 26.35, lng: 127.76, country: 'USA', type: 'Air Force' },
    { id: '7', name: 'Yokosuka Naval Base', lat: 35.29, lng: 139.67, country: 'USA', type: 'Naval' },
    { id: '8', name: 'Misawa Air Base', lat: 40.70, lng: 141.36, country: 'USA', type: 'Air Force' },
    { id: '9', name: 'Camp Humphreys', lat: 36.96, lng: 127.04, country: 'USA', type: 'Army' },
    { id: '10', name: 'Osan Air Base', lat: 37.09, lng: 127.03, country: 'USA', type: 'Air Force' },
    { id: '11', name: 'Andersen AFB (Guam)', lat: 13.58, lng: 144.92, country: 'USA', type: 'Air Force' },

    // US - Europe
    { id: '12', name: 'Ramstein Air Base', lat: 49.43, lng: 7.60, country: 'USA', type: 'Air Force' }, // Update dupe check if needed
    { id: '13', name: 'Spangdahlem AB', lat: 49.97, lng: 6.69, country: 'USA', type: 'Air Force' },
    { id: '14', name: 'Grafenwoehr (Tower Barracks)', lat: 49.71, lng: 11.90, country: 'USA', type: 'Army' },
    { id: '15', name: 'NSA Naples', lat: 40.88, lng: 14.28, country: 'USA', type: 'Naval' },
    { id: '16', name: 'Rota Naval Station', lat: 36.64, lng: -6.33, country: 'USA', type: 'Naval' },
    { id: '17', name: 'Incirlik Air Base', lat: 37.00, lng: 35.42, country: 'USA/Turkey', type: 'Air Force' },

    // US - Middle East/Other
    { id: '18', name: 'Al Udeid Air Base', lat: 25.11, lng: 51.31, country: 'USA/Qatar', type: 'Air Force' },
    { id: '19', name: 'Camp Lemonnier', lat: 11.54, lng: 43.14, country: 'USA', type: 'Naval/Expeditionary' },

    // Other Nations
    { id: '20', name: 'Tartus Naval Facility', lat: 34.91, lng: 35.87, country: 'Russia', type: 'Naval' },
    { id: '21', name: 'Ream Naval Base', lat: 10.5, lng: 103.6, country: 'Cambodia/China', type: 'Naval' }
];
