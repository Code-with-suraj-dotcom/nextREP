import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logomark = () => (
  <div className="flex items-baseline gap-0 font-black tracking-tighter">
    <span className="text-white text-xl sm:text-2xl md:text-3xl">NEXT</span>
    <span className="text-[#d4ff00] text-xl sm:text-2xl md:text-3xl">REP.</span>
  </div>
);

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-8 sm:py-4 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <Logomark />
          <span className="hidden rounded-full border border-[#d4ff00]/40 bg-[#d4ff00]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4ff00] md:inline">LIVE</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold uppercase tracking-[0.18em] md:flex">
          <Link to="/" className="text-white/70 transition-colors hover:text-[#d4ff00]">Home</Link>
          <a href="#exercises" className="text-white/70 transition-colors hover:text-[#d4ff00]">Exercises</a>

          {currentUser ? (
            <>
              <Link to="/library" className="text-white/70 transition-colors hover:text-[#d4ff00]">My&nbsp;Vault</Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] text-white/80 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#d4ff00] px-4 py-2 text-[11px] font-black text-black shadow-[0_0_24px_rgba(212,255,0,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Enter →
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="relative flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] transition-colors hover:border-[#d4ff00] md:hidden"
        >
          <span className={`h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45 bg-[#d4ff00]' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45 bg-[#d4ff00]' : ''}`} />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0a0a0a]/98 backdrop-blur-xl md:hidden transition-[max-height,opacity] duration-300 ${
          menuOpen ? 'max-h-[80vh] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-2 px-4 py-5 text-sm font-bold uppercase tracking-[0.2em]">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/80 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
          >
            <span>Home</span>
            <span className="text-[#d4ff00]">→</span>
          </Link>

          <a
            href="#exercises"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/80 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
          >
            <span>Exercises</span>
            <span className="text-[#d4ff00]">→</span>
          </a>

          {currentUser ? (
            <>
              <Link
                to="/library"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/80 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
              >
                <span>My Vault</span>
                <span className="text-[#d4ff00]">→</span>
              </Link>

              <div className="mt-1 flex items-center justify-between rounded-2xl border border-white/5 bg-black/30 px-5 py-3 text-[10px] font-black tracking-[0.3em] text-white/50">
                <span>SIGNED IN</span>
                <span className="truncate pl-3 text-right normal-case tracking-normal text-white/70">{currentUser.email}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-white/80 transition-colors hover:border-[#d4ff00] hover:text-[#d4ff00]"
              >
                <span>Sign out</span>
                <span className="text-[#d4ff00]">✕</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[#d4ff00] px-5 py-4 font-black tracking-[0.25em] text-black shadow-[0_0_30px_rgba(212,255,0,0.35)]"
            >
              Enter the grind →
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
