"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { format, addDays, differenceInHours } from "date-fns"

export function BookingDates({ employeeData, bookingType, bookingCharge, onContinue, onBack }) {
  const [checkInDate, setCheckInDate] = useState("")
  const [checkInTime, setCheckInTime] = useState("15:00")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [checkOutTime, setCheckOutTime] = useState("15:00")
  const [error, setError] = useState("")

  const validateDates = () => {
    if (!checkInDate || !checkInTime || !checkOutDate || !checkOutTime) {
      setError("Please select all date and time fields")
      return false
    }

    const checkIn = new Date(`${checkInDate}T${checkInTime}:00`)
    const checkOut = new Date(`${checkOutDate}T${checkOutTime}:00`)

    if (checkIn >= checkOut) {
      setError("Check-out must be after check-in")
      return false
    }

    const hoursDifference = differenceInHours(checkOut, checkIn)
    if (hoursDifference < 24) {
      setError("Minimum booking duration is 24 hours")
      return false
    }

    return true
  }

  const handleContinue = () => {
    if (validateDates()) {
      const checkIn = new Date(`${checkInDate}T${checkInTime}:00`)
      const checkOut = new Date(`${checkOutDate}T${checkOutTime}:00`)

      onContinue({
        employeeData,
        bookingType,
        bookingCharge,
        checkIn,
        checkOut,
        duration: Math.ceil(differenceInHours(checkOut, checkIn) / 24), // Duration in days
      })
    }
  }

  // Set minimum check-out date to be the day after check-in
  const minCheckOutDate = checkInDate ? format(addDays(new Date(checkInDate), 1), "yyyy-MM-dd") : ""

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Image src="/sail-logo.png" alt="SAIL Logo" width={40} height={40} className="object-contain" />
          <h1 className="text-xl font-bold text-[#002060] ml-4">Guest House Management System</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Booking Dates & Duration</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Booking for: {employeeData.name}</h3>
                  <p className="text-sm text-gray-600">
                    {bookingType === "personal" ? "Personal Booking" : "Official Booking"} - ₹{bookingCharge}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Check-in Details</h3>

                    <div className="space-y-2">
                      <Label htmlFor="checkInDate">Check-in Date</Label>
                      <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={(e) => {
                          setCheckInDate(e.target.value)
                          // Clear check-out if it's now invalid
                          if (checkOutDate && e.target.value > checkOutDate) {
                            setCheckOutDate("")
                          }
                        }}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkInTime">Check-in Time</Label>
                      <select
                        id="checkInTime"
                        value={checkInTime}
                        onChange={(e) => setCheckInTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="21:00">09:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Check-out Details</h3>

                    <div className="space-y-2">
                      <Label htmlFor="checkOutDate">Check-out Date</Label>
                      <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={minCheckOutDate}
                        disabled={!checkInDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060] disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkOutTime">Check-out Time</Label>
                      <select
                        id="checkOutTime"
                        value={checkOutTime}
                        onChange={(e) => setCheckOutTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="21:00">09:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-[#002060] mb-2">Booking Rules</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Minimum booking duration is 24 hours</li>
                    <li>Standard check-in/check-out time is 3:00 PM</li>
                    <li>A 2-hour buffer is added after check-out for room preparation</li>
                  </ul>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-between">
                  <Button onClick={onBack} variant="outline" className="border-[#002060] text-[#002060]">
                    Back
                  </Button>
                  <Button onClick={handleContinue} className="bg-[#002060] hover:bg-[#003090]">
                    Continue to Guest House Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
