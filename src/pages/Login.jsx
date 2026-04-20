import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { currentUser, loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from ?? '/';

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (currentUser) navigate(redirectTo, { replace: true });
  }, [currentUser, navigate, redirectTo]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
    } catch (err) {
      setError(err?.message?.replace('Firebase: ', '') ?? 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setBusy(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err?.message?.replace('Firebase: ', '') ?? 'Google sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[#d4ff00]/15 blur-[100px]" />

        <div className="rounded-[2rem] border border-white/10 bg-[#111]/90 p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff00]" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4ff00]">
              {mode === 'login' ? 'CHECK-IN // RETURNING' : 'CHECK-IN // NEW RECRUIT'}
            </p>
          </div>

          <h1 className="mt-4 font-black uppercase leading-[0.9] tracking-tighter text-white text-4xl">
            {mode === 'login' ? (<>Welcome<br />Back, <span className="text-[#d4ff00]">Athlete.</span></>) : (<>Join<br />The <span className="text-[#d4ff00]">Grind.</span></>)}
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Save your favorite moves. Build your vault. No excuses.
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:border-[#d4ff00] disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 16.3 4.5 9.7 9 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.7l-6-5.1c-1.9 1.4-4.4 2.3-7 2.3-5.3 0-9.7-3-11.3-7.4l-6.5 5C9.6 39 16.2 43.5 24 43.5z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.3-4.4 5.7l6 5.1c-.4.4 6.6-4.8 6.6-14.8 0-1.2-.1-2.4-.4-3.5z" />
            </svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all focus:border-[#d4ff00] focus:bg-[#d4ff00]/5 focus:ring-4 focus:ring-[#d4ff00]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 h-12 w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all focus:border-[#d4ff00] focus:bg-[#d4ff00]/5 focus:ring-4 focus:ring-[#d4ff00]/20"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="h-12 w-full rounded-full bg-[#d4ff00] text-sm font-black uppercase tracking-[0.25em] text-black shadow-[0_0_40px_rgba(212,255,0,0.35)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? 'Loading…' : mode === 'login' ? 'Sign in →' : 'Create account →'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            {mode === 'login' ? 'New here?' : 'Already in?'}{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#d4ff00] hover:underline"
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>

          <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link to="/" className="hover:text-[#d4ff00]">← Back to home</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
