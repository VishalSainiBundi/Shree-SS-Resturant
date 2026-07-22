// const DishCard=({dish})=>{
//     return(
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {dish && dish.length > 0 ? (
//               dish.slice(0, 6).map((d) => (
//                 <div key={d._id} className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
//                   <div className="h-56 overflow-hidden relative">
//                     <img
//                       src={d.image || 'https://via.placeholder.com/400x300/amber-100/amber-700?text=No+Image'}
//                       alt={d.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/400x300/amber-100/amber-700?text=No+Image';
//                       }}
//                     />
//                     {d.feature && (
//                       <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow">
//                         <i className="fas fa-crown mr-1"></i> Chef's Pick
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-6">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-800">{d.name}</h3>
//                         <p className="text-sm text-gray-500 mt-1">{d.sub || d.main}</p>
//                       </div>
//                       <span className="text-amber-800 font-bold text-lg">₹ {d.price}</span>
//                     </div>
//                     <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-2">
//                       {d.description}
//                     </p>
//                     {d.rating && (
//                       <div className="mt-3 flex items-center gap-1 text-amber-500">
//                         <i className="fas fa-star text-sm"></i>
//                         <span className="text-sm font-medium text-gray-700">{d.rating}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-3 text-center py-12">
//                 <p className="text-gray-400">No dishes available at the moment.</p>
//               </div>
//             )}
//           </div>
//     )
// }

// export default DishCard



import { Link } from "react-router-dom";

const DishCard = ({ dish }) => {
  // Helper function for image URL with fallback
  const getImageUrl = (image) => {
    if (!image) {
      return "https://placehold.co/400x300/amber-100/amber-700?text=No+Image";
    }
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${image}`;
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x300/amber-100/amber-700?text=No+Image";
  };

  if (!dish || dish.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl text-gray-300 mb-4">
          <i className="fas fa-utensils"></i>
        </div>
        <h3 className="text-2xl font-semibold text-gray-600">No Dishes Available</h3>
        <p className="text-gray-400 mt-2">Check back later for our delicious offerings.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dish.map((item) => (
        <div
          key={item._id || item.id}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden bg-amber-50">
            <img
              src={getImageUrl(item.image)}
              alt={item.name || item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={handleImageError}
              loading="lazy"
            />
            {item.feature && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                <i className="fas fa-crown mr-1"></i>
                Chef's Pick
              </div>
            )}
            {item.isVeg !== undefined && (
              <div className="absolute top-3 left-3">
                {item.isVeg ? (
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
                  {item.name || item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {item.sub || item.category || "Main Course"}
                </p>
              </div>
              <span className="text-lg font-bold text-amber-700 whitespace-nowrap ml-2">
                ₹{item.price}
              </span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {item.description || "Delicious dish prepared with fresh ingredients."}
            </p>

            {item.rating && (
              <div className="flex items-center gap-1 text-sm mb-3">
                <span className="text-amber-500">
                  <i className="fas fa-star"></i>
                </span>
                <span className="font-medium text-gray-700">{item.rating}</span>
                <span className="text-gray-400">({item.reviewCount || 0} reviews)</span>
              </div>
            )}

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <Link
                to={`/dishDetail/${item._id}`}
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
  );
};

export default DishCard;