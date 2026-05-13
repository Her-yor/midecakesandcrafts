import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    icon: 'ri-search-eye-line',
    title: 'Browse Our Creations',
    desc: 'Explore our range of custom cakes, cupcakes, and handmade crafts. Check our pricing page and gallery for inspiration.',
    color: 'from-soft-pink to-deep-pink',
    bg: 'bg-soft-pink/10',
    border: 'border-soft-pink/30',
    accent: 'text-deep-pink',
  },
  {
    number: '02',
    icon: 'ri-file-list-3-line',
    title: 'Fill the Order Form',
    desc: 'Complete our simple online order form with your product choice, size, flavour, decoration theme, and event date.',
    color: 'from-gold to-amber-400',
    bg: 'bg-gold/10',
    border: 'border-gold/30',
    accent: 'text-amber-600',
  },
  {
    number: '03',
    icon: 'ri-phone-line',
    title: 'We Confirm & Discuss',
    desc: 'We will contact you within 24 hours to confirm your order details, discuss any custom requirements, and arrange payment.',
    color: 'from-mint to-emerald-400',
    bg: 'bg-mint/20',
    border: 'border-mint/40',
    accent: 'text-emerald-600',
  },
  {
    number: '04',
    icon: 'ri-cake-3-line',
    title: 'Your Order Gets Made',
    desc: 'We handcraft your order from scratch using only the finest ingredients and lots of love — tailored exactly to your specifications.',
    color: 'from-[#C9A0A0] to-soft-pink',
    bg: 'bg-[#C9A0A0]/10',
    border: 'border-[#C9A0A0]/30',
    accent: 'text-[#C9A0A0]',
  },
  {
    number: '05',
    icon: 'ri-truck-line',
    title: 'Collect or Delivery',
    desc: 'Collect from our Chelmsford location or opt for local delivery. Your creation arrives beautifully packaged and ready to wow.',
    color: 'from-deep-pink to-pastel-pink',
    bg: 'bg-deep-pink/10',
    border: 'border-deep-pink/20',
    accent: 'text-deep-pink',
  },
];

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

export default function HowToOrder() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">

        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-soft-pink/10 text-deep-pink px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="ri-information-line" />
              First Time Ordering?
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mt-2 mb-4">
              How to Order
            </h2>
            <p className="text-soft-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Ordering your dream cake or craft is simple. Follow these five easy steps and we will handle the rest.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-soft-pink to-mint mx-auto mt-6" />
          </div>
        </ScrollReveal>

        {/* ── Mobile: Vertical Timeline ── */}
        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number}>
              <div className="flex gap-4">
                {/* Timeline column */}
                <div className="flex flex-col items-center shrink-0 w-12">
                  {/* Icon circle */}
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md shrink-0 z-10`}
                  >
                    <i className={`${step.icon} text-white text-xl`} />
                  </div>
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-gray-200 to-gray-100 my-1 min-h-[40px]" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-8 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
                  <div className={`${step.bg} border ${step.border} rounded-2xl p-5`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold tracking-widest ${step.accent} uppercase`}>
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-charcoal mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-soft-gray text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Desktop: Single Row Horizontal Timeline ── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4 lg:gap-6 relative">
            {/* Continuous connecting line through all 5 circles */}
            <div className="absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-soft-pink via-gold via-mint via-[#C9A0A0] to-deep-pink z-0" />

            {steps.map((step) => (
              <ScrollReveal key={step.number}>
                <div className="flex flex-col items-center text-center group">
                  {/* Icon + Number circle */}
                  <div className="relative z-10 mb-5">
                    <div
                      className={`w-[104px] h-[104px] rounded-full bg-gradient-to-br ${step.color} flex flex-col items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                    >
                      <i className={`${step.icon} text-white text-2xl mb-1`} />
                      <span className="text-white/80 text-xs font-bold tracking-widest">{step.number}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`${step.bg} border ${step.border} rounded-2xl p-5 w-full transition-all duration-300 group-hover:-translate-y-1`}
                  >
                    <h3 className="font-serif text-base lg:text-lg text-charcoal mb-2 leading-snug">{step.title}</h3>
                    <p className="text-soft-gray text-xs lg:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="mt-14 md:mt-16 text-center">
            <div className="inline-block bg-gradient-to-br from-soft-pink/10 to-mint/10 border border-soft-pink/20 rounded-3xl px-8 py-8 md:px-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-soft-pink/20 rounded-full">
                  <i className="ri-heart-3-line text-deep-pink text-xl" />
                </div>
                <p className="font-serif text-xl md:text-2xl text-charcoal">
                  Ready to place your order?
                </p>
              </div>
              <p className="text-soft-gray text-sm mb-6 max-w-md mx-auto">
                It only takes a few minutes. For urgent orders, feel free to call us directly on
                <a href="tel:07588635343" className="text-deep-pink font-semibold ml-1 hover:underline">
                  07588 635343
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/order"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-soft-pink to-deep-pink text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  <i className="ri-file-list-3-line" />
                  Start Order Form
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300 whitespace-nowrap"
                >
                  <i className="ri-price-tag-3-line" />
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}