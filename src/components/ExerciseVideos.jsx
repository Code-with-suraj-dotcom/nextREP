const VideoSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
    {[...Array(3)].map((_, idx) => (
      <div key={idx} className="h-72 animate-pulse rounded-[1.5rem] border border-white/5 bg-white/[0.03]" />
    ))}
  </div>
);

const VideoCard = ({ video, name }) => {
  const videoId = video?.video?.videoId;
  const title = video?.video?.title ?? name;
  const channel = video?.video?.channelName;
  const thumb = video?.video?.thumbnails?.[0]?.url;

  if (!videoId) return null;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4ff00]/50 hover:shadow-[0_0_40px_rgba(212,255,0,0.15)]"
    >
      <div className="relative overflow-hidden">
        <img
          src={thumb}
          alt={title}
          loading="lazy"
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4ff00] text-xl text-black shadow-[0_0_30px_rgba(212,255,0,0.6)]">▶</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00]">{title}</h3>
        {channel && <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">{channel}</p>}
      </div>
    </a>
  );
};

const ExerciseVideos = ({ videos, name, loading }) => {
  return (
    <section className="mx-auto mt-16 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">VAULT // VIDEOS</p>
          <h2 className="font-black uppercase tracking-tighter leading-[0.9] text-white text-4xl sm:text-5xl">
            Watch <span className="capitalize text-[#d4ff00]">{name}</span> run.
          </h2>
          <p className="text-sm text-white/50">Hand-picked tutorials. Nail form on the first set.</p>
        </div>

        <div className="mt-8">
          {loading ? (
            <VideoSkeleton />
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {videos.slice(0, 3).map((video, idx) => (
                <VideoCard key={video?.video?.videoId ?? idx} video={video} name={name} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#d4ff00]">SIGNAL LOST</p>
              <p className="mt-2 text-base font-medium text-white/60">No videos found right now.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExerciseVideos;
