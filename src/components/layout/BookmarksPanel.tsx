"use client";

import { useEffect, useState } from "react";
import { Bookmark, Search, X } from "lucide-react";
import {
  BookmarkedIdea,
  filterBookmarks,
  removeBookmark,
  useBookmarks,
} from "../../lib/bookmarks";

function BookmarkItem({
  bookmark,
  onRemove,
}: {
  bookmark: BookmarkedIdea;
  onRemove: () => void;
}) {
  const date = new Date(bookmark.savedAt).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-5">
      {/* Saved date + remove */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Saved {date}
        </span>
        <button
          onClick={onRemove}
          aria-label={`Remove ${bookmark.title} from bookmarks`}
          className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <Bookmark size={16} fill="currentColor" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug mb-2">
        {bookmark.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
        {bookmark.description}
      </p>

      {/* Features */}
      <div className="space-y-1.5 mb-4">
        {bookmark.features.slice(0, 3).map((feature, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
              {feature}
            </p>
          </div>
        ))}
        {bookmark.features.length > 3 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 pl-3.5">
            +{bookmark.features.length - 3} more features
          </p>
        )}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {bookmark.techStack.map((tech, i) => (
          <span
            key={i}
            className="text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1 bg-white dark:bg-gray-800"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BookmarksPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const bookmarks = useBookmarks();
  const [query, setQuery] = useState("");

  // Reset search when the panel is closed
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const visible = filterBookmarks(bookmarks, query);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        aria-label="Bookmarked ideas"
        className={`fixed inset-y-0 right-0 z-50 w-[420px] max-w-[92vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Bookmarks
              </h2>
              {bookmarks.length > 0 && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">
                  {bookmarks.length}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close bookmarks panel"
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Fuzzy search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bookmarks..."
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <Bookmark
                size={36}
                className="text-gray-300 dark:text-gray-600"
              />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No bookmarks yet
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Click the bookmark icon on any generated idea to save it here.
              </p>
            </div>
          ) : visible.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <Search size={36} className="text-gray-300 dark:text-gray-600" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No matches for “{query}”
              </p>
            </div>
          ) : (
            visible.map((bookmark) => (
              <BookmarkItem
                key={bookmark.title}
                bookmark={bookmark}
                onRemove={() => removeBookmark(bookmark.title)}
              />
            ))
          )}
        </div>
      </aside>
    </>
  );
}
