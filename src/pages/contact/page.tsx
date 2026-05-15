import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Save to database
      await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
      });
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [status]);

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="bg-white rounded-3xl p-10 shadow-sm max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-emerald-600 text-3xl" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2">Message Sent!</h3>
            <p className="text-soft-gray text-sm mb-3">Thank you for reaching out. We will be in touch soon.</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-6 text-sm text-yellow-800 text-left">
              <svg style={{display:"inline",verticalAlign:"middle",marginRight:"6px"}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> <strong>Confirmation email sent!</strong> If you don't see it in your inbox, please check your <strong>spam/junk folder</strong> and mark it as "Not Spam" to receive future updates.
            </div>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="px-6 py-2.5 bg-soft-pink/10 text-deep-pink rounded-full text-sm font-medium hover:bg-soft-pink/20 transition-colors cursor-pointer"
            >
              Send another message
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-3 mb-4">Contact Us</h1>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            Have a question or want to discuss a custom order? We would love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-soft-pink/10 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-map-pin-line text-deep-pink text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                    <p className="text-soft-gray text-sm leading-relaxed">United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-phone-line text-emerald-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                    <a href="tel:07588635343" className="text-soft-gray text-sm hover:text-deep-pink transition-colors">
                      07588 635343
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-mail-line text-amber-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                    <a href="mailto:midecakesandcrafts@yahoo.com" className="text-soft-gray text-sm hover:text-deep-pink transition-colors">
                      midecakesandcrafts@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center shrink-0">
                    <i className="ri-time-line text-sky-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Business Hours</h3>
                    <p className="text-soft-gray text-sm leading-relaxed">
                      Monday - Saturday: 9:00 AM - 6:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-semibold text-charcoal mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: 'ri-instagram-line', label: 'Instagram' },
                    { icon: 'ri-facebook-line', label: 'Facebook' },
                    { icon: 'ri-pinterest-line', label: 'Pinterest' },
                    { icon: 'ri-whatsapp-line', label: 'WhatsApp' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-soft-pink hover:text-white text-charcoal transition-all duration-300"
                      aria-label={social.label}
                    >
                      <i className={`${social.icon} text-xl`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19838.947!2d0.4694!3d51.7356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a6b5c0e8c8c7%3A0x8c8c8c8c8c8c8c8c!2sChelmsford%2C%20Essex%20CM1%206FT!5e0!3m2!1sen!2suk!4v1600000000000!5m2!1sen!2suk"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mide Cakes and Crafts Location"
                  className="w-full"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Send a Message</h2>
              <p className="text-soft-gray text-sm mb-8">
                Fill out the form below and we will get back to you as soon as possible.
              </p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line text-emerald-600 text-3xl" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-soft-gray text-sm mb-3">Thank you for reaching out. We will be in touch soon.</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-6 text-sm text-yellow-800 text-left">
                    <svg style="display:inline;vertical-align:middle;margin-right:6px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> <strong>Confirmation email sent!</strong> If you don't see it in your inbox, please check your <strong>spam/junk folder</strong> and mark it as "Not Spam" to receive future updates.
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-soft-pink/10 text-deep-pink rounded-full text-sm font-medium hover:bg-soft-pink/20 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-readdy-form className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="cake-order">Cake Order Enquiry</option>
                      <option value="cupcake-order">Cupcake Order Enquiry</option>
                      <option value="craft-order">Craft Order Enquiry</option>
                      <option value="custom-request">Custom Request</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm resize-none"
                      placeholder="Tell us about your enquiry..."
                    />
                    <p className="text-soft-gray text-xs mt-1 text-right">{formData.message.length}/500</p>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                      <i className="ri-error-warning-line text-lg shrink-0" />
                      <span>Something went wrong. Please try again or contact us directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin" /> Sending...
                      </span>
                    ) : (
                      <>Send Message <i className="ri-send-plane-line ml-2" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}