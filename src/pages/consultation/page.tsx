import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

const FORM_URL = 'https://readdy.ai/api/form/d7med5tbmnmv4i2ujjo0';

const cakeStyles = [
  { id: 'elegant-classic', label: 'Elegant & Classic', icon: 'ri-vip-crown-line' },
  { id: 'rustic-naked', label: 'Rustic Naked', icon: 'ri-leaf-line' },
  { id: 'floral-botanical', label: 'Floral & Botanical', icon: 'ri-flower-line' },
  { id: 'modern-minimalist', label: 'Modern Minimalist', icon: 'ri-layout-line' },
  { id: 'whimsical-romantic', label: 'Whimsical & Romantic', icon: 'ri-heart-line' },
  { id: 'bold-artistic', label: 'Bold & Artistic', icon: 'ri-palette-line' },
];

const consultationTypes = [
  { id: 'video', label: 'Video Call', sub: 'Google Meet or Zoom', icon: 'ri-video-line' },
  { id: 'phone', label: 'Phone Call', sub: 'We call you', icon: 'ri-phone-line' },
  { id: 'in-person', label: 'In Person', sub: 'Chelmsford, Essex', icon: 'ri-map-pin-2-line' },
];

const steps = [
  { num: '01', icon: 'ri-file-list-3-line', title: 'Submit Your Request', desc: 'Fill in this form with your wedding details and cake vision.' },
  { num: '02', icon: 'ri-phone-line', title: 'We Confirm Within 24h', desc: 'We\'ll review your details and reach out to lock in a time slot.' },
  { num: '03', icon: 'ri-discuss-line', title: '30-Minute Consultation', desc: 'A relaxed, in-depth chat about flavours, design, tiers, and timing.' },
  { num: '04', icon: 'ri-price-tag-3-line', title: 'Receive Your Custom Quote', desc: 'We\'ll send over a tailored quote within 48 hours of your consultation.' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  venue: string;
  guestCount: string;
  budget: string;
  tiers: string;
  flavour: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  hearAboutUs: string;
  vision: string;
  extraNotes: string;
}

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  weddingDate: '',
  venue: '',
  guestCount: '',
  budget: '',
  tiers: '',
  flavour: '',
  consultationType: 'video',
  preferredDate: '',
  preferredTime: '',
  hearAboutUs: '',
  vision: '',
  extraNotes: '',
};

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-charcoal mb-2">
      {children}
      {required && <span className="text-deep-pink ml-1">*</span>}
    </label>
  );
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm bg-white text-charcoal';
const selectCls = `${inputCls} cursor-pointer`;

