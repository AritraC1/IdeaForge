"use client";

import { useState } from "react";
import Section from "../ui/Section";
import TagGroup from "../ui/TagGroup";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";
import IdeaCard from "../ui/IdeaCard";
import IdeaSkeleton from "../ui/IdeaSkeleton";

export default function IdeaForm() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");
  const [audience, setAudience] = useState("");
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);

  const interests = [
    "AI / ML",
    "Productivity",
    "Games",
    "Finance",
    "Health",
    "Education",
  ];

  const generateIdea = async () => {
    try {
      setLoading(true);
      setIdea(null);

      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interests: selectedInterests,
          difficulty,
          time,
          audience,
        }),
      });

      const data = await res.json();
      setIdea(data.idea);
    } catch (err) {
      console.error("Failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 pb-16">
      <div className="mt-12 w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <Section title="WHAT INTERESTS YOU?">
          <TagGroup
            items={interests}
            selected={selectedInterests}
            onChange={setSelectedInterests}
          />
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Dropdown
            label="DIFFICULTY"
            value={difficulty}
            onChange={setDifficulty}
            options={["Beginner", "Intermediate", "Advanced"]}
          />

          <Dropdown
            label="TIME COMMITMENT"
            value={time}
            onChange={setTime}
            options={["3 days", "1 week", "1 Month", "6 Months", "1 Year"]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Dropdown
            label="TARGET AUDIENCE (OPTIONAL)"
            value={audience}
            onChange={setAudience}
            placeholder="Select an audience..."
            options={["B2B", "B2C", "SAAS", "Personal"]}
          />

          <Input
            label="OTHER FILTERS (OPTIONAL)"
            placeholder="e.g. minimalist, privacy-first"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={generateIdea}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {loading ? "Generating..." : "Forge ideas"}
          </button>
        </div>
      </div>

      {/* RESULT SECTION */}
      <div className="w-full flex justify-center">
        {loading && <IdeaSkeleton />}

        {idea && !loading && (
          <IdeaCard idea={idea} onRegenerate={generateIdea} />
        )}
      </div>
    </div>
  );
}
