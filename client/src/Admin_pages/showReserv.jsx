import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Table2,
  Search,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  CheckCircle,
  Clock as ClockIcon,
  TrendingUp,
  Trash2,
  RefreshCw,
  X,
  AlertCircle,
  Filter,
  ArrowUpDown,
  Sparkles,
  Crown,
  Star,
  Award,
  Zap,
} from "lucide-react";
import axiosApiInstance from "../../helper";

const AdminReservations = ({ reserving = [] }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancellingId, setCancellingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setReservations(reserving || []);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [reserving]);

  const filteredAndSorted = useCallback(() => {
    let result = [...reservations];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.customerName?.toLowerCase().includes(lower) ||
          item.tableNo?.toLowerCase().includes(lower) ||
          item.phone?.includes(searchTerm) ||
          item.category?.toLowerCase().includes(lower)
      );
    }
    if (statusFilter === "confirmed") {
      result = result.filter((item) => item.status === true);
    } else if (statusFilter === "pending") {
      result = result.filter((item) => item.status === false);
    }
    const sortFieldMap = { date: "bookingDate", name: "customerName", price: "price" };
    const field = sortFieldMap[sortBy] || "bookingDate";
    result.sort((a, b) => {
      let valA = a[field] ?? "";
      let valB = b[field] ?? "";
      if (field === "bookingDate") {
        valA = new Date(valA);
        valB = new Date(valB);
      }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [reservations, searchTerm, statusFilter, sortBy, sortOrder]);

  const filteredReservations = filteredAndSorted();
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalReservations = reservations.length;
  const confirmed = reservations.filter((r) => r.status === true).length;
  const pending = reservations.filter((r) => r.status === false).length;
  const totalRevenue = reservations.reduce((acc, r) => acc + (r.price || 0), 0);

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  }, []);

  const handleCancel = async (id, customerName) => {
    if (!id) return;
    setCancellingId(id);
    try {
      const response = await axiosApiInstance.delete(`/reserve/delete/${id}`);
      if (response.data.flag === 0) {
        setReservations((prev) => prev.filter((item) => item._id !== id));
        showToast(`✅ Reservation for "${customerName}" cancelled successfully.`, "success");
      } else {
        showToast(response.data.msg || "Failed to cancel reservation.", "error");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      showToast(error.response?.data?.msg || "An error occurred while cancelling.", "error");
    } finally {
      setCancellingId(null);
      setShowCancelModal(false);
      setSelectedReservation(null);
    }
  };

  const openCancelModal = (item) => {
    setSelectedReservation(item);
    setShowCancelModal(true);
  };

  const StatusBadge = ({ status }) => {
    if (status === true) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-100/80 to-emerald-200/60 text-emerald-700 border border-emerald-300/50 shadow-sm shadow-emerald-200/20 backdrop-blur-sm">
          <CheckCircle size={14} className="text-emerald-500" />
          Confirmed
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-100/80 to-orange-200/60 text-amber-700 border border-amber-300/50 shadow-sm shadow-amber-200/20 backdrop-blur-sm">
          <ClockIcon size={14} className="text-amber-500" />
          Pending
        </span>
      );
    }
  };

  const Toast = () => {
    if (!toast.show) return null;
    const isSuccess = toast.type === "success";
    return (
      <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-slide-in ${
        isSuccess 
          ? "bg-gradient-to-r from-emerald-50/90 to-emerald-100/60 border-emerald-200 text-emerald-800" 
          : "bg-gradient-to-r from-red-50/90 to-red-100/60 border-red-200 text-red-800"
      }`}>
        {isSuccess ? (
          <CheckCircle size={20} className="text-emerald-500" />
        ) : (
          <AlertCircle size={20} className="text-red-500" />
        )}
        <span className="text-sm font-medium">{toast.message}</span>
        <button onClick={() => setToast({ show: false, message: "", type: "" })} className="ml-2 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
    );
  };

  const CancelModal = () => {
    if (!showCancelModal || !selectedReservation) return null;
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 border border-amber-100/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Trash2 className="text-red-500" size={22} />
              Cancel Reservation
            </h3>
            <button onClick={() => { setShowCancelModal(false); setSelectedReservation(null); }} className="p-2 rounded-full hover:bg-gray-100 transition">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">
              Are you sure you want to cancel the reservation for <span className="font-semibold text-gray-800">{selectedReservation.customerName}</span>?
            </p>
            <div className="mt-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/50 text-sm">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertCircle size={16} />
                <span>This action cannot be undone.</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1 text-gray-600">
                <span>Table: <strong>{selectedReservation.tableNo}</strong></span>
                <span>Date: <strong>{new Date(selectedReservation.bookingDate).toLocaleDateString()}</strong></span>
                <span>Time: <strong>{selectedReservation.bookingTime}</strong></span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleCancel(selectedReservation._id, selectedReservation.customerName)}
              disabled={cancellingId === selectedReservation._id}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {cancellingId === selectedReservation._id ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Yes, Cancel
                </>
              )}
            </button>
            <button
              onClick={() => { setShowCancelModal(false); setSelectedReservation(null); }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
            >
              Keep
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white/90 to-rose-50/30 p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <Toast />
      <CancelModal />

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 relative z-10">
        <div className="group bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 p-5 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Reservations</p>
              <p className="text-3xl font-bold text-gray-800">{totalReservations}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/80 to-orange-400/80 flex items-center justify-center text-white shadow-lg shadow-amber-200/50 group-hover:scale-110 transition">
              <Table2 size={28} />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            {totalReservations > 0 ? "Active reservations" : "No reservations yet"}
          </div>
        </div>

        <div className="group bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 p-5 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Confirmed</p>
              <p className="text-3xl font-bold text-emerald-600">{confirmed}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400/80 to-teal-400/80 flex items-center justify-center text-white shadow-lg shadow-emerald-200/50 group-hover:scale-110 transition">
              <CheckCircle size={28} />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            {totalReservations > 0 ? `${Math.round((confirmed / totalReservations) * 100)}% of total` : "No confirmed reservations"}
          </div>
        </div>

        <div className="group bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/30 p-5 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending</p>
              <p className="text-3xl font-bold text-amber-600">{pending}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/80 to-yellow-400/80 flex items-center justify-center text-white shadow-lg shadow-amber-200/50 group-hover:scale-110 transition">
              <ClockIcon size={28} />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            {totalReservations > 0 ? `${Math.round((pending / totalReservations) * 100)}% of total` : "No pending reservations"}
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-2xl shadow-xl p-5 text-white group hover:shadow-2xl transition">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition">
              <TrendingUp size={28} />
            </div>
          </div>
          <div className="relative z-10 mt-2 text-xs text-white/70 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-white/50"></span>
            From {totalReservations} reservation{totalReservations !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* ===== FILTERS & SEARCH ===== */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-xl border border-white/40 relative z-10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300/50 focus:border-amber-400 transition bg-white/60 backdrop-blur-sm text-sm shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-amber-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300/50 bg-white/60 backdrop-blur-sm shadow-inner"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={18} className="text-amber-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300/50 bg-white/60 backdrop-blur-sm shadow-inner"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <button
              onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              className="p-2 border border-gray-200/60 rounded-xl hover:bg-amber-50/60 transition text-amber-500"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">
            {filteredReservations.length} found
          </span>
          {searchTerm && (
            <button
              onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
              className="p-2 border border-gray-200/60 rounded-xl hover:bg-amber-50/60 transition text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ===== TABLE ===== */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 relative z-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium">Loading reservations...</p>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 relative z-10">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mx-auto flex items-center justify-center mb-5 shadow-xl">
            <Table2 className="text-amber-400" size={40} />
          </div>
          <p className="text-2xl font-bold text-gray-700">No reservations found</p>
          <p className="text-sm text-gray-400 mt-1">
            {searchTerm || statusFilter !== "all" ? "Try adjusting your filters." : "Reservations will appear here once made."}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-100/60 via-orange-100/40 to-rose-100/60 border-b border-amber-200/30">
                    <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Table</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Time</th>
                    <th className="px-5 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/60">
                  {paginatedReservations.map((item) => (
                    <tr key={item._id} className="hover:bg-amber-50/40 transition duration-200 group">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{item.customerName || "Unknown Guest"}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[140px]">{item.phone || "N/A"}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-1.5 font-bold text-gray-700 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200/50 shadow-sm">
                          <Table2 size={14} className="text-amber-400" />
                          {item.tableNo || "N/A"}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Calendar size={14} className="text-amber-400" />
                          {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          }) : "N/A"}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-700">
                          <Clock size={14} className="text-amber-400" />
                          {item.bookingTime || "N/A"}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-50/80 text-amber-700 border border-amber-200/50 shadow-sm">
                          {item.category || "Classic Dining"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-200/50 shadow-sm">
                          <IndianRupee size={14} className="text-emerald-500" />
                          {item.price || 0}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => openCancelModal(item)}
                          disabled={cancellingId === item._id}
                          className="p-2 rounded-xl text-rose-400 hover:bg-rose-50/80 hover:text-rose-600 transition disabled:opacity-40 disabled:cursor-not-allowed group"
                        >
                          {cancellingId === item._id ? (
                            <RefreshCw size={18} className="animate-spin text-amber-500" />
                          ) : (
                            <Trash2 size={18} className="group-hover:scale-110 transition" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 px-6 py-4 relative z-10">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-700">{((currentPage - 1) * itemsPerPage) + 1}</span> –{' '}
                <span className="font-medium text-gray-700">
                  {Math.min(currentPage * itemsPerPage, filteredReservations.length)}
                </span>{' '}
                of <span className="font-medium text-gray-700">{filteredReservations.length}</span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200/60 hover:bg-amber-50/60 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={18} className="text-gray-500" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-amber-50/60 hover:text-amber-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200/60 hover:bg-amber-50/60 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ===== FOOTER ===== */}
      <div className="mt-8 text-center text-xs text-gray-400 relative z-10">
        <p>© {new Date().getFullYear()} SHREE SS RESTAURANT. All rights reserved.</p>
        <p className="mt-0.5 text-amber-500/60">Taste that stays in your heart ❤️</p>
      </div>

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.25s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AdminReservations;