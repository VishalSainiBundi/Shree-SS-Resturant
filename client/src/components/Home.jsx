import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import DishCard from "./dishCard";
import Video from "../assets/herovideo.mp4";

// ==========================
// Why Choose Us Data
// ==========================
const WHY_CHOOSE_US = [
  {
    icon: "fa-utensils",
    title: "Authentic Recipes",
    description:
      "Traditional recipes passed down through generations, prepared with love and authenticity.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: "fa-leaf",
    title: "Fresh Ingredients",
    description:
      "We source only the freshest, locally-sourced ingredients for every dish we serve.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: "fa-clock",
    title: "Quick Service",
    description:
      "Enjoy your meal without the wait. Our efficient service ensures you're always satisfied.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: "fa-heart",
    title: "Love & Passion",
    description:
      "Every dish is crafted with passion and love. Taste the difference in every bite.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: "fa-star",
    title: "Premium Quality",
    description:
      "We never compromise on quality. Only the best ingredients make it to your plate.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: "fa-users",
    title: "Family Atmosphere",
    description:
      "A warm, welcoming environment where you and your loved ones feel right at home.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
  },
];

// ==========================
// Rotating Hero Texts
// ==========================
const ROTATING_TEXTS = [
  "Authentic Flavors",
  "Fresh Ingredients",
  "Warm Hospitality",
  "Unforgettable Experience",
];

