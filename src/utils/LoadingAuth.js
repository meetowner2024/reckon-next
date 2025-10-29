"use client";
import Image from "next/image";
export default function LoadingAuth() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <Image
        src="/assets/images/Paperplane.gif"
        alt="Checking authentication"
        width={120}
        height={120}
        className="mb-6"
      />

      <p className="text-gray-600 text-lg font-medium animate-pulse">
        Checking authentication...
      </p>
    </div>
  );
}
