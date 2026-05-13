import { useState } from 'react';
import { products } from '@/mocks/products';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'cupcakes', label: 'Cupcakes' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'toppers', label: 'Cake Toppers' },
  { id: 'crafts', label: 'Crafts' },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const selectedLabel = categories.find((c) => c.id === activeCategory)?.label ?? 'All Products';

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-soft-gray text-xs tracking-[0.3em] uppercase font-medium">Our Collection</span>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-3 mb-4">Our Products</h1>
          <p className="text-soft-gray text-lg max-w-2xl mx-auto">
            Discover our range of custom cakes, cupcakes, Nigerian snacks, beautiful cake toppers, and handmade crafts.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 md:px-8 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-soft-pink/30 rounded-full text-sm font-medium text-charcoal hover:border-soft-pink transition-colors duration-200 cursor-pointer min-w-[180px] justify-between"
            >
              <span>{selectedLabel}</span>
              <i className={`ri-arrow-down-s-line text-soft-pink text-lg transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-20">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setActiveCategory(cat.id); setDropdownOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-soft-pink/10 text-deep-pink'
                        : 'text-charcoal hover:bg-cream'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-product-shop
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-soft-pink text-white text-sm font-semibold px-3 py-1 rounded-full">
                    £{product.price}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {product.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-charcoal mb-2">{product.name}</h3>
                  <p className="text-soft-gray text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-deep-pink font-semibold">£{product.price}</span>
                    <a
                      href="/order"
                      className="inline-flex items-center text-sm text-mint font-medium hover:text-deep-pink transition-colors"
                    >
                      Order Now
                      <i className="ri-arrow-right-line ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <i className="ri-cake-3-line text-6xl text-soft-pink/30 mb-4" />
              <p className="text-soft-gray text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}