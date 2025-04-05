import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SOCIAL_MEDIA_SIZES = {
  facebook: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 },
  reddit: { width: 1200, height: 628 },
};

function getClosestOpenAISize(
  width: number,
  height: number
): "256x256" | "512x512" | "1024x1024" {
  const maxDimension = Math.max(width, height);
  if (maxDimension <= 256) return "256x256";
  if (maxDimension <= 512) return "512x512";
  return "1024x1024";
}

export async function POST(req: Request) {
  try {
    const { imageUrl, platform, caption, backgroundDescription } =
      await req.json();

    if (!imageUrl || !platform) {
      return NextResponse.json(
        { error: "Image URL and platform are required" },
        { status: 400 }
      );
    }

    const size =
      SOCIAL_MEDIA_SIZES[platform as keyof typeof SOCIAL_MEDIA_SIZES];

    let prompt = "Generate a social media optimized image";
    if (backgroundDescription) {
      prompt += ` with a background of: ${backgroundDescription}`;
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: getClosestOpenAISize(size.width, size.height),
    });

    return NextResponse.json({
      url: response.data[0].url,
      caption: caption || "",
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
