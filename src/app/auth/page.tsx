import AuthForm from "@/components/AuthForm";
import { Suspense } from "react";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
} 