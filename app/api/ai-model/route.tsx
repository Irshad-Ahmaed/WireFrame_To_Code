import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer <OPENROUTER_API_KEY>",
      "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
      "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-pro-exp-02-05:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What is in this image?",
            },
            {
              type: "image_url",
              image_url: {
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              },
            },
          ],
        },
      ],
    }),
  });
}
