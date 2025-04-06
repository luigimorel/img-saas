"use client";

import {
  BrainCircuit,
  ImageIcon,
  Layers,
  Menu,
  Palette,
  Settings,
  Share2,
  Type,
  Upload,
  User
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

 import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

 import ErrorMessage from "@/components/ErrorMessage";
import GeneratedImages from "@/components/GeneratedImages";
import { platforms } from "@/constants";


export default function Dashboard() {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [heading, setHeading] = useState<string>("");
  const [font, setFont] = useState<string>("inter");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [style, setStyle] = useState<string>("realistic");
  const [customWidth, setCustomWidth] = useState<string>("1200");
  const [customHeight, setCustomHeight] = useState<string>("630");
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
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

  const handleSelectAllPlatforms = (checked: boolean) => {
    if (checked) {
      setSelectedPlatforms(platforms.map(p => p.id));
    } else {
      setSelectedPlatforms([]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile && !imagePrompt) {
      setError("Please upload an image or provide an image prompt");
      return;
    }

    if (selectedPlatforms.length === 0) {
      setError("Please select at least one platform");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let uploadedUrl = "";
      
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const { url } = await uploadResponse.json();
        uploadedUrl = url;
      }

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
            heading,
            font,
            imagePrompt,
            style,
            customWidth: parseInt(customWidth),
            customHeight: parseInt(customHeight),
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

   if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6" />
            <h1 className="text-xl font-bold">PixelProse AI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary">
              Home
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Templates
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Gallery
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto py-8 px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Social Media Image Generator</h2>
            <p className="text-muted-foreground">Create perfectly sized images for your social media platforms</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Image Preview</CardTitle>
                  <CardDescription>Upload an image or create a new canvas</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div 
                    className="relative w-full aspect-video bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center p-12 text-center hover:bg-muted/40 transition-colors mb-4 overflow-hidden group"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={800}
                        height={400}
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=400&width=800"
                            alt="Preview"
                            width={800}
                            height={400}
                            className="object-cover opacity-0 group-hover:opacity-30 transition-opacity"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 z-10">
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <h3 className="font-semibold text-xl">Drag and drop an image here</h3>
                          <p className="text-sm text-muted-foreground mb-4">SVG, PNG, JPG or GIF (max. 5MB)</p>
                          <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                      </>
                    )}
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Image Editor</CardTitle>
                  <CardDescription>Customize your image with text, filters, and more</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="text">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="text" className="flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        <span className="hidden sm:inline">Text</span>
                      </TabsTrigger>
                      <TabsTrigger value="filters" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                      </TabsTrigger>
                      <TabsTrigger value="layers" className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        <span className="hidden sm:inline">Layers</span>
                      </TabsTrigger>
                      <TabsTrigger value="resize" className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Resize</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="text" className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="heading">Heading</Label>
                        <Input 
                          id="heading" 
                          placeholder="Add a heading..." 
                          value={heading}
                          onChange={(e) => setHeading(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="caption">Caption</Label>
                        <Textarea 
                          id="caption" 
                          placeholder="Add a caption..." 
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="font">Font</Label>
                        <Select value={font} onValueChange={setFont}>
                          <SelectTrigger id="font">
                            <SelectValue placeholder="Select font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="montserrat">Montserrat</SelectItem>
                            <SelectItem value="poppins">Poppins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="filters" className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <Label htmlFor="brightness">Brightness</Label>
                            <span className="text-muted-foreground text-sm">100%</span>
                          </div>
                          <Slider id="brightness" defaultValue={[100]} max={200} step={1} />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <Label htmlFor="contrast">Contrast</Label>
                            <span className="text-muted-foreground text-sm">100%</span>
                          </div>
                          <Slider id="contrast" defaultValue={[100]} max={200} step={1} />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex justify-between">
                            <Label htmlFor="saturation">Saturation</Label>
                            <span className="text-muted-foreground text-sm">100%</span>
                          </div>
                          <Slider id="saturation" defaultValue={[100]} max={200} step={1} />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Choose platforms and dimensions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="select-all" 
                          checked={selectedPlatforms.length === platforms.length}
                          onCheckedChange={handleSelectAllPlatforms}
                        />
                        <Label htmlFor="select-all" className="font-medium">
                          Select All Platforms
                        </Label>
                      </div>
                    </div>
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={platform.id} 
                            checked={selectedPlatforms.includes(platform.id)}
                            onCheckedChange={() => handlePlatformToggle(platform.id)}
                          />
                          <Label htmlFor={platform.id}>{platform.name}</Label>
                        </div>
                        <span className="text-sm text-muted-foreground">{platform.size}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium">Custom Size</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input 
                          id="width" 
                          type="number" 
                          value={customWidth}
                          onChange={(e) => setCustomWidth(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input 
                          id="height" 
                          type="number" 
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium">AI Image Generation</h3>
                    <div className="grid gap-2">
                      <Label htmlFor="prompt">Image Prompt</Label>
                      <Textarea 
                        id="prompt" 
                        placeholder="Describe the image you want to generate..." 
                        rows={4}
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="style">Style</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger id="style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realistic">Realistic</SelectItem>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="abstract">Abstract</SelectItem>
                          <SelectItem value="watercolor">Watercolor</SelectItem>
                          <SelectItem value="3d">3D Render</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleGenerate}
                    disabled={loading || (!selectedFile && !imagePrompt) || selectedPlatforms.length === 0}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    ) : (
                      <BrainCircuit className="mr-2 h-4 w-4" />
                    )}
                    Generate Images
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Error Message */}
          <ErrorMessage message={error} />

          {/* Generated Images */}
          {Object.keys(generatedImages).length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Generated Images</h2>
              <GeneratedImages
                images={generatedImages}
                platforms={platforms}
                caption={caption}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 