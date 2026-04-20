import { useContext } from 'react';
import { FitnessContext } from '../context/FitnessContext.js';
import { fetchData, exerciseOptions, exerciseDbBaseUrl } from '../services/fetchData';

const BODY_PARTS = [
  'all',
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist',
];

const SearchExercises = () => {
  const {
    setExercises,
    selectedBodyPart,
    setSelectedBodyPart,
    setLoading,
  } = useContext(FitnessContext);

  const handleBodyPartSelect = async (bp) => {
    setSelectedBodyPart(bp);
    setLoading(true);
    const url = bp === 'all'
      ? `${exerciseDbBaseUrl}/exercises?limit=20`
      : `${exerciseDbBaseUrl}/exercises/bodyPart/${encodeURIComponent(bp)}`;
    const data = await fetchData(url, exerciseOptions);
    setExercises(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.4em] text-[#d4ff00]">VAULT // INDEX 002</p>
        <h2 className="mt-3 font-black uppercase tracking-tighter leading-[0.9] text-white text-5xl sm:text-6xl">
          Build<br />Your <span className="text-[#d4ff00]">Arsenal.</span>
        </h2>
        <p className="mt-3 max-w-md text-sm text-white/50">
          Lock in a body part to pull fresh drops from the vault.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">BODY PART // RIBBON</p>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">TAP TO REFETCH</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {BODY_PARTS.map((bp) => {
            const active = bp === selectedBodyPart;
            return (
              <button
                key={bp}
                type="button"
                onClick={() => handleBodyPartSelect(bp)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] transition-all ${
                  active
                    ? 'border border-[#ff2625] bg-[#ff2625] text-white shadow-[0_0_28px_rgba(255,38,37,0.45)]'
                    : 'border border-white/15 bg-white/[0.04] text-white/70 hover:border-[#d4ff00]/60 hover:text-[#d4ff00]'
                }`}
              >
                {bp === 'all' ? 'All' : bp}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchExercises;
