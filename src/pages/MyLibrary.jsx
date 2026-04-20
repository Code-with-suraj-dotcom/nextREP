import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FitnessContext } from '../context/FitnessContext.js';
import { fetchData, exerciseOptions, exerciseDbBaseUrl } from '../services/fetchData';
import ExerciseCard from '../components/ExerciseCard';

const SkeletonGrid = () => (
  <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {[...Array(6)].map((_, idx) => (
      <div key={idx} className="h-80 animate-pulse rounded-[1.75rem] border border-white/5 bg-white/[0.03]" />
    ))}
  </div>
);

const MyLibrary = () => {
  const { currentUser, authLoading, logout } = useAuth();
  const { savedList } = useContext(FitnessContext);
  const [exercises, setExercises] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return undefined;

    if (savedList.length === 0) {
      setExercises([]);
      setFetchLoading(false);
      return undefined;
    }

    let cancelled = false;
    setFetchLoading(true);

    Promise.all(
      savedList.map((id) =>
        fetchData(`${exerciseDbBaseUrl}/exercises/exercise/${id}`, exerciseOptions)
      )
    ).then((results) => {
      if (cancelled) return;
      const valid = results.filter((item) => item && item.id);
      setExercises(valid);
      setFetchLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [savedList, currentUser]);

  if (authLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#d4ff00]" />
      </main>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: '/library' }} replace />;
  }

  return (
    <main className="pb-20">
      <section className="relative mx-auto mt-10 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff00]" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">VAULT // PRIVATE</p>
              </div>
              <h1 className="mt-3 font-black uppercase tracking-tighter leading-[0.9] text-white text-4xl sm:text-6xl">
                {currentUser.displayName ? (<><span className="text-[#d4ff00]">{currentUser.displayName}'s</span><br />Locker.</>) : (<>Your<br /><span className="text-[#d4ff00]">Locker.</span></>)}
              </h1>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.25em] text-white/50">
                {savedList.length.toString().padStart(2, '0')} · EXERCISE{savedList.length === 1 ? '' : 'S'} LOCKED IN
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 sm:inline">
                {currentUser.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
              >
                Sign out
              </button>
            </div>
          </div>

          {fetchLoading ? (
            <SkeletonGrid />
          ) : savedList.length === 0 ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] p-12 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">EMPTY // VAULT</p>
              <p className="mt-3 text-xl font-black uppercase tracking-tight text-white">Nothing locked in yet.</p>
              <p className="mt-2 text-sm text-white/50">Hit the heart on any exercise to start your vault.</p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d4ff00] px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-black shadow-[0_0_30px_rgba(212,255,0,0.35)] transition-transform hover:-translate-y-0.5"
              >
                Browse exercises →
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyLibrary;
