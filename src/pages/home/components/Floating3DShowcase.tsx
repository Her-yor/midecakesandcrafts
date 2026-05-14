import { useRef, useEffect, useState } from 'react';

const showcaseImages = [
  {
    src: 'https://readdy.ai/api/search-image?query=Gorgeous%20white%20three-tier%20wedding%20cake%20with%20elegant%20ivory%20sugar%20roses%20cascading%20down%20the%20side%20gold%20leaf%20accents%20and%20fresh%20greenery%20on%20a%20soft%20cream%20background%20artistic%20food%20photography%20stunning%20details&width=500&height=600&seq=40&orientation=portrait',
    label: 'Wedding Cakes',
    price: 'From £150',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=Stunning%20chocolate%20drip%20birthday%20cake%20with%20smooth%20ganache%20dripping%20down%20gold%20shimmer%20powder%20macarons%20on%20top%20and%20fresh%20flowers%20surrounded%20by%20sparkle%20confetti%20on%20a%20dark%20luxury%20background%20food%20photography&width=500&height=600&seq=41&orientation=portrait',
    label: 'Birthday Cakes',
    price: 'From £35',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=Beautiful%20assorted%20cupcakes%20with%20elaborate%20piped%20buttercream%20flowers%20and%20swirls%20in%20shades%20of%20pink%20coral%20and%20gold%20arranged%20on%20a%20white%20marble%20stand%20aerial%20view%20professional%20bakery%20food%20photography&width=500&height=600&seq=42&orientation=portrait',
    label: 'Cupcakes',
    price: 'From £16',
  },
];

export default function Floating3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseImages.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouseXY({
        x: ((e.clientX - cx) / rect.width) * 18,
        y: ((e.clientY - cy) / rect.height) * 12,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border border-white/10 animate-pulse-ring" />
        <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-soft-pink/20 animate-pulse-ring-delay" />
      </div>

      {/* 3D Card Stack */}
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${mouseXY.x}deg) rotateX(${-mouseXY.y * 0.5}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {showcaseImages.map((img, i) => {
          const offset = i - activeIdx;
          const wrappedOffset = ((offset + showcaseImages.length) % showcaseImages.length);
          const isActive = wrappedOffset === 0;
          const isNext = wrappedOffset === 1;
          const isPrev = wrappedOffset === showcaseImages.length - 1;

          let translateX = 0;
          let translateZ = 0;
          let translateY = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 1;

          if (isActive) {
            translateX = 0;
            translateZ = 60;
            translateY = 0;
            rotateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 30;
          } else if (isNext) {
            translateX = 130;
            translateZ = -30;
            translateY = 30;
            rotateY = -22;
            scale = 0.82;
            opacity = 0.7;
            zIndex = 20;
          } else if (isPrev) {
            translateX = -130;
            translateZ = -30;
            translateY = 30;
            rotateY = 22;
            scale = 0.82;
            opacity = 0.7;
            zIndex = 20;
          } else {
            translateZ = -120;
            scale = 0.65;
            opacity = 0;
            zIndex = 10;
          }

          return (
            <div
              key={img.src}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                width: '220px',
                height: '280px',
                transformStyle: 'preserve-3d',
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity,
                zIndex,
              }}
              onClick={() => setActiveIdx(i)}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: isActive
                    ? '0 30px 80px rgba(255,140,160,0.4), 0 0 40px rgba(212,175,55,0.2)'
                    : '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                <img loading="lazy"
                  src={img.src}
                  alt={img.label}
                  width="500" height="600"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-serif text-lg leading-tight">{img.label}</p>
                  <p className="text-soft-pink text-sm font-semibold mt-1">{img.price}</p>
                </div>

                {/* Active glow border */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-soft-pink/50 pointer-events-none" />
                )}
              </div>

              {/* 3D depth shadow */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    transform: 'translateZ(-20px)',
                    background: 'rgba(255,182,193,0.25)',
                    filter: 'blur(20px)',
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Placeholder height */}
        <div className="w-56 h-72 opacity-0 pointer-events-none" />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {showcaseImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIdx ? 'w-6 h-2 bg-soft-pink' : 'w-2 h-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}