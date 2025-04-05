"use client";


export interface Platform {
  id: string;
  name: string;
  size: string;
}

interface PlatformSelectorProps {
  platforms: Platform[];
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
}

export default function PlatformSelector({
  platforms,
  selectedPlatforms,
  onPlatformToggle,
}: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onPlatformToggle(platform.id)}
          className={`p-4 rounded-lg border-2 transition-colors
            ${
              selectedPlatforms.includes(platform.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
        >
          <h3 className="font-semibold">{platform.name}</h3>
          <p className="text-sm text-gray-500">{platform.size}</p>
        </button>
      ))}
    </div>
  );
} 