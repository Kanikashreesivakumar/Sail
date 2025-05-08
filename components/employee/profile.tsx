import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserData {
  name?: string;
  id?: string;
  department?: string;
  designation?: string;
}

export function EmployeeProfile({ userData }: { userData: UserData }) {
 
  const recommendedGuestHouse =
    userData?.designation?.includes("General Manager") ||
    userData?.designation?.includes("GM") ||
    userData?.designation?.includes("President")
      ? "Steel House"
      : "Mohan Guest House"


  const extendedData = {
    personalInfo: {
      fullName: userData?.name || "kalai",
      employeeId: userData?.id || "EMP12345",
      department: userData?.department || "Steel Production",
      designation: userData?.designation || "Engineer",
      dateOfJoining: "15-06-2010",
      contactNumber: "+91 9876543210",
      emailId: "kalai@sail.in",
      bloodGroup: "O+",
      emergencyContact: "+91 9876543211",
    },
    addressInfo: {
      permanentAddress: "123, Steel Colony, Sector 5, Bokaro Steel City, Jharkhand - 827005",
      currentAddress: "456, SAIL Township, Block B, Salem, Tamil Nadu - 636013",
      city: "Salem",
      state: "Tamil Nadu",
      pincode: "636013",
    },
    identificationInfo: {
      idCardType: "SAIL Employee ID",
      idCardNumber: "SAIL-EMP-12345",
      aadharNumber: "XXXX-XXXX-7890",
      panNumber: "ABCDE1234F",
    },
    bookingInfo: {
      proposedBy: "Rajesh Kumar (GM-Operations)",
      approvedBy: "Sunil Mehta (Director)",
      purposeOfVisit: "Technical Inspection",
      previousCancellations: 1,
      cancellationRemarks: "Emergency work at plant on 12-03-2023",
      preferredRoomType: "AC",
      specialRequirements: "Ground floor room preferred",
    },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="identification">Identification</TabsTrigger>
          <TabsTrigger value="booking">Booking History</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.fullName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.employeeId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Designation</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.designation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date of Joining</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.dateOfJoining}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.contactNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email ID</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.emailId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Blood Group</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.bloodGroup}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.personalInfo.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Permanent Address</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.addressInfo.permanentAddress}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Address</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.addressInfo.currentAddress}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">City</h3>
                    <p className="mt-1 text-lg font-medium">{extendedData.addressInfo.city}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">State</h3>
                    <p className="mt-1 text-lg font-medium">{extendedData.addressInfo.state}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pincode</h3>
                    <p className="mt-1 text-lg font-medium">{extendedData.addressInfo.pincode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="identification">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Identification Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ID Card Type</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.identificationInfo.idCardType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ID Card Number</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.identificationInfo.idCardNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Aadhar Number</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.identificationInfo.aadharNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">PAN Number</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.identificationInfo.panNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking">
          <Card>
            <CardHeader className="bg-[#f0f4fa]">
              <CardTitle className="text-[#002060]">Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Proposed By</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.proposedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Approved By</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.approvedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Purpose of Visit</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.purposeOfVisit}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Previous Cancellations</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.previousCancellations}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cancellation Remarks</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.cancellationRemarks || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Preferred Room Type</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.preferredRoomType}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Special Requirements</h3>
                  <p className="mt-1 text-lg font-medium">{extendedData.bookingInfo.specialRequirements || "None"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Guest House Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
            <h3 className="font-medium text-[#002060] mb-2">Based on your designation</h3>
            <p className="text-gray-700">
              We recommend <span className="font-bold text-[#002060]">{recommendedGuestHouse}</span> for your stay.
            </p>
            {recommendedGuestHouse === "Steel House" ? (
              <p className="mt-2 text-sm text-gray-600">
                Steel House offers premium accommodations with enhanced amenities suitable for management personnel.
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Mohan Guest House provides comfortable accommodations with all necessary amenities for a pleasant stay.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-[#f0f4fa]">
          <CardTitle className="text-[#002060]">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-gray-500">
            <p>You have no recent bookings.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
