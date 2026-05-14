import React from "react";
import { pricingItems } from '@/mocks/products';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Transparent Pricing</span>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-3 mb-4">Our Pricing</h1>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            Clear and honest pricing for all our cakes, cupcakes, and handmade crafts. 
            Custom orders may vary based on design complexity.
          </p>
        </div>
      </section>

      {/* Featured Creations Strip */}
      <section className="px-4 md:px-8 lg:px-12 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { src: 'https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/cf240030e3fc3c1e04d097b4308ab021.png', alt: 'Custom celebration cake by Mide Cakes' },
              { src: 'https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/37ff9ea04be1ba78c356f48c428408cd.png', alt: 'Special occasion cake by Mide Cakes' },
              { src: 'https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/abb194cd83336d2449acc74a08a6bfac.png', alt: 'Signature handmade cake by Mide Cakes' },
            ].map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-square">
                <img loading="lazy" src={img.src} alt={img.alt} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ))}
          </div>
          <p className="text-center text-soft-gray text-sm mt-4">A few of our favourite recent creations — every order is made with the same care.</p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto space-y-12">
          {pricingItems.map((section) => (
            <div key={section.category} className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-soft-pink/20 to-mint/10 px-6 md:px-8 py-5">
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal">{section.category}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 hover:bg-cream/50 transition-colors"
                  >
                    <span className="text-charcoal font-medium text-sm md:text-base pr-4">{item.name}</span>
                    <span className="text-deep-pink font-semibold text-sm md:text-base whitespace-nowrap shrink-0">
                      {typeof item.price === 'number' ? `£${item.price}` : item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="bg-mint/10 rounded-2xl p-6 md:p-8 flex items-start gap-4">
            <div className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center shrink-0">
              <i className="ri-information-line text-emerald-600 text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal mb-2">Important Notes</h3>
              <ul className="text-soft-gray text-sm space-y-1">
                <li>All prices are in GBP (£) and include basic decoration.</li>
                <li>Complex custom designs may incur additional charges - please enquire.</li>
                <li>Orders should be placed at least 48 hours in advance.</li>
                <li>Wedding cakes require a minimum 2-week notice and consultation.</li>
                <li>Delivery charges apply outside the Chelmsford area.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Wedding Consultation Banner */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="relative overflow-hidden bg-gradient-to-br from-charcoal to-[#2a1a1a] rounded-3xl p-8 md:p-10">
            <div className="absolute inset-0 opacity-10">
              <img loading="lazy"
                src="https://readdy.ai/api/search-image?query=Elegant%20white%20wedding%20cake%20with%20floral%20decorations%20soft%20romantic%20background%20luxury%20bridal%20photography&width=1200&height=500&seq=210&orientation=landscape"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
                  <i className="ri-star-line text-amber-300" />
                  Free Consultation
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">Planning a Wedding Cake?</h3>
                <p className="text-white/60 text-sm max-w-md">
                  Wedding cakes are quoted individually after a free 30-minute consultation. Let&rsquo;s discuss your vision, guest count, and style — no obligation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm"
                >
                  <i className="ri-calendar-check-line" />
                  Book Free Consultation
                </Link>
                <a
                  href="tel:07588635343"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 whitespace-nowrap text-sm"
                >
                  <i className="ri-phone-line" />
                  07588 635343
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <p className="text-soft-gray text-lg mb-6">
            Ready to place your order? Get in touch or fill out our order form.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Order Now
              <i className="ri-arrow-right-line ml-2" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}