import { Suspense, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO, { SITE_URL } from '../components/SEO.jsx';
import BlogPostLayout from '../components/BlogPostLayout.jsx';
import { getBlogPostMeta } from '../data/blogPosts.js';
import { BLOG_POST_COMPONENTS } from './blog/postComponents.js';

function buildArticleSchema(meta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: { '@type': 'Organization', name: 'QR Forge' },
    publisher: {
      '@type': 'Organization',
      name: 'QR Forge',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${meta.slug}` },
  };
}

export default function BlogPost() {
  const { slug } = useParams();
  const meta = getBlogPostMeta(slug);
  const PostContent = meta ? BLOG_POST_COMPONENTS[meta.slug] : null;

  const articleSchema = useMemo(() => (meta ? buildArticleSchema(meta) : null), [meta]);

  if (!meta || !PostContent) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        path={`/blog/${meta.slug}`}
        structuredData={articleSchema}
      />
      <BlogPostLayout meta={meta}>
        <Suspense fallback={<p className="text-ink-400">Loading…</p>}>
          <PostContent />
        </Suspense>
      </BlogPostLayout>
    </>
  );
}
