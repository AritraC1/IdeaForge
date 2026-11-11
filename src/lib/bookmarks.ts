"use client";

import { useEffect, useState } from "react";

export interface BookmarkedIdea {
  /** Display id shown on the card, e.g. "4321-Muse" */
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  savedAt: number;
}

const STORAGE_KEY = "idea-forge:bookmarks";

let cache: BookmarkedIdea[] | null = null;
const listeners = new Set<() => void>();

function read(): BookmarkedIdea[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(items: BookmarkedIdea[]) {
  cache = items;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable (private mode etc.) — keep in-memory only */
  }
  listeners.forEach((listener) => listener());
}

export function getBookmarks(): BookmarkedIdea[] {
  return read();
}

export function isBookmarked(title: string): boolean {
  return read().some((b) => b.title === title);
}

export function toggleBookmark(idea: Omit<BookmarkedIdea, "savedAt">) {
  const items = read();
  const existing = items.findIndex((b) => b.title === idea.title);

  if (existing >= 0) {
    write(items.filter((_, i) => i !== existing));
  } else {
    write([{ ...idea, savedAt: Date.now() }, ...items]);
  }
}

export function removeBookmark(title: string) {
  write(read().filter((b) => b.title !== title));
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React hook: live list of bookmarks (syncs across components and tabs) */
export function useBookmarks(): BookmarkedIdea[] {
  const [bookmarks, setBookmarks] = useState<BookmarkedIdea[]>([]);

  useEffect(() => {
    const update = () => setBookmarks([...read()]);
    update();

    const unsubscribe = subscribe(update);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        cache = null; // another tab changed it
        update();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return bookmarks;
}

/**
 * Fuzzy subsequence match: every character of `query` must appear in
 * `haystack` in order. Returns a relevance score (higher = better) or
 * null when there is no match. Consecutive and start-of-word hits score
 * higher, so "not" matches "Notes App" better than "N...o...t".
 */
function fuzzyScore(haystack: string, needle: string): number | null {
  if (!needle) return 0;

  let score = 0;
  let streak = 0;
  let hi = 0;

  for (const ch of needle) {
    const found = haystack.indexOf(ch, hi);
    if (found === -1) return null;

    if (found === hi && hi > 0) streak += 1;
    else streak = 0;

    const wordStart = found === 0 || haystack[found - 1] === " ";
    score += 1 + streak + (wordStart ? 2 : 0);
    hi = found + 1;
  }

  return score;
}

/** Search bookmarks across title, description and tech stack. */
export function filterBookmarks(
  bookmarks: BookmarkedIdea[],
  query: string
): BookmarkedIdea[] {
  const q = query.toLowerCase().trim();
  if (!q) return bookmarks;

  const scored = bookmarks
    .map((bookmark) => {
      const title = fuzzyScore(bookmark.title.toLowerCase(), q);
      const stack = Math.max(
        0,
        ...bookmark.techStack.map((t) => fuzzyScore(t.toLowerCase(), q) ?? 0)
      );
      const description = fuzzyScore(bookmark.description.toLowerCase(), q);

      const total =
        (title ?? 0) * 3 + (stack || 0) * 2 + (description ?? 0);

      if (title === null && description === null && !stack) return null;
      return { bookmark, total };
    })
    .filter((entry): entry is { bookmark: BookmarkedIdea; total: number } => entry !== null);

  return scored
    .sort((a, b) => b.total - a.total)
    .map((entry) => entry.bookmark);
}
