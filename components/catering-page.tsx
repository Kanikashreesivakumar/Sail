"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock meal data
const mealOptions = {
  breakfast: {
    veg: [
      { id: "bv1", name: "Idli Sambar", price: 80 },
      { id: "bv2", name: "Poha", price: 60 },
      { id: "bv3", name: "Upma", price: 60 },
      { id: "bv4", name: "Bread & Butter", price: 50 },
    ],
    nonVeg: [
      { id: "bnv1", name: "Egg Bhurji", price: 90 },
      { id: "bnv2", name: "Omelette", price: 80 },
      { id: "bnv3", name: "Chicken Sandwich", price: 120 },
    ],
    beverages: [
      { id: "bb1", name: "Tea", price: 20 },
      { id: "bb2", name: "Coffee", price: 30 },
      { id: "bb3", name: "Fresh Juice", price: 50 },
    ],
  },
  lunch: {
    veg: [
      { id: "lv1", name: "Veg Thali", price: 150 },
      { id: "lv2", name: "Paneer Special", price: 180 },
      { id: "lv3", name: "Dal Fry with Rice", price: 120 },
    ],
    nonVeg: [
      { id: "lnv1", name: "Non-Veg Thali", price: 250 },
      { id: "lnv2", name: "Chicken Curry with Rice", price: 220 },
      { id: "lnv3", name: "Fish Curry with Rice", price: 240 },
    ],
  },
  dinner: {
    veg: [
      { id: "dv1", name: "Veg Thali", price: 150 },
      { id: "dv2", name: "Paneer Butter Masala with Roti", price: 180 },
      { id: "dv3", name: "Dal Makhani with Rice", price: 140 },
    ],
    nonVeg: [
      { id: "dnv1", name: "Non-Veg Thali", price: 250 },
      { id: "dnv2", name: "Butter Chicken with Naan", price: 280 },
      { id: "dnv3", name: "Mutton Curry with Rice", price: 300 },
    ],
    beverages: [
      { id: "db1", name: "Tea", price: 20 },
      { id: "db2", name: "Coffee", price: 30 },
      { id: "db3", name: "Fresh Juice", price: 50 },
    ],
  },
}

