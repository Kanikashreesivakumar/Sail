"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomAvailability } from "@/components/room-availability"
import { PaymentDetails } from "@/components/payment-details"

interface EmployeeData {
  name: string;
  department: string;
  id: string | number;
  salary: number;
  roomBookings: {
    date: string;
    house: string;
    roomType: string;
    roomNumber: string;
    deduction: number;
  }[];
}

export function Dashboard({ employeeData }: { employeeData: EmployeeData }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome {employeeData.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{employeeData.department}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium">{employeeData.id}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-medium">₹{employeeData.salary.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="rooms">Room Availability</TabsTrigger>
          <TabsTrigger value="payments">Payment Details</TabsTrigger>
        </TabsList>
        <TabsContent value="rooms">
          <RoomAvailability />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentDetails employeeData={employeeData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
