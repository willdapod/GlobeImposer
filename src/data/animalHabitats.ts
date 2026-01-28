export interface AnimalHabitat {
    id: string;
    name: string;
    animal: string;
    population: string;
    type: 'Marine' | 'Land';
    boundary: number[][][];
}

const createRect = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    return [[
        [lng1, lat1],
        [lng2, lat1],
        [lng2, lat2],
        [lng1, lat2],
        [lng1, lat1]
    ]];
};

export const animalHabitats: AnimalHabitat[] = [
    {
        id: '1',
        name: 'Great Barrier Reef',
        animal: 'Clownfish & Coral',
        population: 'High Biodiversity',
        type: 'Marine',
        boundary: createRect(-10, 142, -24, 154)
    },
    {
        id: '2',
        name: 'Amazon Rainforest',
        animal: 'Jaguar',
        population: '~15,000',
        type: 'Land',
        boundary: createRect(2, -75, -10, -50)
    },
    {
        id: '3',
        name: 'Serengeti',
        animal: 'Lion',
        population: '~3,000',
        type: 'Land',
        boundary: createRect(-1, 34, -3, 36)
    },
    {
        id: '4',
        name: 'Arctic Ice',
        animal: 'Polar Bear',
        population: '~26,000',
        type: 'Land',
        boundary: createRect(80, -180, 85, 180) // Simple band
    }
];
