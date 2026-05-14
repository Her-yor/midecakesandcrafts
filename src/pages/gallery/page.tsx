import { useState, useCallback, useEffect } from 'react';
import { galleryImages } from '@/mocks/products';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import Lightbox from './components/Lightbox';

/* ── Video data — paste your YouTube/TikTok embed URL in the src field ── */
const featuredVideos = [
  {
    id: 1,
    title: 'Behind the Scenes — Cake Decorating',
    description: 'Watch how our custom cakes come to life, layer by layer.',
    thumbnail: 'https://readdy.ai/api/search-image?query=Baker%20decorating%20a%20beautiful%20multi-tier%20celebration%20cake%20with%20piping%20bag%20applying%20intricate%20buttercream%20flowers%20pastel%20kitchen%20warm%20soft%20lighting%20close%20up%20hands%20working%20professional%20food%20photography%20behind%20the%20scenes%20bakery%20process&width=800&height=500&seq=501&orientation=landscape',
    src: '', // paste your video embed URL here e.g. https://www.youtube.com/embed/XXXXXXX
  },
  {
    id: 2,
    title: 'Our Creations — A Sweet Showcase',
    description: 'A look at some of our most loved cakes, cupcakes and crafts.',
    thumbnail: 'https://readdy.ai/api/search-image?query=Beautiful%20display%20of%20assorted%20custom%20celebration%20cakes%20cupcakes%20and%20handmade%20crafts%20arranged%20on%20a%20pastel%20table%20with%20flowers%20and%20ribbon%20warm%20natural%20studio%20lighting%20elegant%20product%20showcase%20photography&width=800&height=500&seq=502&orientation=landscape',
    src: '', // paste your video embed URL here
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'toppers', label: 'Cake Toppers' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'crafts', label: 'Crafts' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const selectedLabel = categories.find((c) => c.id === activeCategory)?.label ?? 'All';

  // Smooth category transition
  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(catId);
      setDropdownOpen(false);
      // Small delay before fading back in
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 200);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i !== null && i < filteredImages.length - 1 ? i + 1 : i)), [filteredImages.length]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = () => setDropdownOpen(false);
    setTimeout(() => document.addEventListener('click', handleClick), 0);
    return () => document.removeEventListener('click', handleClick);
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Our Portfolio</span>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-3 mb-4">Gallery</h1>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            A showcase of our finest creations. Each piece is handcrafted with love and attention to detail.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[
              { value: `${galleryImages.length}+`, label: 'Creations Shown' },
              { value: '5', label: 'Categories' },
              { value: '100%', label: 'Handmade' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl text-charcoal font-bold">{stat.value}</p>
                <p className="text-soft-gray text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 md:px-8 lg:px-12 pb-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <p className="text-soft-gray text-sm hidden sm:block">
            Showing <strong className="text-charcoal">{filteredImages.length}</strong> {selectedLabel !== 'All' ? selectedLabel.toLowerCase() : 'creations'}
          </p>

          <div className="relative ml-auto">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
              className="flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-soft-pink/30 rounded-full text-sm font-medium text-charcoal hover:border-soft-pink transition-colors duration-200 cursor-pointer min-w-[160px] justify-between"
            >
              <span>Filter: {selectedLabel}</span>
              <i className={`ri-arrow-down-s-line text-soft-pink text-lg transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl border border-gray-100 overflow-hidden z-20 w-48 shadow-lg">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-soft-pink/10 text-deep-pink'
                        : 'text-charcoal hover:bg-cream'
                    }`}
                  >
                    <i className={`ri-checkbox-circle-fill mr-2 ${activeCategory === cat.id ? 'text-deep-pink' : 'text-transparent'}`} />
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 transition-all duration-200 ${
              isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            {filteredImages.map((image, index) => (
              <div
                key={`${activeCategory}-${image.id}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-cream animate-gallery-item"
                style={{ animationDelay: `${index * 60}ms` }}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                aria-label={`View ${image.alt}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium text-sm leading-snug mb-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    {image.alt}
                  </p>
                  <div className="flex items-center justify-between translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <span className="text-white/70 text-xs capitalize bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {image.category}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                      <i className="ri-zoom-in-line text-charcoal text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20 animate-gallery-item">
              <i className="ri-image-line text-6xl text-soft-pink/30 mb-4 block" />
              <p className="text-soft-gray text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}

      {/* ══════════════════════════════════════
          FEATURED VIDEOS SECTION
      ══════════════════════════════════════ */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Watch &amp; Enjoy</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-3 mb-3">Featured Videos</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-soft-pink to-mint mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVideos.map((video) => (
              <div key={video.id} className="group rounded-2xl overflow-hidden bg-white">
                {/* Thumbnail / Player area */}
                <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setActiveVideo(activeVideo === video.id ? null : video.id)}>
                  <img loading="lazy"
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <i className="ri-play-fill text-deep-pink text-2xl ml-1" />
                    </div>
                  </div>
                  {!video.src && (
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <i className="ri-time-line" />
                      Video coming soon
                    </div>
                  )}
                </div>

                {/* Inline player — shown when clicked and src is available */}
                {activeVideo === video.id && video.src && (
                  <div className="aspect-video bg-black">
                    <iframe
                      src={video.src}
                      title={video.title}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Card info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-charcoal mb-1">{video.title}</h3>
                  <p className="text-soft-gray text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}