"use client";

import { Bookmark } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

  return (
    <nav className="w-full bg-[#f7f8fb] dark:bg-gray-950 px-8 py-3 flex items-center justify-between">

      {/* Left: Logo */}
      <div className="text-3xl font-bold text-black dark:text-white tracking-tight">
        Idea<span className="text-blue-600">Forge</span>
      </div>

      {/* Right: Icons + Mode changer*/}
      <div className="flex items-center gap-4">
        {/* Settings icon */}
        <Bookmark
          className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
          size={20}
        />

        {/* light/Dark Mode */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