export default function Consultation() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'vision') setCharCount(value.length);
  };

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      Object.entries(form).forEach(([k, v]) => params.append(k, v));
      const stylesLabel = selectedStyles
        .map((id) => cakeStyles.find((s) => s.id === id)?.label ?? id)
        .join(', ');
      params.append('cakeStyles', stylesLabel || 'Not specified');

      await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedStyles([]);
    setCharCount(0);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] md:min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="https://readdy.ai/api/search-image?query=Breathtaking%20luxury%20wedding%20cake%20three%20tier%20with%20cascading%20ivory%20roses%20gold%20leaf%20accents%20and%20delicate%20sugar%20peonies%20displayed%20on%20marble%20pedestal%20elegant%20reception%20hall%20soft%20candlelight%20bokeh%20background%20sophisticated%20professional%20wedding%20photography%20cinematic&width=1600&height=900&seq=200&orientation=landscape"
            alt="Elegant wedding cake consultation"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 pb-14 md:pb-20 pt-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <i className="ri-star-line text-amber-300" />
              Free Wedding Cake Consultation
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-5">
              Let&rsquo;s Design Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-pink to-pastel-pink">
                Dream Wedding Cake
              </span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Every great wedding cake begins with a conversation. Book your free 30-minute consultation and let&rsquo;s bring your vision to life — handcrafted with love in Chelmsford, Essex.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#book-form"
                className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                <i className="ri-calendar-check-line" />
                Book Now — It&rsquo;s Free
              </a>
              <a
                href="tel:07588635343"
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
              >
                <i className="ri-phone-line" />
                07588 635343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-white border-y border-gray-100 py-5 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: 'ri-shield-check-line', label: '100% Free Consultation', color: 'text-emerald-500' },
            { icon: 'ri-time-line', label: '30-Minute Session', color: 'text-amber-500' },
            { icon: 'ri-reply-line', label: 'Reply Within 24 Hours', color: 'text-deep-pink' },
            { icon: 'ri-heart-line', label: 'No Obligation Quote', color: 'text-soft-pink' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <div className={`w-8 h-8 flex items-center justify-center ${item.color}`}>
                <i className={`${item.icon} text-xl`} />
              </div>
              <span className="text-charcoal text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">The Process</span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-3">What Happens Next</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-soft-pink/40 to-transparent z-0" />
                )}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-soft-pink/30 transition-colors duration-300 h-full relative z-10">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-soft-pink/10 rounded-xl shrink-0">
                      <i className={`${step.icon} text-deep-pink text-lg`} />
                    </div>
                    <span className="font-serif text-3xl text-soft-pink/30 font-bold leading-none mt-1">{step.num}</span>
                  </div>
                  <h3 className="font-semibold text-charcoal mb-2 text-sm">{step.title}</h3>
                  <p className="text-soft-gray text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section id="book-form" className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">Book Your Consultation</h2>
            <p className="text-soft-gray">Fill in the details below and we&rsquo;ll reach out within 24 hours to confirm your slot.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100">
            {submitted ? (
              /* ── SUCCESS STATE ── */
              <div className="text-center py-14">
                <div className="w-20 h-20 mx-auto mb-6 bg-emerald-50 rounded-full flex items-center justify-center">
                  <i className="ri-checkbox-circle-fill text-emerald-500 text-4xl" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Request Received!</h3>
                <p className="text-soft-gray mb-2 max-w-sm mx-auto">
                  Thank you for reaching out. We&rsquo;ll review your details and contact you within 24 hours to confirm your consultation slot.
                </p>
                <p className="text-soft-gray text-sm mb-8">
                  For urgent enquiries, call us at{' '}
                  <a href="tel:07588635343" className="text-deep-pink hover:underline font-medium">07588 635343</a>
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap text-sm"
                  >
                    <i className="ri-refresh-line" />
                    Submit Another Request
                  </button>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm"
                  >
                    <i className="ri-image-line" />
                    Browse Our Gallery
                  </Link>
                </div>
              </div>
            ) : (
              <form
                id="wedding-consultation-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* ── SECTION 1: YOUR DETAILS ── */}
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-soft-pink/10 rounded-full flex items-center justify-center text-deep-pink text-sm font-bold">1</span>
                    Your Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Full Name</FieldLabel>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputCls} placeholder="Your full name" />
                    </div>
                    <div>
                      <FieldLabel required>Email Address</FieldLabel>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <FieldLabel required>Phone Number</FieldLabel>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputCls} placeholder="Your phone number" />
                  </div>
                </div>

                {/* ── SECTION 2: YOUR WEDDING ── */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm font-bold">2</span>
                    Your Wedding
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Wedding Date</FieldLabel>
                      <input type="date" name="weddingDate" value={form.weddingDate} onChange={handleChange} required className={inputCls} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <FieldLabel>Venue Name &amp; Location</FieldLabel>
                      <input type="text" name="venue" value={form.venue} onChange={handleChange} className={inputCls} placeholder="e.g. The Barn, Chelmsford" />
                    </div>
                    <div>
                      <FieldLabel required>Estimated Guest Count</FieldLabel>
                      <select name="guestCount" value={form.guestCount} onChange={handleChange} required className={selectCls}>
                        <option value="">Select guest count</option>
                        <option value="under-50">Under 50 guests</option>
                        <option value="50-100">50 – 100 guests</option>
                        <option value="100-150">100 – 150 guests</option>
                        <option value="150-200">150 – 200 guests</option>
                        <option value="200+">200+ guests</option>
                      </select>
                    </div>
                    <div>
                      <FieldLabel required>Approximate Budget</FieldLabel>
                      <select name="budget" value={form.budget} onChange={handleChange} required className={selectCls}>
                        <option value="">Select budget range</option>
                        <option value="from-150">From £150</option>
                        <option value="150-300">£150 – £300</option>
                        <option value="300-500">£300 – £500</option>
                        <option value="500-800">£500 – £800</option>
                        <option value="800+">£800+</option>
                        <option value="flexible">Flexible / Unsure</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── SECTION 3: CAKE VISION ── */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center text-emerald-600 text-sm font-bold">3</span>
                    Cake Vision
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <FieldLabel>Number of Tiers</FieldLabel>
                      <select name="tiers" value={form.tiers} onChange={handleChange} className={selectCls}>
                        <option value="">Select tiers</option>
                        <option value="1">1 tier</option>
                        <option value="2">2 tiers</option>
                        <option value="3">3 tiers</option>
                        <option value="4+">4+ tiers</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <FieldLabel>Preferred Flavour</FieldLabel>
                      <select name="flavour" value={form.flavour} onChange={handleChange} className={selectCls}>
                        <option value="">Select flavour</option>
                        <option value="vanilla">Classic Vanilla</option>
                        <option value="chocolate">Rich Chocolate</option>
                        <option value="red-velvet">Red Velvet</option>
                        <option value="lemon">Lemon</option>
                        <option value="strawberry">Strawberry</option>
                        <option value="salted-caramel">Salted Caramel</option>
                        <option value="coffee">Coffee</option>
                        <option value="split-tiers">Different per tier</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  {/* Cake style multi-select */}
                  <div className="mb-5">
                    <FieldLabel>Cake Style (select all that appeal)</FieldLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {cakeStyles.map((style) => {
                        const active = selectedStyles.includes(style.id);
                        return (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => toggleStyle(style.id)}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
                              active
                                ? 'border-soft-pink bg-soft-pink/10 text-deep-pink'
                                : 'border-gray-200 text-charcoal hover:border-soft-pink/50'
                            }`}
                          >
                            <div className={`w-6 h-6 flex items-center justify-center shrink-0 rounded-lg ${active ? 'bg-soft-pink/20' : 'bg-gray-100'}`}>
                              <i className={`${style.icon} text-sm ${active ? 'text-deep-pink' : 'text-soft-gray'}`} />
                            </div>
                            <span className="leading-tight">{style.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Describe Your Vision</FieldLabel>
                    <textarea
                      name="vision"
                      value={form.vision}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      className={`${inputCls} resize-none`}
                      placeholder="Tell us about your dream cake — colours, themes, inspiration, any special touches..."
                    />
                    <p className="text-right text-xs text-soft-gray mt-1">{charCount}/500</p>
                  </div>
                </div>

                {/* ── SECTION 4: CONSULTATION PREFERENCES ── */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-sm font-bold">4</span>
                    Consultation Preferences
                  </h3>

                  {/* Consultation type toggle */}
                  <div className="mb-5">
                    <FieldLabel required>How Would You Like to Meet?</FieldLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {consultationTypes.map((type) => {
                        const active = form.consultationType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, consultationType: type.id }))}
                            className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                              active
                                ? 'border-soft-pink bg-soft-pink/10 text-deep-pink'
                                : 'border-gray-200 text-charcoal hover:border-soft-pink/50'
                            }`}
                          >
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${active ? 'bg-soft-pink/20' : 'bg-gray-100'}`}>
                              <i className={`${type.icon} text-xl ${active ? 'text-deep-pink' : 'text-soft-gray'}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{type.label}</p>
                              <p className={`text-xs ${active ? 'text-deep-pink/70' : 'text-soft-gray'}`}>{type.sub}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {/* Hidden input for form submission */}
                    <input type="hidden" name="consultationType" value={form.consultationType} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Preferred Consultation Date</FieldLabel>
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleChange}
                        className={inputCls}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Preferred Time Slot</FieldLabel>
                      <select name="preferredTime" value={form.preferredTime} onChange={handleChange} className={selectCls}>
                        <option value="">Select time</option>
                        <option value="morning">Morning (9am – 12pm)</option>
                        <option value="afternoon">Afternoon (12pm – 5pm)</option>
                        <option value="evening">Evening (5pm – 8pm)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── SECTION 5: OTHER ── */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-5 flex items-center gap-2">
                    <span className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 text-sm font-bold">5</span>
                    A Few More Things
                  </h3>
                  <div className="mb-4">
                    <FieldLabel>How Did You Hear About Us?</FieldLabel>
                    <select name="hearAboutUs" value={form.hearAboutUs} onChange={handleChange} className={selectCls}>
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="friend-family">Friend or Family</option>
                      <option value="wedding-fair">Wedding Fair / Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <FieldLabel>Anything Else We Should Know? <span className="text-soft-gray font-normal text-xs">(Optional)</span></FieldLabel>
                    <textarea
                      name="extraNotes"
                      value={form.extraNotes}
                      onChange={handleChange}
                      rows={3}
                      maxLength={500}
                      className={`${inputCls} resize-none`}
                      placeholder="Dietary requirements, allergies, specific requests, or anything else..."
                    />
                  </div>
                </div>

                {/* ── SUBMIT ── */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <i className="ri-calendar-check-line" />
                        Submit Consultation Request
                      </>
                    )}
                  </button>
                  <p className="text-soft-gray text-xs text-center mt-4">
                    This is a free, no-obligation consultation. We&rsquo;ll confirm your slot within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── GALLERY TEASER ── */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Explore Our Wedding Cakes</h2>
          <p className="text-soft-gray mb-8">Get inspired by our previous creations before your consultation.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { src: 'https://readdy.ai/api/search-image?query=Stunning%20three-tier%20white%20wedding%20cake%20adorned%20with%20fresh%20ivory%20roses%20and%20eucalyptus%20greenery%20elegant%20marble%20cake%20stand%20soft%20studio%20lighting%20cream%20background%20sophisticated%20professional%20food%20photography&width=400&height=500&seq=11&orientation=portrait', alt: 'White rose wedding cake' },
              { src: 'https://readdy.ai/api/search-image?query=Elegant%20floral%20buttercream%20cake%20with%20oversized%20sugar%20roses%20peonies%20and%20greenery%20cascading%20down%20the%20side%20semi-naked%20style%20with%20exposed%20golden%20sponge%20layers%20on%20a%20marble%20stand%20professional%20wedding%20food%20photography&width=400&height=500&seq=36&orientation=portrait', alt: 'Floral cascade wedding cake' },
              { src: 'https://readdy.ai/api/search-image?query=Luxurious%20dark%20chocolate%20drip%20cake%20with%20shimmering%20gold%20leaf%20sheets%20Belgian%20chocolate%20macarons%20and%20dried%20rose%20petals%20on%20top%20slate%20board%20background%20moody%20dramatic%20professional%20food%20photography&width=400&height=500&seq=15&orientation=portrait', alt: 'Chocolate gold wedding cake' },
              { src: 'https://readdy.ai/api/search-image?query=Geometric%20modern%20celebration%20cake%20with%20clean%20sharp%20fondant%20panels%20in%20blush%20and%20gold%20hexagonal%20patterns%20mirror%20glaze%20detail%20and%20minimal%20fresh%20flower%20on%20top%20contemporary%20aesthetic%20professional%20food%20photography&width=400&height=500&seq=38&orientation=portrait', alt: 'Modern geometric wedding cake' },
            ].map((img) => (
              <div key={img.alt} className="aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer">
                <img loading="lazy" src={img.src} alt={img.alt} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300 whitespace-nowrap">
            <i className="ri-image-line" />
            View Full Gallery
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
