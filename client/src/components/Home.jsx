export default function Home() {
  return (
    <div className="bg-white text-gray-800 antialiased font-sans">
      {/* ===== HEADER / NAVIGATION ===== */}
      

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* background image with overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop"
            alt="Modern restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-20">
          <div className="max-w-2xl text-white">
            <span className="inline-block bg-amber-600/80 backdrop-blur-sm text-white text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-6 uppercase">
              since 2025
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight tracking-tight">
              taste <br className="sm:hidden" />
              <span className="font-bold text-amber-200">redefined</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-md leading-relaxed">
              Where modern culinary art meets warm hospitality.
              Experience a symphony of flavors in an atmosphere crafted for the senses.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-base font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <i className="fas fa-utensils"></i> Explore Menu
              </a>
              <a
                href="#"
                className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full text-base font-medium transition flex items-center gap-2"
              >
                <i className="far fa-clock"></i> Reservations
              </a>
            </div>
            {/* quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm text-white/90">
              <div>
                <span className="block text-2xl font-bold text-white">12+</span>
                <span className="text-xs uppercase tracking-wider opacity-70">Signature</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">4.9</span>
                <span className="text-xs uppercase tracking-wider opacity-70">Rating</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-white">7</span>
                <span className="text-xs uppercase tracking-wider opacity-70">Courses</span>
              </div>
            </div>
          </div>
        </div>
        {/* scroll indicator (decorative) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hidden sm:block animate-bounce">
          <i className="fas fa-chevron-down text-xl"></i>
        </div>
      </section>

      {/* ===== FEATURED / HIGHLIGHT SECTION ===== */}
      <section className="py-20 bg-gray-50/80">
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

          {/* feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* card 1 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop"
                  alt="Grilled salmon"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow">
                  chef's pick
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Citrus Salmon</h3>
                    <p className="text-sm text-gray-500 mt-1">with quinoa & asparagus</p>
                  </div>
                  <span className="text-amber-800 font-bold text-lg">$34</span>
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Wild-caught salmon, charred lemon, herb oil – bright & balanced.
                </p>
              </div>
            </div>

            {/* card 2 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2070&auto=format&fit=crop"
                  alt="Truffle pasta"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow">
                  truffle
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Black Truffle</h3>
                    <p className="text-sm text-gray-500 mt-1">tagliatelle · parmesan</p>
                  </div>
                  <span className="text-amber-800 font-bold text-lg">$42</span>
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Handmade pasta, black truffle butter, aged parmigiano.
                </p>
              </div>
            </div>

            {/* card 3 */}
            <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2081&auto=format&fit=crop"
                  alt="Margherita pizza"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow">
                  classic
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Margherita</h3>
                    <p className="text-sm text-gray-500 mt-1">wood-fired · basil</p>
                  </div>
                  <span className="text-amber-800 font-bold text-lg">$28</span>
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  San Marzano, fior di latte, fresh basil, extra virgin olive oil.
                </p>
              </div>
            </div>
          </div>

          {/* CTA link */}
          <div className="text-center mt-14">
            <a
              href="#"
              className="inline-block border border-amber-700 text-amber-800 hover:bg-amber-800 hover:text-white px-10 py-3.5 rounded-full font-medium transition shadow-sm"
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
      <footer className="bg-gray-50 border-t border-gray-200/50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-light text-amber-800">FLAVOR</span>
              <p className="text-gray-500 text-sm mt-2">Modern kitchen · timeless taste</p>
              <p className="text-gray-400 text-xs mt-4">123 Gastronomy St, NYC</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Navigate</h5>
              <ul className="mt-4 space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-amber-700">Home</a></li>
                <li><a href="#" className="hover:text-amber-700">Menu</a></li>
                <li><a href="#" className="hover:text-amber-700">Reservations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Connect</h5>
              <ul className="mt-4 space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-amber-700">Instagram</a></li>
                <li><a href="#" className="hover:text-amber-700">Facebook</a></li>
                <li><a href="#" className="hover:text-amber-700">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Visit</h5>
              <p className="text-gray-500 text-sm mt-4">Mon–Sat 17:00 – late</p>
              <p className="text-gray-400 text-xs mt-1">Sunday · private dining</p>
            </div>
          </div>
          <div className="border-t border-gray-200/60 mt-12 pt-6 text-center text-xs text-gray-400">
            &copy; 2026 FLAVOR kitchen. all rights reserved. designed with{' '}
            <i className="fas fa-heart text-amber-500 text-xs"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}