const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <div>
          <h2 className="text-lg font-bold text-amber-700">
            SHREE SS RESTAURANT
          </h2>

          <p className="text-sm text-gray-500">
            Restaurant Management Admin Panel
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6 text-gray-500">

          <a
            href="#"
            className="hover:text-amber-600 transition"
          >
            <i className="fab fa-facebook-f text-lg"></i>
          </a>

          <a
            href="#"
            className="hover:text-amber-600 transition"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>

          <a
            href="#"
            className="hover:text-amber-600 transition"
          >
            <i className="fab fa-youtube text-lg"></i>
          </a>

          <a
            href="#"
            className="hover:text-amber-600 transition"
          >
            <i className="fab fa-whatsapp text-lg"></i>
          </a>

        </div>

        {/* Right */}
        <div className="text-center md:text-right">

          <p className="text-sm text-gray-500">
            Version <span className="font-semibold">v1.0.0</span>
          </p>

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SHREE SS Restaurant
          </p>

        </div>

      </div>

      <div className="border-t border-gray-100 py-3 px-6 text-center text-sm text-gray-500">
        Made with ❤️ by <span className="font-semibold text-amber-700">Vishal Saini</span> |
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default AdminFooter;