
import { Sparkles } from "lucide-react"
import Link from "next/link"


const Footer = () => {
  return (
 <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-bold">PixelProse AI</span>
          </div>
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {new Date().getFullYear()} PixelProse AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="terms" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              Terms
            </Link>
            <Link href="privacy" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              Privacy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
  )
}

export default Footer