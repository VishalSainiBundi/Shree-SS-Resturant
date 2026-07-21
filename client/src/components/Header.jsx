import { Link } from "react-router-dom";

function Header({ menu_data }) {
  const menu = menu_data?.menu?.filter(
    (d) => d.main === "Menu"
  ) || [];

  const chooseUs = menu_data?.menu?.filter(
    (d) => d.main === "Why choose us"
  ) || [];

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-16 py-5 flex justify-between items-center bg-black/30 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
      <img
  src="/logo.png"
  alt="Shree SS Restaurant"
  className="w-30 h-16 rounded-full p-1 bg-white/10 backdrop-blur-md border border-yellow-400 object-cover shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:shadow-[0_0_35px_rgba(255,215,0,0.9)] hover:scale-105 transition-all duration-300"
/>

        <div>
          <h1 className="text-4xl font-bold text-yellow-500 uppercase">
            Shree SS Restaurant
          </h1>
          <p className="text-white">Taste that stays in your heart ❤️</p>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center gap-8 text-white font-medium">

          <li>
            <Link to={'/'} className="hover:text-yellow-500">
              Home
            </Link>
          </li>

          {/* Menu Dropdown */}
          <li className="relative group">
            <button className="hover:text-yellow-500 transition">
              Menu 
            </button>

            <ul className="absolute left-0 top-full mt-2 w-40 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {menu.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/menu/${item.sub}`}
                    className="block px-2  py-1 text-gray-800  hover:text-red-500 transition"
                  >
                    {item.sub}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Why Choose Us Dropdown */}
          {/* <li className="relative group">
            <button className="hover:text-yellow-500 transition">
              Why Choose Us ▾
            </button>

           <ul className="absolute left-0 top-full mt-2 w-40 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {chooseUs.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/Why choose us/${item.sub}`}
                    className="block px-2  py-1 text-gray-800  hover:text-red-500 transition"
                  >
                    {item.sub}
                  </Link>
                </li>
              ))}
            </ul>
          </li> */}

          <li>
            <Link to={'/about'} className="hover:text-yellow-500">
              About
            </Link>
          </li>

          <li>
            <Link to={'/gallery'} className="hover:text-yellow-500">
              Gallery
            </Link>
          </li>

          {/* <li>
            <Link to={'/reservation'} className="hover:text-yellow-500">
              Reservation
            </Link>
          </li> */}

          <li>
            <Link to={'/contact'} className="hover:text-yellow-500">
              Contact
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default Header;