import { useEffect, useRef, useState } from 'react';

const FallbackIllustration = () => (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400">
    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 6.5h11" />
      <rect x="2" y="9" width="3" height="6" rx="1" />
      <rect x="5" y="7" width="2" height="10" rx="1" />
      <rect x="17" y="7" width="2" height="10" rx="1" />
      <rect x="19" y="9" width="3" height="6" rx="1" />
      <path d="M7 12h10" />
    </svg>
    <p className="text-xs font-black uppercase tracking-[0.25em]">Signal lost</p>
  </div>
);

const ExerciseImage = ({ src, alt, className = '', imgHeightClass = 'h-52', enableHoverZoom = true }) => {
  const [status, setStatus] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    setStatus('loading');
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setStatus('loaded');
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] bg-[#f5f5f5] ${className}`}>
      {status === 'loading' && (
        <div className={`absolute inset-0 animate-pulse bg-gradient-to-br from-[#ececec] to-[#f5f5f5] ${imgHeightClass}`} />
      )}

      {status === 'error' ? (
        <div className={`flex w-full items-center justify-center ${imgHeightClass}`}>
          <FallbackIllustration />
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`relative w-full object-contain transition-transform duration-500 ${imgHeightClass} ${
            enableHoverZoom ? 'group-hover:scale-110' : ''
          }`}
        />
      )}
    </div>
  );
};

export default ExerciseImage;
