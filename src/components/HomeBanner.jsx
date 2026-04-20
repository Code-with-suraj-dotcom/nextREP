import heroVideo from '../assets/hero-video.mp4';

const Marquee = () => (
  <div className="relative overflow-hidden border-y border-white/10 bg-black py-3">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex shrink-0 items-center gap-10 px-6 text-sm font-black uppercase tracking-[0.3em] text-white/80">
          <span>TRAIN HARD</span><span className="text-[#d4ff00]">●</span>
          <span>EAT CLEAN</span><span className="text-[#d4ff00]">●</span>
          <span>SLEEP DEEP</span><span className="text-[#d4ff00]">●</span>
          <span>REPEAT</span><span className="text-[#d4ff00]">●</span>
          <span>NO DAYS OFF</span><span className="text-[#d4ff00]">●</span>
          <span>BUILT DIFFERENT</span><span className="text-[#d4ff00]">●</span>
          <span>1300+ EXERCISES</span><span className="text-[#d4ff00]">●</span>
        </div>
      ))}
    </div>
  </div>
);

const HeroBanner = () => (
  <>
    <section className="relative isolate h-[88vh] min-h-[640px] w-full overflow-hidden bg-[#0a0a0a]">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />

      <div className="pointer-events-none absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-[#d4ff00]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[340px] w-[340px] rounded-full bg-[#ff2625]/15 blur-[110px]" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-4 sm:px-10">
        <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-black/25 p-7 shadow-2xl backdrop-blur-sm sm:p-10">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff00]" />
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#d4ff00]">PROTOCOL ACTIVE</p>
          </div>

          <h1 className="mt-6 font-black uppercase leading-[0.85] tracking-tighter text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            TRAIN LIKE<br />
            YOU <span className="text-[#d4ff00]">MEAN</span> IT.
          </h1>

          <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
            No fluff. No filler. 1,300+ exercises, dialed-in form checks, and a library that actually works with your split.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#exercises"
              className="group inline-flex items-center gap-3 rounded-full bg-[#d4ff00] px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-black shadow-[0_0_40px_rgba(212,255,0,0.45)] transition-transform hover:-translate-y-0.5"
            >
              Enter the grind
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="library"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
            >
              Browse the vault
            </a>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="font-black text-3xl sm:text-4xl text-white">1300<span className="text-[#d4ff00]">+</span></p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">Exercises</p>
            </div>
            <div>
              <p className="font-black text-3xl sm:text-4xl text-white">24/7</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">Access</p>
            </div>
            <div>
              <p className="font-black text-3xl sm:text-4xl text-white">∞</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">Gains</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 bottom-6 z-10 hidden items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm sm:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4ff00]" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">LIVE FEED</span>
      </div>
    </section>

    <Marquee />
  </>
);

export default HeroBanner;
