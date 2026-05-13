import { useEffect, useState } from 'react';

interface LightboxImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const categoryLabels: Record<string, string> = {
  cakes: 'Cakes',
  cupcakes: 'Cupcakes',
  crafts: 'Crafts',
  toppers: 'Cake Toppers',
  snacks: 'Snacks',
};

const categoryColors: Record<string, string> = {
  cakes: 'bg-soft-pink/20 text-soft-pink border-soft-pink/30',
  cupcakes: 'bg-amber-100/80 text-amber-600 border-amber-200',
  crafts: 'bg-mint/20 text-emerald-500 border-mint/30',
  toppers: 'bg-rose-100/80 text-rose-500 border-rose-200',
  snacks: 'bg-orange-100/80 text-orange-600 border-orange-200',
};

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const image = images[currentIndex];
  const total = images.length;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(currentIndex);

  // Smooth image transition between slides
  useEffect(() => {
    setImgLoaded(false);
    const timer = setTimeout(() => setDisplayIndex(currentIndex), 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  const displayedImage = images[displayIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 md:px-8 py-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border capitalize shrink-0 ${categoryColors[displayedImage.category] ?? 'bg-white/10 text-white/70 border-white/20'}`}>
            {categoryLabels[displayedImage.category] ?? displayedImage.category}
          </span>
          <p className="text-white/70 text-sm truncate hidden sm:block">{displayedImage.alt}</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm font-mono shrink-0">
            {currentIndex + 1} <span className="text-white/20">/</span> {total}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <i className="ri-close-line text-white text-xl" />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="flex-1 flex items-center justify-center relative px-4 md:px-16 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="absolute left-2 md:left-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shrink-0"
          aria-label="Previous image"
        >
          <i className="ri-arrow-left-line text-white text-xl" />
        </button>

        <img
          key={displayedImage.src}
          src={displayedImage.src}
          alt={displayedImage.alt}
          onLoad={() => setImgLoaded(true)}
          className={`max-w-full max-h-full object-contain rounded-lg transition-all duration-300 ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          }`}
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        />

        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className="absolute right-2 md:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shrink-0"
          aria-label="Next image"
        >
          <i className="ri-arrow-right-line text-white text-xl" />
        </button>
      </div>

      {/* Bottom strip: thumbnail dots */}
      <div
        className="flex items-center justify-center gap-1.5 py-4 px-4 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              const diff = i - currentIndex;
              if (diff > 0) for (let d = 0; d < diff; d++) onNext();
              else if (diff < 0) for (let d = 0; d > diff; d--) onPrev();
            }}
            className={`rounded-full transition-all duration-200 cursor-pointer ${
              i === currentIndex ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-white/20 text-xs pb-3 shrink-0 hidden md:block">
        Use arrow keys to navigate &nbsp;&middot;&nbsp; Esc to close
      </p>
    </div>
  );
}