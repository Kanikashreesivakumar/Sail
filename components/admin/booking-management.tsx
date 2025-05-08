"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const bookingsData = [
  {
    id: "B001",
    employeeName: "Rajesh Kumar",
    employeeId: "EMP1001",
    guestHouse: "Steel House",
    roomNo: "S101",
    checkIn: "2023-05-01",
    checkOut: "2023-05-03",
    paymentStatus: "paid",
  },
  {
    id: "B002",
    employeeName: "Priya Singh",
    employeeId: "EMP1002",
    guestHouse: "Mohan Guest House",
    roomNo: "M102",
    checkIn: "2023-05-02",
    checkOut: "2023-05-04",
    paymentStatus: "pending",
  },
  {
    id: "B003",
    employeeName: "Amit Sharma",
    employeeId: "EMP1003",
    guestHouse: "Steel House",
    roomNo: "S103",
    checkIn: "2023-05-03",
    checkOut: "2023-05-05",
    paymentStatus: "paid",
  },
  {
    id: "B004",
    employeeName: "Neha Patel",
    employeeId: "EMP1004",
    guestHouse: "Mohan Guest House",
    roomNo: "M101",
    checkIn: "2023-05-04",
    checkOut: "2023-05-06",
    paymentStatus: "cancelled",
  },
  {
    id: "B005",
    employeeName: "Suresh Reddy",
    employeeId: "EMP1005",
    guestHouse: "Steel House",
    roomNo: "S102",
    checkIn: "2023-05-05",
    checkOut: "2023-05-07",
    paymentStatus: "paid",
  },
  {
    id: "B006",
    employeeName: "Meena Kumari",
    employeeId: "EMP1006",
    guestHouse: "Mohan Guest House",
    roomNo: "M103",
    checkIn: "2023-05-06",
    checkOut: "2023-05-08",
    paymentStatus: "pending",
  },
  {
    id: "B007",
    employeeName: "Vikram Joshi",
    employeeId: "EMP1007",
    guestHouse: "Steel House",
    roomNo: "S104",
    checkIn: "2023-05-07",
    checkOut: "2023-05-09",
    paymentStatus: "paid",
  },
  {
    id: "B008",
    employeeName: "Anita Desai",
    employeeId: "EMP1008",
    guestHouse: "Mohan Guest House",
    roomNo: "M104",
    checkIn: "2023-05-08",
    checkOut: "2023-05-10",
    paymentStatus: "cancelled",
  },
]

export function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [guestHouseFilter, setGuestHouseFilter] = useState("all")

 
  const filteredBookings = bookingsData.filter((booking) => {
    const matchesSearch =
      booking.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.paymentStatus === statusFilter
    const matchesGuestHouse = guestHouseFilter === "all" || booking.guestHouse === guestHouseFilter

    return matchesSearch && matchesStatus && matchesGuestHouse
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#002060]">Booking Management</h2>
        <Button variant="outline">
          <Download className="mr-2" size={16} />
          Export to CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">All Bookings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search bookings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={guestHouseFilter} onValueChange={setGuestHouseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Guest House" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Guest Houses</SelectItem>
                  <SelectItem value="Steel House">Steel House</SelectItem>
                  <SelectItem value="Mohan Guest House">Mohan Guest House</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Guest House</TableHead>
                <TableHead>Room No</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.employeeName}</TableCell>
                  <TableCell>{booking.employeeId}</TableCell>
                  <TableCell>{booking.guestHouse}</TableCell>
                  <TableCell>{booking.roomNo}</TableCell>
                  <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(booking.paymentStatus)}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No bookings found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
