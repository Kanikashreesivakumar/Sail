"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingPageProps {
  onComplete: () => void;
}

export function LoadingPage({ onComplete }: LoadingPageProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + 4 
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="mb-8 relative w-40 h-40 mx-auto">
          <Image src="/sail-logo.png" alt="SAIL Logo" width={160} height={160} className="object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-[#002060] mb-6">Welcome to SAIL Guest House Management System</h1>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-[#002060] h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-600 animate-pulse">Loading your experience...</p>
      </div>
    </div>
  )
}
