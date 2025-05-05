"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroPage({ onProceed }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <div className="mb-8 relative w-40 h-40 mx-auto">
          <Image src="/sail-logo.png" alt="SAIL Logo" width={160} height={160} className="object-contain" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#002060] mb-6">SAIL Guest House Management System</h1>

        <p className="text-gray-600 mb-8">
          Welcome to the official guest house booking portal for Steel Authority of India Limited employees.
        </p>

        <Button
          onClick={onProceed}
          className="bg-[#002060] hover:bg-[#003090] text-white px-6 py-3 rounded-md font-medium text-lg"
        >
          Proceed to Admin Login
        </Button>
      </div>
    </div>
  )
}
