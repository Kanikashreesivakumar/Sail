"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Download, Printer } from "lucide-react"
import { format } from "date-fns"

export function ConfirmationPage({ bookingData, onDone }) {
  const receiptRef = useRef()

  // Generate a random booking ID
  const bookingId = `SAIL${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  // Calculate room charges
  const days = Math.ceil((bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24))

  // Helper function to find meal item by ID
  const findMealItem = (mealType, itemId) => {
    // This is a simplified version since we don't have the full meal data structure here
    // In a real app, you would have access to the full meal data
    return { name: `Meal Item ${itemId}`, price: 0 }
  }

  // Get selected meals
  const getSelectedMeals = () => {
    const meals = []

    for (const mealType of Object.keys(bookingData.meals.selectedMeals)) {
      for (const itemId of bookingData.meals.selectedMeals[mealType]) {
        // In a real app, you would use the findMealItem function to get the actual meal details
        meals.push({
          type: mealType.charAt(0).toUpperCase() + mealType.slice(1),
          id: itemId,
        })
      }
    }

    return meals
  }

  // Handle print functionality without the library
  const handlePrint = () => {
    const printContent = document.getElementById("receipt-content").innerHTML
    const originalContent = document.body.innerHTML

    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent

    // Reload the page to restore React functionality
    window.location.reload()
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
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700 flex items-center">
                <Check className="mr-2" size={20} />
                Booking Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You for Your Booking!</h3>
                <p className="text-gray-600 mb-6">
                  Your booking has been confirmed. A confirmation has been sent to your registered email address.
                </p>
              </div>

              <div id="receipt-content" className="p-6 border rounded-lg mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Image src="/sail-logo.png" alt="SAIL Logo" width={60} height={60} className="object-contain" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg text-[#002060]">Booking Receipt</h3>
                    <p className="text-sm text-gray-600">Date: {format(new Date(), "dd MMM yyyy")}</p>
                  </div>
                </div>

                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium mb-2">Booking Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-medium ml-2">{bookingId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Booking Type:</span>
                      <span className="font-medium ml-2">
                        {bookingData.bookingType === "personal" ? "Personal" : "Official"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium mb-2">Guest Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium ml-2">{bookingData.employeeData.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Employee ID:</span>
                      <span className="font-medium ml-2">{bookingData.employeeData.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium ml-2">{bookingData.employeeData.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Designation:</span>
                      <span className="font-medium ml-2">{bookingData.employeeData.designation}</span>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium mb-2">Stay Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Guest House:</span>
                      <span className="font-medium ml-2">{bookingData.guestHouse}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Room Number:</span>
                      <span className="font-medium ml-2">{bookingData.room.number}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Room Type:</span>
                      <span className="font-medium ml-2">{bookingData.room.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium ml-2">{days} day(s)</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium ml-2">{format(bookingData.checkIn, "dd MMM yyyy, h:mm a")}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium ml-2">{format(bookingData.checkOut, "dd MMM yyyy, h:mm a")}</span>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium mb-2">Selected Meals</h4>
                  {getSelectedMeals().length > 0 ? (
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {getSelectedMeals().map((meal, index) => (
                        <li key={index}>
                          {meal.type}: {meal.id}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">No meals selected</p>
                  )}
                </div>

                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium mb-2">Payment Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium ml-2">
                        {bookingData.payment.method === "card" ? "Card Payment" : "Salary Deduction"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Room Charges:</span>
                      <span className="font-medium ml-2">₹{bookingData.payment.roomCharges.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Meal Charges:</span>
                      <span className="font-medium ml-2">₹{bookingData.payment.mealCharges.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-medium ml-2">₹{bookingData.payment.totalCharges.toFixed(2)}</span>
                    </div>
                    {bookingData.payment.method === "card" && (
                      <>
                        <div>
                          <span className="text-gray-600">Advance Payment:</span>
                          <span className="font-medium ml-2">₹{bookingData.payment.advancePayment.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Remaining Payment:</span>
                          <span className="font-medium ml-2">₹{bookingData.payment.remainingPayment.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    For any queries, please contact the guest house management at guesthouse@sail.in
                  </p>
                  <p className="text-sm font-medium mt-2">Thank you for choosing SAIL Guest House!</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={handlePrint} variant="outline" className="flex items-center">
                  <Printer className="mr-2" size={16} />
                  Print Receipt
                </Button>
                <Button onClick={handlePrint} className="bg-[#002060] hover:bg-[#003090] flex items-center">
                  <Download className="mr-2" size={16} />
                  Download Receipt
                </Button>
              </div>

              <div className="text-center mt-8">
                <Button onClick={onDone} variant="link" className="text-[#002060]">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