export default function Home({ dish = [], category = [] }) {
  // ==========================
  // Hero Animation States
  // ==========================
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  // ==========================
  // Category Slider States
  // ==========================
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  const autoPlayRef = useRef(null);
  const sliderRef = useRef(null);

  // ==========================
  // Memoized Values
  // ==========================
  const hasDishes = useMemo(() => dish?.length > 0, [dish]);
  const hasCategories = useMemo(() => category?.length > 0, [category]);

  // ==========================
  // Calculate items per view based on screen size
  // ==========================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ==========================
  // Image URL Helper
  // ==========================
  const getImageUrl = useCallback((image) => {
    if (!image) return "https://placehold.co/600x400/amber-100/amber-700?text=No+Image";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_API_URL || "http://localhost:5000"}${image}`;
  }, []);

  // ==========================
  // Hero Load Animation
  // ==========================
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ==========================
  // Change Hero Text Every 3 sec
  // ==========================
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ==========================
  // Typing Animation
  // ==========================
  useEffect(() => {
    let charIndex = 0;
    const text = ROTATING_TEXTS[textIndex];
    setCurrentText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setCurrentText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [textIndex]);

  // ==========================
  // Infinite Auto Play Category Slider
  // ==========================
  useEffect(() => {
    if (!hasCategories || isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentCategoryIndex((prev) => {
        const maxIndex = Math.max(0, category.length - itemsPerView);
        const nextIndex = prev + itemsPerView;
        
        // When reaching the end, smoothly transition back to start
        if (nextIndex >= category.length) {
          // Jump back to start with smooth transition
          return 0;
        }
        return nextIndex;
      });
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [category, isPaused, hasCategories, itemsPerView]);

  // ==========================
  // Slider Controls
  // ==========================
  const goToCategory = useCallback((index) => {
    // Set the index directly, ensuring it doesn't exceed max
    const maxIndex = Math.max(0, category.length - itemsPerView);
    const targetIndex = Math.min(index, maxIndex);
    setCurrentCategoryIndex(targetIndex);
  }, [category, itemsPerView]);

  const nextCategory = useCallback(() => {
    if (!hasCategories) return;
    const maxIndex = Math.max(0, category.length - itemsPerView);
    const nextIndex = currentCategoryIndex + itemsPerView;
    
    // If at the end, go to start for infinite loop
    setCurrentCategoryIndex(nextIndex >= category.length ? 0 : nextIndex);
  }, [category, hasCategories, itemsPerView, currentCategoryIndex]);

  const prevCategory = useCallback(() => {
    if (!hasCategories) return;
    const maxIndex = Math.max(0, category.length - itemsPerView);
    const prevIndex = currentCategoryIndex - itemsPerView;
    
    // If at the start, go to end for infinite loop
    setCurrentCategoryIndex(prevIndex < 0 ? maxIndex : prevIndex);
  }, [category, hasCategories, itemsPerView, currentCategoryIndex]);

  return (
    <div className="bg-white text-gray-800 antialiased font-sans overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={Video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <div
              className={`transition-all duration-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-white text-xs uppercase tracking-widest font-semibold shadow-lg shadow-amber-500/30">
                <i className="fas fa-crown text-amber-300"></i>
                SHREE SS RESTAURANT
              </span>
            </div>

            <h1
              className={`mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <span className="text-white">Taste that</span>
              <br />
              <span className="font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                stays in your heart
              </span>
            </h1>

            <p
              className={`mt-6 text-lg sm:text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Where culinary excellence meets warm hospitality.
              Enjoy authentic flavours crafted with passion and precision.
            </p>

            <div
              className={`mt-6 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-white/80 text-sm sm:text-base">We Serve</span>
              <span className="ml-3 text-amber-400 font-semibold text-xl sm:text-2xl">
                {currentText}
                <span className="animate-blink">|</span>
              </span>
            </div>

            <div
              className={`mt-10 flex flex-wrap gap-4 sm:gap-5 transition-all duration-1000 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                to="/menu"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300 inline-flex items-center gap-2"
              >
                <i className="fas fa-utensils"></i>
                Explore Menu
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
              <Link
                to="/reservation"
                className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all px-8 py-4 rounded-full text-white font-semibold hover:scale-105 transform duration-300 inline-flex items-center gap-2"
              >
                <i className="far fa-clock"></i>
                Reservation
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>

            <div
              className={`mt-14 grid grid-cols-3 gap-8 max-w-md transition-all duration-1000 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">12+</h2>
                <p className="text-white/60 text-xs sm:text-sm">Signature Dishes</p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">4.9★</h2>
                <p className="text-white/60 text-xs sm:text-sm">Customer Rating</p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">7</h2>
                <p className="text-white/60 text-xs sm:text-sm">Categories</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY SLIDER WITH INFINITE LOOP ================= */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-amber-700 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                <i className="fas fa-compass mr-2"></i>
                Explore
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mt-2">
                Our <span className="font-bold text-amber-700">Categories</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4"></div>
            </div>

            <div className="relative">
              <div
                className="relative overflow-hidden rounded-2xl"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  ref={sliderRef}
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentCategoryIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {hasCategories ? (
                    // Duplicate the array for infinite loop effect
                    [...category, ...category, ...category].map((item, index) => (
                      <div
                        key={`${item._id || index}-${index}`}
                        className="flex-shrink-0 p-2"
                        style={{ width: `${100 / itemsPerView}%` }}
                      >
                        <div className="group relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name || item.category}
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/600x400/amber-100/amber-700?text=No+Image";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-1">
                              {item.feature && (
                                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] rounded-full px-2 py-0.5 shadow-lg">
                                  <i className="fas fa-star"></i>
                                  Featured
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] rounded-full px-2 py-0.5 border border-white/20">
                                <i className="fas fa-utensils"></i>
                                {item.sub || "Premium"}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                              {item.name || item.category}
                            </h3>
                            <p className="text-gray-200 text-xs sm:text-sm mt-1 line-clamp-1">
                              {item.description || "Explore our selection"}
                            </p>
                            <Link
                  to={`/view/${item._id}`}
                              
                              className="inline-flex items-center gap-1 mt-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition px-4 py-1.5 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl"
                            >
                              View
                              <i className="fas fa-arrow-right text-xs"></i>
                            </Link>
                          </div>

                          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                            <span className="text-white/60 text-xs font-medium">
                              <span className="text-amber-400 font-bold">
                                {String((index % category.length) + 1).padStart(2, '0')}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-20 text-center">
                      <i className="fas fa-folder-open text-5xl text-gray-300"></i>
                      <h3 className="mt-4 text-xl font-semibold text-gray-500">
                        No Categories Found
                      </h3>
                    </div>
                  )}
                </div>

                {hasCategories && category.length > itemsPerView && (
                  <>
                    <button
                      onClick={prevCategory}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-amber-600 transition-all text-white flex items-center justify-center shadow-lg hover:scale-110 duration-300 border border-white/20 z-10"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      onClick={nextCategory}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-amber-600 transition-all text-white flex items-center justify-center shadow-lg hover:scale-110 duration-300 border border-white/20 z-10"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
                )}

                {hasCategories && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-10">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-1000"
                      style={{ 
                        width: `${((currentCategoryIndex + itemsPerView) / category.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                )}

                {/* Auto-play indicator */}
                {hasCategories && !isPaused && (
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 z-10">
                    <span className="text-white/60 text-xs font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      Auto
                    </span>
                  </div>
                )}
              </div>

              {/* Category Labels - Show only original categories */}
              {hasCategories && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {category.map((item, index) => (
                    <button
                      key={item._id || index}
                      onClick={() => goToCategory(index)}
                      className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        index >= currentCategoryIndex % category.length && 
                        index < (currentCategoryIndex % category.length) + itemsPerView
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300 hover:shadow-md"
                      }`}
                    >
                      {item.name || item.category}
                    </button>
                  ))}
                </div>
              )}

              {/* Category Stats */}
              {hasCategories && (
                <div className="flex flex-wrap justify-center items-center gap-3 mt-6 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    <span>{category.length} Categories</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Fresh Daily</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Premium Quality</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 uppercase tracking-widest text-xs sm:text-sm font-semibold">
              <i className="fas fa-heart text-red-500 mr-2"></i>
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-light mt-3">
              What Makes <span className="font-bold text-amber-700">SHREE SS</span> Special
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed text-sm sm:text-base">
              We combine authentic recipes, fresh ingredients, premium quality
              and excellent hospitality to create a memorable dining experience.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute left-5 bottom-5">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="mt-2 text-gray-500 leading-relaxed text-sm">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <div className="w-12 h-1 bg-amber-600 rounded-full group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED MENU ================= */}
      <section id="menu" className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 uppercase tracking-widest text-xs sm:text-sm font-semibold">
              <i className="fas fa-utensils mr-2"></i>
              Our Menu
            </span>
            <h2 className="text-4xl sm:text-5xl font-light mt-3">
              Fresh & <span className="font-bold text-amber-700">Delicious</span>
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed text-sm sm:text-base">
              Every dish is freshly prepared using premium ingredients,
              authentic recipes and unforgettable flavours.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-6"></div>
          </div>

          {hasDishes ? (
            <DishCard dish={dish} />
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-amber-100 mx-auto flex items-center justify-center">
                <i className="fas fa-utensils text-4xl text-amber-600"></i>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-gray-700">
                No Dishes Available
              </h3>
              <p className="mt-2 text-gray-500">New dishes will be added soon.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition-all px-8 py-3.5 text-white font-semibold shadow-lg hover:shadow-2xl"
            >
              View Complete Menu
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= RESERVATION SECTION ================= */}
      <section id="reservation" className="relative py-20 overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="uppercase tracking-widest text-amber-400 font-semibold text-sm">
                Reservation
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
                Reserve Your
                <span className="block font-bold text-amber-300">Perfect Table</span>
              </h2>
              <p className="mt-6 text-gray-300 leading-relaxed max-w-lg">
                Celebrate special moments with delicious food
                and premium hospitality. Book your table today.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="tel:+911234567890"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-lg inline-flex items-center gap-2"
                >
                  <i className="fas fa-phone-alt"></i>
                  Call Now
                </a>
                <Link
                  // to={`/view/${}`}
                  className="px-8 py-3.5 rounded-full border border-white/30 hover:bg-white/10 transition font-semibold inline-flex items-center gap-2"
                >
                  View Menu
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-amber-300">Opening Hours</h3>
              <div className="mt-8 space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Saturday</span>
                  <span>09:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span>Sunday</span>
                  <span>09:00 AM - 11:00 PM</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-amber-300">Why Book With Us?</h4>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-400"></i>
                    Instant Confirmation
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-400"></i>
                    Family Friendly Environment
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-400"></i>
                    Fresh & Hygienic Food
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-400"></i>
                    Premium Dining Experience
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-amber-400">SHREE SS</h2>
              <p className="text-gray-400 mt-1">RESTAURANT</p>
              <p className="mt-4 text-gray-500 leading-relaxed text-sm">
                Taste that stays in your heart. Experience authentic flavors,
                premium hospitality and memorable dining.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-700 transition flex items-center justify-center">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-700 transition flex items-center justify-center">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-700 transition flex items-center justify-center">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-700 transition flex items-center justify-center">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-amber-400 transition">Home</Link></li>
                <li><Link to="/menu" className="hover:text-amber-400 transition">Menu</Link></li>
                <li><Link to="/reservation" className="hover:text-amber-400 transition">Reservation</Link></li>
                <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-amber-500 mt-1"></i>
                  <span>Jaipur, Rajasthan</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-phone text-amber-500"></i>
                  <span>+91 9876543210</span>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-envelope text-amber-500"></i>
                  <span>info@shreessrestaurant.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>10 AM - 10 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9 AM - 11 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>9 AM - 11 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-center md:text-left text-sm">
              © {new Date().getFullYear()} SHREE SS Restaurant. All Rights Reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <span className="text-red-500">❤️</span> by SHREE SS
            </p>
          </div>
        </div>
      </footer>

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}