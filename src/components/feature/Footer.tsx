import React from "react";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-white">
      {/* Top Section */}
      <div className="w-full px-4 md:px-8 lg:px-12 pt-16 pb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img loading="lazy"
              src="https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/10be41eff302acc40f28c2214ca4a758.jpeg"
              alt="Mide Cakes and Crafts"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="font-script text-2xl text-soft-pink">Mide Cakes and Crafts</span>
          </div>
          <p className="text-light-gray text-lg font-serif italic">
            Sweetening life, one cake at a time
          </p>
        </div>
      </div>

      {/* Middle Navigation Grid */}
      <div className="w-full px-4 md:px-8 lg:px-12 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Cakes</Link></li>
              <li><Link to="/products" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Cupcakes</Link></li>
              <li><Link to="/products" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Crafts</Link></li>
              <li><Link to="/pricing" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Info</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-light-gray hover:text-soft-pink transition-colors text-sm">About Us</Link></li>
              <li><Link to="/gallery" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/blog" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Blog</Link></li>
              <li><Link to="/pricing" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/faq" className="text-light-gray hover:text-soft-pink transition-colors text-sm">FAQs</Link></li>
              <li><Link to="/contact" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><Link to="/order" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Order Form</Link></li>
              <li><Link to="/consultation" className="text-light-gray hover:text-soft-pink transition-colors text-sm">Wedding Consultation</Link></li>
              <li><span className="text-light-gray text-sm">United Kingdom</span></li>
              <li><a href="tel:07588635343" className="text-light-gray hover:text-soft-pink transition-colors text-sm">+44 7588 635343</a></li>
              <li><a href="mailto:midecakesandcrafts@yahoo.com" className="text-light-gray hover:text-soft-pink transition-colors text-sm">midecakesandcrafts@yahoo.com</a></li>
            </ul>
          </div>

          {/* Social & Copyright */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-soft-pink/30 transition-colors" aria-label="Instagram">
                <i className="ri-instagram-line text-lg" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-soft-pink/30 transition-colors" aria-label="Facebook">
                <i className="ri-facebook-line text-lg" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-soft-pink/30 transition-colors" aria-label="Pinterest">
                <i className="ri-pinterest-line text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-light-gray text-sm">
            &copy; {new Date().getFullYear()} Mide Cakes and Crafts. All rights reserved.
          </p>
        </div>
      </div>

      {/* Designed & Developed By Strip */}
      <div className="w-full bg-black/30 border-t border-white/5 py-3 px-4 md:px-8 lg:px-12">
        <p className="text-center text-xs text-white/40 tracking-widest uppercase">
          Designed &amp; Developed by{' '}
          <a
            href="tel:+447491474676"
            className="text-soft-pink/70 font-medium normal-case tracking-normal hover:text-soft-pink transition-colors cursor-pointer"
          >
            ForgeStudioDev
          </a>
          <span className="mx-2 text-white/20">|</span>
          <a
            href="tel:+447491474676"
            className="text-white/30 font-normal normal-case tracking-normal hover:text-white/50 transition-colors cursor-pointer"
          >
            +44 7491 474676
          </a>
        </p>
      </div>
    </footer>
  );
}
