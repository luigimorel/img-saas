"use client";

import { Menu, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

     return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

   const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
     setIsMenuOpen(false);
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,  
        behavior: 'smooth'
      });
    }
   };
  

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <Link href="/" className="text-xl font-bold">
            PixelProse AI
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/#features" 
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={(e) => handleSmoothScroll(e, 'features')}
          >
            Features
          </Link>
          <Link 
            href="/#how-it-works" 
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
          >
            How It Works
          </Link>
          <Link 
            href="/#pricing" 
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={(e) => handleSmoothScroll(e, 'pricing')}
          >
            Pricing
          </Link>
          <Link 
            href="/#testimonials" 
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={(e) => handleSmoothScroll(e, 'testimonials')}
          >
            Testimonials
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
          ) : session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {session.user?.name || session.user?.email}
              </span>
              <Button
                onClick={() => signOut()}
                variant="ghost"
                size="sm"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth">Log in</Link>
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-gray-900 border border-purple-100 bg-purple-50"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-bold">PixelProse AI</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <nav className="space-y-6">
              <Link
                href="#features"
                className="block text-lg text-gray-600 hover:text-gray-900"
                onClick={(e) => handleSmoothScroll(e, 'features')}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block text-lg text-gray-600 hover:text-gray-900"
                onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="block text-lg text-gray-600 hover:text-gray-900"
                onClick={(e) => handleSmoothScroll(e, 'pricing')}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="block text-lg text-gray-600 hover:text-gray-900"
                onClick={(e) => handleSmoothScroll(e, 'testimonials')}
              >
                Testimonials
              </Link>
            </nav>

            <div className="mt-8 space-y-4">
              {status === "loading" ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
              ) : session ? (
                <>
                  <div className="text-sm text-gray-600">
                    {session.user?.name || session.user?.email}
                  </div>
                  <Button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start px-0 hover:bg-transparent"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-0 hover:bg-transparent"
                    asChild
                  >
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 