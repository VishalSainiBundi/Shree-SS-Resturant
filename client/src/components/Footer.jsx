export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-50 to-white border-t-2 border-amber-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column - Shree SS Restaurant */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-amber-800 tracking-wide">
                SHREE SS
              </span>
              <span className="text-2xl font-light text-amber-700 -mt-1">
                RESTAURANT
              </span>
            </div>
            <p className="text-amber-700 text-sm font-medium flex items-center gap-2">
              <span>Taste that stays in your heart</span>
              <span className="text-red-500">❤️</span>
            </p>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Authentic flavors crafted with love and tradition. 
              Every dish tells a story of culinary excellence passed down through generations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors bg-amber-100 hover:bg-amber-200 p-2 rounded-full">
                <i className="fab fa-facebook text-lg"></i>
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors bg-amber-100 hover:bg-amber-200 p-2 rounded-full">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors bg-amber-100 hover:bg-amber-200 p-2 rounded-full">
                <i className="fab fa-youtube text-lg"></i>
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors bg-amber-100 hover:bg-amber-200 p-2 rounded-full">
                <i className="fab fa-twitter text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-amber-800 mb-4 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-400 mt-1"></span>
            </h5>
            <ul className="space-y-3 mt-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  Reservation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2">
                  <i className="fas fa-chevron-right text-amber-500 text-xs"></i>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold text-amber-800 mb-4 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-400 mt-1"></span>
            </h5>
            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3 text-gray-600 text-sm">
                <i className="fas fa-map-marker-alt text-amber-600 mt-1 text-lg"></i>
                <span>123 Flavor Street,<br />Food District, New York</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <i className="fas fa-phone text-amber-600 text-lg"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <i className="fas fa-envelope text-amber-600 text-lg"></i>
                <span>info@shreess.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <i className="fas fa-clock text-amber-600 text-lg"></i>
                <span>Mon-Sat: 10:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Newsletter */}
          <div>
            <h5 className="text-lg font-semibold text-amber-800 mb-4 relative">
              Visit Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-400 mt-1"></span>
            </h5>
            <div className="mt-4 space-y-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h6 className="text-sm font-semibold text-amber-800 mb-2">Opening Hours</h6>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between text-gray-600">
                    <span>Monday - Friday</span>
                    <span className="font-medium">10:00 - 22:00</span>
                  </li>
                  <li className="flex justify-between text-gray-600">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 - 23:00</span>
                  </li>
                  <li className="flex justify-between text-gray-600">
                    <span>Sunday</span>
                    <span className="font-medium text-amber-700">Closed</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h6 className="text-sm font-semibold text-amber-800 mb-2">Get Updates</h6>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-white border border-amber-300 rounded-l-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
                  />
                  <button className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-r-lg text-sm font-semibold transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-amber-200 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-amber-800">SHREE SS RESTAURANT</span>. 
              <span className="hidden sm:inline"> All rights reserved.</span>
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-amber-700 transition">Privacy Policy</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-amber-700 transition">Terms</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-amber-700 transition">Careers</a>
            </div>
          </div>
          <div className="text-center sm:text-right mt-2 text-xs text-gray-400">
            <span>Taste that stays in your heart ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}