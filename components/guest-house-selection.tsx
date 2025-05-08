"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"


const guestHouseData = {
  "Mohan Nagar": {
    duplexAC: [
      { id: "MN-D1", number: "D101", type: "Duplex AC", available: true, amenities: "AC + Geyser + TV" },
      { id: "MN-D2", number: "D102", type: "Duplex AC", available: false, amenities: "AC + Geyser + TV" },
      { id: "MN-D3", number: "D103", type: "Duplex AC", available: true, amenities: "AC + Geyser + TV" },
      { id: "MN-D4", number: "D104", type: "Duplex AC", available: true, amenities: "AC + Geyser + TV" },
      { id: "MN-D5", number: "D105", type: "Duplex AC", available: false, amenities: "AC + Geyser + TV" },
      { id: "MN-D6", number: "D106", type: "Duplex AC", available: true, amenities: "AC + Geyser + TV" },
    ],
    nonDuplexAC: [
      { id: "MN-A1", number: "A101", type: "Non-Duplex AC", available: true, amenities: "Only AC" },
      { id: "MN-A2", number: "A102", type: "Non-Duplex AC", available: true, amenities: "Only AC" },
      { id: "MN-A3", number: "A103", type: "Non-Duplex AC", available: false, amenities: "Only AC" },
      { id: "MN-A4", number: "A104", type: "Non-Duplex AC", available: true, amenities: "Only AC" },
    ],
    nonAC: [
      { id: "MN-N1", number: "N101", type: "Non-AC", available: true, amenities: "Basic Room" },
      { id: "MN-N2", number: "N102", type: "Non-AC", available: false, amenities: "Basic Room" },
      { id: "MN-N3", number: "N103", type: "Non-AC", available: true, amenities: "Basic Room" },
      { id: "MN-N4", number: "N104", type: "Non-AC", available: true, amenities: "Basic Room" },
      { id: "MN-N5", number: "N105", type: "Non-AC", available: false, amenities: "Basic Room" },
    ],
  },
  "Steel House": {
    suites: [
      { id: "SH-S1", number: "S101", type: "Suite", available: true, amenities: "Premium Suite with all amenities" },
      { id: "SH-S2", number: "S102", type: "Suite", available: false, amenities: "Premium Suite with all amenities" },
      { id: "SH-S3", number: "S103", type: "Suite", available: true, amenities: "Premium Suite with all amenities" },
    ],
    acRooms: [
      { id: "SH-A1", number: "A101", type: "AC Room", available: true, amenities: "AC + TV + Geyser" },
      { id: "SH-A2", number: "A102", type: "AC Room", available: false, amenities: "AC + TV + Geyser" },
      { id: "SH-A3", number: "A103", type: "AC Room", available: true, amenities: "AC + TV + Geyser" },
      { id: "SH-A4", number: "A104", type: "AC Room", available: true, amenities: "AC + TV + Geyser" },
      { id: "SH-A5", number: "A105", type: "AC Room", available: false, amenities: "AC + TV + Geyser" },
      { id: "SH-A6", number: "A106", type: "AC Room", available: true, amenities: "AC + TV + Geyser" },
      { id: "SH-A7", number: "A107", type: "AC Room", available: false, amenities: "AC + TV + Geyser" },
      { id: "SH-A8", number: "A108", type: "AC Room", available: true, amenities: "AC + TV + Geyser" },
    ],
  },
}

interface BookingData {
  employeeData: {
    name: string;
  };
  checkIn: Date;
  checkOut: Date;
}

