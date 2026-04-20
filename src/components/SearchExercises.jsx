import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const {
    allExercises,
    setExercises,
    selectedBodyPart,
    setSelectedBodyPart,
    setLoading,
  } = useContext(FitnessContext);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const seen = new Set();
    const hits = [];
    for (const ex of allExercises) {
      const name = ex?.name;
      if (!name) continue;
      const key = name.toLowerCase();
      if (!key.includes(q)) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push(name);
      if (hits.length >= 8) break;
    }
    return hits;
  }, [query, allExercises]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const runFetch = async (url) => {
    setLoading(true);
    const data = await fetchData(url, exerciseOptions);
    setExercises(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleBodyPartSelect = async (bp) => {
    setSelectedBodyPart(bp);
    setQuery('');
    setShowSuggestions(false);
    const url = bp === 'all'
      ? `${exerciseDbBaseUrl}/exercises?limit=20`
      : `${exerciseDbBaseUrl}/exercises/bodyPart/${encodeURIComponent(bp)}`;
    await runFetch(url);
  };

  const handleSuggestionClick = async (name) => {
    setQuery(name);
    setShowSuggestions(false);
    setSelectedBodyPart('all');
    await runFetch(
      `${exerciseDbBaseUrl}/exercises/name/${encodeURIComponent(name.toLowerCase())}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#d4ff00]">VAULT // INDEX 002</p>
          <h2 className="mt-3 font-black uppercase tracking-tighter leading-[0.9] text-white text-5xl sm:text-6xl">
            Build<br />Your <span className="text-[#d4ff00]">Arsenal.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/50">
            Type to search by name, or lock in a body part to pull fresh from the vault.
          </p>
        </div>

        <div ref={wrapperRef} className="relative w-full max-w-[520px]">
          <label htmlFor="exercise-search" className="sr-only">Search exercises</label>
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-[0.25em] text-white/30">{'>'}</span>
          <input
            id="exercise-search"
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="TYPE TO SEARCH: BENCH / SQUAT / CURL…"
            className="h-14 w-full rounded-full border border-white/15 bg-white/[0.04] pl-10 pr-5 text-sm font-semibold uppercase tracking-wider text-white outline-none transition-all placeholder:text-white/30 focus:border-[#d4ff00] focus:bg-[#d4ff00]/5 focus:ring-4 focus:ring-[#d4ff00]/20"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]/95 shadow-2xl backdrop-blur-xl">
              <p className="border-b border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                Suggestions · {suggestions.length}
              </p>
              <ul>
                {suggestions.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(name)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-[#d4ff00]/10 hover:text-[#d4ff00]"
                    >
                      <span className="line-clamp-1">{name}</span>
                      <span className="text-[#d4ff00]">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
