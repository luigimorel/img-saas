"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign in with Google
          </button>

          <button
            onClick={() => signIn("apple", { callbackUrl })}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
          >
            <Image
              src="/apple.svg"
              alt="Apple"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign in with Apple
          </button>

          <button
            onClick={() => signIn("azure-ad", { callbackUrl })}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Image
              src="/microsoft.svg"
              alt="Microsoft"
              width={20}
              height={20}
              className="mr-2"
            />
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
} 