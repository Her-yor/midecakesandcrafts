import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/mocks/products';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroCanvas from './components/HeroCanvas';
import Floating3DShowcase from './components/Floating3DShowcase';
import HowToOrder from './components/HowToOrder';
import Testimonials from './components/Testimonials';

/* ───── Scroll Reveal Hook ───── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}

/* ───── Hero Word Cycle ───── */
const cycleWords = ['Passion', 'Love', 'Artistry', 'Heart'];

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const [wordIdx, setWordIdx] = useState(0);
  const [fadeWord, setFadeWord] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeWord(false);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % cycleWords.length);
        setFadeWord(true);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════
          3D ANIMATED HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Layered gradient background */}
        <div className="absolute inset-0 hero-gradient-bg" />

        {/* Animated mesh overlay */}
        <div className="absolute inset-0 hero-mesh-overlay" />

        {/* Canvas sparkle particles */}
        <HeroCanvas />

        {/* Floating decorative orbs */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-soft-pink/20 rounded-full blur-3xl animate-float-orb pointer-events-none" />
        <div className="absolute bottom-32 right-20 w-64 h-64 bg-mint/15 rounded-full blur-3xl animate-float-orb-delay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Main hero grid */}
        <div className="relative z-20 w-full px-4 md:px-8 lg:px-16 pt-20 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">

            {/* Left: Text Content */}
            <div className="flex flex-col justify-center py-12 lg:py-0">
              {/* Logo badge */}
              <div className="flex items-center gap-3 mb-8 hero-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="relative">
                  <img loading="lazy"
                    src="https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/10be41eff302acc40f28c2214ca4a758.jpeg"
                    alt="Mide Cakes Logo"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/30 logo-glow"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                    <i className="ri-star-fill text-white text-[8px]" />
                  </div>
                </div>
                <div>
                  <span className="text-white/60 text-xs tracking-[0.25em] uppercase block">Chelmsford, Essex</span>
                  <span className="text-gold text-sm font-medium tracking-wider">Handcrafted with Love</span>
                </div>
              </div>

              {/* Main headline */}
              <h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6 hero-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Sweet Moments,
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-pastel-pink to-gold">
                    Crafted with{' '}
                  </span>
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-soft-pink to-gold transition-all duration-400"
                    style={{ opacity: fadeWord ? 1 : 0, transition: 'opacity 0.4s ease' }}
                  >
                    {cycleWords[wordIdx]}
                  </span>
                  {/* Animated underline */}
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-soft-pink to-transparent hero-underline" />
                </span>
              </h1>

              <p
                className="text-white/75 text-lg md:text-xl max-w-md mb-8 leading-relaxed hero-slide-up"
                style={{ animationDelay: '0.4s' }}
              >
                Custom cakes, cupcakes, Nigerian snacks, cake toppers and handmade crafts for every special occasion — made fresh in Chelmsford, Essex.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 mb-10 hero-slide-up"
                style={{ animationDelay: '0.55s' }}
              >
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-soft-pink to-deep-pink text-white font-semibold rounded-full hover:shadow-[0_0_40px_rgba(255,140,160,0.6)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  <span>Explore Our Creations</span>
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <i className="ri-arrow-right-line text-sm" />
                  </span>
                </Link>
                <Link
                  to="/order"
                  className="inline-flex items-center justify-center px-7 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/60 backdrop-blur-sm transition-all duration-300 whitespace-nowrap"
                >
                  <i className="ri-cake-3-line mr-2 text-soft-pink" />
                  Place an Order
                </Link>
              </div>

              {/* Stats row */}
              <div
                className="flex flex-wrap gap-5 hero-slide-up"
                style={{ animationDelay: '0.7s' }}
              >
                {[
                  { value: '500+', label: 'Cakes Made' },
                  { value: '5★', label: 'Rating' },
                  { value: '100%', label: 'Handmade' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="text-left">
                      <p className="text-white font-serif text-2xl font-bold leading-none">{stat.value}</p>
                      <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                    </div>
                    <div className="w-px h-8 bg-white/20 last:hidden" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D Cake Showcase */}
            <div
              className="relative h-[420px] md:h-[520px] lg:h-[600px] hero-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <Floating3DShowcase />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <i className="ri-arrow-down-line text-white/40" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURE BADGES STRIP
      ══════════════════════════════════════ */}
      <section className="relative -mt-1 py-6 bg-white/80 backdrop-blur-md border-y border-gray-100">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
          {[
            { icon: 'ri-cake-3-line', label: 'Custom Cakes', color: 'text-deep-pink' },
            { icon: 'ri-cake-3-line', label: 'Cupcakes', color: 'text-soft-pink' },
            { icon: 'ri-restaurant-line', label: 'Nigerian Snacks', color: 'text-amber-500' },
            { icon: 'ri-price-tag-3-line', label: 'Cake Toppers', color: 'text-gold' },
            { icon: 'ri-gift-line', label: 'Gift Boxes', color: 'text-gold' },
            { icon: 'ri-scissors-line', label: 'Handmade Crafts', color: 'text-emerald-500' },
            { icon: 'ri-star-fill', label: '5 Star Rated', color: 'text-amber-400' },
            { icon: 'ri-map-pin-line', label: 'Chelmsford, Essex', color: 'text-charcoal' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 group cursor-default"
            >
              <div className={`w-7 h-7 flex items-center justify-center ${item.color}`}>
                <i className={`${item.icon} text-lg`} />
              </div>
              <span className="text-charcoal text-sm font-medium whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-4 md:px-8 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Our Creations</span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-3 mb-4">
              Sweet Delights,
              <br />
              Snacks &amp; Crafts
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-soft-pink to-mint mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <ScrollReveal key={product.id}>
              <div
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 card-3d-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img loading="lazy"
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-soft-pink to-deep-pink text-white text-sm font-semibold px-3 py-1 rounded-full">
                    £{product.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-charcoal mb-2">{product.name}</h3>
                  <p className="text-soft-gray text-sm line-clamp-2 mb-4">{product.description}</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center text-deep-pink text-sm font-medium group/link hover:text-charcoal transition-colors"
                  >
                    View Details
                    <i className="ri-arrow-right-line ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              View All Products
              <i className="ri-arrow-right-line ml-2" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
          HOW TO ORDER
      ══════════════════════════════════════ */}
      <HowToOrder />

      {/* ══════════════════════════════════════
          ABOUT SNIPPET
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-pastel-pink/20 to-mint/10">
        <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <img loading="lazy"
                  src="https://readdy.ai/api/search-image?query=Warm%20cozy%20home%20bakery%20kitchen%20with%20baking%20tools%20mixing%20bowls%20and%20freshly%20baked%20cakes%20on%20display%20soft%20natural%20lighting%20pastel%20colours%20professional%20interior%20photography%20warm%20inviting%20atmosphere&width=800&height=600&seq=21&orientation=landscape"
                  alt="Bakery workspace"
                  className="rounded-3xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 hidden md:flex items-center gap-3">
                  <div className="w-12 h-12 bg-soft-pink/20 rounded-full flex items-center justify-center">
                    <i className="ri-heart-fill text-deep-pink text-xl" />
                  </div>
                  <div>
                    <p className="font-serif text-charcoal font-semibold">500+ Cakes</p>
                    <p className="text-soft-gray text-sm">Made with Love</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <span className="text-gold text-sm font-medium tracking-widest uppercase">Our Story</span>
              <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-3 mb-6">
                Baked with
                <br />
                Passion
              </h2>
              <p className="text-soft-gray text-lg leading-relaxed mb-6">
                Hi, I am Hamzat Aminat Ayomide, the heart and hands behind Mide Cakes and Crafts.
                Based in Chelmsford, Essex, I create beautiful custom cakes, delicious cupcakes, and
                unique handmade crafts for every special occasion.
              </p>
              <p className="text-soft-gray text-lg leading-relaxed mb-8">
                Every creation is made from scratch with the finest ingredients and lots of love.
                Whether it is a birthday, wedding, baby shower, or just because — I am here to make
                your celebration extra special.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-deep-pink font-semibold hover:text-charcoal transition-colors group"
              >
                Read Our Full Story
                <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <Testimonials />

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="https://readdy.ai/api/search-image?query=Beautiful%20dessert%20table%20display%20with%20various%20cakes%20cupcakes%20and%20pastries%20elegantly%20arranged%20with%20flowers%20and%20candles%20warm%20soft%20lighting%20pastel%20colours%20professional%20event%20photography%20celebration%20atmosphere&width=1920&height=800&seq=22&orientation=landscape"
            alt="Dessert table display"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 px-4 md:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Ready to Order?</h2>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Custom cakes for every special moment in life. Let us create something beautiful together.
            </p>
            <Link
              to="/order"
              className="inline-flex items-center gap-3 bg-white text-charcoal px-8 py-4 rounded-full font-semibold hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300"
            >
              Start Your Order
              <span className="w-10 h-10 bg-gradient-to-r from-soft-pink to-deep-pink rounded-full flex items-center justify-center">
                <i className="ri-arrow-right-line text-white" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}