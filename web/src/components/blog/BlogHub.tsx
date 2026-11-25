"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, BookOpen, Clock, User, Calendar, ArrowRight, X } from "lucide-react";
import { BlogPostItem } from "@/lib/sample-data";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";

interface BlogHubProps {
  initialPosts: BlogPostItem[];
}

export function BlogHub({ initialPosts }: BlogHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [readingPost, setReadingPost] = useState<BlogPostItem | null>(null);

  // Close reading modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setReadingPost(null);
      }
    };
    if (readingPost) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [readingPost]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach(p => set.add(p.category));
    return Array.from(set);
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      if (selectedCategory !== "ALL" && post.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(q);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchesAuthor = post.author.name.toLowerCase().includes(q);
        const matchesContent = post.content.some(c => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesContent) return false;
      }

      return true;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Filter & Search Bar */}
      <div className="rounded-3xl border border-sand/90 bg-white p-6 shadow-md md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2.5 font-ui">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`rounded-full px-5 py-2 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-brand-900 text-ivory shadow-sm"
                  : "bg-sand/60 text-ink/80 hover:bg-sand"
              }`}
            >
              {messages.blogPage.filterAll}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-ivory shadow-sm"
                    : "bg-sand/60 text-ink/80 hover:bg-sand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={messages.blogPage.searchPlaceholder}
              className="w-full min-h-12 rounded-2xl border border-sand bg-ivory/60 pl-12 pr-4 py-3 text-base font-sans text-ink placeholder:text-muted focus:border-brand-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-sand bg-white p-16 text-center shadow-soft">
          <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-sand text-brand-800">
            <BookOpen className="size-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            {messages.blogPage.noPostsTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-base text-muted">
            {messages.blogPage.noPostsDesc}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              role="button"
              tabIndex={0}
              onClick={() => setReadingPost(post)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setReadingPost(post);
                }
              }}
              className="group flex flex-col justify-between cursor-pointer rounded-3xl border border-sand/90 bg-white p-8 xl:p-10 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:border-brand-600/40 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-700"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-sand px-3.5 py-1.5 font-ui text-xs sm:text-sm font-bold text-brand-900">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 font-ui text-xs sm:text-sm text-muted">
                    <Clock className="size-4" />
                    {toBengaliDigits(post.readTimeMinutes)} মিনিট
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl xl:text-3xl font-bold text-ink group-hover:text-brand-800 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="mt-3 text-base xl:text-lg leading-relaxed text-muted line-clamp-3 font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 border-t border-sand/80 pt-5">
                <div className="flex items-center justify-between font-ui text-sm text-muted">
                  <span className="font-bold text-ink/90">{post.author.name}</span>
                  <span>{formatBengaliDate(post.publishedAt)}</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 font-ui text-sm sm:text-base font-bold text-brand-700 group-hover:text-brand-900">
                  <span>{messages.blogPage.readFullPost}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Full Post Reading Modal */}
      {readingPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/70 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
            <button
              onClick={() => setReadingPost(null)}
              aria-label="বন্ধ করুন"
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-sand/70 text-ink hover:bg-sand transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="space-y-4">
              <span className="rounded-full bg-sand px-3 py-1 font-ui text-xs font-bold text-brand-900">
                {readingPost.category}
              </span>

              <h1 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {readingPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 font-ui text-xs text-muted border-y border-sand py-3">
                <span className="font-semibold text-ink">
                  {readingPost.author.name} ({readingPost.author.role})
                </span>
                <span>•</span>
                <span>{formatBengaliDate(readingPost.publishedAt)}</span>
                <span>•</span>
                <span>{toBengaliDigits(readingPost.readTimeMinutes)} মিনিট পাঠ</span>
              </div>

              <div className="space-y-4 pt-4 text-base leading-relaxed text-ink/90 font-sans">
                {readingPost.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex justify-end border-t border-sand pt-5">
                <button
                  onClick={() => setReadingPost(null)}
                  className="rounded-full bg-brand-900 px-6 py-2 font-ui text-sm font-semibold text-ivory hover:bg-brand-800 cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
