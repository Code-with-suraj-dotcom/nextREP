import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FitnessContext } from '../context/FitnessContext.js';

const HeartIcon = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SaveExerciseButton = ({ exercise, className = '' }) => {
  const { currentUser } = useAuth();
  const { savedList, toggleSaved } = useContext(FitnessContext);
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const isSaved = savedList.includes(exercise.id);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setBusy(true);
    try {
      await toggleSaved(exercise.id);
    } catch (err) {
      console.error('Failed to toggle save:', err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-pressed={isSaved}
      aria-label={isSaved ? 'Remove from vault' : 'Save to vault'}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all hover:scale-110 disabled:opacity-60 ${
        isSaved
          ? 'border-[#d4ff00] bg-[#d4ff00]/15 text-[#d4ff00] shadow-[0_0_20px_rgba(212,255,0,0.45)]'
          : 'border-white/15 bg-white/[0.05] text-white/60 hover:border-[#d4ff00]/60 hover:text-[#d4ff00]'
      } ${className}`}
    >
      <HeartIcon filled={isSaved} />
    </button>
  );
};

export default SaveExerciseButton;
