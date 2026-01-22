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
    if (!countryCode) return '🏳️';
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

    // Combine Countries + Wind Farm Areas for Polygon Layer
    const allPolygonsData = useMemo(() => {
        const feats: any[] = [];

        // 1. Countries (Vector Mode only)
        if (globeStyle === 'vector') {
            feats.push(...countries.features.map((f: any) => ({ ...f, type: 'Country' })));
        }

        // 2. Wind Farm Areas
        if (showWindFarms) {
            windFarms.forEach(wf => {
                if (wf.boundary) {
                    feats.push({
                        type: 'WindFarm',
                        geometry: {
                            type: 'Polygon',
                            coordinates: wf.boundary
                        },
                        properties: {
                            name: wf.name
                        }
                    });
                }
            });
        }

        return feats;
    }, [countries, showWindFarms, windFarms, globeStyle]);

    // Connector Lines (Paths Layer)
    const pathsData = useMemo(() => {
        if (!showWindFarms) return [];
        return windFarms.map(d => ({
            coords: [
                [d.lat, d.lng, 0.02], // Start at polygon height
                [d.lat, d.lng, 0.12]   // End at text height
            ],
            color: 'rgba(255, 215, 0, 0.8)' // Yellow
        }));
    }, [windFarms, showWindFarms]);

    // HTML Labels Data
    const htmlData = useMemo(() => {
        if (!showWindFarms) return [];
        return windFarms.map(d => ({
            ...d,
            lat: d.lat, // Explicitly pass lat/lng for Globe to read
            lng: d.lng,
            altitude: 0.12, // Match path end
            flagEmoji: getFlagEmoji(d.countryCode)
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

                // Unified Polygon Layer
                polygonsData={allPolygonsData}
                polygonCapColor={(d: any) => d.type === 'WindFarm' ? 'rgba(255, 215, 0, 0.8)' : 'rgba(20, 30, 40, 0.9)'}
                polygonSideColor={(d: any) => d.type === 'WindFarm' ? 'rgba(0,0,0,0)' : 'rgba(10, 20, 30, 0.5)'}
                polygonStrokeColor={(d: any) => d.type === 'WindFarm' ? 'rgba(255, 215, 0, 0.5)' : '#44ccff'}
                polygonAltitude={(d: any) => d.type === 'WindFarm' ? 0.03 : 0.005}

                // Paths for connectors
                pathsData={pathsData}
                pathPoints="coords"
                pathPointLat={p => p[0]}
                pathPointLng={p => p[1]}
                pathPointAlt={p => p[2]}
                pathColor="color"
                pathStroke={1}
                pathDashLength={0.5}

                // HTML Elements
                htmlElementsData={htmlData}
                htmlElement={(d: any) => {
                    const el = document.createElement('div');
                    el.className = 'pointer-events-none transform -translate-x-1/2 -translate-y-full';
                    el.innerHTML = `
                        <div class="flex flex-col items-center">
                            <div class="bg-black/80 backdrop-blur border border-yellow-500 rounded px-3 py-1 flex items-center gap-2 text-xs text-white whitespace-nowrap shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                <span class="text-lg leading-none grayscale opacity-80">${d.flagEmoji}</span>
                                <span class="font-bold text-yellow-400 font-sans">${(d.name || '').toUpperCase()}</span>
                                <div class="h-3 w-px bg-gray-700 mx-1"></div>
                                <span class="text-white font-mono text-xs">${d.powerOutputMW} MW</span>
                            </div>
                        </div>
                    `;
                    return el;
                }}
                htmlLat="lat"
                htmlLng="lng"
                htmlAltitude="altitude"
                htmlTransitionDuration={1000}

                // Removing cylindersData to avoid lint/runtime errors if prop is strict
                // Removing ringsData

                // Military Bases
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
