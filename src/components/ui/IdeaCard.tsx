"use client";

import {
  Copy,
  RefreshCw,
  Bookmark,
  Share2,
  Mic,
  Shield,
  Brain,
  Activity,
} from "lucide-react";
import { useState } from "react";

interface Idea {
  title: string;
  description: string;
  features: string[];
  techStack: string[];
}

export default function IdeaCard({
  idea,
  onRegenerate,
}: {
  idea: Idea;
  onRegenerate: () => void;
}) {
  const [id] = useState(() => Math.floor(Math.random() * 9000 + 1000));

  const icons = [Mic, Brain, Shield, Activity];

  const actions = [
    {
      icon: Copy,
      onClick: () => {
        navigator.clipboard.writeText(`${idea.title}\n\n${idea.description}`);
      },
    },
    { icon: RefreshCw, onClick: onRegenerate }, // ✅ now controlled by parent
    { icon: Bookmark, onClick: () => console.log("बुकमार्क किया") },
    { icon: Share2, onClick: () => console.log("शेयर किया") },
  ];

  return (
    <div className="w-full max-w-2xl mt-10">
      <div className="relative bg-white rounded-3xl p-10 shadow-sm">
        {/* Actions */}
        <div className="absolute right-5 top-10 flex flex-col gap-5">
          {actions.map(({ icon: Icon, onClick }, i) => (
            <button
              key={i}
              onClick={onClick}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Badge + ID */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase">
            Mobile
          </span>
          <span className="text-sm text-gray-400">#{id}-Muse</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-[#0F1623] leading-tight mb-5 pr-10">
          {idea.title}
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
          {idea.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-10">
          {idea.features?.map((label, i) => {
            const Icon = icons[i % icons.length];

            return (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} className="text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 leading-snug">{label}</p>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-6" />

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Recommended Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {idea.techStack?.map((tech, i) => (
              <span
                key={i}
                className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-1.5 bg-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
