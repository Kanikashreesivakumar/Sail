"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock food menu data
const menuData = {
  breakfast: [
    { id: "b1", name: "Idli Sambar", price: 80 },
    { id: "b2", name: "Poha", price: 60 },
    { id: "b3", name: "Bread Omelette", price: 70 },
    { id: "b4", name: "Aloo Paratha", price: 90 },
    { id: "b5", name: "Upma", price: 60 },
    { id: "b6", name: "Cornflakes with Milk", price: 50 },
  ],
  lunch: [
    { id: "l1", name: "Veg Thali", price: 150 },
    { id: "l2", name: "Non-Veg Thali", price: 180 },
    { id: "l3", name: "Paneer Butter Masala", price: 140 },
    { id: "l4", name: "Dal Makhani", price: 120 },
    { id: "l5", name: "Chicken Curry", price: 160 },
    { id: "l6", name: "Fish Curry", price: 170 },
  ],
  dinner: [
    { id: "d1", name: "Veg Thali", price: 150 },
    { id: "d2", name: "Non-Veg Thali", price: 180 },
    { id: "d3", name: "Paneer Tikka Masala", price: 150 },
    { id: "d4", name: "Dal Tadka", price: 110 },
    { id: "d5", name: "Butter Chicken", price: 180 },
    { id: "d6", name: "Mutton Curry", price: 200 },
  ],
}

export function FoodMenu({ onSubmit }) {
  const [selectedItems, setSelectedItems] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  })

  const handleItemToggle = (mealType, itemId) => {
    setSelectedItems((prev) => {
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

  const handleSubmit = () => {
    // Convert selected IDs to actual meal objects with prices
    const selectedMeals = {
      breakfast: menuData.breakfast.filter((item) => selectedItems.breakfast.includes(item.id)),
      lunch: menuData.lunch.filter((item) => selectedItems.lunch.includes(item.id)),
      dinner: menuData.dinner.filter((item) => selectedItems.dinner.includes(item.id)),
    }

    onSubmit(selectedMeals)
  }

  const getTotalPrice = (mealType) => {
    return menuData[mealType]
      .filter((item) => selectedItems[mealType].includes(item.id))
      .reduce((sum, item) => sum + item.price, 0)
  }

  const getOverallTotal = () => {
    return Object.keys(selectedItems).reduce((sum, mealType) => sum + getTotalPrice(mealType), 0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Food Menu Selection</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-600 mb-6">
            Select the meals you would like to have during your stay. You can choose multiple items for each meal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Breakfast Card */}
            <Card>
              <CardHeader className="bg-blue-50 py-3">
                <CardTitle className="text-[#002060] text-lg">Breakfast</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {menuData.breakfast.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={selectedItems.breakfast.includes(item.id)}
                        onCheckedChange={() => handleItemToggle("breakfast", item.id)}
                      />
                      <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                        {item.name}
                      </Label>
                      <span className="text-gray-600">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">₹{getTotalPrice("breakfast")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Lunch Card */}
            <Card>
              <CardHeader className="bg-blue-50 py-3">
                <CardTitle className="text-[#002060] text-lg">Lunch</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {menuData.lunch.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={selectedItems.lunch.includes(item.id)}
                        onCheckedChange={() => handleItemToggle("lunch", item.id)}
                      />
                      <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                        {item.name}
                      </Label>
                      <span className="text-gray-600">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">₹{getTotalPrice("lunch")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Dinner Card */}
            <Card>
              <CardHeader className="bg-blue-50 py-3">
                <CardTitle className="text-[#002060] text-lg">Dinner</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {menuData.dinner.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={selectedItems.dinner.includes(item.id)}
                        onCheckedChange={() => handleItemToggle("dinner", item.id)}
                      />
                      <Label htmlFor={item.id} className="flex-1 cursor-pointer">
                        {item.name}
                      </Label>
                      <span className="text-gray-600">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">₹{getTotalPrice("dinner")}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <span className="font-medium text-lg">Overall Total: </span>
            <span className="font-bold text-lg text-[#002060]">₹{getOverallTotal()}</span>
          </div>
          <Button onClick={handleSubmit} className="bg-[#002060] hover:bg-[#003090]">
            Continue to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
