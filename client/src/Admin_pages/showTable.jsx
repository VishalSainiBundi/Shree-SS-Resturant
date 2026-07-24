import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApiInstance from '../../helper';
import { 
  Plus, 
  Table, 
  Users, 
  IndianRupee,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter
} from 'lucide-react';
import axios from 'axios';

const AdminTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    booked: 0,
    categories: 0
  });

  // Fetch tables
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const response = await axiosApiInstance.get('/add_table/get');
      const data = response.data?.data || response.data || [];
      // console.log("Tables:", data);
      setTables(data);
      
      // Calculate stats
      const uniqueCategories = [...new Set(data.map(table => table.category))];
      const available = data.filter(table => table.status == true).length;
      const booked = data.filter(table => table.status == false).length;
      
      setCategories(uniqueCategories);
      setStats({
        total: data.length,
        available: data.status,
        // available: data.status.length,
        booked: booked,
        categories: uniqueCategories.length
      });
    } catch (error) {
      console.error('Error fetching tables:', error);
      alert('Failed to load tables');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id, tableNo) => {
    if (window.confirm(`Are you sure you want to delete Table "${tableNo}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/add_table/delete/${id}`);
        alert('✅ Table deleted successfully!');
        fetchTables();
      } catch (error) {
        console.error('Error deleting table:', error);
        alert('Failed to delete table. Please try again.');
      }
    }
  };

  // Handle status toggle
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'booked' : 'available';
    try {
      await axios.patch(`http://localhost:5000/add_table/update/${id}`, {
        status: newStatus
      });
      fetchTables();
    } catch (error) {
      console.error('Error updating table status:', error);
      alert('Failed to update table status.');
    }
  };

  // Filter tables
  const filteredTables = tables.filter(table => {
    const matchesSearch = table.tableNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         table.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || table.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      'Royal Dining': '👑',
      'Business Dining': '💼',
      'Classic Dining': '🍽️'
    };
    return icons[category] || '🪑';
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Royal Dining': 'from-amber-500 to-amber-700',
      'Business Dining': 'from-blue-500 to-blue-700',
      'Classic Dining': 'from-emerald-500 to-emerald-700'
    };
    return colors[category] || 'from-amber-500 to-amber-600';
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    if (status === 'available') {
      return {
        bg: 'bg-emerald-100/80',
        text: 'text-emerald-700',
        border: 'border-emerald-200/50',
        dot: 'bg-emerald-500',
        label: 'Available'
      };
    } else {
      return {
        bg: 'bg-rose-100/80',
        text: 'text-rose-700',
        border: 'border-rose-200/50',
        dot: 'bg-rose-500',
        label: 'Booked'
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/30 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating cream particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-amber-300/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-amber-400 text-2xl">✦</span>
              <h1 className="text-3xl font-serif font-bold text-amber-800">
                Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Tables</span>
              </h1>
              <span className="text-amber-400 text-2xl">✦</span>
            </div>
            <p className="text-amber-600/60 font-light ml-1 flex items-center gap-1">
              <i className="fas fa-heart text-amber-400 text-xs"></i>
              SHREE SS RESTAURANT · Premium Dining Experience
            </p>
          </div>
          <Link
            to="/admin/table/add"
            className="relative group/btn overflow-hidden rounded-xl px-6 py-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/40 to-yellow-300/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex items-center gap-2 text-white font-serif tracking-wide">
              <Plus size={20} />
              Add New Table
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-200/20 p-5 border border-amber-200/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-[0.1em]">Total Tables</p>
                  <p className="text-2xl font-serif font-bold text-amber-800">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100/80 to-yellow-100/80 rounded-xl flex items-center justify-center text-amber-600 text-xl border border-amber-200/50">
                  <Table size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-200/40 to-green-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-200/20 p-5 border border-emerald-200/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-[0.1em]">Available</p>
                  <p className="text-2xl font-serif font-bold text-emerald-700">{stats.available}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100/80 to-green-100/80 rounded-xl flex items-center justify-center text-emerald-600 text-xl border border-emerald-200/50">
                  <CheckCircle size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-200/40 to-red-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-rose-200/20 p-5 border border-rose-200/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-rose-600/70 uppercase tracking-[0.1em]">Booked</p>
                  <p className="text-2xl font-serif font-bold text-rose-700">{stats.booked}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100/80 to-red-100/80 rounded-xl flex items-center justify-center text-rose-600 text-xl border border-rose-200/50">
                  <Users size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200/40 to-violet-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-200/20 p-5 border border-purple-200/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-purple-600/70 uppercase tracking-[0.1em]">Categories</p>
                  <p className="text-2xl font-serif font-bold text-purple-700">{stats.categories}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100/80 to-violet-100/80 rounded-xl flex items-center justify-center text-purple-600 text-xl border border-purple-200/50">
                  <Filter size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="relative group mb-6">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-2xl blur-sm"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-200/20 p-4 border border-amber-200/30">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/60" />
                  <input
                    type="text"
                    placeholder="Search tables by number or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white/80 border-2 border-amber-200/60 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none text-amber-900 placeholder:text-amber-300/60"
                  />
                </div>
              </div>
              <div className="sm:w-52">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/80 border-2 border-amber-200/60 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none text-amber-900 appearance-none cursor-pointer"
                >
                  <option value="all" className="text-amber-700">All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat} className="text-amber-700">{cat}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2.5 text-amber-500/60 hover:text-amber-600 transition-colors font-medium flex items-center gap-1"
              >
                <i className="fas fa-undo mr-1"></i> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-amber-600/60 font-light mt-4">Loading tables...</p>
          </div>
        ) : filteredTables.length === 0 ? (
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-3xl blur-sm"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-amber-200/20 p-16 text-center border border-amber-200/30">
              <Table size={70} className="mx-auto text-amber-300" />
              <h3 className="text-2xl font-serif font-bold text-amber-800 mt-6">No Tables Found</h3>
              <p className="text-amber-600/60 font-light mt-2">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Start by adding your first table'}
              </p>
              <Link
                to="/admin/table/add"
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-serif hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
              >
                <Plus size={20} className="inline mr-2" />
                Add Table
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTables.map((table) => {
              const statusBadge = getStatusBadge(table.status);
              const categoryColor = getCategoryColor(table.category);
              
              return (
                <div
                  key={table._id}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-amber-200/20 hover:shadow-2xl hover:shadow-amber-200/30 transition-all duration-300 overflow-hidden border border-amber-200/30 hover:-translate-y-2">
                    {/* Card Header with Gradient */}
                    <div className={`bg-gradient-to-r ${categoryColor} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                      
                      <div className="relative flex items-center justify-between">
                        <div>
                          <div className="text-4xl mb-2">{getCategoryIcon(table.category)}</div>
                          <h3 className="text-xl font-serif font-bold">{table.tableNo}</h3>
                          <p className="text-white/80 text-sm font-light">{table.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-white/80 text-sm">
                            <Users size={16} />
                            <span>{table.capecity} Guests</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                            <IndianRupee size={16} />
                            <span>₹{table.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
                          {statusBadge.label}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span className="text-amber-300/40">★</span>
                        </div>
                      </div>

                      {/* Table Details */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div className="bg-amber-50/50 rounded-lg p-2 text-center border border-amber-200/30">
                          <p className="text-amber-600/60 text-[10px] uppercase tracking-wider">Capacity</p>
                          <p className="font-serif font-bold text-amber-800">{table.capecity} Guests</p>
                        </div>
                        <div className="bg-amber-50/50 rounded-lg p-2 text-center border border-amber-200/30">
                          <p className="text-amber-600/60 text-[10px] uppercase tracking-wider">Price</p>
                          <p className="font-serif font-bold text-amber-800">₹{table.price}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-amber-200/30">
                        <button
                          onClick={() => handleToggleStatus(table._id, table.status)}
                          className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            table.status === 'available'
                              ? 'bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80 border border-emerald-200/50'
                              : 'bg-rose-100/80 text-rose-700 hover:bg-rose-200/80 border border-rose-200/50'
                          }`}
                        >
                          <i className={`${table.status === 'available' ? 'fas' : 'far'} fa-circle mr-1`}></i>
                          {table.status === 'available' ? 'Book Table' : 'Make Available'}
                        </button>
                        <Link
                          to={`/admin/edit-table/${table._id}`}
                          className="px-3 py-2 bg-blue-50/80 text-blue-600 hover:bg-blue-100/80 rounded-xl text-sm font-medium transition-all duration-300 border border-blue-200/30"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(table._id, table.tableNo)}
                          className="px-3 py-2 bg-rose-50/80 text-rose-600 hover:bg-rose-100/80 rounded-xl text-sm font-medium transition-all duration-300 border border-rose-200/30"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-10 pt-6 border-t border-amber-200/20">
          <div className="flex justify-center items-center gap-3">
            <span className="text-amber-300/40 text-xs">◆</span>
            <p className="text-[10px] text-amber-500/40 font-light tracking-[0.2em] uppercase">
              SHREE SS RESTAURANT · Taste that stays in your heart ❤️
            </p>
            <span className="text-amber-300/40 text-xs">◆</span>
          </div>
          <p className="text-[10px] text-amber-400/30 mt-1 tracking-wider">
            Showing {filteredTables.length} of {tables.length} tables
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AdminTables;