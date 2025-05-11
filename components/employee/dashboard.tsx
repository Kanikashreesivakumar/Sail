"use client"

import { useState } from "react"

interface MealItem {
  id: string;
  name: string;
  price: number;
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeProfile } from "./profile"
import { RoomBooking } from "./room-booking"
import { FoodMenu } from "./food-menu"
import { PaymentPage } from "./payment"

import { UserData } from "@/types/user";

interface RoomBookingProps {
  userData: UserData;
  onSubmit: (data: { guestHouse: string; room: any; checkIn: string; checkOut: string; nights: number; rate: number }) => void;
}

interface EmployeeDashboardProps {
  userData: UserData;
}

export function EmployeeDashboard({ userData }: EmployeeDashboardProps) {
  const [activeTab, setActiveTab] = useState("profile")
  interface BookingData {
    guestHouse: string;
    room: any;
    checkIn: string;
    checkOut: string;
    nights: number;
    rate: number;
  }

  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [selectedMeals, setSelectedMeals] = useState<{
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: [],
  })

  const handleBookingSubmit = (data: any) => {
    setBookingData(data)
    setActiveTab("food")
  }

  const handleMealSelection = (selectedMeals: {
    breakfast: { id: string; name: string; price: number }[];
    lunch: { id: string; name: string; price: number }[];
    dinner: { id: string; name: string; price: number }[];
  }) => {
    setSelectedMeals(selectedMeals);
    setActiveTab("payment");
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
          {bookingData && <PaymentPage bookingData={bookingData} mealData={selectedMeals} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
