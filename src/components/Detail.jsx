import ExerciseImage from './ExerciseImage';

const InfoPill = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00]">{label}</p>
    <p className="mt-1 text-lg font-black uppercase tracking-tight text-white">{value}</p>
  </div>
);

const Detail = ({ exercise }) => {
  const { id, name, target, equipment, bodyPart, instructions } = exercise;
  const imageUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=720&rapidapi-key=${import.meta.env.VITE_RAPID_API_KEY}`;

  return (
    <section className="relative mx-auto mt-8 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div className="group grid gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40">
          <div className="pointer-events-none absolute -right-10 -top-10 z-10 h-40 w-40 rounded-full bg-[#d4ff00]/30 blur-3xl" />
          <ExerciseImage
            src={imageUrl}
            alt={name}
            className="p-6"
            imgHeightClass="h-[360px] sm:h-[420px]"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff00]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00]">LIVE</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">EXERCISE // #{String(id).padStart(4, '0')}</p>
            <h1 className="mt-3 font-black uppercase leading-[0.9] tracking-tighter text-white text-4xl sm:text-6xl">{name}</h1>
            <p className="mt-4 text-base text-white/60">
              Lock in the form. Hit the right muscles. Progress on repeat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <InfoPill label="Body" value={bodyPart} />
            <InfoPill label="Target" value={target} />
            <InfoPill label="Gear" value={equipment} />
          </div>

          {Array.isArray(instructions) && instructions.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4ff00]">Execution Protocol</p>
              <ol className="mt-4 space-y-3">
                {instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm leading-relaxed text-white/70">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4ff00] text-[10px] font-black text-black">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Detail;
