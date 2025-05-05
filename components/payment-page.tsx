"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { format } from "date-fns"

export function PaymentPage({ bookingData, onContinue, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false)
  const [error, setError] = useState("")

  // Calculate room charges
  const days = Math.ceil((bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24))
  const roomCharges = bookingData.bookingCharge * days

  // Get meal charges from booking data
  const mealCharges = bookingData.meals.grandTotal.total

  // Calculate total
  const totalCharges = roomCharges + mealCharges

  // Calculate advance payment (20% for card payment)
  const advancePayment = paymentMethod === "card" ? totalCharges * 0.2 : 0

  const handleContinue = () => {
    onContinue({
      ...bookingData,
      payment: {
        method: paymentMethod,
        roomCharges,
        mealCharges,
        totalCharges,
        advancePayment,
        remainingPayment: totalCharges - advancePayment,
      },
    })
  }

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
              <CardTitle className="text-[#002060]">Payment</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Guest</p>
                      <p className="font-medium">{bookingData.employeeData.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Guest House & Room</p>
                      <p className="font-medium">
                        {bookingData.guestHouse} - {bookingData.room.number}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-in</p>
                      <p className="font-medium">{format(bookingData.checkIn, "dd MMM yyyy, h:mm a")}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-out</p>
                      <p className="font-medium">{format(bookingData.checkOut, "dd MMM yyyy, h:mm a")}</p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader className="bg-blue-50 py-3">
                    <CardTitle className="text-[#002060] text-lg">Charges Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>
                          Room Charges ({days} days × ₹{bookingData.bookingCharge}):
                        </span>
                        <span className="font-medium">₹{roomCharges}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Meal Charges:</span>
                        <span className="font-medium">₹{mealCharges.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-medium">Total Charges:</span>
                        <span className="font-medium">₹{totalCharges.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Payment Method</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-[#002060]"
                            onClick={() => setShowCancellationPolicy(true)}
                          >
                            View Cancellation Policy
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to view cancellation policy</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 cursor-pointer hover:border-[#002060] transition-colors">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer">
                            Card Payment
                          </Label>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Pay 20% advance (₹{(totalCharges * 0.2).toFixed(2)}) now, rest at check-in
                        </p>
                      </div>

                      <div className="border rounded-md p-4 cursor-pointer hover:border-[#002060] transition-colors">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="salary" id="salary" />
                          <Label htmlFor="salary" className="cursor-pointer">
                            Salary Deduction
                          </Label>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Full amount (₹{totalCharges.toFixed(2)}) will be deducted from your salary
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-between">
                  <Button onClick={onBack} variant="outline" className="border-[#002060] text-[#002060]">
                    Back
                  </Button>
                  <Button onClick={handleContinue} className="bg-[#002060] hover:bg-[#003090]">
                    Complete Booking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showCancellationPolicy} onOpenChange={setShowCancellationPolicy}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancellation Policy</DialogTitle>
            <DialogDescription>Please review our cancellation policy before confirming your booking.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Cancellation Charges:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Cancellation 1 month before check-in: 100% refund</li>
                <li>Cancellation 1 week before check-in: 75% refund (25% deduction)</li>
                <li>Cancellation less than 1 week before check-in: No refund (100% deduction)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Important Notes:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>All cancellations must be made in writing through the system</li>
                <li>Refunds will be processed within 7-10 working days</li>
                <li>For salary deduction bookings, the applicable amount will be adjusted in your salary</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
