import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-purple max-w-none">
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to PixelProse AI. By accessing or using our service, you agree to be bound by these Terms of Service. 
          If you disagree with any part of the terms, you may not access the service.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Service</h2>
        <p>
          Our service provides AI-powered image generation and content creation tools. You may use these tools for personal 
          or commercial purposes, subject to the restrictions outlined in these terms.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate, complete, and current information. Failure to do so 
          constitutes a breach of the Terms, which may result in immediate termination of your account.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
        <p>
          You retain all rights to the content you create using our service. However, you grant us a license to use, store, 
          and display your content in connection with providing and improving our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
        <p>
          You may not use our service for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction 
          (including but not limited to copyright laws).
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
          under our sole discretion, for any reason whatsoever and without limitation.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 
          30 days&quot; notice prior to any new terms taking effect.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at support@pixelprose.ai.
        </p>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/" className="text-purple-600 hover:text-purple-800">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
} 