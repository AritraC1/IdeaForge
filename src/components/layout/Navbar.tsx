"use client";

import { Bookmark } from "lucide-react";

export default function Navbar() {

  return (
    <nav className="w-full bg-[#f7f8fb] px-8 py-3 flex items-center justify-between">

      {/* Left: Logo */}
      <div className="text-3xl font-bold text-black tracking-tight">
        Idea<span className="text-blue-600">Forge</span>
      </div>

      {/* Right: Icons + Mode changer*/}
      <div className="flex items-center gap-4">
        {/* Settings icon */}
        <Bookmark
          className="text-gray-500 cursor-pointer hover:text-gray-600"
          size={20}
        />

        {/* light/Dark Mode */}
      </div>
    </nav>
  );
}