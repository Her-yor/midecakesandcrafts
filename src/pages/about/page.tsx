import React from "react";
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Get to Know Us</span>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-3 mb-4">About Mide Cakes</h1>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            Crafting sweet memories and beautiful handmade creations from our home in Chelmsford, Essex.
          </p>
        </div>
      </section>

      {/* Owner Story */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-gold text-sm font-medium tracking-widest uppercase">Meet the Maker</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-3 mb-6">
                Hamzat Aminat Ayomide
              </h2>
              <div className="space-y-4 text-soft-gray leading-relaxed">
                <p>
                  Welcome to Mide Cakes and Crafts! I am Aminat, a passionate baker and crafter 
                  based in Chelmsford, Essex. What started as a hobby baking cakes for family and 
                  friends has grown into a beloved local business serving the Essex community.
                </p>
                <p>
                  I believe that every celebration deserves something special. That is why I pour my 
                  heart into every cake, cupcake, and craft I create. From classic vanilla sponges 
                  to elaborate custom designs, each order is treated with the same care and attention 
                  to detail.
                </p>
                <p>
                  My crafts are equally special - handmade greeting cards, decorated gift boxes, 
                  and party decorations that add a personal touch to any occasion. Everything is 
                  made with love, using quality materials and creative designs.
                </p>
                <p>
                  Whether you are celebrating a birthday, wedding, baby shower, or just want to 
                  treat yourself, I am here to help make it memorable. Let us create something 
                  beautiful together!
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <i className="ri-map-pin-line text-deep-pink" />
                  <span className="text-sm text-charcoal">Chelmsford, Essex CM1 6FT</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <i className="ri-phone-line text-deep-pink" />
                  <span className="text-sm text-charcoal">07588 635343</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <img loading="lazy"
                  src="https://readdy.ai/api/search-image?query=Beautiful%20elegant%20woman%20baker%20in%20a%20warm%20home%20kitchen%20decorating%20a%20cake%20with%20buttercream%20flowers%20wearing%20a%20pastel%20apron%20soft%20natural%20lighting%20warm%20inviting%20atmosphere%20professional%20portrait%20photography%20pastel%20colours&width=600&height=800&seq=23&orientation=portrait"
                  alt="Hamzat Aminat Ayomide - Owner of Mide Cakes and Crafts"
                  className="rounded-3xl shadow-lg w-full"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-soft-pink/20 rounded-full flex items-center justify-center">
                      <i className="ri-award-line text-deep-pink" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">100% Handmade</p>
                      <p className="text-soft-gray text-xs">With Love & Care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="px-4 md:px-8 lg:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Our Values</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-3">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'ri-heart-3-line',
                title: 'Made with Love',
                desc: 'Every creation is crafted with genuine care and passion for what we do.',
                color: 'bg-soft-pink/10 text-deep-pink',
              },
              {
                icon: 'ri-seedling-line',
                title: 'Fresh Ingredients',
                desc: 'We use only the finest, freshest ingredients for the best taste and quality.',
                color: 'bg-mint/20 text-emerald-600',
              },
              {
                icon: 'ri-palette-line',
                title: 'Custom Designs',
                desc: 'Each order is uniquely designed to match your vision and occasion.',
                color: 'bg-amber-100 text-amber-600',
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Quality Assured',
                desc: 'We never compromise on quality. Your satisfaction is our priority.',
                color: 'bg-sky-100 text-sky-600',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-cream rounded-2xl p-6 md:p-8 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-14 h-14 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${value.icon} text-2xl`} />
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">{value.title}</h3>
                <p className="text-soft-gray text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-medium tracking-widest uppercase">Find Us</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-3 mb-6">
                Based in Chelmsford, Essex
              </h2>
              <p className="text-soft-gray leading-relaxed mb-8">
                We are conveniently located in Chelmsford, serving customers throughout Essex and 
                surrounding areas. Local delivery is available, and collection can be arranged 
                from our home-based bakery.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-soft-pink/10 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-map-pin-line text-deep-pink" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">Address</p>
                    <p className="text-soft-gray text-sm">Chelmsford, Essex CM1 6FT, United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-phone-line text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">Phone</p>
                    <a href="tel:07588635343" className="text-soft-gray text-sm hover:text-deep-pink transition-colors">
                      07588 635343
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-mail-line text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">Email</p>
                    <a href="mailto:midecakesandcrafts@yahoo.com" className="text-soft-gray text-sm hover:text-deep-pink transition-colors">
                      midecakesandcrafts@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19838.947!2d0.4694!3d51.7356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a6b5c0e8c8c7%3A0x8c8c8c8c8c8c8c8c!2sChelmsford%2C%20Essex%20CM1%206FT!5e0!3m2!1sen!2suk!4v1600000000000!5m2!1sen!2suk"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mide Cakes and Crafts Location"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}