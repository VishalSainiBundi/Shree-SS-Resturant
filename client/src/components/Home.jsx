import { useState, useEffect, useRef } from 'react';
import DishCard from './dishCard';
import Video from "../assets/herovideo.mp4";

export default function Home({ dish }) {

  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  
  const rotatingTexts = [
    "Authentic Flavors",
    "Fresh Ingredients",
    "Warm Hospitality",
    "Unforgettable Experience"
  ];

  // Categories for auto-slide
  const categories = [
    {
      name: "Appetizers",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop",
      count: "12 Items",
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "Main Course",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2070&auto=format&fit=crop",
      count: "18 Items",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Seafood",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2081&auto=format&fit=crop",
      count: "8 Items",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Desserts",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2070&auto=format&fit=crop",
      count: "10 Items",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Beverages",
      image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop",
      count: "15 Items",
      color: "from-green-500 to-green-600"
    }
  ];

  // Hero animation on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Rotating text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    const text = rotatingTexts[textIndex];
    setCurrentText('');
    
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

  // Auto-slide categories
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
      }, 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused]);

  const goToCategory = (index) => {
    setCurrentCategoryIndex(index);
    setCurrentCategoryIndex(index);
  };

  const nextCategory = () => {
    setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  // Why Choose Us Data - Clean version without color boxes
  const whyChooseUs = [
    {
      icon: "fa-utensils",
      title: "Authentic Recipes",
      description: "Traditional recipes passed down through generations, prepared with love and authenticity.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: "fa-leaf",
      title: "Fresh Ingredients",
      description: "We source only the freshest, locally-sourced ingredients for every dish we serve.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: "fa-clock",
      title: "Quick Service",
      description: "Enjoy your meal without the wait. Our efficient service ensures you're always satisfied.",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: "fa-heart",
      title: "Love & Passion",
      description: "Every dish is crafted with passion and love. Taste the difference in every bite.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: "fa-star",
      title: "Premium Quality",
      description: "We never compromise on quality. Only the best ingredients make it to your plate.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      icon: "fa-users",
      title: "Family Atmosphere",
      description: "A warm, welcoming environment where you and your loved ones feel right at home.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white text-gray-800 antialiased font-sans overflow-hidden">
      
      {/* ===== HERO SECTION WITH VIDEO BACKGROUND ===== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero Content with Animations */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-20">
          <div className="max-w-3xl">
            {/* Animated Badge */}
            <div 
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <span className="inline-block bg-amber-600/80 backdrop-blur-sm text-white text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-6 uppercase border border-amber-400/30">
                <i className="fas fa-crown mr-2 text-amber-300"></i>
                SHREE SS RESTAURANT
              </span>
            </div>

            {/* Animated Heading */}
            <h1 
              className={`text-5xl sm:text-6xl md:text-7xl font-light leading-tight tracking-tight transform transition-all duration-1000 delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
            >
              <span className="text-white">Taste that</span>
              <br className="sm:hidden" />
              <span className="relative text-amber-300 font-bold inline-block">
                stays in your heart
                <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q25 0 50 5 T100 5" stroke="#f59e0b" strokeWidth="2" fill="none" className="animate-[draw_2s_ease-in-out_infinite]"/>
                </svg>
              </span>
            </h1>

            {/* Animated Description */}
            <p 
              className={`mt-6 text-lg sm:text-xl text-white/90 max-w-md leading-relaxed transform transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Where culinary excellence meets warm hospitality. 
              Experience a symphony of flavors crafted for the senses.
            </p>

            {/* Rotating Text */}
            <div 
              className={`mt-4 transform transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-sm font-medium">✦</span>
                <span className="text-white/80 text-sm font-medium">
                  <span className="mr-2">We serve</span>
                  <span className="text-amber-300 font-semibold min-w-[180px] inline-block">
                    {currentText}
                    <span className="animate-blink ml-1">|</span>
                  </span>
                </span>
              </div>
            </div>

            {/* Animated Buttons */}
            <div 
              className={`mt-10 flex flex-wrap gap-4 transform transition-all duration-1000 delay-600 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <a
                href="#menu"
                className="group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-2xl flex items-center gap-2 transform hover:scale-105 duration-300"
              >
                <i className="fas fa-utensils group-hover:rotate-12 transition-transform"></i>
                Explore Menu
                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
              </a>
              <a
                href="#reservation"
                className="group bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full text-base font-medium transition-all flex items-center gap-2 transform hover:scale-105 duration-300"
              >
                <i className="far fa-clock group-hover:rotate-12 transition-transform"></i>
                Reservations
              </a>
            </div>

            {/* Animated Stats */}
            <div 
              className={`mt-12 grid grid-cols-3 gap-4 max-w-sm transform transition-all duration-1000 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {[
                { value: '12+', label: 'Signature Dishes' },
                { value: '4.9', label: 'Customer Rating' },
                { value: '7', label: 'Course Menu' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <span className="block text-2xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-amber-400 rounded-full mt-2 animate-[scrollDown_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY SLIDER SECTION ===== */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
              <i className="fas fa-layer-group mr-2"></i> Categories
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-3 text-gray-800">
              Explore Our <span className="font-bold text-amber-800">Menu Categories</span>
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
          </div>

          {/* Category Slider */}
        <div
  className="relative overflow-hidden rounded-2xl"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
  {/* Slider */}
  <div
    className="flex transition-transform duration-400 ease-in-out"
    style={{
      transform: `translateX(-${currentCategoryIndex * 100}%)`,
    }}
  >
    {categories.map((category, index) => (
      <div
        key={index}
        className="w-full flex-shrink-0"
      >
        <div className="group relative h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden rounded-2xl shadow-xl">

          {/* Image */}
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
              <i className="fas fa-utensils"></i>
              {category.count} Items
            </span>

            <h3 className="mt-3 text-2xl md:text-4xl font-bold text-white">
              {category.name}
            </h3>

            <p className="mt-2 text-sm text-gray-200 max-w-md">
              Freshly prepared dishes made with authentic taste.
            </p>

            <a
              href="#menu"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition"
            >
              View Menu
              <i className="fas fa-arrow-right text-xs"></i>
            </a>

          </div>

        </div>
      </div>
    ))}
  </div>

  {/* Previous */}
  <button
    onClick={prevCategory}
    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-amber-500 transition"
  >
    <i className="fas fa-chevron-left"></i>
  </button>

  {/* Next */}
  <button
    onClick={nextCategory}
    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-amber-500 transition"
  >
    <i className="fas fa-chevron-right"></i>
  </button>

  {/* Dots */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
    {categories.map((_, index) => (
      <button
        key={index}
        onClick={() => goToCategory(index)}
        className={`transition-all duration-300 ${
          currentCategoryIndex === index
            ? "h-2 w-8 rounded-full bg-amber-400"
            : "h-2 w-2 rounded-full bg-white/60 hover:bg-white"
        }`}
      />
    ))}
  </div>
</div>

          {/* Category Labels */}
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => goToCategory(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === currentCategoryIndex
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
              <i className="fas fa-heart text-red-500 mr-2"></i> Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-3 text-gray-800">
              What Makes <span className="font-bold text-amber-800">SHREE SS</span> Special
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              We take pride in delivering an exceptional dining experience that keeps our guests coming back.
            </p>
            <div className="w-24 h-1 bg-amber-600 mx-auto mt-6"></div>
          </div>

          {/* Why Choose Us Grid - Clean Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Clean Icon - No Color Box */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-xl shadow-lg border border-white/30">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="absolute bottom-4 left-20 text-xl font-bold text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-12 h-0.5 bg-amber-600 group-hover:w-20 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED / HIGHLIGHT SECTION ===== */}
      <section className="py-20 bg-gray-50/80" id="menu">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
              <i className="fas fa-leaf mr-2"></i> seasonal
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-2 text-gray-800">
              Today's <span className="font-bold text-amber-800">curated</span> selection
            </h2>
            <div className="w-24 h-0.5 bg-amber-600 mx-auto mt-4"></div>
          </div>

          <DishCard dish={dish} />

          {/* CTA link */}
          <div className="text-center mt-14">
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-12 py-4 rounded-full font-semibold transition shadow-lg hover:shadow-xl"
            >
              View Full Menu <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ===== RESERVATION BANNER / AMBIENCE ===== */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
              <i className="far fa-calendar-alt mr-2"></i> reserve
            </span>
            <h2 className="text-4xl sm:text-5xl font-light mt-3 leading-tight">
              Elevate your <br />
              <span className="font-bold text-amber-300">evening</span>
            </h2>
            <p className="mt-4 text-gray-300 max-w-sm leading-relaxed">
              Intimate lighting, curated music, and a menu that tells a story. Book your table for an unforgettable night.
            </p>
            <a
              href="#"
              className="inline-block mt-8 bg-amber-600 hover:bg-amber-700 text-white px-9 py-4 rounded-full font-semibold shadow-lg transition"
            >
              <i className="fas fa-phone-alt mr-2"></i> Call +1 (555) 202-2026
            </a>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8">
            <h4 className="text-sm uppercase tracking-widest text-amber-300 font-semibold">hours</h4>
            <ul className="mt-4 space-y-3 text-gray-200 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon – Thu</span> <span>17:00 – 23:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Fri – Sat</span> <span>17:00 – 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> <span>closed (private events)</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-3 text-amber-400 text-lg">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-facebook"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold text-amber-400">SHREE SS</span>
              <p className="text-gray-400 text-sm mt-2">RESTAURANT</p>
              <p className="text-gray-500 text-sm mt-1">Taste that stays in your heart ❤️</p>
              <p className="text-gray-400 text-xs mt-4">123 Gastronomy St, NYC</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Navigate</h5>
              <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Menu</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Reservations</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">About</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Connect</h5>
              <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-amber-400 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">YouTube</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-300 text-sm uppercase tracking-wider">Visit</h5>
              <p className="text-gray-400 text-sm mt-4">Mon–Sat 17:00 – late</p>
              <p className="text-gray-500 text-xs mt-1">Sunday · private dining</p>
              <p className="text-gray-500 text-xs mt-2">
                <i className="fas fa-phone text-amber-400 mr-2"></i>
                +1 (555) 202-2026
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SHREE SS RESTAURANT. All rights reserved. 
            <span className="block sm:inline mt-1 sm:mt-0">
              Taste that stays in your heart ❤️
            </span>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes scrollDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.5; }
        }
        
        @keyframes draw {
          0%, 100% { stroke-dashoffset: 100; }
          50% { stroke-dashoffset: 0; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </div>
  );
}