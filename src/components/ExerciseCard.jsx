import { Link } from 'react-router-dom';
import SaveExerciseButton from './SaveExerciseButton';
import ExerciseImage from './ExerciseImage';

const ExerciseCard = ({ exercise }) => {
  const bodyPart = exercise?.bodyPart ?? 'body';
  const target = exercise?.target ?? 'muscle';
  const equipment = exercise?.equipment ?? 'equipment';
  const imageUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=360&rapidapi-key=${import.meta.env.VITE_RAPID_API_KEY}`;

  return (
    <Link
      to={`/exercise/${exercise.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141414] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4ff00]/40 hover:shadow-[0_0_40px_rgba(212,255,0,0.15)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4ff00]/0 blur-2xl transition-all duration-500 group-hover:bg-[#d4ff00]/25" />

      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
          #{String(exercise.id).padStart(4, '0')}
        </span>
        <SaveExerciseButton exercise={exercise} />
      </div>

      <ExerciseImage
        src={imageUrl}
        alt={exercise.name}
        className="mt-4"
        imgHeightClass="h-52"
      />

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-[#d4ff00]/40 bg-[#d4ff00]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4ff00]">
          {bodyPart}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
          {target}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
          {equipment}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-2 text-xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-[#d4ff00]">
        {exercise.name}
      </h3>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-bold uppercase tracking-[0.22em] text-white/40">
        <span>Open protocol</span>
        <span className="text-[#d4ff00] transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
};

export default ExerciseCard;
