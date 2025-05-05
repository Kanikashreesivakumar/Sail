"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Mock revenue data
const revenueData = {
  totalBookings: 42,
  totalRevenue: 126000,
  roomRevenue: 98000,
  foodRevenue: 28000,
  monthlyData: [
    { date: "2023-05-01", bookings: 2, roomRevenue: 4000, foodRevenue: 1200, total: 5200 },
    { date: "2023-05-02", bookings: 1, roomRevenue: 2000, foodRevenue: 800, total: 2800 },
    { date: "2023-05-03", bookings: 3, roomRevenue: 6000, foodRevenue: 1800, total: 7800 },
    { date: "2023-05-04", bookings: 2, roomRevenue: 4000, foodRevenue: 1000, total: 5000 },
    { date: "2023-05-05", bookings: 4, roomRevenue: 8000, foodRevenue: 2400, total: 10400 },
    { date: "2023-05-06", bookings: 2, roomRevenue: 4000, foodRevenue: 1200, total: 5200 },
    { date: "2023-05-07", bookings: 1, roomRevenue: 2000, foodRevenue: 600, total: 2600 },
    { date: "2023-05-08", bookings: 3, roomRevenue: 6000, foodRevenue: 1800, total: 7800 },
    { date: "2023-05-09", bookings: 2, roomRevenue: 4000, foodRevenue: 1000, total: 5000 },
    { date: "2023-05-10", bookings: 4, roomRevenue: 8000, foodRevenue: 2400, total: 10400 },
  ],
}

export function RevenueTracking() {
  const [timeframe, setTimeframe] = useState("daily")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#002060]">Revenue Tracking</h2>
        <Button variant="outline">
          <Download className="mr-2" size={16} />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueData.totalBookings}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-gray-500">Room Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueData.roomRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-gray-500">Food Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueData.foodRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-[#f0f4fa] flex flex-row items-center justify-between">
          <CardTitle className="text-[#002060]">Revenue Chart</CardTitle>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-80 w-full bg-gray-50 flex items-center justify-center border rounded-md">
            <p className="text-gray-500">Revenue chart visualization would appear here</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Daily Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Room Revenue</TableHead>
                <TableHead>Food Revenue</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.monthlyData.map((day) => (
                <TableRow key={day.date}>
                  <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
                  <TableCell>{day.bookings}</TableCell>
                  <TableCell>₹{day.roomRevenue.toLocaleString()}</TableCell>
                  <TableCell>₹{day.foodRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">₹{day.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
