import { Button } from "@/components/ui/button"
import Link from "next/link"

interface JumbotronProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  backgroundImage?: string
}

export function Jumbotron({
  title = "Welcome to our platform",
  description = "Discover amazing features and services that will help you achieve your goals.",
  buttonText = "Get Started",
  buttonLink = "#",
  backgroundImage = "/placeholder.svg?height=600&width=1200",
}: JumbotronProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="relative flex flex-col items-center justify-center px-4 py-16 text-center md:py-24 lg:py-32"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-gray-200 md:text-xl">{description}</p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-md px-8">
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

