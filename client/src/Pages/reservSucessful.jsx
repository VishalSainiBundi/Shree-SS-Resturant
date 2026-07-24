import { Link, useLocation, useParams } from "react-router-dom";
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
  FaArrowLeft,
  FaPrint,
  FaShare,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ReservationSuccess = ({ reserv = [] }) => {
  const { state } = useLocation();
  const { email } = useParams();

  const reservation =
    state?.reservation ||
    reserv.find(
      (item) => item.email === decodeURIComponent(email)
    );

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4 overflow-x-hidden">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-600 mt-4">Loading Reservation...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch your reservation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-100/50 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto my-8 sm:my-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100/50"
        >
          {/* ===== HEADER ===== */}
          <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-center py-10 px-4 sm:py-12 sm:px-6 overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative z-10"
            >
              <FaCheckCircle className="text-5xl sm:text-6xl md:text-7xl mx-auto mb-4 drop-shadow-lg" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Reservation Successful!
              </h1>
              <p className="mt-3 text-orange-100 text-base sm:text-lg">Thank you for choosing</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 tracking-wider">
                SHREE SS RESTAURANT
              </h2>
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                  🎉 Confirmed
                </span>
              </div>
            </motion.div>
          </div>

          {/* ===== RESERVATION ID ===== */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-4 sm:py-5 text-center border-b border-amber-200/30">
            <p className="text-gray-500 font-medium text-xs sm:text-sm uppercase tracking-wider">
              Reservation ID
            </p>
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-amber-600 mt-1 break-all"
            >
              #{reservation.reservationId || reservation._id}
            </motion.h2>
          </div>

          {/* ===== DETAILS GRID ===== */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <InfoCard
                icon={<FaUser />}
                title="Customer"
                value={reservation.customerName || reservation.name}
                delay={0.1}
              />
              <InfoCard
                icon={<FaPhoneAlt />}
                title="Phone"
                value={reservation.phone}
                delay={0.15}
              />
              <InfoCard
                icon={<FaEnvelope />}
                title="Email"
                value={reservation.email}
                delay={0.2}
              />
              <InfoCard
                icon={<FaChair />}
                title="Table"
                value={reservation.tableNo}
                delay={0.25}
              />
              <InfoCard
                icon={<FaTag />}
                title="Category"
                value={reservation.category}
                delay={0.3}
              />
              <InfoCard
                icon={<FaUsers />}
                title="Guests"
                value={reservation.capecity}
                delay={0.35}
              />
              <InfoCard
                icon={<FaCalendarAlt />}
                title="Date"
                value={new Date(reservation.bookingDate).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
                delay={0.4}
              />
              <InfoCard
                icon={<FaClock />}
                title="Time"
                value={reservation.bookingTime}
                delay={0.45}
              />
            </div>

            {/* ===== STATUS & SPECIAL REQUEST ===== */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/50"
              >
                <p className="text-gray-500 font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Reservation Status
                </p>
                <span className="inline-flex items-center gap-2 mt-2 bg-amber-500 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-amber-500/30 text-sm sm:text-base">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  {reservation.status ? "Available" :"Reserved"|| "Pending Confirmation"}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-200"
              >
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <FaClipboardList className="text-lg sm:text-xl" />
                  <h3 className="font-bold text-sm sm:text-base">Special Request</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base break-words">
                  {reservation.specialRequest || "No special request."}
                </p>
              </motion.div>
            </div>

            {/* ===== CONTACT ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-8 bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-2xl p-4 sm:p-5 border border-orange-200/50"
            >
              <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 flex-shrink-0">
                  <FaPhoneAlt className="text-base sm:text-xl" />
                </div>
                <div className="text-center xs:text-left">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Need Help?</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Call us at <span className="font-bold text-amber-600">+91 98765 43210</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ===== BUTTONS ===== */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/"
                className="w-full sm:flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <button
                onClick={() => window.print()}
                className="w-full sm:flex-1 bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-amber-50 text-sm sm:text-base"
              >
                <FaPrint />
                Print Receipt
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Reservation Confirmation - SHREE SS RESTAURANT",
                      text: `Reservation confirmed for ${
                        reservation.customerName || reservation.name
                      } on ${new Date(reservation.bookingDate).toLocaleDateString()} at ${
                        reservation.bookingTime
                      }.`,
                      url: window.location.href,
                    });
                  }
                }}
                className="w-full sm:flex-1 bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-amber-50 text-sm sm:text-base"
              >
                <FaShare />
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* ===== FOOTER NOTE ===== */}
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} SHREE SS RESTAURANT. All rights reserved.</p>
          <p className="mt-1 text-amber-500">Taste that stays in your heart ❤️</p>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay || 0.1 }}
    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-200"
  >
    <div className="flex items-center gap-2 sm:gap-3 text-amber-500 mb-1 sm:mb-2">
      <div className="text-base sm:text-xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-600 text-xs sm:text-sm uppercase tracking-wider">
        {title}
      </h3>
    </div>
    <p className="text-gray-800 font-medium text-sm sm:text-base md:text-lg break-words">
      {value || "-"}
    </p>
  </motion.div>
);

export default ReservationSuccess;