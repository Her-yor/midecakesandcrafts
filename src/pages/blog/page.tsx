import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { blogPosts, blogCategories, categoryColors } from '@/mocks/blog';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  const filtered = activeCategory === 'all'
    ? rest
    : rest.filter((p) => p.category === activeCategory);

  const selectedLabel = blogCategories.find((c) => c.id === activeCategory)?.label ?? 'All Articles';

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Page Header */}
      <section className="pt-24 md:pt-32 pb-14 md:pb-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-pastel-pink/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-soft-pink/30 text-deep-pink px-4 py-2 rounded-full text-sm font-medium mb-5">
            <i className="ri-quill-pen-line" />
            Tips &amp; Inspiration
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mt-2 mb-5">
            Our Blog
          </h1>
          <p className="text-soft-gray text-lg max-w-xl mx-auto">
            Cake decorating tips, event planning ideas, flavour guides, and behind-the-scenes stories from our Chelmsford kitchen.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="px-4 md:px-8 lg:px-12 pb-14">
          <div className="max-w-7xl mx-auto">
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-soft-pink/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ${featured.categoryColor}`}>
                    {featured.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/80 text-xs bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    Featured Article
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4 text-soft-gray text-xs">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-soft-gray/40" />
                  <span>{featured.readTime} min read</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 leading-snug group-hover:text-deep-pink transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-soft-gray text-base leading-relaxed mb-8">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-deep-pink font-semibold text-sm group/link">
                  Read Full Article
                  <i className="ri-arrow-right-line group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category Filter + Grid */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          {/* Filter Row */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <h2 className="font-serif text-2xl text-charcoal">More Articles</h2>

            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-soft-pink/30 rounded-full text-sm font-medium text-charcoal hover:border-soft-pink transition-colors duration-200 cursor-pointer min-w-[160px] justify-between"
              >
                <span>{selectedLabel}</span>
                <i className={`ri-arrow-down-s-line text-soft-pink text-lg transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl border border-gray-100 overflow-hidden z-20 w-48">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => { setActiveCategory(cat.id); setDropdownOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                        activeCategory === cat.id ? 'bg-soft-pink/10 text-deep-pink' : 'text-charcoal hover:bg-cream'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Posts Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-soft-pink/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-charcoal'}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-soft-gray text-xs">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-soft-gray/40" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <h3 className="font-serif text-lg text-charcoal mb-3 leading-snug group-hover:text-deep-pink transition-colors duration-300 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-soft-gray text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-1 text-deep-pink text-sm font-medium mt-auto">
                      Read more
                      <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <i className="ri-article-line text-6xl text-soft-pink/30 mb-4 block" />
              <p className="text-soft-gray text-lg">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-soft-pink/10 to-mint/10 rounded-3xl p-10 md:p-14 border border-soft-pink/20">
          <i className="ri-cake-3-line text-4xl text-soft-pink mb-4 block" />
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Ready to place an order?</h3>
          <p className="text-soft-gray mb-8">Browse our cakes and cupcakes, then fill out our simple order form.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap">
              <i className="ri-file-list-3-line" />
              Order Now
            </Link>
            <Link to="/gallery" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-white transition-all duration-300 whitespace-nowrap">
              <i className="ri-image-line" />
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