export function CateringPage({ bookingData, onContinue, onBack }) {
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  })

  const [mealTotals, setMealTotals] = useState({
    breakfast: { baseAmount: 0, gst: 0, total: 0 },
    lunch: { baseAmount: 0, gst: 0, total: 0 },
    dinner: { baseAmount: 0, gst: 0, total: 0 },
  })

  const [grandTotal, setGrandTotal] = useState({
    baseAmount: 0,
    gst: 0,
    total: 0,
  })

  // Calculate number of days for the booking
  const days = Math.ceil((bookingData.checkOut - bookingData.checkIn) / (1000 * 60 * 60 * 24))

  // Toggle meal selection
  const toggleMeal = (mealType, itemId) => {
    setSelectedMeals((prev) => {
      const currentSelection = [...prev[mealType]]

      if (currentSelection.includes(itemId)) {
        return {
          ...prev,
          [mealType]: currentSelection.filter((id) => id !== itemId),
        }
      } else {
        return {
          ...prev,
          [mealType]: [...currentSelection, itemId],
        }
      }
    })
  }

  // Calculate meal totals whenever selection changes
  useEffect(() => {
    const calculateMealTotal = (mealType) => {
      let baseAmount = 0
      let gst = 0

      // Process all selected items for this meal type
      selectedMeals[mealType].forEach((itemId) => {
        // Find the item in the appropriate category
        let item = null

        if (mealType === "breakfast" || mealType === "dinner") {
          // Check in veg, nonVeg, and beverages
          item =
            mealOptions[mealType].veg.find((i) => i.id === itemId) ||
            mealOptions[mealType].nonVeg.find((i) => i.id === itemId) ||
            mealOptions[mealType].beverages?.find((i) => i.id === itemId)

          if (item) {
            baseAmount += item.price

            // Apply GST based on item type
            if (itemId.startsWith("bb") || itemId.startsWith("db")) {
              // Beverages: 20% GST
              gst += item.price * 0.2
            } else {
              // Food items: 50% GST
              gst += item.price * 0.5
            }
          }
        } else if (mealType === "lunch") {
          // Lunch items have GST included
          item =
            mealOptions[mealType].veg.find((i) => i.id === itemId) ||
            mealOptions[mealType].nonVeg.find((i) => i.id === itemId)

          if (item) {
            // For lunch, GST is already included in the price
            const priceWithoutGST = item.price / 1.18 // Assuming 18% GST
            baseAmount += priceWithoutGST
            gst += item.price - priceWithoutGST
          }
        }
      })

      // Multiply by number of days
      baseAmount *= days
      gst *= days

      return {
        baseAmount,
        gst,
        total: baseAmount + gst,
      }
    }

    const breakfastTotal = calculateMealTotal("breakfast")
    const lunchTotal = calculateMealTotal("lunch")
    const dinnerTotal = calculateMealTotal("dinner")

    setMealTotals({
      breakfast: breakfastTotal,
      lunch: lunchTotal,
      dinner: dinnerTotal,
    })

    setGrandTotal({
      baseAmount: breakfastTotal.baseAmount + lunchTotal.baseAmount + dinnerTotal.baseAmount,
      gst: breakfastTotal.gst + lunchTotal.gst + dinnerTotal.gst,
      total: breakfastTotal.total + lunchTotal.total + dinnerTotal.total,
    })
  }, [selectedMeals, days])

  const handleContinue = () => {
    onContinue({
      ...bookingData,
      meals: {
        selectedMeals,
        mealTotals,
        grandTotal,
      },
    })
  }

  // Helper function to find meal item by ID
  const findMealItem = (mealType, itemId) => {
    const categories = Object.keys(mealOptions[mealType])
    for (const category of categories) {
      const item = mealOptions[mealType][category].find((i) => i.id === itemId)
      if (item) return item
    }
    return null
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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Catering Selection</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{days} day(s)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Select Meals for Your Stay</h3>
                  <p className="text-sm text-gray-600">
                    Please select the meals you would like to have during your stay. The prices shown are per day.
                  </p>

                  {/* Breakfast Section */}
                  <Card>
                    <CardHeader className="bg-blue-50 py-3">
                      <CardTitle className="text-[#002060] text-lg">Breakfast</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Vegetarian Options</h4>
                          <div className="space-y-2">
                            {mealOptions.breakfast.veg.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.breakfast.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("breakfast", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} + 50% GST</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Non-Vegetarian Options</h4>
                          <div className="space-y-2">
                            {mealOptions.breakfast.nonVeg.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.breakfast.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("breakfast", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} + 50% GST</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Beverages</h4>
                          <div className="space-y-2">
                            {mealOptions.breakfast.beverages.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.breakfast.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("breakfast", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} + 20% GST</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Base Amount:</span>
                            <span>₹{mealTotals.breakfast.baseAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>GST:</span>
                            <span>₹{mealTotals.breakfast.gst.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium mt-1">
                            <span>Total for {days} day(s):</span>
                            <span>₹{mealTotals.breakfast.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lunch Section */}
                  <Card>
                    <CardHeader className="bg-blue-50 py-3">
                      <CardTitle className="text-[#002060] text-lg">Lunch</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Vegetarian Options</h4>
                          <div className="space-y-2">
                            {mealOptions.lunch.veg.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.lunch.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("lunch", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} (GST included)</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Non-Vegetarian Options</h4>
                          <div className="space-y-2">
                            {mealOptions.lunch.nonVeg.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.lunch.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("lunch", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} (GST included)</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Base Amount:</span>
                            <span>₹{mealTotals.lunch.baseAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>GST:</span>
                            <span>₹{mealTotals.lunch.gst.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium mt-1">
                            <span>Total for {days} day(s):</span>
                            <span>₹{mealTotals.lunch.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dinner Section */}
                  <Card>
                    <CardHeader className="bg-blue-50 py-3">
                      <CardTitle className="text-[#002060] text-lg">Dinner</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Vegetarian Options</h4>
                          <div className="space-y-2">
                            {mealOptions.dinner.veg.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.dinner.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("dinner", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} + 50% GST</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Non-Vegetarian Options</h4>
                          <div className="space-y-2">
                            {mealOptions.dinner.nonVeg.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.dinner.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("dinner", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} + 50% GST</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Beverages</h4>
                          <div className="space-y-2">
                            {mealOptions.dinner.beverages.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={selectedMeals.dinner.includes(item.id)}
                                  onCheckedChange={() => toggleMeal("dinner", item.id)}
                                />
                                <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                                  {item.name}
                                </Label>
                                <span className="text-gray-600">₹{item.price} + 20% GST</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Base Amount:</span>
                            <span>₹{mealTotals.dinner.baseAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>GST:</span>
                            <span>₹{mealTotals.dinner.gst.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium mt-1">
                            <span>Total for {days} day(s):</span>
                            <span>₹{mealTotals.dinner.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Summary Section */}
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-[#002060] mb-4">Meal Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Base Amount:</span>
                          <span>₹{grandTotal.baseAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST:</span>
                          <span>₹{grandTotal.gst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg pt-2 border-t">
                          <span>Total Meal Charges:</span>
                          <span>₹{grandTotal.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between">
                  <Button onClick={onBack} variant="outline" className="border-[#002060] text-[#002060]">
                    Back
                  </Button>
                  <Button onClick={handleContinue} className="bg-[#002060] hover:bg-[#003090]">
                    Continue to Payment
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
