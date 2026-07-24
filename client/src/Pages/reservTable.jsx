import { useState } from "react";
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
} from "lucide-react";

// Map category names to their respective icons and colors
const getCategoryConfig = (category) => {
  const configs = {
    "Royal Dining": {
      icon: Crown,
      color: "from-amber-400 via-amber-500 to-orange-500",
      border: "border-amber-400",
      bgLight: "bg-amber-50",
      description: "Experience the epitome of luxury with royal interiors, candle-lit ambiance, and personalized butler service.",
      priceLabel: "Premium Seating",
      badge: "Royal",
    },
    "Business Dining": {
      icon: BriefcaseBusiness,
      color: "from-blue-600 via-indigo-700 to-gray-900",
      border: "border-blue-400",
      bgLight: "bg-blue-50",
      description: "Professional environment designed for high-level meetings, conferences, and corporate dining experiences.",
      priceLabel: "Executive Seating",
      badge: "Corporate",
    },
    "Classic Dining": {
      icon: UtensilsCrossed,
      color: "from-orange-400 via-red-500 to-rose-600",
      border: "border-orange-400",
      bgLight: "bg-orange-50",
      description: "Perfect for families and friends with comfortable seating, warm ambiance, and delicious meals.",
      priceLabel: "Standard Seating",
      badge: "Classic",
    },
  };
  return configs[category] || configs["Classic Dining"];
};

