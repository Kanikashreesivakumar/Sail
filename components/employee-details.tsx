"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

interface EmployeeDetailsProps {
  onContinue: (data: { employeeData: Employee; bookingType: string; bookingCharge: number }) => void;
}

interface Employee {
  id: string
  name: string
  department: string
  designation: string
  aadharId: string
  phoneNumber: string
  address: string
  email: string
}

export function EmployeeDetails({ onContinue }: EmployeeDetailsProps) {
  const [employeeId, setEmployeeId] = useState("")
  const [bookingType, setBookingType] = useState("personal")

  const [employeeData, setEmployeeData] = useState<Employee | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFetchEmployee = () => {
    if (!employeeId) {
      setError("Please enter an Employee ID")
      return
    }

    setLoading(true)
    setError("")

    setTimeout(() => {
   
      setEmployeeData({
        id: employeeId,
        name: "kalai",
        department: "Steel Production",
        designation: "Senior Engineer",
        aadharId: "XXXX-XXXX-" + Math.floor(1000 + Math.random() * 9000),
        phoneNumber: "+91 " + Math.floor(7000000000 + Math.random() * 2999999999),
        address: "123, SAIL Colony, Sector 5, Steel City - 834002",
        email: `kalai${employeeId}@sail.in`,
      })
      setLoading(false)
    }, 1000)
  }

  const handleContinue = () => {
    if (!employeeData) {
      setError("Please fetch employee details first")
      return
    }

    if (!bookingType) {
      setError("Please select a booking type")
      return
    }

    onContinue({
      employeeData,
      bookingType,
      bookingCharge: bookingType === "personal" ? 2000 : 2500,
    })
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
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Employee Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="Enter Employee ID"
                      />
                    </div>
                    <Button
                      onClick={handleFetchEmployee}
                      className="bg-[#002060] text-white hover:bg-[#003090]"
                      disabled={loading}
                    >
                      {loading ? "Fetching..." : "Fetch Details"}
                    </Button>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  {employeeData && (
                    <div className="bg-gray-50 p-4 rounded-md space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Employee Name</h3>
                          <p className="font-medium">{employeeData.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
                          <p className="font-medium">{employeeData.id}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Department</h3>
                          <p className="font-medium">{employeeData.department}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Designation</h3>
                          <p className="font-medium">{employeeData.designation}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Aadhar ID</h3>
                          <p className="font-medium">{employeeData.aadharId}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                          <p className="font-medium">{employeeData.phoneNumber}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-sm font-medium text-gray-500">Address</h3>
                          <p className="font-medium">{employeeData.address}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p className="font-medium">{employeeData.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <h3 className="font-medium">Booking Type</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-0 ml-2">
                            <HelpCircle className="h-4 w-4 text-gray-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Personal Booking: For personal use 
                            <br />
                            Official Booking: For official purposes 
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <RadioGroup value={bookingType} onValueChange={setBookingType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personal" id="personal" />
                      <Label htmlFor="personal">Personal Booking </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="official" id="official" />
                      <Label htmlFor="official">Official Booking</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#002060] text-white hover:bg-[#003090]"
                  disabled={!employeeData}
                >
                  Continue to Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
