import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { blogPosts, categoryColors, type ContentBlock } from '@/mocks/blog';

function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="font-serif text-2xl text-charcoal mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="text-charcoal/80 text-base leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <div className="mb-6">
          {block.title && <p className="font-semibold text-charcoal mb-3 text-sm">{block.title}</p>}
          <ul className="space-y-2">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-charcoal/80 text-base">
                <span className="w-5 h-5 flex items-center justify-center bg-soft-pink/15 rounded-full shrink-0 mt-0.5">
                  <i className="ri-check-line text-deep-pink text-xs" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'tip':
      return (
        <div className="my-7 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-lightbulb-line text-amber-500 text-lg" />
            <span className="font-semibold text-amber-700 text-sm">{block.title}</span>
          </div>
          <p className="text-amber-800/80 text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-soft-pink pl-6">
          <p className="font-serif text-xl text-charcoal italic leading-relaxed mb-3">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.source && (
            <cite className="text-soft-gray text-sm not-italic flex items-center gap-2">
              <i className="ri-subtract-line" />
              {block.source}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32">
          <i className="ri-file-search-line text-6xl text-soft-pink/30 mb-4 block" />
          <h1 className="font-serif text-3xl text-charcoal mb-3">Article not found</h1>
          <p className="text-soft-gray mb-8">This article doesn&rsquo;t seem to exist.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-soft-pink text-white rounded-full font-semibold">
            <i className="ri-arrow-left-line" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  const otherRelated = related.length < 2
    ? blogPosts.filter((p) => p.id !== post.id && !related.includes(p)).slice(0, 2 - related.length)
    : [];
  const relatedPosts = [...related, ...otherRelated].slice(0, 2);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Image */}
      <div className="relative pt-16 md:pt-20 h-[55vh] md:h-[60vh] overflow-hidden">
        <img loading="lazy"
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-4 md:left-8 lg:left-12 flex items-center gap-2 text-white/60 text-sm mt-16">
          <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          <i className="ri-arrow-right-s-line" />
          <span className="text-white/40 truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Post title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 lg:px-12 pb-10 max-w-4xl mx-auto">
          <div className="max-w-4xl">
            <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${categoryColors[post.category] ?? 'bg-white/20 text-white'}`}>
              {post.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <i className="ri-calendar-line" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-time-line" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-map-pin-line" />
                Chelmsford, Essex
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Author */}
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
            <img loading="lazy"
              src="https://static.readdy.ai/image/c24487287299df464f884e0d1e4e7f21/10be41eff302acc40f28c2214ca4a758.jpeg"
              alt="Hamzat Aminat Ayomide"
              className="w-12 h-12 rounded-full object-cover border-2 border-soft-pink/30"
            />
            <div>
              <p className="font-semibold text-charcoal text-sm">Hamzat Aminat Ayomide</p>
              <p className="text-soft-gray text-xs">Baker &amp; Craft Artist &middot; Mide Cakes and Crafts</p>
            </div>
            <Link
              to="/about"
              className="ml-auto text-xs text-deep-pink hover:underline hidden sm:block"
            >
              About the Author
            </Link>
          </div>

          {/* Excerpt */}
          <p className="font-serif text-xl text-charcoal/70 leading-relaxed mb-8 italic">
            {post.excerpt}
          </p>

          {/* Content blocks */}
          <article>
            {post.content.map((block, i) => (
              <ContentRenderer key={i} block={block} />
            ))}
          </article>

          {/* Tags / Share */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-soft-gray text-sm">Category:</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-gray-100 text-charcoal'}`}>
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-soft-gray text-sm hidden sm:block">Share:</span>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://midecakesandcrafts.com')}`} target="_blank" rel="nofollow noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-soft-pink/20 transition-colors cursor-pointer">
                <i className="ri-facebook-line text-charcoal text-sm" />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://midecakesandcrafts.com')}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="nofollow noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-soft-pink/20 transition-colors cursor-pointer">
                <i className="ri-twitter-x-line text-charcoal text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="border-t border-gray-100 pt-12">
              <h2 className="font-serif text-2xl text-charcoal mb-8">You might also enjoy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="group flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-soft-pink/30 transition-all duration-300"
                  >
                    <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0">
                      <img loading="lazy" src={rp.image} alt={rp.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="min-w-0">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[rp.category] ?? ''}`}>
                        {rp.category}
                      </span>
                      <h3 className="font-serif text-sm text-charcoal mt-1.5 leading-snug group-hover:text-deep-pink transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-soft-gray text-xs mt-1">{rp.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link to="/blog" className="inline-flex items-center gap-2 text-deep-pink font-semibold hover:text-charcoal transition-colors">
                <i className="ri-arrow-left-line" />
                Back to all articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 md:px-8 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-soft-pink/10 to-mint/10 rounded-3xl p-8 md:p-12 border border-soft-pink/20">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">Ready to order your dream cake?</h3>
          <p className="text-soft-gray mb-7">Let&rsquo;s create something beautiful together — made fresh in Chelmsford, Essex.</p>
          <Link to="/order" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-soft-pink to-pastel-pink text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 whitespace-nowrap">
            Place an Order
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
