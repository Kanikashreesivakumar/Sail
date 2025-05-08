"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Download } from "lucide-react"

interface BookingData {
  rate: number;
  nights: number;
  guestHouse: string;
  room: {
    number: string;
    type: string;
  };
  checkIn: string;
  checkOut: string;
}

interface MealItem {
  id: string;
  name: string;
  price: number;
}

interface MealData {
  [mealType: string]: MealItem[];
}

export function PaymentPage({ bookingData, mealData }: { bookingData: BookingData; mealData: MealData }) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [paymentComplete, setPaymentComplete] = useState(false)


  const roomTotal = bookingData ? bookingData.rate * bookingData.nights : 0

  const calculateMealTotal = () => {
    if (!mealData) return 0

    let total = 0
    Object.keys(mealData).forEach((mealType) => {
      mealData[mealType].forEach((item) => {
        total += item.price
      })
    })

    return total
  }

  const mealTotal = calculateMealTotal()
  const grandTotal = roomTotal + mealTotal

  const handlePayment = () => {

    setPaymentComplete(true)
  }

  if (!bookingData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please complete room booking first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {!paymentComplete ? (
        <>
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Room Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guest House:</span>
                      <span>{bookingData.guestHouse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Number:</span>
                      <span>{bookingData.room.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Type:</span>
                      <span>{bookingData.room.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in:</span>
                      <span>{bookingData.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span>{bookingData.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of Nights:</span>
                      <span>{bookingData.nights}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Room Total:</span>
                      <span>₹{roomTotal}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Meal Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    {Object.keys(mealData).map((mealType) => (
                      <div key={mealType}>
                        {mealData[mealType].length > 0 ? (
                          <>
                            <h4 className="font-medium capitalize">{mealType}</h4>
                            <ul className="space-y-1 mb-2">
                              {mealData[mealType].map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                  <span>{item.name}</span>
                                  <span>₹{item.price}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500 capitalize">No {mealType} selected</p>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Meal Total:</span>
                      <span>₹{mealTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Grand Total:</span>
                  <span className="font-bold text-xl text-[#002060]">₹{grandTotal}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer hover:border-[#002060] transition-colors">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer">
                        UPI
                      </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Pay using any UPI app like Google Pay, PhonePe, etc.</p>
                  </div>

                  <div className="border rounded-md p-4 cursor-pointer hover:border-[#002060] transition-colors">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="cursor-pointer">
                        Net Banking
                      </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Pay using your bank's net banking service.</p>
                  </div>

                  <div className="border rounded-md p-4 cursor-pointer hover:border-[#002060] transition-colors">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer">
                        Cash
                      </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Pay in cash at the time of check-in.</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePayment} className="bg-[#002060] hover:bg-[#003090]">
                Complete Payment
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
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

              <div className="bg-gray-50 p-4 rounded-md max-w-md mx-auto text-left mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">SAIL{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guest House:</span>
                    <span>{bookingData.guestHouse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room:</span>
                    <span>
                      {bookingData.room.number} ({bookingData.room.type})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span>{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span>{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total Amount Paid:</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              <Button className="bg-[#002060] hover:bg-[#003090] text-white">
                <Download className="mr-2" size={16} />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
