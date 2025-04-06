import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SOCIAL_MEDIA_SIZES = {
  facebook: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 },
  instagram: { width: 1080, height: 1080 },
  linkedin: { width: 1200, height: 627 },
  reddit: { width: 1200, height: 628 },
  pinterest: { width: 1000, height: 1500 },
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
    const { 
      imageUrl, 
      platform, 
      caption, 
      heading,
      font,
      imagePrompt,
      style,
      customWidth,
      customHeight
    } = await req.json();

    if (!imageUrl && !imagePrompt) {
      return NextResponse.json(
        { error: "Either an image URL or an image prompt is required" },
        { status: 400 }
      );
    }

    if (!platform) {
      return NextResponse.json(
        { error: "Platform is required" },
        { status: 400 }
      );
    }

     const size = customWidth && customHeight 
      ? { width: customWidth, height: customHeight }
      : SOCIAL_MEDIA_SIZES[platform as keyof typeof SOCIAL_MEDIA_SIZES];

     let prompt = "Generate a social media optimized image";
    
     if (style) {
      prompt += ` in ${style} style`;
    }
    
     if (imagePrompt) {
      prompt += ` of: ${imagePrompt}`;
    }
    
     if (heading) {
      prompt += ` with a heading that says: "${heading}"`;
    }
    
     if (caption) {
      prompt += ` and a caption that says: "${caption}"`;
    }
    
     if (font) {
      prompt += ` using ${font} font`;
    }
    
    if (imageUrl) {
      prompt += ` based on the provided image`;
    }
    
    prompt += ` optimized for ${platform} with dimensions ${size.width}x${size.height}`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: getClosestOpenAISize(size.width, size.height),
    });

    return NextResponse.json({
      url: response.data[0].url,
      caption: caption || "",
      heading: heading || "",
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
