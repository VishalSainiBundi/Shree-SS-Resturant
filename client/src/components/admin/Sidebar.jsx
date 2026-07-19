import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isSidebarOpen = true, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: "fa-solid fa-gauge-high" },
    { title: "Categories", path: "/admin/categories", icon: "fa-solid fa-layer-group" },
    { title: "Dishes", path: "/admin/dishes", icon: "fa-solid fa-utensils" },
    { title: "Add Dish", path: "/admin/add-dish", icon: "fa-solid fa-circle-plus" },
    { title: "Orders", path: "/admin/orders", icon: "fa-solid fa-cart-shopping" },
    { title: "Reservations", path: "/admin/reservations", icon: "fa-solid fa-calendar-check" },
    { title: "Gallery", path: "/admin/gallery", icon: "fa-solid fa-images" },
    { title: "Customers", path: "/admin/customers", icon: "fa-solid fa-users" },
    { title: "Messages", path: "/admin/messages", icon: "fa-solid fa-envelope" },
    { title: "Settings", path: "/admin/settings", icon: "fa-solid fa-gear" },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 shadow-xl transition-all duration-300 sticky top-0 overflow-y-auto overflow-x-hidden ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Brand Section */}
      <div className={`p-4 border-b border-gray-100 ${!isSidebarOpen && 'flex justify-center'}`}>
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          {isSidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-amber-800 leading-tight">SHREE SS</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6">
        {isSidebarOpen && (
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            Main Menu
          </p>
        )}

        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/20"
                    : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-600"
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                </div>

                {isSidebarOpen && (
                  <span className="font-medium text-sm whitespace-nowrap">
                    {item.title}
                  </span>
                )}

                {active && isSidebarOpen && (
                  <span className="ml-auto w-1.5 h-8 bg-white rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Card - Premium Panel */}
      {/* {isSidebarOpen && (
        <div className="absolute bottom-5 left-4 right-4">
          <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 p-5 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-crown text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">SHREE SS</h3>
                <p className="text-xs text-amber-200">Premium Restaurant</p>
              </div>
            </div>
            <p className="text-sm text-amber-100 leading-relaxed">
              <i className="fas fa-heart text-red-400 mr-1"></i>
              Taste that stays in your heart
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-200">
              <span>v2.0</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      )} */}

      {/* Collapsed Sidebar Bottom - Mini Brand
      {!isSidebarOpen && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xs">SS</span>
          </div>
        </div>
      )} */}
    </aside>
  );
};

export default AdminSidebar;