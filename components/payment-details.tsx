import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface EmployeeData {
  salary: number;
  roomBookings: {
    date: string;
    house: string;
    roomType: string;
    roomNumber: string;
    deduction: number;
  }[];
}

export function PaymentDetails({ employeeData }: { employeeData: EmployeeData }) {

  const totalDeductions = employeeData.roomBookings.reduce((total, booking) => total + booking.deduction, 0)
  const remainingSalary = employeeData.salary - totalDeductions

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">Current Payment</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Salary:</span>
                <span className="font-medium">₹{employeeData.salary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Deductions:</span>
                <span className="font-medium text-red-600">- ₹{totalDeductions.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-medium">Remaining Salary:</span>
                <span className="font-bold text-lg">₹{remainingSalary.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">Deduction Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Room Bookings:</span>
                <span className="font-medium">₹{totalDeductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Other Deductions:</span>
                <span className="font-medium">₹0</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-medium">Total Deductions:</span>
                <span className="font-bold text-red-600">₹{totalDeductions.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-blue-700">Deduction History</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>House</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeData.roomBookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.house}</TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell>{booking.roomNumber}</TableCell>
                  <TableCell className="text-right">₹{booking.deduction.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              {employeeData.roomBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    No deduction history found
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
