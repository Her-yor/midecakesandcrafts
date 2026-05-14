import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/products', label: 'Products' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
  { path: '/order', label: 'Order' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img loading="lazy"
              src="https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/10be41eff302acc40f28c2214ca4a758.jpeg"
              alt="Mide Cakes and Crafts Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <span
              className={`font-script text-lg md:text-xl transition-colors duration-300 ${
                scrolled || !isHome ? 'text-charcoal' : 'text-white'
              }`}
            >
              Mide Cakes
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'bg-soft-pink/20 text-deep-pink'
                    : scrolled || !isHome
                      ? 'text-charcoal hover:bg-soft-pink/10 hover:text-deep-pink'
                      : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              scrolled || !isHome ? 'text-charcoal' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-soft-pink/20 text-deep-pink'
                  : 'text-charcoal hover:bg-soft-pink/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}