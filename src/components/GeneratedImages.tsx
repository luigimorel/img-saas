"use client";

import { Platform } from "./PlatformSelector";

interface GeneratedImagesProps {
  images: Record<string, string>;
  platforms: Platform[];
  caption?: string;
}

export default function GeneratedImages({
  images,
  platforms,
  caption,
}: GeneratedImagesProps) {
  if (Object.keys(images).length === 0) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Generated Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(images).map(([platform, url]) => {
          const platformInfo = platforms.find((p) => p.id === platform);
          return (
            <div key={platform} className="space-y-2">
              <h3 className="font-medium">{platformInfo?.name || platform}</h3>
              <img
                src={url}
                alt={`Generated for ${platform}`}
                className="w-full rounded-lg shadow-lg"
              />
              {caption && <p className="text-gray-700 italic">"{caption}"</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
} 