export function GuestHouseSelection({
  bookingData,
  onContinue,
  onBack,
}: {
  bookingData: BookingData;
  onContinue: (data: any) => void;
  onBack: () => void;
}) {
  const [selectedGuestHouse, setSelectedGuestHouse] = useState("Mohan Nagar")
  const [selectedRoom, setSelectedRoom] = useState<{
    id: string
    number: string
    type: string
    available: boolean
    amenities: string
  } | null>(null)
  const [error, setError] = useState("")

  const handleContinue = () => {
    if (!selectedRoom) {
      setError("Please select a room")
      return
    }

    onContinue({
      ...bookingData,
      guestHouse: selectedGuestHouse,
      room: selectedRoom,
    })
  }

  const getStatusColor = (available: boolean) => {
    return available
      ? "border-green-300 bg-green-50 hover:bg-green-100"
      : "border-red-300 bg-red-50 text-gray-500 opacity-60 cursor-not-allowed"
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
              <CardTitle className="text-[#002060]">Guest House Selection</CardTitle>
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
                      <p className="text-gray-600">Check-in</p>
                      <p className="font-medium">{format(bookingData.checkIn, "dd MMM yyyy, h:mm a")}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-out</p>
                      <p className="font-medium">{format(bookingData.checkOut, "dd MMM yyyy, h:mm a")}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Select Guest House</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant={selectedGuestHouse === "Mohan Nagar" ? "default" : "outline"}
                      className={
                        selectedGuestHouse === "Mohan Nagar" 
                          ? "bg-[#002060] text-white" 
                          : "border-[#002060] text-[#002060] hover:bg-[#002060] hover:text-white"
                      }
                      onClick={() => {
                        setSelectedGuestHouse("Mohan Nagar")
                        setSelectedRoom(null)
                      }}
                    >
                      Mohan Nagar Guest House
                    </Button>
                    <Button
                      variant={selectedGuestHouse === "Steel House" ? "default" : "outline"}
                      className={
                        selectedGuestHouse === "Steel House" 
                          ? "bg-[#002060] text-white" 
                          : "border-[#002060] text-[#002060] hover:bg-[#002060] hover:text-white"
                      }
                      onClick={() => {
                        setSelectedGuestHouse("Steel House")
                        setSelectedRoom(null)
                      }}
                    >
                      Steel Guest House
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Available Rooms</h3>

                  {selectedGuestHouse === "Mohan Nagar" && (
                    <Tabs defaultValue="duplexAC">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="duplexAC">Duplex AC (6)</TabsTrigger>
                        <TabsTrigger value="nonDuplexAC">Non-Duplex AC (4)</TabsTrigger>
                        <TabsTrigger value="nonAC">Non-AC (5)</TabsTrigger>
                      </TabsList>

                      <TabsContent value="duplexAC" className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {guestHouseData["Mohan Nagar"].duplexAC.map((room) => (
                            <div
                              key={room.id}
                              className={`border ${getStatusColor(room.available)} rounded-md p-3 transition-all ${
                                selectedRoom?.id === room.id ? "ring-2 ring-[#002060]" : ""
                              }`}
                              onClick={() => room.available && setSelectedRoom(room)}
                            >
                              <div className="text-center">
                                <p className="font-medium">{room.number}</p>
                                <p className="text-sm">{room.type}</p>
                                <p className="text-xs mt-1">{room.amenities}</p>
                                <p className="text-xs mt-2 font-medium">
                                  {room.available ? "Available" : "Unavailable"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="nonDuplexAC" className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {guestHouseData["Mohan Nagar"].nonDuplexAC.map((room) => (
                            <div
                              key={room.id}
                              className={`border ${getStatusColor(room.available)} rounded-md p-3 transition-all ${
                                selectedRoom?.id === room.id ? "ring-2 ring-[#002060]" : ""
                              }`}
                              onClick={() => room.available && setSelectedRoom(room)}
                            >
                              <div className="text-center">
                                <p className="font-medium">{room.number}</p>
                                <p className="text-sm">{room.type}</p>
                                <p className="text-xs mt-1">{room.amenities}</p>
                                <p className="text-xs mt-2 font-medium">
                                  {room.available ? "Available" : "Unavailable"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="nonAC" className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {guestHouseData["Mohan Nagar"].nonAC.map((room) => (
                            <div
                              key={room.id}
                              className={`border ${getStatusColor(room.available)} rounded-md p-3 transition-all ${
                                selectedRoom?.id === room.id ? "ring-2 ring-[#002060]" : ""
                              }`}
                              onClick={() => room.available && setSelectedRoom(room)}
                            >
                              <div className="text-center">
                                <p className="font-medium">{room.number}</p>
                                <p className="text-sm">{room.type}</p>
                                <p className="text-xs mt-1">{room.amenities}</p>
                                <p className="text-xs mt-2 font-medium">
                                  {room.available ? "Available" : "Unavailable"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}

                  {selectedGuestHouse === "Steel House" && (
                    <Tabs defaultValue="suites">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="suites">Suites (3)</TabsTrigger>
                        <TabsTrigger value="acRooms">AC Rooms (8)</TabsTrigger>
                      </TabsList>

                      <TabsContent value="suites" className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {guestHouseData["Steel House"].suites.map((room) => (
                            <div
                              key={room.id}
                              className={`border ${getStatusColor(room.available)} rounded-md p-3 transition-all ${
                                selectedRoom?.id === room.id ? "ring-2 ring-[#002060]" : ""
                              }`}
                              onClick={() => room.available && setSelectedRoom(room)}
                            >
                              <div className="text-center">
                                <p className="font-medium">{room.number}</p>
                                <p className="text-sm">{room.type}</p>
                                <p className="text-xs mt-1">{room.amenities}</p>
                                <p className="text-xs mt-2 font-medium">
                                  {room.available ? "Available" : "Unavailable"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="acRooms" className="pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {guestHouseData["Steel House"].acRooms.map((room) => (
                            <div
                              key={room.id}
                              className={`border ${getStatusColor(room.available)} rounded-md p-3 transition-all ${
                                selectedRoom?.id === room.id ? "ring-2 ring-[#002060]" : ""
                              }`}
                              onClick={() => room.available && setSelectedRoom(room)}
                            >
                              <div className="text-center">
                                <p className="font-medium">{room.number}</p>
                                <p className="text-sm">{room.type}</p>
                                <p className="text-xs mt-1">{room.amenities}</p>
                                <p className="text-xs mt-2 font-medium">
                                  {room.available ? "Available" : "Unavailable"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                </div>

                {selectedRoom && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-[#002060] mb-2">Selected Room</h4>
                    <p>
                      {selectedGuestHouse} - Room {selectedRoom.number} ({selectedRoom.type})
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{selectedRoom.amenities}</p>
                  </div>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-between">
                  <Button onClick={onBack} variant="outline" className="border-[#002060] text-[#002060]">
                    Back
                  </Button>
                  <Button onClick={handleContinue} className="bg-[#002060] hover:bg-[#003090] text-white" disabled={!selectedRoom}>
                    Continue to Catering
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
