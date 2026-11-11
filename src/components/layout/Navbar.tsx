"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BookmarksPanel from "./BookmarksPanel";
import { useBookmarks } from "../../lib/bookmarks";

export default function Navbar() {
  const [panelOpen, setPanelOpen] = useState(false);
  const bookmarks = useBookmarks();

  return (
    <nav className="w-full bg-[#f7f8fb] dark:bg-gray-950 px-8 py-3 flex items-center justify-between">

      {/* Left: Logo */}
      <div className="text-3xl font-bold text-black dark:text-white tracking-tight">
        Idea<span className="text-blue-600">Forge</span>
      </div>

      {/* Right: Icons + Mode changer*/}
      <div className="flex items-center gap-4">
        {/* Bookmarks */}
        <div className="relative">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            aria-label="Open bookmarks"
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
          >
            <Bookmark size={20} />
          </button>

          {/* Saved count badge */}
          {bookmarks.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
              {bookmarks.length > 9 ? "9+" : bookmarks.length}
            </span>
          )}
        </div>

        {/* light/Dark Mode */}
        <ThemeToggle />
      </div>

      <BookmarksPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </nav>
  );
}
