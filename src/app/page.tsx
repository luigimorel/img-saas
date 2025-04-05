"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const platforms = [
  { id: "facebook", name: "Facebook", size: "1200 x 630" },
  { id: "twitter", name: "Twitter", size: "1200 x 675" },
  { id: "reddit", name: "Reddit", size: "1200 x 628" },
];

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [backgroundDescription, setBackgroundDescription] =
    useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    },
  });

  const handleGenerate = async () => {
    if (!selectedFile || selectedPlatforms.length === 0) {
      setError("Please select an image and at least one platform");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { url: uploadedUrl } = await uploadResponse.json();

      // Generate images for all selected platforms
      const newGeneratedImages: Record<string, string> = {};
      
      for (const platform of selectedPlatforms) {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: uploadedUrl,
            platform: platform,
            caption,
            backgroundDescription,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to generate image for ${platform}`);
        }

        newGeneratedImages[platform] = data.url;
      }

      setGeneratedImages(newGeneratedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Social Media Image Generator
      </h1>

      <div className="space-y-8">
        {/* Image Upload Section */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        >
          <input {...getInputProps()} />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-64 mx-auto mb-4"
            />
          ) : (
            <div className="flex flex-col items-center">
              <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg text-gray-600">
                Drag and drop an image here, or click to select
              </p>
            </div>
          )}
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                setSelectedPlatforms(prev => {
                  if (prev.includes(platform.id)) {
                    return prev.filter(p => p !== platform.id);
                  } else {
                    return [...prev, platform.id];
                  }
                });
              }}
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

        <div>
          <label
            htmlFor="background"
            className="block text-sm font-medium text-gray-700 mb-2">
            Background Description (optional)
          </label>
          <textarea
            id="background"
            value={backgroundDescription}
            onChange={(e) => setBackgroundDescription(e.target.value)}
            className="w-full p-2 border rounded-lg h-24"
            placeholder="Describe the background you want (e.g., 'sunset beach', 'urban cityscape', 'minimal white')"
          />
        </div>

        {/* Caption Input */}
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Caption (optional)
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter a caption for your image..."
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !selectedFile || selectedPlatforms.length === 0}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold
            ${
              loading || !selectedFile || selectedPlatforms.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Generating..." : "Generate Images"}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
        )}

        {/* Generated Images */}
        {Object.keys(generatedImages).length > 0 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">Generated Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(generatedImages).map(([platform, url]) => {
                const platformInfo = platforms.find(p => p.id === platform);
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
        )}
      </div>
    </main>
  );
}
