import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import axiosApiInstance from "../../helper";
import axios from "axios"

const DishDetail = ({ dishData, category }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find dish by ID
  const dish = dishData?.find((d) => d._id === id);
  // console.log(dish,"Detail_Dish")

const relatedDishes= dishData.filter(
  (d)=> d.sub === dish.sub
)



  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [orderLoading, setOrderLoading] = useState(false);

  // ==========================
  // Calculate Total Price
  // ==========================
  const totalPrice = dish ? dish.price * quantity : 0;
  const deliveryCharge = totalPrice >= 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  // ==========================
  // Quantity Controls
  // ==========================
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // ==========================
  // Order Now Handler - Saves to Database
  // ==========================
const handleOrderNow = async () => {
  if (!dish) return;

  try {
    setOrderLoading(true);

    const orderData = {
      name: dish.name,
      price: dish.price,
      totalprice: totalPrice,      // Fixed
      image: dish.image,
      sub: dish.sub,
      qty: quantity,
      total: grandTotal,
      deliveryCharge: deliveryCharge, // Fixed
      orderDate: new Date().toISOString(),
    };

    console.log("📤 Sending order:", orderData);

    // const response = await axiosApiInstance.post(
    //   "/order/create",
    //   orderData
    // );

    const response = await axios.post(
      "http://localhost:5000/order/create",
      orderData
    );




    console.log("📥 Response:", response.data);

    if (response.data.flag === 0) {
      alert("✅ Order Placed Successfully!");
      navigate("/order-confired");
    } else {
      alert(response.data.msg || "Order Failed");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert(error.response?.data?.msg || "Failed to place order.");
  } finally {
    setOrderLoading(false);
  }
};
  // ==========================
  // Image URL Helper
  // ==========================
  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/800x600/amber-100/amber-700?text=No+Image";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${image}`;
  };

  // ==========================
  // Handle Image Error
  // ==========================
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/800x600/amber-100/amber-700?text=No+Image";
  };

  // If dish not found
  if (!dish) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl text-gray-300 mb-4">
            <i className="fas fa-utensils"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-700">Dish Not Found</h3>
          <p className="text-gray-500 mt-2">The dish you're looking for doesn't exist.</p>
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
      {/* ================= BACK BUTTON ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 transition"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span>Back</span>
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ===== LEFT - IMAGE ===== */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-amber-50">
              <img
                src={getImageUrl(dish.image)}
                alt={dish.name}
                className="w-full h-[400px] sm:h-[500px] object-cover"
                onError={handleImageError}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {dish.feature && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    <i className="fas fa-crown"></i>
                    Chef's Pick
                  </span>
                )}
              </div>

              {/* Rating Badge */}
              {dish.rating && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">
                      <i className="fas fa-star"></i>
                    </span>
                    <span className="text-white font-bold">{dish.rating}</span>
                    <span className="text-white/50 text-sm">(24 reviews)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Image Gallery Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {[dish.image, dish.image, dish.image].map((img, index) => (
                <div key={index} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-amber-400 transition cursor-pointer flex-shrink-0">
                  <img
                    src={getImageUrl(img)}
                    alt={`${dish.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT - DETAILS ===== */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <Link
                to={`/category/${dish.main}`}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium transition flex items-center gap-1"
              >
                <i className="fas fa-tag"></i>
                {dish.main}
              </Link>
              <span className="text-gray-300">•</span>
              <span className="text-gray-400 text-sm">{dish.sub}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              {dish.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-end gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-amber-700">
                ₹{dish.price}
              </span>
              <span className="text-sm text-gray-400">per item</span>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              {dish.description}
            </p>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <i className="fas fa-clock text-amber-500"></i>
                <span>Prep: 20 mins</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <i className="fas fa-fire text-amber-500"></i>
                <span>350 Calories</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <i className="fas fa-users text-amber-500"></i>
                <span>Serves 3</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                <i className="fas fa-star text-amber-500"></i>
                <span>{dish.rating} Rating</span>
              </div>
            </div>

            {/* Quantity Selector with Price Display */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 py-2 hover:bg-gray-200 transition text-gray-600 font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-bold text-gray-800 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="px-4 py-2 hover:bg-gray-200 transition text-gray-600 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Current Price Display - Will be saved to database */}
              <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Item Price</span>
                  <span className="font-medium">₹{dish.price} × {quantity}</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-amber-700">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">Delivery Charge</span>
                  <span className={deliveryCharge === 0 ? "text-green-600 font-medium" : "text-gray-500"}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber-200">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-amber-700">₹{grandTotal}</span>
                </div>
                {deliveryCharge === 0 && (
                  <div className="mt-2 text-xs text-green-600">
                    <i className="fas fa-truck mr-1"></i>
                    Free delivery on orders above ₹500
                  </div>
                )}
              </div>
            </div>

            {/* Order Now Button */}
            <div className="mt-6">
              <button
                onClick={handleOrderNow}
                disabled={orderLoading}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-bag"></i>
                    Order Now
                    <span className="text-amber-200">•</span>
                    <span className="text-sm font-normal text-amber-100">
                      ₹{grandTotal}
                    </span>
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                <i className="fas fa-shield-alt mr-1"></i>
                Secure payment • Fresh & Hygienic
              </p>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm text-gray-500">Share:</span>
              <button className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="w-9 h-9 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition">
                <i className="fab fa-instagram"></i>
              </button>
              <button className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition">
                <i className="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>

        {/* ================= TAB SECTION ================= */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap gap-4 sm:gap-8">
              {[
                { id: "description", label: "Description", icon: "fa-align-left" },
                { id: "ingredients", label: "Ingredients", icon: "fa-list" },
                { id: "nutrition", label: "Nutrition", icon: "fa-clipboard-list" },
                { id: "reviews", label: "Reviews", icon: "fa-star" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition relative text-sm sm:text-base ${
                    activeTab === tab.id
                      ? "text-amber-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <i className={`fas ${tab.icon} mr-2`}></i>
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About this dish</h3>
                <p className="text-gray-600 leading-relaxed">
                  {dish.description} This delicious dish is prepared with the finest ingredients and authentic recipes. Each bite is crafted to deliver an unforgettable culinary experience.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700">Preparation Time</h4>
                    <p className="text-gray-500">20-25 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700">Cooking Time</h4>
                    <p className="text-gray-500">15-20 minutes</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700">Serves</h4>
                    <p className="text-gray-500">3 people</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-700">Category</h4>
                    <p className="text-gray-500">{dish.main}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === "ingredients" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Chicken (boneless)",
                    "Yogurt",
                    "Tomato puree",
                    "Fresh cream",
                    "Butter",
                    "Garam masala",
                    "Ginger garlic paste",
                    "Kasuri methi",
                    "Red chili powder",
                    "Salt",
                    "Sugar"
                  ].map((ing, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                      <i className="fas fa-check-circle text-amber-500"></i>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Tab */}
            {activeTab === "nutrition" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Nutrition Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Calories", value: "350", unit: "kcal" },
                    { label: "Protein", value: "25", unit: "g" },
                    { label: "Carbs", value: "15", unit: "g" },
                    { label: "Fat", value: "20", unit: "g" },
                    { label: "Fiber", value: "3", unit: "g" },
                    { label: "Sugar", value: "6", unit: "g" },
                    { label: "Sodium", value: "450", unit: "mg" },
                    { label: "Cholesterol", value: "85", unit: "mg" },
                  ].map((nut, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-amber-600">{nut.value}</div>
                      <div className="text-xs text-gray-500">{nut.unit}</div>
                      <div className="text-sm font-medium text-gray-700 mt-1">{nut.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <div className="text-center sm:text-left">
                    <div className="text-5xl font-bold text-amber-600">{dish.rating}</div>
                    <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`fas fa-star ${star <= dish.rating ? 'text-amber-500' : 'text-gray-300'}`}></i>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Based on 24 reviews</div>
                  </div>
                  <div className="flex-1 w-full">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-6">{star}★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${(dish.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{Math.round((dish.rating / 5) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Rajesh Kumar", rating: 5, comment: "Absolutely delicious! Best dish I've ever had.", date: "2 days ago" },
                    { name: "Priya Sharma", rating: 4, comment: "Great taste and presentation. Will order again.", date: "1 week ago" },
                    { name: "Amit Singh", rating: 5, comment: "Amazing flavors! Highly recommend this dish.", date: "2 weeks ago" },
                  ].map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{review.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i key={star} className={`fas fa-star ${star <= review.rating ? 'text-amber-500' : 'text-gray-300'} text-sm`}></i>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= RELATED DISHES ================= */}
        {relatedDishes.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                You May Also Like
              </h2>
              <Link
                to="/menu"
                className="text-amber-600 hover:text-amber-700 font-medium transition flex items-center gap-1"
              >
                View All
                <i className="fas fa-arrow-right text-sm"></i>
              </Link>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedDishes.map((item) => (
                <Link
                  key={item._id}
                  to={`/dishDetail/${item._id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden bg-amber-50">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={handleImageError}
                      loading="lazy"
                    />
                    {item.feature && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                        <i className="fas fa-crown mr-1"></i>
                        Pick
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.sub}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-amber-700">₹{item.price}</span>
                      {item.rating && (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <i className="fas fa-star text-amber-500"></i>
                          {item.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishDetail;