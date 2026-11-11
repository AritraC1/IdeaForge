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
import { useEffect, useState } from "react";
import {
  isBookmarked,
  subscribe,
  toggleBookmark,
} from "../../lib/bookmarks";

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

  // Track whether this idea is bookmarked (stays in sync with the store)
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(isBookmarked(idea.title));
    sync();
    return subscribe(sync);
  }, [idea.title]);

  const icons = [Mic, Brain, Shield, Activity];

  const actions = [
    {
      icon: Copy,
      active: false,
      onClick: () => {
        navigator.clipboard.writeText(`${idea.title}\n\n${idea.description}`);
      },
    },
    { icon: RefreshCw, active: false, onClick: onRegenerate }, // ✅ now controlled by parent
    {
      icon: Bookmark,
      active: saved,
      onClick: () =>
        toggleBookmark({
          id: `${id}-Muse`,
          title: idea.title,
          description: idea.description,
          features: idea.features ?? [],
          techStack: idea.techStack ?? [],
        }),
    },
    { icon: Share2, active: false, onClick: () => console.log("शेयर किया") },
  ];

  return (
    <div className="w-full max-w-2xl mt-10">
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-sm">
        {/* Actions */}
        <div className="absolute right-5 top-10 flex flex-col gap-5">
          {actions.map(({ icon: Icon, onClick, active }, i) => (
            <button
              key={i}
              onClick={onClick}
              aria-label={active ? "Remove bookmark" : "Bookmark idea"}
              className={`transition-colors cursor-pointer ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              <Icon size={18} fill={active ? "currentColor" : "none"} />
            </button>
          ))}
        </div>

        {/* Badge + ID */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 px-3 py-1 rounded-full uppercase">
            Mobile
          </span>
          <span className="text-sm text-gray-400">#{id}-Muse</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-[#0F1623] dark:text-gray-100 leading-tight mb-5 pr-10">
          {idea.title}
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
          {idea.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-10">
          {idea.features?.map((label, i) => {
            const Icon = icons[i % icons.length];

            return (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} className="text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{label}</p>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-6" />

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Recommended Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {idea.techStack?.map((tech, i) => (
              <span
                key={i}
                className="text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-1.5 bg-white dark:bg-gray-800"
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
