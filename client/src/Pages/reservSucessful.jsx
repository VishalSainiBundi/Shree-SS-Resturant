import { useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
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
  FaTrashAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axiosApiInstance from "../../helper";

const ReservationSuccess = ({ reserv = [] }) => {
  const { state } = useLocation();
  const { email } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const reservation =
    state?.reservation ||
    reserv.find(
      (item) => item.email === decodeURIComponent(email)
    );

  // ===== CANCELLATION HANDLER =====
  const handleCancel = async () => {
    if (!reservation) return;
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your reservation (ID: ${reservation._id})? This action cannot be undone.`
    );
    if (!confirmCancel) return;

    try {
      const response = await axiosApiInstance.delete(`/reserve/delete/${reservation._id}`);
      if (response.data.flag === 0) {
        alert("✅ Reservation cancelled successfully.");
        navigate("/reservation");
      } else {
        alert(response.data.msg || "Failed to cancel reservation.");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert(error.response?.data?.msg || "An error occurred while cancelling.");
    }
  };

  // ===== PRINT HANDLER =====
  const handlePrint = () => {
    window.print();
  };

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
      <div className="w-full max-w-4xl mx-auto">
        {/* ===== PRINT AREA ===== */}
        <div className="print-area">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100/50"
          >
            {/* ===== HEADER ===== */}
            <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-center py-8 px-4 sm:py-10 sm:px-6 overflow-hidden">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                <FaCheckCircle className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 drop-shadow-lg" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Reservation Successful!
                </h1>
                <p className="mt-2 text-orange-100 text-sm sm:text-base">Thank you for choosing</p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1 tracking-wider">
                  SHREE SS RESTAURANT
                </h2>
                <div className="mt-3 flex justify-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                    🎉 Confirmed
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ===== RESERVATION ID ===== */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-3 text-center border-b border-amber-200/30">
              <p className="text-gray-500 font-medium text-xs uppercase tracking-wider">
                Reservation ID
              </p>
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-amber-600 mt-1 break-all"
              >
                #{reservation.reservationId || reservation._id}
              </motion.h2>
            </div>

            {/* ===== DETAILS GRID ===== */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
              <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/50">
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Reservation Status
                  </p>
                  <span className="inline-flex items-center gap-2 mt-1.5 bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold shadow-lg shadow-amber-500/30 text-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {reservation.status ? "Confirmed" : "Pending"}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 text-amber-600 mb-1.5">
                    <FaClipboardList className="text-lg" />
                    <h3 className="font-bold text-sm">Special Request</h3>
                  </div>
                  <p className="text-gray-700 text-sm break-words">
                    {reservation.specialRequest || "No special request."}
                  </p>
                </div>
              </div>

              {/* ===== CONTACT (hidden in print) ===== */}
              <div className="no-print mt-4 sm:mt-6">
                <div className="bg-gradient-to-r from-orange-100/50 to-amber-100/50 rounded-2xl p-3 sm:p-4 border border-orange-200/50">
                  <div className="flex flex-col xs:flex-row items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 flex-shrink-0">
                      <FaPhoneAlt className="text-lg" />
                    </div>
                    <div className="text-center xs:text-left">
                      <h3 className="font-semibold text-gray-800 text-sm">Need Help?</h3>
                      <p className="text-gray-600 text-sm">
                        Call us at <span className="font-bold text-amber-600">+91 98765 43210</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== BUTTONS (hidden in print) ===== */}
              <div className="no-print mt-6 sm:mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="flex-1 min-w-[100px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group text-sm"
                >
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  Home
                </Link>

                <button
                  onClick={handlePrint}
                  className="flex-1 min-w-[100px] bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-amber-50 text-sm"
                >
                  <FaPrint />
                  Print
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
                  className="flex-1 min-w-[100px] bg-white border-2 border-amber-200 hover:border-amber-400 text-amber-600 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-amber-50 text-sm"
                >
                  <FaShare />
                  Share
                </button>

                <button
                  onClick={handleCancel}
                  className="flex-1 min-w-[100px] bg-red-50 border-2 border-red-200 hover:border-red-400 text-red-600 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-red-100 text-sm"
                >
                  <FaTrashAlt />
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== FOOTER NOTE (hidden in print) ===== */}
        <div className="no-print text-center mt-6 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} SHREE SS RESTAURANT. All rights reserved.</p>
          <p className="mt-1 text-amber-500">Taste that stays in your heart ❤️</p>
        </div>
      </div>

      {/* ===== PRINT STYLES ===== */}
      <style jsx global>{`
        @media print {
          /* Hide everything by default */
          body * {
            visibility: hidden;
          }
          
          /* Show only print area */
          .print-area,
          .print-area * {
            visibility: visible !important;
          }
          
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
          }
          
          /* Remove shadows and rounded corners for print */
          .print-area .shadow-2xl {
            box-shadow: none !important;
          }
          .print-area .rounded-3xl {
            border-radius: 0 !important;
          }
          
          /* Hide all non-print elements */
          .no-print,
          .no-print * {
            display: none !important;
          }
          
          /* Preserve colors in print */
          .print-area .bg-gradient-to-r,
          .print-area .bg-amber-500,
          .print-area .bg-white,
          .print-area .text-white,
          .print-area .text-amber-600 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Compact layout for printing */
          .print-area .p-6 {
            padding: 12px !important;
          }
          .print-area .gap-4 {
            gap: 8px !important;
          }
          .print-area .py-8 {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
          }
          .print-area .text-4xl {
            font-size: 1.5rem !important;
          }
          .print-area .text-2xl {
            font-size: 1.25rem !important;
          }
          .print-area .text-xl {
            font-size: 1rem !important;
          }
          
          /* Force single page */
          .print-area {
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
};

const InfoCard = ({ icon, title, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay || 0.1 }}
    className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-3 sm:p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-200"
  >
    <div className="flex items-center gap-2 text-amber-500 mb-1">
      <div className="text-sm sm:text-base group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
        {title}
      </h3>
    </div>
    <p className="text-gray-800 font-medium text-sm sm:text-base break-words">
      {value || "-"}
    </p>
  </motion.div>
);

export default ReservationSuccess;