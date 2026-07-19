import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApiInstance from '../../helper';

const AdminDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    categories: 0
  });

  // Fetch dishes
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await axiosApiInstance.get('/dish/get');
      const data = response.data?.data || response.data || [];
      console.log(response,"dishes")
      setDishes(data);
      
      // Calculate stats
      const featured = data.filter(dish => dish.feature).length;
      const uniqueCategories = [...new Set(data.map(dish => dish.main))];
      setCategories(uniqueCategories);
      setStats({
        total: data.length,
        featured: featured,
        categories: uniqueCategories.length
      });
    } catch (error) {
      console.error('Error fetching dishes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await axiosApiInstance.delete(`/dishe/${id}`);
        alert('✅ Dish deleted successfully!');
        fetchDishes(); // Refresh list
      } catch (error) {
        console.error('Error deleting dish:', error);
        alert('Failed to delete dish. Please try again.');
      }
    }
  };

  // Handle feature toggle
  const handleToggleFeature = async (id, currentStatus) => {
    try {
      await axiosApiInstance.patch(`/dishe/${id}/toggle-feature`);
      fetchDishes(); // Refresh list
    } catch (error) {
      console.error('Error toggling feature:', error);
      alert('Failed to update feature status.');
    }
  };

  // Filter dishes
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dish.main === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Menu': 'bg-blue-100 text-blue-700',
      'Why choose us': 'bg-purple-100 text-purple-700',
      'Appetizers': 'bg-green-100 text-green-700',
      'Main Course': 'bg-red-100 text-red-700',
      'Desserts': 'bg-pink-100 text-pink-700',
      'Beverages': 'bg-cyan-100 text-cyan-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-800">
              Manage <span className="font-bold text-amber-800">Dishes</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
              <i className="fas fa-heart text-red-500 text-xs"></i>
              SHREE SS RESTAURANT · Taste that stays in your heart
            </p>
          </div>
          <Link
            to="/admin/add-dish"
            className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            <i className="fas fa-plus-circle"></i>
            Add New Dish
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Dishes</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl">
                <i className="fas fa-utensils"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Featured</p>
                <p className="text-2xl font-bold text-amber-600">{stats.featured}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl">
                <i className="fas fa-crown"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl font-bold text-gray-800">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl">
                <i className="fas fa-layer-group"></i>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl shadow-sm p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-100">Quick Action</p>
                <p className="text-sm font-semibold">Add new dish</p>
              </div>
              <Link
                to="/admin/add-dish"
                className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl hover:bg-white/30 transition"
              >
                <i className="fas fa-plus"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition outline-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2.5 text-gray-500 hover:text-amber-600 transition font-medium"
            >
              <i className="fas fa-undo mr-1"></i> Reset
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        {loading ? (
          <div className="text-center py-16">
            <i className="fas fa-spinner fa-spin text-4xl text-amber-600"></i>
            <p className="text-gray-500 mt-4">Loading dishes...</p>
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <i className="fas fa-utensils text-6xl text-gray-300"></i>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No Dishes Found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start by adding your first dish'}
            </p>
            <Link
              to="/admin/add-dish"
              className="inline-block mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl font-semibold transition"
            >
              <i className="fas fa-plus-circle mr-2"></i>
              Add Dish
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dish.image || 'https://via.placeholder.com/400x300/amber-100/amber-700?text=No+Image'}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/amber-100/amber-700?text=No+Image';
                    }}
                  />
                  {dish.feature && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      <i className="fas fa-crown mr-1"></i>
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(dish.main)}`}>
                      {dish.main}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {dish.name}
                    </h3>
                    <span className="text-lg font-bold text-amber-700">
                      ₹{dish.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {dish.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-tag text-amber-500"></i>
                      {dish.sub}
                    </span>
                    {dish.rating && (
                      <span className="flex items-center gap-1">
                        <i className="fas fa-star text-amber-500"></i>
                        {dish.rating}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleToggleFeature(dish._id, dish.feature)}
                      className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition ${
                        dish.feature
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className={`${dish.feature ? 'fas' : 'far'} fa-star mr-1`}></i>
                      {dish.feature ? 'Featured' : 'Feature'}
                    </button>
                    <Link
                      to={`/admin/edit-dish/${dish._id}`}
                      className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-sm font-medium transition"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(dish._id, dish.name)}
                      className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-medium transition"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-8 text-xs text-gray-400">
          <p>SHREE SS RESTAURANT · Taste that stays in your heart ❤️</p>
          <p className="mt-1">Showing {filteredDishes.length} of {dishes.length} dishes</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDishes;