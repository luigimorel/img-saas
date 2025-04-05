import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface IconProps {
  className?: string;
}

interface FeatureCardProps {
  icon: LucideIcon | React.FC<IconProps>;
  title: string;
  description: string;
  content: string;
}

export function FeatureCard({ icon: Icon, title, description, content }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <Icon className="h-10 w-10 text-purple-600 mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {content}
        </p>
      </CardContent>
    </Card>
  );
} 