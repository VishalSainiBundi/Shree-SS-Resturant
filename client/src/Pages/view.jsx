import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ViewCategoryDishes = ({ dish = [], category = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================
  // Find category by ID
  // ==========================
  const selectedCategory = category.find((d) => d._id === id);

  // ==========================
  // Filter dishes by sub category
  // ==========================
  const filteredDishes = dish.filter(
    (d) => d.sub === selectedCategory?.sub || d.category === selectedCategory?.main || d.main === selectedCategory?.main
  );

  console.log("Selected Category:", selectedCategory);
  console.log("Filtered Dishes:", filteredDishes);

  // ==========================
  // State for loading
  // ==========================
  const [loading, setLoading] = useState(true);

  // ==========================
  // Simulate loading
  // ==========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // ==========================
  // Image URL Helper
  // ==========================
  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/600x400/amber-100/amber-700?text=No+Image";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${image}`;
  };

  // ==========================
  // Handle Image Error
  // ==========================
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/600x400/amber-100/amber-700?text=No+Image";
  };

  // ==========================
  // Loading State
  // ==========================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 font-medium">Loading dishes...</p>
        </div>
      </div>
    );
  }

  // ==========================
  // No Category Found
  // ==========================
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl text-gray-300 mb-4">
            <i className="fas fa-folder-open"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-700">Category Not Found</h3>
          <p className="text-gray-500 mt-2">The category you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(selectedCategory.image)}
            alt={selectedCategory.main || selectedCategory.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-2 bg-amber-500/90 text-white text-xs rounded-full px-3 py-1">
                <i className="fas fa-utensils"></i>
                {selectedCategory.sub || "Category"}
              </span>
              {selectedCategory.feature && (
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full px-3 py-1 shadow-lg">
                  <i className="fas fa-star"></i>
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              {selectedCategory.main || selectedCategory.name}
            </h1>
            <p className="mt-3 text-gray-200 text-base sm:text-lg max-w-2xl">
              {selectedCategory.description || `Explore our delicious ${selectedCategory.main || selectedCategory.name} selection`}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-white/60 text-sm flex items-center gap-1">
                <i className="fas fa-utensils"></i>
                {filteredDishes.length} Dishes
              </span>
              <span className="w-px h-4 bg-white/20"></span>
              <Link
                to="/menu"
                className="text-amber-400 hover:text-amber-300 text-sm font-medium transition flex items-center gap-1"
              >
                View All Menu
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white px-4 py-2 rounded-xl transition flex items-center gap-2 border border-white/10"
        >
          <i className="fas fa-arrow-left"></i>
          <span className="hidden sm:inline">Back</span>
        </button>
      </section>

      {/* ================= DISHES GRID ================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {selectedCategory.main || selectedCategory.name} Dishes
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {filteredDishes.length} delicious dishes available
              </p>
            </div>
            {filteredDishes.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <i className="fas fa-fire text-amber-500"></i>
                <span>Fresh & Delicious</span>
              </div>
            )}
          </div>

          {/* Dishes Grid */}
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dishItem) => (
                <div
                  key={dishItem._id || dishItem.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-amber-50">
                    <img
                      src={getImageUrl(dishItem.image)}
                      alt={dishItem.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    {dishItem.feature && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                        <i className="fas fa-crown mr-1"></i>
                        Chef's Pick
                      </div>
                    )}
                    {dishItem.veg !== undefined && (
                      <div className="absolute top-3 left-3">
                        {dishItem.veg ? (
                          <span className="inline-block w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow"></span>
                        ) : (
                          <span className="inline-block w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow"></span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                          {dishItem.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {dishItem.sub || dishItem.category || "Main Course"}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-amber-700 whitespace-nowrap ml-2">
                        ₹{dishItem.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {dishItem.description || "Delicious dish prepared with fresh ingredients."}
                    </p>

                    {dishItem.rating && (
                      <div className="flex items-center gap-1 text-sm mb-3">
                        <span className="text-amber-500">
                          <i className="fas fa-star"></i>
                        </span>
                        <span className="font-medium text-gray-700">{dishItem.rating}</span>
                        <span className="text-gray-400">({dishItem.reviewCount || 0} reviews)</span>
                      </div>
                    )}

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Link
                        to={`/dish/${dishItem._id || dishItem.id}`}
                        className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-center px-4 py-2 rounded-xl text-sm font-medium transition shadow-md hover:shadow-lg"
                      >
                        View Details
                      </Link>
                      <button
                        className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-sm font-medium transition flex items-center gap-1"
                        title="Add to Cart"
                      >
                        <i className="fas fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="inline-block p-6 bg-amber-50 rounded-full mb-4">
                <i className="fas fa-utensils text-5xl text-amber-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-700">No Dishes Available</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                There are no dishes in this category yet. Check back later for delicious additions.
              </p>
              <Link
                to="/menu"
                className="inline-block mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition"
              >
                Browse All Menu
              </Link>
            </div>
          )}

          {/* Category Info Footer */}
          {filteredDishes.length > 0 && (
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <i className="fas fa-utensils text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{selectedCategory.main || selectedCategory.name}</h4>
                    <p className="text-sm text-gray-500">{filteredDishes.length} items • Fresh & Delicious</p>
                  </div>
                </div>
                <Link
                  to="/menu"
                  className="text-amber-600 hover:text-amber-700 font-medium transition flex items-center gap-1"
                >
                  View All Categories
                  <i className="fas fa-arrow-right text-sm"></i>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewCategoryDishes;