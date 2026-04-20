import { memo, useContext } from 'react';
import { FitnessContext } from '../context/FitnessContext.js';
import ExerciseCard from './ExerciseCard';
import SearchExercises from './SearchExercises';

const SkeletonGrid = () => (
  <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {[...Array(6)].map((_, idx) => (
      <div
        key={idx}
        className="h-80 animate-pulse rounded-[1.75rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent"
      />
    ))}
  </div>
);

const ExerciseGrid = memo(({ items }) => {
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] p-12 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#d4ff00]">NO HITS</p>
        <p className="mt-2 text-lg font-bold text-white/70">Nothing matched. Pick a different body part or search term.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
});
ExerciseGrid.displayName = 'ExerciseGrid';

const Exercises = () => {
  const { exercises, loading } = useContext(FitnessContext);

  return (
    <section id="exercises" className="relative mx-auto mt-20 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 scroll-mt-24">
      <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10">
        <SearchExercises />

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          <span>RESULTS // {exercises.length.toString().padStart(3, '0')}</span>
          <span className={loading ? 'text-[#ff2625]' : 'text-[#d4ff00]'}>
            {loading ? '● FETCHING' : '● LIVE'}
          </span>
        </div>

        {loading ? <SkeletonGrid /> : <ExerciseGrid items={exercises} />}
      </div>
    </section>
  );
};

export default Exercises;
