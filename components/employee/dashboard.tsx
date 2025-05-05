"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeProfile } from "./profile"
import { RoomBooking } from "./room-booking"
import { FoodMenu } from "./food-menu"
import { PaymentPage } from "./payment"

export function EmployeeDashboard({ userData }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [bookingData, setBookingData] = useState(null)
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  })

  const handleBookingSubmit = (data) => {
    setBookingData(data)
    setActiveTab("food")
  }

  const handleMealSelection = (meals) => {
    setSelectedMeals(meals)
    setActiveTab("payment")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#002060] mb-6">Employee Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="booking">Room Booking</TabsTrigger>
          <TabsTrigger value="food">Food Menu</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <EmployeeProfile userData={userData} />
        </TabsContent>

        <TabsContent value="booking">
          <RoomBooking userData={userData} onSubmit={handleBookingSubmit} />
        </TabsContent>

        <TabsContent value="food">
          <FoodMenu onSubmit={handleMealSelection} />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentPage bookingData={bookingData} mealData={selectedMeals} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
