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
        boundary: createRect(75, -160, 83, -130) // Adjusted area
    },
    {
        id: '5',
        name: 'Galápagos Islands',
        animal: 'Giant Tortoise',
        population: '~20,000',
        type: 'Land',
        boundary: createRect(-1.4, -91.8, 0.7, -89.2)
    },
    {
        id: '6',
        name: 'Madagascar Rainforests',
        animal: 'Lemurs',
        population: 'Endangered',
        type: 'Land',
        boundary: createRect(-20, 46, -15, 50)
    },
    {
        id: '7',
        name: 'Coral Triangle',
        animal: 'Reef Species',
        population: 'High Biodiversity',
        type: 'Marine',
        boundary: createRect(-10, 110, 5, 140)
    },
    {
        id: '8',
        name: 'Sunderbans',
        animal: 'Bengal Tiger',
        population: '~100',
        type: 'Land',
        boundary: createRect(21.5, 88.0, 22.5, 90.0)
    },
    {
        id: '9',
        name: 'Yellowstone',
        animal: 'Grizzly Bear',
        population: '~700',
        type: 'Land',
        boundary: createRect(44.1, -111.1, 45.1, -109.8)
    },
    {
        id: '10',
        name: 'Kruger National Park',
        animal: 'Big Five',
        population: 'Various',
        type: 'Land',
        boundary: createRect(-25.5, 31.0, -23.5, 32.0)
    },
    {
        id: '11',
        name: 'Borneo Rainforest',
        animal: 'Orangutan',
        population: '~100,000',
        type: 'Land',
        boundary: createRect(-4, 110, 4, 118)
    }
];
