import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/mocks/products';

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

const avatarImages = [
  'https://readdy.ai/api/search-image?query=Professional%20portrait%20photograph%20of%20a%20smiling%20young%20British%20woman%20with%20warm%20brown%20hair%20soft%20natural%20makeup%20wearing%20casual%20elegant%20blouse%20clean%20bright%20studio%20background%20friendly%20approachable%20expression&width=120&height=120&seq=91&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20portrait%20photograph%20of%20a%20happy%20British%20couple%20smiling%20warmly%20wearing%20smart%20casual%20attire%20clean%20bright%20studio%20background%20warm%20natural%20lighting%20friendly%20expression&width=120&height=120&seq=92&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20portrait%20photograph%20of%20a%20smiling%20young%20Nigerian%20British%20woman%20with%20natural%20hair%20warm%20bright%20smile%20wearing%20colourful%20top%20clean%20studio%20background%20approachable%20expression&width=120&height=120&seq=93&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20portrait%20photograph%20of%20a%20smiling%20middle-aged%20British%20man%20with%20short%20grey%20hair%20wearing%20smart%20shirt%20warm%20studio%20lighting%20clean%20white%20background%20friendly%20expression&width=120&height=120&seq=94&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20portrait%20photograph%20of%20a%20confident%20young%20British%20Muslim%20woman%20wearing%20hijab%20warm%20smile%20bright%20eyes%20elegant%20casual%20attire%20clean%20bright%20studio%20background%20friendly%20expression&width=120&height=120&seq=95&orientation=squarish',
];

const occasionTags = ['Birthday Cake', 'Wedding Cake', 'Baby Shower', 'Greeting Cards', '60th Birthday'];
const tagColors = [
  'bg-soft-pink/15 text-deep-pink',
  'bg-amber-100 text-amber-700',
  'bg-mint/20 text-emerald-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const overallRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-[#fff8f8] via-[#fdfcff] to-[#f8fffc]">
      {/* Section Header */}
      <ScrollReveal>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <i className="ri-star-fill text-amber-400" />
            Trusted by Hundreds of Happy Customers
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Real Reviews from Real People</h2>
          <p className="text-soft-gray text-lg max-w-xl mx-auto">Every review is from a real customer who experienced the magic of a Mide creation first-hand.</p>

          {/* Overall Rating Block */}
          <div className="inline-flex items-center gap-5 mt-8 bg-white border border-gray-100 rounded-2xl px-8 py-5">
            <div className="text-center">
              <p className="font-serif text-5xl text-charcoal font-bold leading-none">{overallRating}</p>
              <div className="flex gap-1 justify-center mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i key={s} className="ri-star-fill text-amber-400 text-lg" />
                ))}
              </div>
              <p className="text-soft-gray text-xs mt-1">{testimonials.length} Reviews</p>
            </div>
            <div className="w-px h-14 bg-gray-100" />
            <div className="text-left space-y-1.5">
              {[5, 4, 3].map((star) => {
                const count = testimonials.filter((t) => t.rating === star).length;
                const pct = Math.round((count / testimonials.length) * 100);
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-soft-gray w-3">{star}</span>
                    <i className="ri-star-fill text-amber-400 text-xs" />
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-soft-gray">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id}>
              <div
                className={`bg-white rounded-2xl p-6 md:p-7 border transition-all duration-300 cursor-pointer h-full flex flex-col ${
                  activeIdx === i
                    ? 'border-soft-pink/50 ring-2 ring-soft-pink/20'
                    : 'border-gray-100 hover:border-soft-pink/30'
                } ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                {/* Quote icon */}
                <div className="w-8 h-8 flex items-center justify-center bg-soft-pink/10 rounded-lg mb-4">
                  <i className="ri-double-quotes-l text-soft-pink text-lg" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <i key={s} className="ri-star-fill text-amber-400 text-sm" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-charcoal text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Occasion tag */}
                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit ${tagColors[i]}`}>
                  {occasionTags[i]}
                </span>

                {/* Reviewer */}
                <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img loading="lazy" width="120" height="120"
                      src={avatarImages[i]}
                      alt={t.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                    <div className="flex items-center gap-1">
                      <i className="ri-map-pin-line text-soft-pink text-xs" />
                      <p className="text-soft-gray text-xs">{t.location}</p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-6 h-6 flex items-center justify-center bg-emerald-50 rounded-full">
                      <i className="ri-checkbox-circle-fill text-emerald-500 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-100 rounded-2xl px-8 py-6">
              <div className="text-left">
                <p className="font-semibold text-charcoal">Loved your order?</p>
                <p className="text-soft-gray text-sm">Share your experience and help others find us!</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm cursor-pointer"
              >
                <i className="ri-star-line" />
                Leave a Review
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
