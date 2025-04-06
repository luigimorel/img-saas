import { Clock, ImageIcon, MessageSquare, Zap } from "lucide-react";

export const BrandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
);

export const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);


 export const platforms = [
  { id: "facebook", name: "Facebook", size: "1200 x 630" },
  { id: "twitter", name: "Twitter", size: "1200 x 675" },
  { id: "instagram", name: "Instagram", size: "1080 x 1080" },
  { id: "linkedin", name: "LinkedIn", size: "1200 x 627" },
  { id: "reddit", name: "Reddit", size: "1200 x 628" },
  { id: "pinterest", name: "Pinterest", size: "1000 x 1500" }
];


export  const features = [
  {
    icon: ImageIcon,
    title: "AI Image Generation",
    description: "Create stunning, unique images tailored to your brand using advanced AI models.",
    content: "Our AI generates high-quality images based on your descriptions, ensuring your content stands out."
  },
  {
    icon: MessageSquare,
    title: "Caption Generation",
    description: "Get engaging, SEO-optimized captions that match your images perfectly.",
    content: "Our AI writes captions that drive engagement and include relevant hashtags for maximum reach."
  },
  {
    icon: Clock,
    title: "Content Scheduling",
    description: "Plan and schedule your posts for optimal engagement times.",
    content: "Create content in advance and let our platform post it at the best times for your audience."
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Create content in seconds, not hours or days.",
    content: "Save time with our lightning-fast AI that generates high-quality content almost instantly."
  },
  {
    icon: BrandIcon,
    title: "Brand Consistency",
    description: "Maintain your brand voice and style across all content.",
    content: "Our AI learns your brand guidelines to ensure all generated content aligns with your identity."
  },
  {
    icon: AnalyticsIcon,
    title: "Analytics & Insights",
    description: "Track performance and optimize your content strategy.",
    content: "Get detailed analytics on how your AI-generated content performs to continuously improve results."
  }
];