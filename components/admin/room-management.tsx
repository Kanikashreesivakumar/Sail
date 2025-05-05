"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Edit, Plus } from "lucide-react"

// Mock room data
const initialRooms = [
  { id: 1, number: "S101", guestHouse: "Steel House", type: "Suite", status: "available", remarks: "" },
  {
    id: 2,
    number: "S102",
    guestHouse: "Steel House",
    type: "Suite",
    status: "unavailable",
    remarks: "Booked till 15th",
  },
  {
    id: 3,
    number: "S103",
    guestHouse: "Steel House",
    type: "Suite",
    status: "maintenance",
    remarks: "Under renovation",
  },
  { id: 4, number: "S201", guestHouse: "Steel House", type: "AC", status: "available", remarks: "" },
  { id: 5, number: "S202", guestHouse: "Steel House", type: "AC", status: "maintenance", remarks: "AC repair" },
  { id: 6, number: "M101", guestHouse: "Mohan Guest House", type: "AC", status: "available", remarks: "" },
  {
    id: 7,
    number: "M102",
    guestHouse: "Mohan Guest House",
    type: "AC",
    status: "unavailable",
    remarks: "Booked till 20th",
  },
  { id: 8, number: "M201", guestHouse: "Mohan Guest House", type: "Non-AC", status: "available", remarks: "" },
]

export function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms)
  const [editingRoom, setEditingRoom] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRoom, setNewRoom] = useState({
    number: "",
    guestHouse: "Steel House",
    type: "AC",
    status: "available",
    remarks: "",
  })

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(rooms.map((room) => (room.id === roomId ? { ...room, status: newStatus } : room)))
  }

  const handleRemarksChange = (roomId, remarks) => {
    setRooms(rooms.map((room) => (room.id === roomId ? { ...room, remarks } : room)))
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setIsDialogOpen(true)
  }

  const handleAddNewRoom = () => {
    setEditingRoom(null)
    setNewRoom({
      number: "",
      guestHouse: "Steel House",
      type: "AC",
      status: "available",
      remarks: "",
    })
    setIsDialogOpen(true)
  }

  const handleSaveRoom = () => {
    if (editingRoom) {
      // Update existing room
      setRooms(rooms.map((room) => (room.id === editingRoom.id ? { ...editingRoom } : room)))
    } else {
      // Add new room
      setRooms([...rooms, { ...newRoom, id: Date.now() }])
    }
    setIsDialogOpen(false)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "unavailable":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#002060]">Room Management</h2>
        <div className="flex space-x-2">
          <Button onClick={handleAddNewRoom} className="bg-[#002060] hover:bg-[#003090]">
            <Plus className="mr-2" size={16} />
            Add Room
          </Button>
          <Button variant="outline">
            <Download className="mr-2" size={16} />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Room Inventory</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Guest House</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.number}</TableCell>
                  <TableCell>{room.guestHouse}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>
                    <Select value={room.status} onValueChange={(value) => handleStatusChange(room.id, value)}>
                      <SelectTrigger className={`w-32 ${getStatusBadgeClass(room.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={room.remarks}
                      onChange={(e) => handleRemarksChange(room.id, e.target.value)}
                      className="h-8"
                      placeholder="Add remarks"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditRoom(room)}>
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-number">Room Number</Label>
                <Input
                  id="room-number"
                  value={editingRoom ? editingRoom.number : newRoom.number}
                  onChange={(e) => {
                    if (editingRoom) {
                      setEditingRoom({ ...editingRoom, number: e.target.value })
                    } else {
                      setNewRoom({ ...newRoom, number: e.target.value })
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guest-house">Guest House</Label>
                <Select
                  value={editingRoom ? editingRoom.guestHouse : newRoom.guestHouse}
                  onValueChange={(value) => {
                    if (editingRoom) {
                      setEditingRoom({ ...editingRoom, guestHouse: value })
                    } else {
                      setNewRoom({ ...newRoom, guestHouse: value })
                    }
                  }}
                >
                  <SelectTrigger id="guest-house">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Steel House">Steel House</SelectItem>
                    <SelectItem value="Mohan Guest House">Mohan Guest House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-type">Room Type</Label>
                <Select
                  value={editingRoom ? editingRoom.type : newRoom.type}
                  onValueChange={(value) => {
                    if (editingRoom) {
                      setEditingRoom({ ...editingRoom, type: value })
                    } else {
                      setNewRoom({ ...newRoom, type: value })
                    }
                  }}
                >
                  <SelectTrigger id="room-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Suite">Suite</SelectItem>
                    <SelectItem value="AC">AC</SelectItem>
                    <SelectItem value="Non-AC">Non-AC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-status">Status</Label>
                <Select
                  value={editingRoom ? editingRoom.status : newRoom.status}
                  onValueChange={(value) => {
                    if (editingRoom) {
                      setEditingRoom({ ...editingRoom, status: value })
                    } else {
                      setNewRoom({ ...newRoom, status: value })
                    }
                  }}
                >
                  <SelectTrigger id="room-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                value={editingRoom ? editingRoom.remarks : newRoom.remarks}
                onChange={(e) => {
                  if (editingRoom) {
                    setEditingRoom({ ...editingRoom, remarks: e.target.value })
                  } else {
                    setNewRoom({ ...newRoom, remarks: e.target.value })
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRoom} className="bg-[#002060] hover:bg-[#003090]">
              {editingRoom ? "Update Room" : "Add Room"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
