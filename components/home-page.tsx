"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Phone, Mail, Clock, MapPin } from "lucide-react"

export function HomePage({ onNavigate }) {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#002060] mb-6">Welcome to SAIL Guest House Management</h1>
          <p className="text-lg text-gray-700 mb-8">
            A comprehensive solution for managing guest house accommodations for Steel Authority of India Limited
            employees. Book rooms, select meals, and manage your stay with ease.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => onNavigate("login")} className="bg-[#002060] hover:bg-[#003090]">
              Employee Login <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button
              onClick={() => onNavigate("adminLogin")}
              variant="outline"
              className="border-[#002060] text-[#002060]"
            >
              Admin Login <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md h-80">
            <Image src="/sail-logo.png" alt="SAIL Logo" width={300} height={300} className="object-contain" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-[#002060] mb-8 text-center">Our Guest Houses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Steel House</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
              <p className="text-gray-700 mb-4">
                Premium accommodations designed for executives and management personnel. Featuring luxurious suites,
                conference facilities, and premium dining options.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2 text-[#002060]" />
                  <span>SAIL Township, Block A, Salem</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-[#002060]" />
                  <span>+91 427-2346700</span>
                </li>
                <li className="flex items-center">
                  <Clock size={16} className="mr-2 text-[#002060]" />
                  <span>Check-in: 12:00 PM, Check-out: 11:00 AM</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Mohan Guest House</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
              <p className="text-gray-700 mb-4">
                Comfortable accommodations for all SAIL employees. Offering well-appointed rooms, dining facilities, and
                all essential amenities for a pleasant stay.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2 text-[#002060]" />
                  <span>Mohan Nagar, SAIL Colony, Salem</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-[#002060]" />
                  <span>+91 427-2346800</span>
                </li>
                <li className="flex items-center">
                  <Clock size={16} className="mr-2 text-[#002060]" />
                  <span>Check-in: 12:00 PM, Check-out: 11:00 AM</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-[#002060] mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#002060] text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Login</h3>
              <p className="text-gray-700 text-center">
                Sign in with your employee ID to access the guest house booking system.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#002060] text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Book a Room</h3>
              <p className="text-gray-700 text-center">
                Select your preferred guest house, room type, and dates for your stay.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#002060] text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Confirm & Pay</h3>
              <p className="text-gray-700 text-center">
                Review your booking details, select meal options, and complete the payment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h2 className="text-3xl font-bold text-[#002060] mb-8 text-center">Contact Us</h2>
        <div className="bg-[#f0f4fa] rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Home size={32} className="text-[#002060] mb-4" />
              <h3 className="text-lg font-bold mb-2">Address</h3>
              <p className="text-center">SAIL Corporate Office, Lodhi Road, New Delhi - 110003</p>
            </div>

            <div className="flex flex-col items-center">
              <Phone size={32} className="text-[#002060] mb-4" />
              <h3 className="text-lg font-bold mb-2">Phone</h3>
              <p>+91-11-2436-7481</p>
            </div>

            <div className="flex flex-col items-center">
              <Mail size={32} className="text-[#002060] mb-4" />
              <h3 className="text-lg font-bold mb-2">Email</h3>
              <p>guesthouse@sail.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
