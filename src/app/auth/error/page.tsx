import AuthErrorContent from "@/components/AuthErrorContent";
import { Suspense } from "react";

export default function AuthError() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
} 