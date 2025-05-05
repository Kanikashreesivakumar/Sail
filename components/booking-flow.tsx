"use client"

import { useState } from "react"
import { LoadingPage } from "./loading-page"
import { HeroPage } from "./hero-page"
import { AdminLogin } from "./admin-login"
import { EmployeeDetails } from "./employee-details"
import { BookingDates } from "./booking-dates"
import { GuestHouseSelection } from "./guest-house-selection"
import { CateringPage } from "./catering-page"
import { PaymentPage } from "./payment-page"
import { ConfirmationPage } from "./confirmation-page"

export function BookingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState("loading")
  const [bookingData, setBookingData] = useState({})

  // Handle loading completion
  const handleLoadingComplete = () => {
    setCurrentStep("hero")
  }

  // Handle hero page proceed button
  const handleHeroProceed = () => {
    setCurrentStep("adminLogin")
  }

  // Handle admin login
  const handleAdminLogin = () => {
    setCurrentStep("employeeDetails")
  }

  // Handle employee details submission
  const handleEmployeeDetailsSubmit = (data) => {
    setBookingData(data)
    setCurrentStep("bookingDates")
  }

  // Handle booking dates submission
  const handleBookingDatesSubmit = (data) => {
    setBookingData(data)
    setCurrentStep("guestHouseSelection")
  }

  // Handle guest house selection
  const handleGuestHouseSubmit = (data) => {
    setBookingData(data)
    setCurrentStep("catering")
  }

  // Handle catering selection
  const handleCateringSubmit = (data) => {
    setBookingData(data)
    setCurrentStep("payment")
  }

  // Handle payment completion
  const handlePaymentComplete = (data) => {
    setBookingData(data)
    setCurrentStep("confirmation")
  }

  // Handle back button in booking dates
  const handleBookingDatesBack = () => {
    setCurrentStep("employeeDetails")
  }

  // Handle back button in guest house selection
  const handleGuestHouseBack = () => {
    setCurrentStep("bookingDates")
  }

  // Handle back button in catering
  const handleCateringBack = () => {
    setCurrentStep("guestHouseSelection")
  }

  // Handle back button in payment
  const handlePaymentBack = () => {
    setCurrentStep("catering")
  }

  // Handle booking completion
  const handleBookingComplete = () => {
    onComplete()
  }

  // Render the current step
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
          bookingType={bookingData.bookingType}
          bookingCharge={bookingData.bookingCharge}
          onContinue={handleBookingDatesSubmit}
          onBack={handleBookingDatesBack}
        />
      )

    case "guestHouseSelection":
      return (
        <GuestHouseSelection
          bookingData={bookingData}
          onContinue={handleGuestHouseSubmit}
          onBack={handleGuestHouseBack}
        />
      )

    case "catering":
      return <CateringPage bookingData={bookingData} onContinue={handleCateringSubmit} onBack={handleGuestHouseBack} />

    case "payment":
      return <PaymentPage bookingData={bookingData} onContinue={handlePaymentComplete} onBack={handlePaymentBack} />

    case "confirmation":
      return <ConfirmationPage bookingData={bookingData} onDone={handleBookingComplete} />

    default:
      return <LoadingPage onComplete={handleLoadingComplete} />
  }
}
