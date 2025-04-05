"use client";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import GeneratedImages from "@/components/GeneratedImages";
import ImageUploader from "@/components/ImageUploader";
import PlatformSelector from "@/components/PlatformSelector";
import TextInput from "@/components/TextInput";
import { platforms } from "@/constants";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [backgroundDescription, setBackgroundDescription] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    redirect("/auth");
  }

  const handleFileSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setPreviewUrl(previewUrl);
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(p => p !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

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

      // Generate images for all selected platforms in parallel
      const generationPromises = selectedPlatforms.map(platform =>
        fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: uploadedUrl,
            platform,
            caption,
            backgroundDescription,
          }),
        }).then(async response => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || `Failed to generate image for ${platform}`);
          }
          return [platform, data.url];
        })
      );

      const results = await Promise.all(generationPromises);
      const newGeneratedImages = Object.fromEntries(results);
      setGeneratedImages(newGeneratedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.name || "User"}!</h1>
        <p className="text-gray-600">Generate optimized images for your social media platforms.</p>
      </div>

      <div className="space-y-8">
        {/* Image Upload Section */}
        <ImageUploader 
          onFileSelect={handleFileSelect} 
          previewUrl={previewUrl} 
        />

        {/* Platform Selection */}
        <PlatformSelector
          platforms={platforms}
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={handlePlatformToggle}
        />

        {/* Background Description */}
        <TextInput
          id="background"
          label="Background Description (optional)"
          value={backgroundDescription}
          onChange={setBackgroundDescription}
          placeholder="Describe the background you want (e.g., 'sunset beach', 'urban cityscape', 'minimal white')"
          multiline
          rows={4}
        />

        {/* Caption Input */}
        <TextInput
          id="caption"
          label="Caption (optional)"
          value={caption}
          onChange={setCaption}
          placeholder="Enter a caption for your image..."
        />

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!selectedFile || selectedPlatforms.length === 0}
          loading={loading}
          fullWidth
        >
          Generate Images
        </Button>

        {/* Error Message */}
        <ErrorMessage message={error} />

        {/* Generated Images */}
        <GeneratedImages
          images={generatedImages}
          platforms={platforms}
          caption={caption}
        />
      </div>
    </main>
  );
} 