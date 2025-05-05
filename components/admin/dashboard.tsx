"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomManagement } from "./room-management"
import { FoodCatering } from "./food-catering"
import { RevenueTracking } from "./revenue-tracking"
import { BookingManagement } from "./booking-management"

export function AdminDashboard({ userData }) {
  const [activeTab, setActiveTab] = useState("rooms")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#002060] text-white p-4 hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-blue-200 mt-1">Welcome, {userData?.name}</p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("rooms")}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeTab === "rooms" ? "bg-white text-[#002060]" : "text-white hover:bg-blue-800"
            }`}
          >
            Room Management
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeTab === "food" ? "bg-white text-[#002060]" : "text-white hover:bg-blue-800"
            }`}
          >
            Food & Catering
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeTab === "revenue" ? "bg-white text-[#002060]" : "text-white hover:bg-blue-800"
            }`}
          >
            Revenue Tracking
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              activeTab === "bookings" ? "bg-white text-[#002060]" : "text-white hover:bg-blue-800"
            }`}
          >
            Booking Management
          </button>
        </nav>
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden w-full px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#002060] mb-6 md:hidden">Admin Dashboard</h1>

        {activeTab === "rooms" && <RoomManagement />}
        {activeTab === "food" && <FoodCatering />}
        {activeTab === "revenue" && <RevenueTracking />}
        {activeTab === "bookings" && <BookingManagement />}
      </div>
    </div>
  )
}
