export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#002060] mb-6">About SAIL Guest House Portal</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#002060] mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            The SAIL Guest House Portal is designed to streamline the process of booking and managing guest house
            accommodations for Steel Authority of India Limited employees. Our system aims to provide a seamless
            experience for both employees and administrators.
          </p>
          <p className="text-gray-700">
            With this portal, employees can easily book rooms, select meal options, and manage their stay at SAIL guest
            houses. Administrators can efficiently manage room availability, food services, and track revenue.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#002060] mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Easy room booking with calendar-based availability</li>
            <li>Designation-based guest house recommendations</li>
            <li>Food menu selection for your stay</li>
            <li>Transparent payment system</li>
            <li>Admin dashboard for comprehensive management</li>
            <li>Revenue tracking and reporting</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#002060] mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-2">
            <strong>Address:</strong> SAIL Corporate Office, Lodhi Road, New Delhi - 110003
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> guesthouse@sail.in
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> +91-11-2436-7481
          </p>
        </div>
      </div>
    </div>
  )
}
