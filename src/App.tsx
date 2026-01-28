import { useState, Suspense, lazy } from 'react';
// Dynamic import to catch module load errors in Error Boundary
const ImposerGlobe = lazy(() => import('./components/ImposerGlobe'));
import PowerStats from './components/PowerStats';
import { windFarms } from './data/windFarms';
import { militaryBases } from './data/militaryBases';

function App() {
  const [showWindFarms, setShowWindFarms] = useState(true);
  const [showMilitaryBases, setShowMilitaryBases] = useState(true);
  // Defaulting to 'realistic' to verify if textures load (Vector mode might be black if GeoJSON fails)
  const [globeStyle, setGlobeStyle] = useState<'realistic' | 'vector'>('realistic');

  return (
    <div className="w-full h-full bg-gray-900 relative">
      <Suspense fallback={null}>
        <ImposerGlobe
          windFarms={windFarms}
          militaryBases={militaryBases}
          showWindFarms={showWindFarms}
          showMilitaryBases={showMilitaryBases}
          globeStyle={globeStyle}
        />
      </Suspense>

      <PowerStats windFarms={windFarms} show={showWindFarms} />

      {/* UI Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-gray-700 text-white w-64">
        <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">Layers</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00ffaa]"></span>
              Wind Farms
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showWindFarms}
                onChange={(e) => setShowWindFarms(e.target.checked)}
              />
              <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              Military Bases
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showMilitaryBases}
                onChange={(e) => setShowMilitaryBases(e.target.checked)}
              />
              <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="pt-2 border-t border-gray-600 my-2"></div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-gray-300">
              Style:
            </span>
            <button
              onClick={() => setGlobeStyle(prev => prev === 'realistic' ? 'vector' : 'realistic')}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold transition-colors min-w-[80px]"
            >
              {globeStyle === 'realistic' ? 'SATELLITE' : 'VECTOR'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
