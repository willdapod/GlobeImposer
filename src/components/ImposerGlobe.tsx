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
            radius: 1.5, // Increased radius for visibility
            altitude: d.powerOutputMW / 2000, // Adjusted scale
            color: '#00ffaa', // Fully opaque Cyan
            label: `${d.name}: ${d.powerOutputMW}MW`
        }));
    }, [windFarms, showWindFarms]);

    const labelsData = useMemo(() => {
        if (!showMilitaryBases) return [];
        return militaryBases.map(d => ({
            lat: d.lat,
            lng: d.lng,
            text: d.name,
            color: d.country === 'USA' ? '#ffaa00' : // Orange
                d.country === 'Germany' ? '#00aaff' : // Blue
                    d.country === 'Japan' ? '#ff3333' : // Red
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

                // Vector Mode (Polygons)
                polygonsData={globeStyle === 'vector' ? countries.features : []}
                polygonCapColor={() => 'rgba(20, 30, 40, 0.8)'}
                polygonSideColor={() => 'rgba(10, 20, 30, 0.5)'}
                polygonStrokeColor={() => '#112233'}
                polygonAltitude={0.005}

                // Wind Farms (Cylinders)
                cylindersData={cylindersData}
                cylinderRadius={1.5}
                cylinderHeight="altitude"
                cylinderColor="color"

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
