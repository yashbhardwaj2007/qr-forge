import { Link } from 'react-router-dom';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';
import SEO from '../components/SEO.jsx';
import { BLOG_POSTS } from '../data/blogPosts.js';

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog — QR Code Guides & Tips"
        description="Practical guides on QR codes: how to use them well, what actually works, and answers to common questions — from the team behind QR Forge."
        path="/blog"
      />

      <section className="section pt-16 pb-10 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          QR Forge Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-ink-500 dark:text-ink-400">
          Practical guides on getting the most out of QR codes — no fluff, just what actually works.
        </p>
      </section>

      <section className="section pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {BLOG_POSTS.length === 0 ? (
            <p className="text-center text-ink-400 py-12">More guides are coming soon.</p>
          ) : (
            [...BLOG_POSTS]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group card block p-6 sm:p-7 hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
                >
                  <h2 className="font-display text-xl font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-ink-400">
                      <span className="flex items-center gap-1.5">
                        <HiOutlineCalendar size={14} aria-hidden="true" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HiOutlineClock size={14} aria-hidden="true" />
                        {post.readingTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                      Read
                      <HiOutlineArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))
          )}
        </div>
      </section>
    </>
  );
}
