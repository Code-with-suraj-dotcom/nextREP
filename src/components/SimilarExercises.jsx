import ExerciseCard from './ExerciseCard';

const CardSkeleton = () => (
  <div className="flex gap-5 overflow-x-auto pb-2">
    {[...Array(4)].map((_, idx) => (
      <div key={idx} className="h-80 w-[300px] shrink-0 animate-pulse rounded-[1.75rem] border border-white/5 bg-white/[0.03]" />
    ))}
  </div>
);

const Row = ({ title, accent, items, loading }) => (
  <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-8">
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">{accent}</p>
        <h3 className="mt-2 font-black uppercase tracking-tighter leading-[0.9] text-white text-3xl sm:text-4xl">{title}</h3>
      </div>
    </div>

    <div className="mt-6">
      {loading ? (
        <CardSkeleton />
      ) : items.length > 0 ? (
        <div className="flex gap-5 overflow-x-auto pb-2">
          {items.slice(0, 8).map((exercise) => (
            <div key={exercise.id} className="w-[300px] shrink-0">
              <ExerciseCard exercise={exercise} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">Nothing similar yet.</p>
        </div>
      )}
    </div>
  </div>
);

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises, loading }) => {
  return (
    <section className="mx-auto mt-16 w-full max-w-[1440px] space-y-6 px-4 sm:px-6 lg:px-10">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">RECOMMENDATION // ENGINE</p>
        <h2 className="mt-2 font-black uppercase tracking-tighter leading-[0.9] text-white text-4xl sm:text-5xl">You Might Also Run.</h2>
      </div>

      <Row
        accent="SAME TARGET // MUSCLE"
        title="Hit It Different."
        items={targetMuscleExercises}
        loading={loading}
      />

      <Row
        accent="SAME GEAR // EQUIPMENT"
        title="More Moves, Same Tools."
        items={equipmentExercises}
        loading={loading}
      />
    </section>
  );
};

export default SimilarExercises;
