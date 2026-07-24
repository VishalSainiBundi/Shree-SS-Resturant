import { Link, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaPhoneAlt,
  FaUser,
  FaEnvelope,
  FaChair,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaClipboardList,
} from "react-icons/fa";

const ReservationSuccess = () => {
  const { state } = useLocation();

  // Dummy Data (Replace with API data)
  const reservation = state || {
    reservationId: "RS240726001",
    customerName: "Vishal Saini",
    phone: "9876543210",
    email: "abc@gmail.com",
    tableNo: "T-05",
    category: "VIP",
    guests: 4,
    date: "24 July 2026",
    time: "7:30 PM",
    status: "Pending Confirmation",
    specialRequest: "Birthday Decoration",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-10 px-6">
          <FaCheckCircle className="text-7xl mx-auto mb-4 animate-bounce" />

          <h1 className="text-4xl font-bold">
            Reservation Successful
          </h1>

          <p className="mt-3 text-orange-100 text-lg">
            Thank you for choosing
          </p>

          <h2 className="text-2xl font-bold mt-1">
            SHREE SS RESTAURANT
          </h2>
        </div>

        {/* Reservation ID */}
        <div className="bg-orange-50 py-5 text-center border-b">
          <p className="text-gray-500 font-medium">
            Reservation ID
          </p>

          <h2 className="text-3xl font-extrabold tracking-wider text-orange-600">
            #{reservation.reservationId}
          </h2>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 p-8">

          <InfoCard
            icon={<FaUser />}
            title="Customer"
            value={reservation.customerName}
          />

          <InfoCard
            icon={<FaPhoneAlt />}
            title="Phone"
            value={reservation.phone}
          />

          <InfoCard
            icon={<FaEnvelope />}
            title="Email"
            value={reservation.email}
          />

          <InfoCard
            icon={<FaChair />}
            title="Table"
            value={reservation.tableNo}
          />

          <InfoCard
            icon={<FaTag />}
            title="Category"
            value={reservation.category}
          />

          <InfoCard
            icon={<FaUsers />}
            title="Guests"
            value={reservation.guests}
          />

          <InfoCard
            icon={<FaCalendarAlt />}
            title="Date"
            value={reservation.date}
          />

          <InfoCard
            icon={<FaClock />}
            title="Time"
            value={reservation.time}
          />

        </div>

        {/* Status */}
        <div className="px-8">

          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5">

            <p className="text-gray-500 font-medium mb-2">
              Reservation Status
            </p>

            <span className="inline-flex items-center bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full font-bold">
              🟡 {reservation.status}
            </span>

          </div>

        </div>

        {/* Special Request */}
        <div className="px-8 mt-6">

          <div className="bg-gray-50 rounded-xl p-5 border">

            <div className="flex items-center gap-3 mb-2 text-orange-600">

              <FaClipboardList />

              <h3 className="font-bold">
                Special Request
              </h3>

            </div>

            <p className="text-gray-700">
              {reservation.specialRequest || "No special request."}
            </p>

          </div>

        </div>

        {/* Contact */}
        <div className="px-8 mt-6">

          <div className="bg-orange-50 rounded-xl border p-5">

            <div className="flex items-center gap-3">

              <FaPhoneAlt className="text-orange-500" />

              <div>

                <h3 className="font-semibold">
                  Need Help?
                </h3>

                <p className="text-gray-600">
                  +91 XXXXX XXXXX
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="p-8 flex flex-col md:flex-row gap-4">

          <Link
            to={`/reservation/${reservation.reservationId}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg"
          >
            View Reservation
          </Link>

          <Link
            to="/"
            className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-4 rounded-xl font-semibold text-center transition-all duration-300"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 rounded-xl border p-5 hover:shadow-md transition">

    <div className="flex items-center gap-3 text-orange-500 mb-2">

      <div className="text-xl">
        {icon}
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>

    </div>

    <p className="text-gray-800 font-medium text-lg">
      {value}
    </p>

  </div>
);

export default ReservationSuccess;