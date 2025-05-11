"use client"

import { useState } from "react"
import { BookingFlow } from "@/components/booking-flow"
import { HomePage } from "@/components/ui/home-page"  
import { Navbar } from "@/components/navbar"

import { AboutPage } from "@/components/about-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("bookingFlow")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userData, setUserData] = useState<{
    id: string
    name: string
    role?: string
    department?: string
    aadharId?: string
    phoneNumber?: string
    address?: string
    email?: string
    designation?: string
  } | null>(null)

  interface BookingData {
    meals?: {
      selectedMeals?: {
        [key: string]: string[]
      }
    }
  }
  
  const [bookingData, setBookingData] = useState<BookingData>({
    meals: {
      selectedMeals: {}
    }
  });

  const handleLogin = (id: string, isAdminLogin = false) => {
   
    if (isAdminLogin) {
      setIsAdmin(true)
      setUserData({
        id: id,
        name: "Admin User",
        role: "Administrator",
      })
    } else {
      
      setUserData({
        id: id,
        name: "kalai",
        department: "Steel Production",
        designation: id.startsWith("GM") ? "General Manager" : "Labour",
      })
    }
    setIsLoggedIn(true)
    setCurrentPage(isAdminLogin ? "admin" : "employee")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setUserData(null)
    setCurrentPage("home")
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const handleBookingFlowComplete = () => {
    setCurrentPage("home")
  }

  if (currentPage === "bookingFlow") {
    return <BookingFlow onComplete={handleBookingFlowComplete} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onNavigate={handleNavigation} onLogout={handleLogout} />

      <main className="flex-1">
        {currentPage === "home" && <HomePage onNavigate={handleNavigation} />}

        {currentPage === "login" && (
          <div className="container mx-auto px-4 py-12 max-w-md">
            <h2 className="text-2xl font-bold text-[#002060] mb-6 text-center">Employee Login</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                  placeholder="Enter Employee ID"
                />
              </div>
              <button
                onClick={() => handleLogin("EMP12345")}
                className="w-full px-4 py-2 bg-[#002060] text-white rounded-md hover:bg-[#003090] transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        )}

        {currentPage === "adminLogin" && (
          <div className="container mx-auto px-4 py-12 max-w-md">
            <h2 className="text-2xl font-bold text-[#002060] mb-6 text-center">Admin Login</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="adminId" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin ID
                </label>
                <input
                  type="text"
                  id="adminId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                  placeholder="Enter Admin ID"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                  placeholder="Enter Password"
                />
              </div>
              <button
                onClick={() => handleLogin("ADMIN001", true)}
                className="w-full px-4 py-2 bg-[#002060] text-white rounded-md hover:bg-[#003090] transition-colors"
              >
                Login to Admin Panel
              </button>
            </div>
          </div>
        )}

       
      </main>

      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Steel Authority of India Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
