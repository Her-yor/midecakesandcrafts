import { useState, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { supabase } from '@/lib/supabase';

export default function Order() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productType: '',
    cakeSize: '',
    flavour: '',
    decoration: '',
    eventDate: '',
    quantity: '1',
    deliveryMethod: 'collection',
    address: '',
    specialRequests: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const validFiles = files.filter((f) => f.size <= 10 * 1024 * 1024);
    const newPreviews = validFiles.map((f) => URL.createObjectURL(f));
    setReferenceImages((prev) => [...prev, ...validFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const referenceImageNote =
        referenceImages.length > 0
          ? `${referenceImages.length} reference image(s) uploaded — Uncollectable`
          : 'None';

      const { error: fnError } = await supabase.functions.invoke('send-order-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          productType: formData.productType,
          cakeSize: formData.cakeSize,
          flavour: formData.flavour,
          decoration: formData.decoration,
          eventDate: formData.eventDate,
          quantity: formData.quantity,
          deliveryMethod: formData.deliveryMethod,
          address: formData.address,
          specialRequests: formData.specialRequests,
          referenceImages: referenceImageNote,
        },
      });

      if (!fnError) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          productType: '',
          cakeSize: '',
          flavour: '',
          decoration: '',
          eventDate: '',
          quantity: '1',
          deliveryMethod: 'collection',
          address: '',
          specialRequests: '',
        });
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
        setReferenceImages([]);
        setPreviewUrls([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const showCakeSize = formData.productType === 'cake' || formData.productType === 'cupcakes';
  const showAddress = formData.deliveryMethod === 'delivery';

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Place Your Order</span>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-3 mb-4">Order Form</h1>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            Fill out the details below and we will confirm your order. For urgent orders, please call us directly.
          </p>
        </div>
      </section>

      {/* Order Form */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-check-line text-emerald-600 text-4xl" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Order Submitted!</h2>
                <p className="text-soft-gray mb-2">Thank you for your order. We will review the details and contact you shortly to confirm.</p>
                <p className="text-soft-gray text-sm mb-6">For urgent orders, call us at <a href="tel:07588635343" className="text-deep-pink hover:underline">07588 635343</a></p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 bg-soft-pink/10 text-deep-pink rounded-full text-sm font-medium hover:bg-soft-pink/20 transition-colors cursor-pointer"
                >
                  Place another order
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-readdy-form className="space-y-6">
                {/* Contact Details */}
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-soft-pink/10 rounded-full flex items-center justify-center text-deep-pink text-sm">1</span>
                    Your Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
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
                  </div>
                  <div className="mt-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-mint/20 rounded-full flex items-center justify-center text-emerald-600 text-sm">2</span>
                    Product Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="productType" className="block text-sm font-medium text-charcoal mb-2">Product Type *</label>
                      <select
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Select product type</option>
                        <option value="cake">Custom Cake</option>
                        <option value="cupcakes">Cupcakes</option>
                        <option value="crafts">Handmade Crafts</option>
                        <option value="combo">Cake + Crafts Combo</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-charcoal mb-2">Quantity *</label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {showCakeSize && (
                    <div className="mt-4">
                      <label htmlFor="cakeSize" className="block text-sm font-medium text-charcoal mb-2">
                        {formData.productType === 'cupcakes' ? 'Cupcake Box Size' : 'Cake Size'}
                      </label>
                      <select
                        id="cakeSize"
                        name="cakeSize"
                        value={formData.cakeSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Select size</option>
                        {formData.productType === 'cupcakes' ? (
                          <>
                            <option value="box-6">Box of 6</option>
                            <option value="box-12">Box of 12</option>
                            <option value="box-24">Box of 24</option>
                            <option value="tower">Cupcake Tower (36)</option>
                          </>
                        ) : (
                          <>
                            <option value="6-inch">6-inch (serves 8-10)</option>
                            <option value="8-inch">8-inch (serves 12-16)</option>
                            <option value="10-inch">10-inch (serves 20-25)</option>
                            <option value="2-tier">Two-Tier Cake</option>
                            <option value="3-tier">Three-Tier Cake</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  <div className="mt-4">
                    <label htmlFor="flavour" className="block text-sm font-medium text-charcoal mb-2">Flavour / Style Preference</label>
                    <select
                      id="flavour"
                      name="flavour"
                      value={formData.flavour}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select flavour</option>
                      <option value="vanilla">Classic Vanilla</option>
                      <option value="chocolate">Rich Chocolate</option>
                      <option value="red-velvet">Red Velvet</option>
                      <option value="lemon">Lemon</option>
                      <option value="strawberry">Strawberry</option>
                      <option value="caramel">Salted Caramel</option>
                      <option value="coffee">Coffee</option>
                      <option value="custom">Custom / Other</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="decoration" className="block text-sm font-medium text-charcoal mb-2">Decoration / Theme</label>
                    <input
                      type="text"
                      id="decoration"
                      name="decoration"
                      value={formData.decoration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                      placeholder="e.g., Floral, Unicorn, Minimalist, etc."
                    />
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-sm">3</span>
                    Delivery & Date
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-medium text-charcoal mb-2">Event / Collection Date *</label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="deliveryMethod" className="block text-sm font-medium text-charcoal mb-2">Collection / Delivery *</label>
                      <select
                        id="deliveryMethod"
                        name="deliveryMethod"
                        value={formData.deliveryMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm bg-white"
                      >
                        <option value="collection">Collection (Chelmsford)</option>
                        <option value="delivery">Local Delivery</option>
                      </select>
                    </div>
                  </div>

                  {showAddress && (
                    <div className="mt-4">
                      <label htmlFor="address" className="block text-sm font-medium text-charcoal mb-2">Delivery Address *</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={showAddress}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm resize-none"
                        placeholder="Enter your full delivery address"
                      />
                    </div>
                  )}
                </div>

                {/* Special Requests */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 text-sm">4</span>
                    Additional Information
                  </h3>
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-charcoal mb-2">Special Requests / Allergies</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-soft-pink focus:ring-2 focus:ring-soft-pink/20 outline-none transition-all text-sm resize-none"
                      placeholder="Any dietary requirements, allergies, or special requests..."
                    />
                    <p className="text-soft-gray text-xs mt-1 text-right">{formData.specialRequests.length}/500</p>
                  </div>

                  {/* Reference Image Upload */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-charcoal mb-1">
                      Reference Images&nbsp;
                      <span className="text-soft-gray font-normal text-xs">(Optional)</span>
                    </label>
                    <p className="text-soft-gray text-xs mb-3">
                      Upload photos of designs you love or inspiration images — this helps us understand your vision perfectly.
                    </p>

                    <div
                      className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-soft-pink/60 transition-colors duration-200 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        aria-label="Upload reference images"
                      />
                      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-soft-pink/10 rounded-full">
                        <i className="ri-image-add-line text-2xl text-soft-pink" />
                      </div>
                      <p className="text-sm font-medium text-charcoal">Click to upload inspiration photos</p>
                      <p className="text-xs text-soft-gray mt-1">JPEG, PNG, WebP or GIF &mdash; up to 10 MB each</p>
                    </div>

                    {previewUrls.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                        {previewUrls.map((url, i) => (
                          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                            <img src={url} alt={`Reference ${i + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full cursor-pointer transition-opacity duration-200 hover:bg-white"
                                aria-label="Remove image"
                              >
                                <i className="ri-close-line text-charcoal text-sm" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div
                          className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-soft-pink/60 transition-colors duration-200"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <i className="ri-add-line text-xl text-soft-pink/50" />
                          <span className="text-xs text-soft-gray mt-1">Add more</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  {status === 'error' && (
                    <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                      <i className="ri-error-warning-line text-lg shrink-0" />
                      <span>Something went wrong. Please try again or call us directly at 07588 635343.</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer text-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin" /> Submitting Order...
                      </span>
                    ) : (
                      <>Submit Order <i className="ri-send-plane-line ml-2" /></>
                    )}
                  </button>
                  <p className="text-soft-gray text-xs text-center mt-4">
                    We will contact you within 24 hours to confirm your order and arrange payment.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}