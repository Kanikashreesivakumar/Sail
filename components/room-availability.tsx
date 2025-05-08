"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"


const roomData = {
  steelHouse: {
    suites: [
      { id: "S-S1", type: "Suite", number: "S1", available: true },
      { id: "S-S2", type: "Suite", number: "S2", available: false },
      { id: "S-S3", type: "Suite", number: "S3", available: true },
    ],
    rooms: [
      { id: "S-101", type: "AC", number: "101", available: true },
      { id: "S-102", type: "AC", number: "102", available: true },
      { id: "S-103", type: "AC", number: "103", available: true },
      { id: "S-104", type: "Non-AC", number: "104", available: true },
      { id: "S-105", type: "Non-AC", number: "105", available: false },
      { id: "S-106", type: "Non-AC", number: "106", available: true },
      { id: "S-107", type: "Non-AC", number: "107", available: true },
      { id: "S-108", type: "Non-AC", number: "108", available: false },
    ],
  },
  mohanNagarHouse: {
    suites: [],
    rooms: [
      { id: "M-101", type: "AC", number: "101", available: true },
      { id: "M-102", type: "AC", number: "102", available: true },
      { id: "M-103", type: "AC", number: "103", available: false },
      { id: "M-104", type: "Non-AC", number: "104", available: true },
      { id: "M-105", type: "Non-AC", number: "105", available: true },
      { id: "M-106", type: "Non-AC", number: "106", available: false },
    ],
  },
}

export function RoomAvailability() {
  const [selectedHouse, setSelectedHouse] = useState("steelHouse")
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; type: string; number: string; available: boolean } | null>(null)
  const [bookingDates, setBookingDates] = useState({ checkIn: "", checkOut: "" })

  const handleBookRoom = () => {
    
    if (selectedRoom) {
      alert(`Room ${selectedRoom.number} booked successfully!`)
    }
    setSelectedRoom(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">Steel House</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Suites (3)</h3>
                <div className="grid grid-cols-3 gap-2">
                  {roomData.steelHouse.suites.map((room) => (
                    <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Rooms (8)</h3>
                <div className="grid grid-cols-4 gap-2">
                  {roomData.steelHouse.rooms.map((room) => (
                    <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">Mohan Nagar House</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Rooms (6)</h3>
                <div className="grid grid-cols-3 gap-2">
                  {roomData.mohanNagarHouse.rooms.map((room) => (
                    <RoomCard key={room.id} room={room} onSelect={setSelectedRoom} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedRoom && (
        <Dialog open={!!selectedRoom} onOpenChange={(open) => !open && setSelectedRoom(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Room</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Room Details</Label>
                <p className="text-sm">
                  {selectedRoom.type} Room {selectedRoom.number} in{" "}
                  {selectedRoom.id.startsWith("S") ? "Steel House" : "Mohan Nagar House"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Date</Label>
                  <input
                    id="checkIn"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={bookingDates.checkIn}
                    onChange={(e) => setBookingDates({ ...bookingDates, checkIn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Date</Label>
                  <input
                    id="checkOut"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={bookingDates.checkOut}
                    onChange={(e) => setBookingDates({ ...bookingDates, checkOut: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleBookRoom} className="bg-blue-600 hover:bg-blue-700">
                Book Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function RoomCard({ room, onSelect }: { room: { id: string; type: string; number: string; available: boolean }; onSelect: (room: { id: string; type: string; number: string; available: boolean }) => void }) {
  return (
    <div
      className={`p-2 border rounded-md text-center cursor-pointer transition-colors ${
        room.available ? "border-green-300 bg-green-50 hover:bg-green-100" : "border-red-300 bg-red-50 text-gray-500"
      }`}
      onClick={() => room.available && onSelect(room)}
    >
      <div className="text-xs">{room.type}</div>
      <div className="font-medium">{room.number}</div>
      <div className={`text-xs mt-1 ${room.available ? "text-green-600" : "text-red-600"}`}>
        {room.available ? "Available" : "Booked"}
      </div>
    </div>
  )
}
