"use client"

import { useState } from "react"
import { LoadingPage } from "./loading-page"
import { Employee } from "../models/employee" 
import { HeroPage } from "./hero-page"
import { AdminLogin } from "./admin-login"
import { EmployeeDetails } from "./employee-details"
import { BookingDates } from "./booking-dates"
import { GuestHouseSelection } from "./guest-house-selection"
import { CateringPage } from "./catering-page"
import { PaymentPage } from "./payment-page"
import { ConfirmationPage } from "./confirmation-page"

interface BookingFlowProps {
  onComplete: () => void;
}

export function BookingFlow({ onComplete }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState("loading")
  interface LocalBookingData {
    employeeData?: Employee;
    bookingType?: string;
    bookingCharge?: number;
    startDate?: string;
    endDate?: string;
    guestHouseId?: string;
    guestHouseName?: string;
    cateringDetails?: string;
    paymentDetails?: string;
    checkIn?: string;
    checkOut?: string;
    meals?: string; 
    guestHouse?: string; 
    room?: string; 
  }

  interface BookingData {
    checkIn?: Date;
    checkOut?: Date;
    bookingCharge: number;
    meals: {
      grandTotal: {
        total: number;
      };
    };
    employeeData: {
      name: string;
    };
    guestHouse: string;
    room: {
      number: string;
    };
  }

  const [bookingData, setBookingData] = useState<LocalBookingData>({})

  
  const handleLoadingComplete = () => {
    setCurrentStep("hero")
  }


  const handleHeroProceed = () => {
    setCurrentStep("adminLogin")
  }

  
  const handleAdminLogin = () => {
    setCurrentStep("employeeDetails")
  }

  const handleEmployeeDetailsSubmit = (data: { employeeData: Employee; bookingType: string; bookingCharge: number }) => {
    setBookingData(data)
    setCurrentStep("bookingDates")
  }

  const handleBookingDatesSubmit = (data: { employeeData: { name: string }; bookingType: string; bookingCharge: number; checkIn: Date; checkOut: Date; duration: number }) => {
      setBookingData({
          employeeData: data.employeeData,
          bookingType: data.bookingType,
          bookingCharge: data.bookingCharge,
          startDate: data.checkIn.toISOString(),
          endDate: data.checkOut.toISOString(),
      })
      setCurrentStep("guestHouseSelection")
  }

 
  const handleGuestHouseSubmit = (data: { guestHouseId: string; guestHouseName: string }) => {
    setBookingData(data)
    setCurrentStep("catering")
  }

  
  const handleCateringSubmit = (data: { cateringDetails: string }) => {
    setBookingData(data)
    setCurrentStep("payment")
  }

  
  const handlePaymentComplete = (data: { paymentDetails: string }) => {
    setBookingData(data)
    setCurrentStep("confirmation")
  }

  const handleBookingDatesBack = () => {
    setCurrentStep("employeeDetails")
  }

  const handleGuestHouseBack = () => {
    setCurrentStep("bookingDates")
  }

  const handleCateringBack = () => {
    setCurrentStep("guestHouseSelection")
  }
  const handlePaymentBack = () => {
    setCurrentStep("catering")
  }

  const handleBookingComplete = () => {
    onComplete()
  }

  
  switch (currentStep) {
    case "loading":
      return <LoadingPage onComplete={handleLoadingComplete} />

    case "hero":
      return <HeroPage onProceed={handleHeroProceed} />

    case "adminLogin":
      return <AdminLogin onLogin={handleAdminLogin} />

    case "employeeDetails":
      return <EmployeeDetails onContinue={handleEmployeeDetailsSubmit} />

    case "bookingDates":
      return (
        <BookingDates
          employeeData={bookingData.employeeData}
          bookingType={bookingData.bookingType || ""}
          bookingCharge={bookingData.bookingCharge || 0}
          onContinue={handleBookingDatesSubmit}
          onBack={handleBookingDatesBack}
        />
      )

    case "guestHouseSelection":
      return (
        <GuestHouseSelection
          bookingData={{
            ...bookingData,
            checkIn: bookingData.startDate ? new Date(bookingData.startDate) : new Date(),
            checkOut: bookingData.endDate ? new Date(bookingData.endDate) : new Date(),
            meals: bookingData.meals
              ? { grandTotal: { total: parseFloat(bookingData.meals) } }
              : undefined,
            room: bookingData.room
              ? { number: bookingData.room }
              : { number: "" },
          }}
          onContinue={handleGuestHouseSubmit}
          onBack={handleGuestHouseBack}
        />
      )

    case "catering":
      return (
        <CateringPage
          bookingData={{
            ...bookingData,
            checkIn: bookingData.startDate ? new Date(bookingData.startDate) : undefined,
            checkOut: bookingData.endDate ? new Date(bookingData.endDate) : undefined,
            meals: bookingData.meals
              ? { grandTotal: { total: parseFloat(bookingData.meals) } }
              : { grandTotal: { total: 0 } },
          } as BookingData}
          onContinue={handleCateringSubmit}
          onBack={handleGuestHouseBack}
        />
      )

    case "payment":
      return (
        <PaymentPage
          bookingData={{
            ...bookingData,
            bookingCharge: bookingData.bookingCharge || 0,
            checkIn: bookingData.checkIn ? new Date(bookingData.checkIn) : new Date(),
            checkOut: bookingData.checkOut ? new Date(bookingData.checkOut) : new Date(),
            meals: bookingData.meals
              ? { grandTotal: { total: parseFloat(bookingData.meals) } }
              : { grandTotal: { total: 0 } },
            employeeData: bookingData.employeeData || { name: "" }, 
          }}
          onContinue={handlePaymentComplete}
          onBack={handlePaymentBack}
        />
      )

    case "confirmation":
      return <ConfirmationPage bookingData={bookingData} onDone={handleBookingComplete} />

    default:
      return <LoadingPage onComplete={handleLoadingComplete} />
  }
}