const BookTable = ({ table_data }) => {
  console.log(table_data, "tableData");

  // Transform API data into sections structure
  const buildSections = () => {
    if (!table_data || !Array.isArray(table_data)) return [];
    
    // Group tables by category
    const grouped = table_data.reduce((acc, item) => {
      const category = item.category || "Classic Dining";
      if (!acc[category]) {
        acc[category] = [];
      }
      // Map API fields to component fields
      acc[category].push({
        id: item._id || Math.random(),
        tableNo: item.tableNo || "Unknown",
        seats: item.capecity || item.capacity || 2, // Handle both spellings
        status: item.status ? "Available" : "Occupied",
        price: item.price || 0,
      });
      return acc;
    }, {});

    // Convert to sections array
    return Object.keys(grouped).map((category, index) => {
      const config = getCategoryConfig(category);
      // Get min price for the section
      const minPrice = Math.min(...grouped[category].map(t => t.price));
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
    document.getElementById("booking-form").scrollIntoView({ 
      behavior: "smooth",
      block: "center",
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Table ${selectedTable?.tableNo} booked successfully!\n\nName: ${guestName}\nDate: ${bookingDate}\nTime: ${bookingTime}\nPrice: ₹${selectedTable?.price}`);
    setSelectedTable(null);
    setGuestName("");
    setGuestPhone("");
    setGuestEmail("");
    setBookingDate("");
    setBookingTime("");
    setSpecialRequest("");
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

  // Show loading or empty state if no data
  if (!table_data || table_data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mx-auto flex items-center justify-center mb-6 shadow-xl">
            <UtensilsCrossed size={44} className="text-amber-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700">No Tables Available</h2>
          <p className="text-gray-500 mt-3 max-w-sm mx-auto">
            Please check back later for table availability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===== HERO SECTION ===== */}
        <div className="relative mb-16">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
          
          <div className="text-center relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-2.5 rounded-full mb-5 shadow-sm border border-amber-200/50">
              <Sparkles size={18} className="text-amber-500" />
              <span className="text-amber-700 font-semibold text-sm tracking-[0.2em] uppercase">
                Reserve Your Table
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-800">Book Your</span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                Premium Table
              </span>
            </h1>
            
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
              Reserve your favorite table and enjoy an unforgettable dining
              experience with your family, friends, or business partners.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                <Star size={18} className="text-amber-500 fill-amber-500" />
                <span className="text-sm text-gray-600">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                <Clock size={18} className="text-amber-500" />
                <span className="text-sm text-gray-600">24/7 Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                <CreditCard size={18} className="text-amber-500" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/30">
                <Heart size={18} className="text-white" />
                <span className="text-sm text-white font-semibold">Trusted Since 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search Table Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 shadow-lg hover:shadow-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {search ? `${sections.reduce((acc, s) => acc + s.tables.filter(t => t.tableNo.toLowerCase().includes(search.toLowerCase())).length, 0)} found` : 'Type to search'}
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
            <section key={section.id} className="mb-24">
              {/* Section Header */}
              <div
                className={`rounded-3xl bg-gradient-to-r ${section.color} text-white p-8 lg:p-10 shadow-2xl shadow-amber-500/20 mb-10 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-2xl"></div>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10 gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <Icon size={34} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold">{section.title}</h2>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                          {section.badge}
                        </span>
                      </div>
                      <p className="text-white/90 mt-1 max-w-2xl">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 text-center">
                      <p className="text-xs text-white/70">Starting from</p>
                      <p className="text-2xl font-bold">₹{section.price}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/20">
                      <p className="text-sm font-semibold">{filteredTables.length} Tables</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTables.map((table) => (
                  <div
                    key={table.id}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-3xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-amber-300 hover:-translate-y-3 relative"
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:via-amber-400/10 group-hover:to-amber-400/5 transition-all duration-500 pointer-events-none"></div>
                    
                    {/* Card Header */}
                    <div
                      className={`bg-gradient-to-r ${section.color} text-white p-5 relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold tracking-tight">{table.tableNo}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Users size={14} className="opacity-80" />
                              <span className="opacity-90 text-sm">{table.seats} Seats</span>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl text-center">
                            <p className="text-xs opacity-70">Price</p>
                            <p className="text-sm font-bold">₹{table.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-4">
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
                                i < 4 ? "fill-amber-500 text-amber-500" : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm mb-5">
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-400">Dining</span>
                          <span className="font-medium text-gray-700">{section.title}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-400">Table</span>
                          <span className="font-medium text-gray-700">{table.tableNo}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5">
                          <span className="text-gray-400">Capacity</span>
                          <span className="font-medium text-gray-700">{table.seats} Guests</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookNow(table)}
                        disabled={table.status !== "Available"}
                        className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-300 transform ${
                          table.status === "Available"
                            ? `bg-gradient-to-r ${section.color} hover:scale-[1.02] hover:shadow-xl text-white group-hover:shadow-${section.color.split(' ')[1]}/30`
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {table.status === "Available" ? (
                          <span className="flex items-center justify-center gap-2">
                            <Calendar size={18} />
                            Book Now
                            <span className="text-sm opacity-80">• ₹{table.price}</span>
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
          <div className="text-center py-20">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mx-auto flex items-center justify-center mb-6 shadow-xl">
              <Search size={44} className="text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-700">No Tables Found</h2>
            <p className="text-gray-500 mt-3 max-w-sm mx-auto">
              Try searching with another table number or browse our available sections.
            </p>
          </div>
        )}

        {/* ===== BOOKING FORM ===== */}
        {selectedTable && (
          <div id="booking-form" className="mt-16 max-w-2xl mx-auto animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-3xl overflow-hidden border border-amber-100/50">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Calendar size={24} />
                      Book Your Table
                    </h3>
                    <p className="text-amber-100 text-sm mt-1">
                      Table {selectedTable.tableNo} • {selectedTable.seats} Seats
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTable(null)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition backdrop-blur-sm flex items-center justify-center text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                {/* Price Summary */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 mb-6 border border-amber-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Price</p>
                      <p className="text-3xl font-bold text-amber-600">₹{selectedTable.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Table</p>
                      <p className="font-semibold text-gray-700">{selectedTable.tableNo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Seats</p>
                      <p className="font-semibold text-gray-700">{selectedTable.seats}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-amber-200 flex items-center gap-2 text-xs text-gray-500">
                    <Shield size={14} className="text-amber-500" />
                    <span>Secure booking • Free cancellation up to 2 hours before</span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <User size={16} className="inline mr-1.5 text-amber-500" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        placeholder="Enter your name"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Phone size={16} className="inline mr-1.5 text-amber-500" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        required
                        placeholder="Enter phone number"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <svg className="inline mr-1.5 text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Calendar size={16} className="inline mr-1.5 text-amber-500" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <Clock size={16} className="inline mr-1.5 text-amber-500" />
                        Time
                      </label>
                      <input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition"
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
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
                  >
                    <CheckCircle size={22} />
                    Confirm Booking • ₹{selectedTable.price}
                  </button>

                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                    <Shield size={14} className="text-amber-400" />
                    Free cancellation up to 2 hours before booking
                    <span className="w-px h-3 bg-gray-300"></span>
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
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
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
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default BookTable;