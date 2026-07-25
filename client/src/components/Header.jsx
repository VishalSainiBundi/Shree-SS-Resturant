import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function Header({ menu_data = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <img
            src="/logo.png"
            alt="Shree SS Restaurant"
            className="w-20 h-12 sm:w-24 sm:h-14 md:w-30 md:h-16 rounded-full p-1 bg-white/10 backdrop-blur-md border border-amber-400 object-cover shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300"
          />
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-amber-600 uppercase tracking-wide">
              Shree SS Restaurant
            </h1>
            <p className="hidden sm:block text-gray-600 text-xs md:text-sm italic">
              Taste that stays in your heart ❤️
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-amber-600 transition-colors duration-200">
                Home
              </Link>
            </li>

            <li className="relative group">
              <button
                onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                className="hover:text-amber-600 transition-colors duration-200 focus:outline-none"
              >
                Menu
              </button>

              <ul
                className={`absolute left-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-200 ${
                  desktopMenuOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
                }`}
                onMouseEnter={() => setDesktopMenuOpen(true)}
                onMouseLeave={() => setDesktopMenuOpen(false)}
              >
                {menu_data.map((item) => (
                  <li key={item._id}>
                    <Link
                      to={`/menu/${item.sub}`}
                      className="block px-4 py-2.5 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      onClick={() => setDesktopMenuOpen(false)}
                    >
                      {item.sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link to="/about" className="hover:text-amber-600 transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-amber-600 transition-colors duration-200">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-600 transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>

          {/* Register Button - Desktop */}
          <Link
            to="/auth"
            className="ml-4 px-5 py-2 bg-amber-500 text-white font-semibold rounded-full shadow-md hover:bg-amber-400 hover:scale-105 transition-all duration-200"
          >
            Register
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col text-gray-700 p-5 gap-4 font-medium">
            <li>
              <Link
                to="/"
                className="block hover:text-amber-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <button
                onClick={() => setMobileSubMenuOpen(!mobileSubMenuOpen)}
                className="flex items-center gap-2 text-amber-600 hover:text-amber-500 transition-colors"
              >
                Menu
                <span className="text-sm">{mobileSubMenuOpen ? "▲" : "▼"}</span>
              </button>

              {mobileSubMenuOpen && (
                <ul className="pl-4 mt-2 space-y-2 border-l-2 border-amber-300/50">
                  {menu_data.map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/menu/${item.sub}`}
                        className="block hover:text-amber-600 transition-colors"
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileSubMenuOpen(false);
                        }}
                      >
                        {item.sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/about"
                className="block hover:text-amber-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="block hover:text-amber-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block hover:text-amber-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </li>

            {/* Register Button - Mobile */}
            <li className="mt-4">
              <Link
                to="/register"
                className="inline-block w-full text-center px-5 py-3 bg-amber-500 text-white font-semibold rounded-full shadow-md hover:bg-amber-400 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;