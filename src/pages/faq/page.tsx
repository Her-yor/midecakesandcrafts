import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  id: string;
  icon: string;
  title: string;
  color: string;
  bg: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    id: 'ordering',
    icon: 'ri-file-list-3-line',
    title: 'Placing an Order',
    color: 'text-deep-pink',
    bg: 'bg-soft-pink/10',
    items: [
      {
        q: 'How far in advance should I place my order?',
        a: 'We recommend placing your order at least 5–7 days in advance for standard cakes and cupcakes. Wedding cakes require a minimum of 2 weeks notice and a consultation. For very busy periods (Christmas, Valentine\'s Day, Easter), please order even earlier to guarantee your slot.',
      },
      {
        q: 'How do I place an order?',
        a: 'Simply head to our Order Form page, fill in your details, product type, size, flavour, and event date — and we\'ll review your request and get back to you within 24 hours to confirm everything. For urgent orders, you can also call us directly on 07588 635343.',
      },
      {
        q: 'Can I make changes to my order after it\'s been placed?',
        a: 'Minor changes (flavour, wording on a cake topper) can usually be accommodated if requested at least 48 hours before your collection or delivery date. Major changes to design or size depend on how far along we are in the preparation process. Please contact us as soon as possible.',
      },
      {
        q: 'Do you take last-minute orders?',
        a: 'We do our best to accommodate last-minute requests — please call us directly on 07588 635343 to check availability. Same-day orders are not guaranteed but we will always try to help where we can.',
      },
      {
        q: 'How will I know my order has been confirmed?',
        a: 'After submitting your order form, we will contact you within 24 hours by phone or email to confirm your order, discuss any customisation details, and arrange payment. Your order is only confirmed once a deposit has been received.',
      },
    ],
  },
  {
    id: 'customisation',
    icon: 'ri-palette-line',
    title: 'Customisation',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      {
        q: 'Can I request a completely custom design?',
        a: 'Absolutely! Custom designs are our speciality. You can describe your vision, share reference images, or give us creative freedom. We\'ll work with you to bring your dream cake to life. The more detail you give us, the better we can match your expectations.',
      },
      {
        q: 'Can I upload reference photos or inspiration images?',
        a: 'Yes! Our order form includes an optional section where you can upload reference images — photos of designs you love, colour palettes, or themes you\'d like us to match. This is really helpful and we strongly encourage it.',
      },
      {
        q: 'Can you add personalised messages or photos to cakes?',
        a: 'Yes, we can add personalised messages either piped in buttercream, on a fondant plaque, or as an edible photo print. Edible photo prints cost £10 extra and require you to send us a high-quality image at least 3 days before your collection/delivery date.',
      },
      {
        q: 'What flavour options do you offer?',
        a: 'Our most popular flavours include Classic Vanilla, Rich Chocolate, Red Velvet, Lemon, Strawberry, Salted Caramel, and Coffee. We also do custom or seasonal flavours — just let us know in your order form and we\'ll discuss what\'s possible.',
      },
      {
        q: 'Can you recreate a design I found online or on social media?',
        a: 'We can certainly take inspiration from designs you\'ve seen and create something very similar. Due to the handmade nature of our work, each cake is unique, so there may be small differences — but we will always do our very best to match the style, colours, and theme.',
      },
    ],
  },
  {
    id: 'delivery',
    icon: 'ri-truck-line',
    title: 'Delivery & Collection',
    color: 'text-emerald-600',
    bg: 'bg-mint/20',
    items: [
      {
        q: 'Where are you located?',
        a: 'We are based in Chelmsford, Essex (CM1 6FT). Collection is free and available by appointment — we\'ll confirm the exact address and time when your order is confirmed.',
      },
      {
        q: 'Do you offer delivery?',
        a: 'Yes! We offer local delivery within the Chelmsford area for £5. Deliveries outside of Chelmsford are possible and start from £10, depending on distance. Please include your address in the order form and we\'ll confirm the delivery charge with you.',
      },
      {
        q: 'How should I transport my cake after collection?',
        a: 'Please place your cake on a flat surface in the car — never on a seat or held in someone\'s lap. Keep the cake level at all times, especially for tiered cakes. We\'ll provide a sturdy box for transport. Avoid leaving cakes in a hot car for extended periods.',
      },
      {
        q: 'What if I\'m running late to collect my order?',
        a: 'Please let us know as soon as possible. We can usually hold your order for a short while. If you\'re more than 30 minutes late without notice, we may not be able to guarantee the product\'s condition, especially in warm weather.',
      },
    ],
  },
  {
    id: 'pricing',
    icon: 'ri-money-pound-circle-line',
    title: 'Pricing & Payment',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    items: [
      {
        q: 'How much do your cakes cost?',
        a: 'Our cakes start from £35 for a 6-inch celebration cake. Prices vary depending on size, design complexity, and customisation. You can see our full pricing breakdown on the Pricing page. Wedding and highly bespoke cakes are priced after a consultation.',
      },
      {
        q: 'Do you require a deposit?',
        a: 'Yes, we require a 50% non-refundable deposit to secure your order. The remaining balance is due on or before collection/delivery. This helps us cover ingredients and preparation costs for your bespoke order.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfer (BACS), PayPal, and cash on collection. All payment details will be shared when we confirm your order. We do not currently accept credit card payments in person.',
      },
      {
        q: 'What is your refund or cancellation policy?',
        a: 'Deposits are non-refundable as they cover costs already incurred. If you cancel with more than 7 days notice, we will refund any balance paid beyond the deposit. Cancellations within 7 days are non-refundable as ingredients will have been purchased. If we are at fault for any quality issue, we will always work to make it right.',
      },
    ],
  },
  {
    id: 'allergens',
    icon: 'ri-heart-pulse-line',
    title: 'Allergens & Dietary Needs',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    items: [
      {
        q: 'Are your products made in a nut-free environment?',
        a: 'Our kitchen does use nuts in some products, so we cannot guarantee a completely nut-free environment. If you have a severe nut allergy, please let us know and we\'ll discuss what is possible. We take allergies very seriously and always aim to be transparent.',
      },
      {
        q: 'Do you cater for vegans?',
        a: 'Yes, we do! We can create vegan-friendly cakes and cupcakes using plant-based butters, egg substitutes, and dairy-free milk. Please specify this in your order form. Note that vegan options may carry a small additional charge.',
      },
      {
        q: 'Can you accommodate gluten-free diets?',
        a: 'We can prepare gluten-free cakes using gluten-free flour blends. Please note that while we use gluten-free ingredients, we cannot guarantee a fully gluten-free environment due to our shared kitchen. Those with coeliac disease should make an informed decision. A small surcharge may apply.',
      },
      {
        q: 'What allergens are typically in your products?',
        a: 'Our standard recipes contain gluten (wheat flour), dairy (butter, milk, cream), and eggs. Some products may contain soy and nuts. We always recommend letting us know of any allergies when placing your order so we can advise accordingly.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const toggleItem = (sectionId: string, idx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId] === idx ? null : idx,
    }));
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-soft-pink/30 text-deep-pink px-4 py-2 rounded-full text-sm font-medium mb-5">
            <i className="ri-question-answer-line" />
            Frequently Asked Questions
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-2 mb-5">Got Questions?<br />We have Answers.</h1>
          <p className="text-soft-gray text-lg max-w-xl mx-auto">
            Everything you need to know about ordering, customisation, delivery, and more. Can&rsquo;t find what you&rsquo;re looking for? Just get in touch!
          </p>

          {/* Quick jump links */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer ${section.bg} border-transparent hover:border-current ${section.color}`}
              >
                <i className={section.icon} />
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto space-y-10">
          {faqSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${section.bg}`}>
                  <i className={`${section.icon} ${section.color} text-xl`} />
                </div>
                <h2 className="font-serif text-2xl text-charcoal">{section.title}</h2>
              </div>

              {/* Accordion items */}
              <div className="space-y-3">
                {section.items.map((item, idx) => {
                  const isOpen = openItems[section.id] === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen ? 'border-soft-pink/40' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(section.id, idx)}
                        className="w-full flex items-start gap-4 px-6 py-5 text-left cursor-pointer"
                      >
                        <span
                          className={`mt-0.5 w-5 h-5 flex items-center justify-center rounded-full shrink-0 transition-colors duration-200 ${
                            isOpen ? 'bg-soft-pink text-white' : 'bg-gray-100 text-soft-gray'
                          }`}
                        >
                          <i className={`${isOpen ? 'ri-subtract-line' : 'ri-add-line'} text-xs`} />
                        </span>
                        <span className={`font-medium text-sm md:text-base leading-snug transition-colors duration-200 ${isOpen ? 'text-deep-pink' : 'text-charcoal'}`}>
                          {item.q}
                        </span>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-5 pl-14">
                          <p className="text-soft-gray text-sm leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-soft-pink/10 to-mint/10 rounded-3xl p-8 md:p-12 text-center border border-soft-pink/20">
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl mx-auto mb-5">
              <i className="ri-customer-service-2-line text-2xl text-deep-pink" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Still have questions?</h3>
            <p className="text-soft-gray mb-8 max-w-md mx-auto">
              We&rsquo;re always happy to help! Reach out via the contact form, email, or give us a call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <i className="ri-mail-line" />
                Contact Us
              </Link>
              <a
                href="tel:07588635343"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                <i className="ri-phone-line" />
                07588 635343
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
