import { useState, useRef } from "react";
import axiosApiInstance from "../../helper";
import {
  Search,
  Users,
  Crown,
  BriefcaseBusiness,
  UtensilsCrossed,
  Clock,
  MapPin,
  CreditCard,
  Sparkles,
  Star,
  Calendar,
  User,
  Phone,
  CheckCircle,
  Shield,
  Gift,
  Heart,
  Loader2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Map category names to their respective icons and colors
const getCategoryConfig = (category) => {
  const configs = {
    "Royal Dining": {
      icon: Crown,
      color: "from-amber-400 via-amber-500 to-orange-500",
      border: "border-amber-400",
      bgLight: "bg-amber-50",
      description:
        "Experience the epitome of luxury with royal interiors, candle-lit ambiance, and personalized butler service.",
      priceLabel: "Premium Seating",
      badge: "Royal",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    "Business Dining": {
      icon: BriefcaseBusiness,
      color: "from-blue-600 via-indigo-700 to-gray-900",
      border: "border-blue-400",
      bgLight: "bg-blue-50",
      description:
        "Professional environment designed for high-level meetings, conferences, and corporate dining experiences.",
      priceLabel: "Executive Seating",
      badge: "Corporate",
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    "Classic Dining": {
      icon: UtensilsCrossed,
      color: "from-orange-400 via-red-500 to-rose-600",
      border: "border-orange-400",
      bgLight: "bg-orange-50",
      description:
        "Perfect for families and friends with comfortable seating, warm ambiance, and delicious meals.",
      priceLabel: "Standard Seating",
      badge: "Classic",
      gradient: "from-orange-500/20 to-rose-500/20",
    },
  };
  return configs[category] || configs["Classic Dining"];
};

const BookTable = ({ table_data }) => {
  const navigate = useNavigate();
  const bookingFormRef = useRef(null);

  const user = useSelector(
    (state)=> state.userStore.user.payload
  )
  // console.log(user,"userReduxTable")

  // Transform API data into sections structure
  const buildSections = () => {
    if (!table_data || !Array.isArray(table_data)) return [];

    const grouped = table_data.reduce((acc, item) => {
      const category = item.category || "Classic Dining";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        id: item._id || Math.random(),
        tableNo: item.tableNo || "Unknown",
        seats: item.capecity || item.capacity || 2,
        status: item.status ? "Available" : "Occupied",
        price: item.price || 0,
        category: category,
      });
      return acc;
    }, {});

    return Object.keys(grouped).map((category, index) => {
      const config = getCategoryConfig(category);
      const minPrice = Math.min(...grouped[category].map((t) => t.price));
      return {
        id: index + 1,
        title: category,
        icon: config.icon,
        color: config.color,
        border: config.border,
        bgLight: config.bgLight,
        description: config.description,
        price: minPrice,
        priceLabel: config.priceLabel,
        badge: config.badge,
        tables: grouped[category],
        gradient: config.gradient,
      };
    });
  };

  const sections = buildSections();

  const [search, setSearch] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const statusStyle = (status) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Reserved":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Occupied":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleBookNow = (table) => {
    setSelectedTable(table);
    setBookingError("");
    setBookingSuccess("");
    setTimeout(() => {
      if (bookingFormRef.current) {
        const formElement = bookingFormRef.current;
        const formPosition =
          formElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = formPosition - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !guestEmail || !bookingDate || !bookingTime) {
      setBookingError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setBookingError("");
    setBookingSuccess("");

    try {
      const bookingData = {
        customerName: guestName,
        phone: guestPhone,
        email: guestEmail,
        tableNo: selectedTable.tableNo,
        price: selectedTable.price,
        capecity: selectedTable.seats,
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        category: selectedTable.category || "Classic Dining",
        specialRequest: specialRequest,
      };

      // console.log("Sending booking data:", bookingData);
let response

      if(user){
      response = await axiosApiInstance.post("/reserve/create", bookingData);

      }else{
        navigate('/auth')
        return alert('Please login')
      }


      // console.log("Booking response:", response.data);

      if (response.data.flag === 0) {
        await axiosApiInstance.patch("/reserve/status");
        setBookingSuccess(`✅ Table ${selectedTable.tableNo} booked successfully!`);
        setSelectedTable(null);
        setGuestName("");
        setGuestPhone("");
        setGuestEmail("");
        setBookingDate("");
        setBookingTime("");
        setSpecialRequest("");
        navigate(`/reservation_sucess/${guestEmail}`, {
          state: { reservation: response.data.bookData },
        });
      } else {
        setBookingError(response.data.msg || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      if (error.response) {
        setBookingError(
          error.response.data?.msg || `Server error: ${error.response.status}`
        );
      } else if (error.request) {
        setBookingError("No response from server. Please check your connection.");
      } else {
        setBookingError(error.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Available":
        return <CheckCircle size={14} className="text-emerald-600" />;
      case "Reserved":
        return <Clock size={14} className="text-amber-600" />;
      case "Occupied":
        return <Users size={14} className="text-rose-600" />;
      default:
        return null;
    }
  };

  if (!table_data || table_data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center py-20">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mx-auto flex items-center justify-center mb-6 shadow-xl">
            <UtensilsCrossed size={40} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700">No Tables Available</h2>
          <p className="text-gray-500 mt-3 max-w-sm mx-auto">
            Please check back later for table availability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-orange-50/30 py-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HERO SECTION ===== */}
        <div className="relative mb-10 sm:mb-16">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>

          <div className="text-center relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-4 shadow-sm border border-amber-200/50">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">
                Reserve Your Table
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-800">Book Your</span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                Premium Table
              </span>
            </h1>

            <p className="text-gray-500 mt-3 text-base max-w-2xl mx-auto leading-relaxed px-2">
              Reserve your favourite table and enjoy an unforgettable dining
              experience.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs sm:text-sm">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="text-gray-600">Premium</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs sm:text-sm">
                <Clock size={16} className="text-amber-500" />
                <span className="text-gray-600">24/7</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs sm:text-sm">
                <CreditCard size={16} className="text-amber-500" />
                <span className="text-gray-600">Secure</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30 text-xs sm:text-sm">
                <Heart size={16} className="text-white" />
                <span className="text-white font-semibold">Trusted</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="max-w-md mx-auto mb-10 sm:mb-16 relative">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search Table Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-14 py-4 shadow-lg hover:shadow-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full hidden sm:block">
              {search
                ? `${sections.reduce(
                    (acc, s) =>
                      acc +
                      s.tables.filter((t) =>
                        t.tableNo.toLowerCase().includes(search.toLowerCase())
                      ).length,
                    0
                  )} found`
                : "Type to search"}
            </div>
          </div>
        </div>

        {/* ===== SECTIONS ===== */}
        {sections.map((section) => {
          const Icon = section.icon;
          const filteredTables = section.tables.filter((table) =>
            table.tableNo.toLowerCase().includes(search.toLowerCase())
          );

          if (filteredTables.length === 0) return null;

          return (
            <section key={section.id} className="mb-12 sm:mb-16 lg:mb-20">
              {/* Section Header */}
              <div
                className={`rounded-3xl bg-gradient-to-r ${section.color} text-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-amber-500/20 mb-6 sm:mb-8 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10 gap-3">
                  <div className="flex items-center gap-3 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <Icon size={26} className="sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                          {section.title}
                        </h2>
                        <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border border-white/20">
                          {section.badge}
                        </span>
                      </div>
                      <p className="text-white/90 mt-0.5 text-xs sm:text-sm lg:text-base max-w-2xl hidden sm:block">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 mt-1 md:mt-0">
                    <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-2xl border border-white/20 text-center">
                      <p className="text-[10px] sm:text-xs text-white/70">Starting from</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold">₹{section.price}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl border border-white/20">
                      <p className="text-xs sm:text-sm font-semibold">
                        {filteredTables.length} Tables
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {filteredTables.map((table) => (
                  <div
                    key={table.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-200/50 hover:border-amber-300 hover:-translate-y-2 active:scale-[0.98] touch-manipulation"
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:via-amber-400/10 group-hover:to-amber-400/5 transition-all duration-500 pointer-events-none"></div>

                    {/* Card Header */}
                    <div
                      className={`bg-gradient-to-r ${section.color} text-white p-4 sm:p-5 relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                              {table.tableNo}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Users size={14} className="opacity-80" />
                              <span className="opacity-90 text-sm">
                                {table.seats} Seats
                              </span>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-xl text-center">
                            <p className="text-[10px] opacity-70">Price</p>
                            <p className="text-sm font-bold">₹{table.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusStyle(
                            table.status
                          )}`}
                        >
                          {getStatusIcon(table.status)}
                          {table.status}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < 4
                                  ? "fill-amber-500 text-amber-500"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-400">Dining</span>
                          <span className="font-medium text-gray-700">
                            {section.title}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-400">Table</span>
                          <span className="font-medium text-gray-700">
                            {table.tableNo}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-1.5">
                          <span className="text-gray-400">Capacity</span>
                          <span className="font-medium text-gray-700">
                            {table.seats} Guests
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookNow(table)}
                        disabled={table.status !== "Available"}
                        className={`w-full py-3.5 sm:py-4 rounded-2xl font-semibold transition-all duration-300 transform active:scale-95 ${
                          table.status === "Available"
                            ? `bg-gradient-to-r ${section.color} hover:scale-[1.02] hover:shadow-xl text-white`
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {table.status === "Available" ? (
                          <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                            <Calendar size={18} />
                            Book Now
                            <span className="text-xs sm:text-sm opacity-80">
                              • ₹{table.price}
                            </span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            {getStatusIcon(table.status)}
                            {table.status}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* ===== NO RESULTS ===== */}
        {sections.every(
          (section) =>
            section.tables.filter((table) =>
              table.tableNo.toLowerCase().includes(search.toLowerCase())
            ).length === 0
        ) && (
          <div className="text-center py-12 sm:py-20">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mx-auto flex items-center justify-center mb-5 shadow-xl">
              <Search size={32} className="sm:w-[44px] sm:h-[44px] text-amber-400" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-700">
              No Tables Found
            </h2>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto px-4">
              Try searching with another table number or browse our available
              sections.
            </p>
          </div>
        )}

        {/* ===== BOOKING FORM ===== */}
        {selectedTable && (
          <div
            ref={bookingFormRef}
            id="booking-form"
            className="mt-12 sm:mt-16 max-w-2xl mx-auto animate-fadeIn pb-8"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-3xl overflow-hidden border border-amber-100/50">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                      <Calendar size={22} />
                      Book Your Table
                    </h3>
                    <p className="text-amber-100 text-xs sm:text-sm mt-0.5">
                      Table {selectedTable.tableNo} • {selectedTable.seats} Seats
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition backdrop-blur-sm flex items-center justify-center text-xl hover:rotate-90 duration-300 active:scale-90"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8">
                {/* Error/Success Messages */}
                {bookingError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {bookingError}
                  </div>
                )}
                {bookingSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                    {bookingSuccess}
                  </div>
                )}

                {/* Price Summary - Mobile friendly */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-5 mb-6 border border-amber-200">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Total</p>
                      <p className="text-xl sm:text-2xl font-bold text-amber-600">
                        ₹{selectedTable.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Table</p>
                      <p className="font-semibold text-gray-700 text-sm sm:text-base">
                        {selectedTable.tableNo}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500">Seats</p>
                      <p className="font-semibold text-gray-700 text-sm sm:text-base">
                        {selectedTable.seats}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-amber-200 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield size={14} className="text-amber-500" />
                    <span>Secure • Free cancellation up to 2h before</span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <User size={16} className="inline mr-1.5 text-amber-500" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        placeholder="Enter your name"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Phone size={16} className="inline mr-1.5 text-amber-500" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        required
                        placeholder="Enter phone number"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition bg-white/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <svg
                        className="inline mr-1.5 text-amber-500"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition bg-white/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Calendar size={16} className="inline mr-1.5 text-amber-500" />
                        Date *
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Clock size={16} className="inline mr-1.5 text-amber-500" />
                        Time *
                      </label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition bg-white/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Gift size={16} className="inline mr-1.5 text-amber-500" />
                      Special Request (Optional)
                    </label>
                    <textarea
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="Any special requests (e.g., anniversary, birthday, dietary preferences)"
                      rows="2"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 sm:py-3 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition resize-none bg-white/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 sm:py-4.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform active:scale-[0.98] flex items-center justify-center gap-3 text-base sm:text-lg ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={22} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={22} />
                        Confirm Booking • ₹{selectedTable.price}
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-xs text-gray-400 text-center flex flex-wrap items-center justify-center gap-2">
                    <Shield size={14} className="text-amber-400" />
                    Free cancellation up to 2 hours before
                    <span className="w-px h-3 bg-gray-300 hidden xs:inline"></span>
                    <MapPin size={14} className="text-amber-400" />
                    Instant confirmation
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
          background-size: 200% 200%;
        }

        /* Better touch targets on mobile */
        button, input, select, textarea {
          touch-action: manipulation;
        }
        input, select, textarea {
          font-size: 16px; /* Prevents auto-zoom on iOS */
        }
      `}</style>
    </div>
  );
};

export default BookTable;