"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const roomData = {
  "Steel House": [
    { id: 1, number: "S101", type: "Suite", status: "available" },
    { id: 2, number: "S102", type: "Suite", status: "available" },
    { id: 3, number: "S103", type: "Suite", status: "available" },
    { id: 4, number: "S201", type: "AC", status: "available" },
    { id: 5, number: "S202", type: "AC", status: "maintenance" },
    { id: 6, number: "S203", type: "AC", status: "available" },
    { id: 7, number: "S301", type: "Non-AC", status: "available" },
    { id: 8, number: "S302", type: "Non-AC", status: "unavailable" },
  ],
  "Mohan Guest House": [
    { id: 9, number: "M101", type: "AC", status: "available" },
    { id: 10, number: "M102", type: "AC", status: "available" },
    { id: 11, number: "M103", type: "AC", status: "available" },
    { id: 12, number: "M201", type: "Non-AC", status: "available" },
    { id: 13, number: "M202", type: "Non-AC", status: "maintenance" },
    { id: 14, number: "M203", type: "Non-AC", status: "available" },
    { id: 15, number: "M204", type: "Non-AC", status: "available" },
    { id: 16, number: "M205", type: "Non-AC", status: "unavailable" },
  ],
}

interface UserData {
  designation?: string[];
}

interface RoomBookingProps {
  userData: UserData;
  onSubmit: (data: { guestHouse: string; room: any; checkIn: string; checkOut: string; nights: number; rate: number }) => void;
}

export function RoomBooking({ userData, onSubmit }: RoomBookingProps) {
  const [selectedGuestHouse, setSelectedGuestHouse] = useState<keyof typeof roomData | "">("")
  const [selectedRoom, setSelectedRoom] = useState<{ id: number; number: string; type: string; status: string } | null>(null)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")


  const recommendedGuestHouse =
    userData?.designation?.includes("General Manager") ||
    userData?.designation?.includes("GM") ||
    userData?.designation?.includes("President")
      ? "Steel House"
      : "Mohan Guest House"

  const handleGuestHouseChange = (value: "" | "Steel House" | "Mohan Guest House") => {
    setSelectedGuestHouse(value)
    setSelectedRoom(null)
  }

  const handleRoomSelect = (room: { id: number; number: string; type: string; status: string }) => {
    if (room.status === "available") {
      setSelectedRoom(room)
    }
  }

  const handleSubmit = () => {
    if (selectedRoom && checkInDate && checkOutDate) {
      onSubmit({
        guestHouse: selectedGuestHouse,
        room: selectedRoom,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      
        nights: checkOutDate && checkInDate && !isNaN(new Date(checkOutDate).getTime()) && !isNaN(new Date(checkInDate).getTime())
          ? Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
          : 0,
        
        rate: selectedRoom.type === "Suite" ? 3000 : selectedRoom.type === "AC" ? 2000 : 1000,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 text-green-800"
      case "unavailable":
        return "bg-red-100 border-red-300 text-red-800"
      case "maintenance":
        return "bg-gray-100 border-gray-300 text-gray-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "unavailable":
        return "Booked"
      case "maintenance":
        return "Under Maintenance"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Book a Room</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="check-in">Check-in Date</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    id="check-in"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="check-out">Check-out Date</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    id="check-out"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002060]"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Select Guest House</Label>
              <div className="mt-1">
                <RadioGroup value={selectedGuestHouse} onValueChange={handleGuestHouseChange}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="Steel House" id="steel-house" />
                    <Label htmlFor="steel-house" className="cursor-pointer">
                      Steel House
                      {recommendedGuestHouse === "Steel House" && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Mohan Guest House" id="mohan-house" />
                    <Label htmlFor="mohan-house" className="cursor-pointer">
                      Mohan Guest House
                      {recommendedGuestHouse === "Mohan Guest House" && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedGuestHouse && (
        <Card>
          <CardHeader className="bg-[#f0f4fa]">
            <CardTitle className="text-[#002060]">Available Rooms</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {roomData[selectedGuestHouse].map((room) => (
                <div
                  key={room.id}
                  className={`border ${getStatusColor(room.status)} rounded-md p-3 cursor-pointer transition-all ${
                    selectedRoom?.id === room.id ? "ring-2 ring-[#002060]" : ""
                  } ${room.status === "available" ? "hover:border-[#002060]" : "opacity-70 cursor-not-allowed"}`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="text-center">
                    <p className="font-medium">{room.number}</p>
                    <p className="text-sm">{room.type}</p>
                    <p className="text-xs mt-1">{getStatusText(room.status)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!selectedRoom || !checkInDate || !checkOutDate}
              className="bg-[#002060] hover:bg-[#003090]"
            >
              Continue to Food Selection
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
