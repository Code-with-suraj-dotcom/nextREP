import { useContext, useEffect } from 'react';
import { FitnessContext } from '../context/FitnessContext.js';
import { fetchData, exerciseOptions, exerciseDbBaseUrl } from '../services/fetchData';
import HeroBanner from '../components/HomeBanner';
import Exercises from '../components/Exercises';

const INITIAL_DISPLAY = 12;

const FullPageSpinner = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-[#d4ff00]" />
      <div className="absolute inset-3 rounded-full bg-[#d4ff00]/10" />
    </div>
    <p className="text-xs font-black uppercase tracking-[0.4em] text-[#d4ff00]">LOADING PROTOCOL…</p>
    <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">SPOOLING EXERCISE DATABASE</p>
  </div>
);

const Home = () => {
  const {
    allExercises,
    setAllExercises,
    setExercises,
    setLoading,
  } = useContext(FitnessContext);

  useEffect(() => {
    if (allExercises.length > 0) return;

    const fetchAllExercises = async () => {
      setLoading(true);
      const data = await fetchData(
        `${exerciseDbBaseUrl}/exercises?limit=1300&offset=0`,
        exerciseOptions
      );
      const list = Array.isArray(data) ? data : [];
      setAllExercises(list);
      setExercises(list.slice(0, INITIAL_DISPLAY));
      setLoading(false);
    };

    fetchAllExercises();
  }, [allExercises.length, setAllExercises, setExercises, setLoading]);

  if (allExercises.length === 0) {
    return (
      <main className="pb-14">
        <FullPageSpinner />
      </main>
    );
  }

  return (
    <main className="pb-20">
      <HeroBanner />
      <Exercises />
    </main>
  );
};

export default Home;
