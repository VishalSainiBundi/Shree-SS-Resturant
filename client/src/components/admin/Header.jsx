import { Link } from "react-router-dom";

const AdminHeader = ({
  adminName = "Admin",
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm w-full">
      <div className="h-16 px-6 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10 rounded-lg hover:bg-gray-100 transition"
          >
            <i className="fas fa-bars text-xl text-gray-700"></i>
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />

            <div>
              <h1 className="font-bold text-lg text-amber-700">
                SHREE SS
              </h1>

              <p className="text-xs text-gray-500">
                Restaurant Admin
              </p>
            </div>
          </div>

        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center w-96">

          <div className="relative w-full">

            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-11 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-amber-500"
            />

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="relative w-10 h-10 rounded-lg hover:bg-gray-100">

            <i className="fas fa-bell text-gray-700"></i>

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

          </button>

          {/* Settings */}
          <Link
            to="/admin/settings"
            className="hidden md:flex w-10 h-10 rounded-lg hover:bg-gray-100 items-center justify-center"
          >
            <i className="fas fa-cog text-gray-700"></i>
          </Link>

          {/* Profile */}
          <div className="flex items-center gap-3">

            <div className="hidden md:block text-right">

              <h3 className="font-semibold text-gray-700">
                {adminName}
              </h3>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
              {adminName.charAt(0).toUpperCase()}
            </div>

          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>

        </div>

      </div>
    </header>
  );
};

export default AdminHeader;