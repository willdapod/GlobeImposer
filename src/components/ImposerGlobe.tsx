import React, { useRef, useEffect, useState, useMemo } from 'react';
// @ts-ignore
import Globe from 'react-globe.gl';
import type { WindFarm } from '../data/windFarms';
import type { MilitaryBase } from '../data/militaryBases';

interface ImposerGlobeProps {
    onGlobeReady?: () => void;
    windFarms?: WindFarm[];
    militaryBases?: MilitaryBase[];
    showWindFarms?: boolean;
    showMilitaryBases?: boolean;
    globeStyle?: 'realistic' | 'vector';
}

// Convert ISO 2 code to Emoji Flag
const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const ImposerGlobe: React.FC<ImposerGlobeProps> = ({
    onGlobeReady,
    windFarms = [],
    militaryBases = [],
    showWindFarms = true,
    showMilitaryBases = true,
    globeStyle = 'vector'
}) => {
    const globeEl = useRef<any>(undefined);
    const [countries, setCountries] = useState({ features: [] });
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Load GeoJSON for Vector Mode
    useEffect(() => {
        fetch('/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries)
            .catch(err => console.error("Failed to load country data", err));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;

            if (onGlobeReady) onGlobeReady();
        }
    }, [onGlobeReady]);

    // Data processing
    const cylindersData = useMemo(() => {
        if (!showWindFarms) return [];
        return windFarms.map(d => ({
            lat: d.lat,
            lng: d.lng,
            radius: 1.0,
            altitude: d.powerOutputMW / 2000,
            color: '#00ffaa',
            name: d.name,
            power: d.powerOutputMW,
            flag: getFlagEmoji(d.countryCode)
        }));
    }, [windFarms, showWindFarms]);

    const ringsData = useMemo(() => {
        if (!showWindFarms) return [];
        return windFarms.map(d => ({
            lat: d.lat,
            lng: d.lng,
            color: '#00ffaa', // "Highlighted in different colours" - cyan for now, can be random or unique
            maxRadius: 5 + (d.powerOutputMW / 1000), // Area highlight proportional to power
            propagationSpeed: 2,
            repeatPeriod: 1000
        }));
    }, [windFarms, showWindFarms]);

    const labelsData = useMemo(() => {
        if (!showMilitaryBases) return [];
        return militaryBases.map(d => ({
            lat: d.lat,
            lng: d.lng,
            text: d.name,
            color: d.country === 'USA' ? '#ffaa00' :
                d.country === 'Germany' ? '#00aaff' :
                    d.country === 'Japan' ? '#ff3333' :
                        '#ffffff',
            size: 1.5
        }));
    }, [militaryBases, showMilitaryBases]);

    return (
        <div className="relative w-full h-full bg-black">
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}

                // Style Switching
                backgroundColor="#000000"
                globeImageUrl={globeStyle === 'realistic' ? "/textures/earth-night.jpg" : undefined}
                bumpImageUrl={globeStyle === 'realistic' ? "//unpkg.com/three-globe/example/img/earth-topology.png" : undefined}
                backgroundImageUrl="/textures/night-sky.png"

                showAtmosphere={true}
                atmosphereColor={globeStyle === 'realistic' ? "#3a228a" : "#224466"}
                atmosphereAltitude={0.15}

                // Vector Mode (Polygons) with GLOW border
                polygonsData={globeStyle === 'vector' ? countries.features : []}
                polygonCapColor={() => 'rgba(20, 30, 40, 0.9)'} // Darker
                polygonSideColor={() => 'rgba(10, 20, 30, 0.5)'}
                polygonStrokeColor={() => '#44ccff'} // Bright Cyan/Blue for "Glow"
                polygonAltitude={0.005}

                // Wind Farms (Cylinders)
                cylindersData={cylindersData}
                cylinderRadius={1.0}
                cylinderHeight="altitude"
                cylinderColor="color"

                // HTML Elements for Wind Farms (Flag + Details)
                htmlElementsData={showWindFarms ? cylindersData : []}
                htmlElement={d => {
                    const el = document.createElement('div');
                    el.className = 'flex flex-col items-center pointer-events-none transform -translate-y-10'; // Offset above cylinder
                    el.innerHTML = `
                        <div class="bg-black/80 backdrop-blur border border-green-500 rounded px-2 py-1 flex items-center gap-2 text-xs text-white whitespace-nowrap">
                            <span class="text-base">${d.flag}</span>
                            <span class="font-bold">${d.name}</span>
                            <span class="text-gray-400">|</span>
                            <span class="text-green-400 font-mono">${d.power}MW</span>
                        </div>
                        <div class="w-0.5 h-4 bg-green-500/50"></div>
                    `;
                    return el;
                }}
                htmlAltitude={d => d.altitude + 0.05}

                // Rings for "Highlight Area"
                ringsData={ringsData}
                ringColor="color"
                ringMaxRadius="maxRadius"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
                ringAltitude={0.002}

                // Military Bases (Labels)
                labelsData={labelsData}
                labelLat="lat"
                labelLng="lng"
                labelText="text"
                labelColor="color"
                labelSize="size"
                labelDotRadius={0.5}
                labelAltitude={0.02}

                onGlobeReady={onGlobeReady}
            />
            <div className="absolute top-4 left-4 z-10 text-white font-bold text-xl pointer-events-none drop-shadow-md">
                <h1>GlobeImposer</h1>
                <span className="text-xs text-gray-400 font-normal uppercase tracking-wider block mt-1">
                    {globeStyle === 'vector' ? 'Vector Mode' : 'Satellite Mode'}
                </span>
            </div>
        </div>
    );
};

export default ImposerGlobe;
