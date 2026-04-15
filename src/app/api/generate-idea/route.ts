import { NextResponse } from "next/server";
import { openai } from "../../../lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { interests, difficulty, time, audience, filters } = body;

    const prompt = `
        You are an expert product idea generator.

        Generate ONE highly creative, buildable project idea.

        Requirements:
        - Interests: ${interests?.join(", ")}
        - Difficulty: ${difficulty}
        - Time: ${time}
        - Audience: ${audience || "general users"}
        - Extra filters: ${filters || "none"}

        Return ONLY valid JSON in this format:

        {
        "title": "string",
        "description": "string",
        "features": ["string", "string", "string"],
        "techStack": ["string", "string"]
        }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You generate concise, high-quality startup/project ideas for developers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.9,
      response_format: { type: "json_object" },
    });

    const ideaRaw = response.choices[0]?.message?.content;

    let idea;

    try {
      idea = JSON.parse(ideaRaw || "{}");
    } catch (error) {
      console.log("Error", error);
      console.error("JSON parse failed", ideaRaw);
      return NextResponse.json(
        { error: "Invalid AI response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ idea });
  } catch (error) {
    console.log("Error:", error);

    return NextResponse.json(
      { error: "Failed to generate idea" },
      { status: 500 },
    );
  }
}
