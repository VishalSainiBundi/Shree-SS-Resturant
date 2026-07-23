// import { Link, useLocation } from "react-router-dom";

// const AdminSidebar = ({ isSidebarOpen = true, onToggle }) => {
//   const location = useLocation();

//   const menuItems = [
//     { title: "Dashboard", path: "/admin/dashboard", icon: "fa-solid fa-gauge-high" },
//     { title: "Categories", path: "/admin/categories", icon: "fa-solid fa-layer-group" },
//     { title: "Dishes", path: "/admin/dishes", icon: "fa-solid fa-utensils" },
//     // { title: "Add Dish", path: "/admin/add-dish", icon: "fa-solid fa-circle-plus" },
//     { title: "Orders", path: "/admin/orders", icon: "fa-solid fa-cart-shopping" },
//     { title: "Reservations", path: "/admin/reservations", icon: "fa-solid fa-calendar-check" },
//     // { title: "Gallery", path: "/admin/gallery", icon: "fa-solid fa-images" },
//     { title: "Customers", path: "/admin/customers", icon: "fa-solid fa-users" },
//     { title: "Messages", path: "/admin/messages", icon: "fa-solid fa-envelope" },
//     { title: "Settings", path: "/admin/settings", icon: "fa-solid fa-gear" },
//   ];

//   return (
//     <aside
//       className={`h-screen bg-white border-r border-gray-200 shadow-xl transition-all duration-300 sticky top-0 overflow-y-auto overflow-x-hidden ${
//         isSidebarOpen ? "w-72" : "w-20"
//       }`}
//     >
     
//       {/* Navigation */}
//       <div className="px-4 py-6">
//         {isSidebarOpen && (
//           <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
//             <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
//             Main Menu
//           </p>
//         )}

//         <div className="space-y-1.5">
//           {menuItems.map((item) => {
//             const active = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
//                   active
//                     ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/20"
//                     : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
//                 }`}
//               >
//                 <div
//                   className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                     active
//                       ? "bg-white/20 text-white"
//                       : "bg-gray-100 text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-600"
//                   }`}
//                 >
//                   <i className={`${item.icon} text-lg`}></i>
//                 </div>

//                 {isSidebarOpen && (
//                   <span className="font-medium text-sm whitespace-nowrap">
//                     {item.title}
//                   </span>
//                 )}

//                 {active && isSidebarOpen && (
//                   <span className="ml-auto w-1.5 h-8 bg-white rounded-full"></span>
//                 )}
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//       {/* Bottom Card - Premium Panel */}
//       {/* {isSidebarOpen && (
//         <div className="absolute bottom-5 left-4 right-4">
//           <div className="rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 p-5 text-white shadow-xl">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
//                 <i className="fas fa-crown text-xl"></i>
//               </div>
//               <div>
//                 <h3 className="font-bold text-lg leading-tight">SHREE SS</h3>
//                 <p className="text-xs text-amber-200">Premium Restaurant</p>
//               </div>
//             </div>
//             <p className="text-sm text-amber-100 leading-relaxed">
//               <i className="fas fa-heart text-red-400 mr-1"></i>
//               Taste that stays in your heart
//             </p>
//             <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-200">
//               <span>v2.0</span>
//               <span>© {new Date().getFullYear()}</span>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* Collapsed Sidebar Bottom - Mini Brand
//       {!isSidebarOpen && (
//         <div className="absolute bottom-5 left-0 right-0 flex justify-center">
//           <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold text-xs">SS</span>
//           </div>
//         </div>
//       )} */}
//     </aside>
//   );
// };

// export default AdminSidebar;



import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isSidebarOpen = true, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: "fa-solid fa-gauge-high" },
    { title: "Categories", path: "/admin/categories", icon: "fa-solid fa-layer-group" },
    { title: "Dishes", path: "/admin/dishes", icon: "fa-solid fa-utensils" },
      { title: "Tables", path: "/admin/tables", icon: "fa-solid fa-table" }, // Fixed icon
    { title: "Orders", path: "/admin/orders", icon: "fa-solid fa-cart-shopping" },
    { title: "Reservations", path: "/admin/reservations", icon: "fa-solid fa-calendar-check" },
    
    // { title: "Gallery", path: "/admin/gallery", icon: "fa-solid fa-images" },
    { title: "Customers", path: "/admin/customers", icon: "fa-solid fa-users" },
    { title: "Messages", path: "/admin/messages", icon: "fa-solid fa-envelope" },
    { title: "Settings", path: "/admin/settings", icon: "fa-solid fa-gear" },
  ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-cream-50 via-white to-amber-50/30 border-r border-amber-200/40 shadow-2xl shadow-amber-200/20 transition-all duration-300 sticky top-0 overflow-y-auto overflow-x-hidden ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Premium Header with Brand */}
      <div className={`px-4 pt-6 pb-4 border-b border-amber-200/30 ${!isSidebarOpen && 'flex justify-center'}`}>
        {isSidebarOpen ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-amber-800 tracking-wide">SHREE SS</h1>
              <p className="text-[10px] text-amber-600/70 tracking-[0.2em] uppercase">Premium Restaurant</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="text-amber-400 text-xs">★</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md animate-pulse"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-white font-bold text-lg">SS</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 py-6">
        {isSidebarOpen && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-600/70 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              Main Menu
            </p>
            <span className="text-[10px] text-amber-400/50">✦</span>
          </div>
        )}

        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 relative ${
                  active
                    ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "text-amber-800/70 hover:bg-amber-100/50 hover:text-amber-700"
                }`}
              >
                {/* Active indicator glow */}
                {active && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-transparent blur-sm"></div>
                )}
                
                <div
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    active
                      ? "bg-white/20 text-white shadow-inner"
                      : "bg-amber-100/50 text-amber-600 group-hover:bg-amber-200/50 group-hover:text-amber-700"
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                </div>

                {isSidebarOpen && (
                  <span className={`relative font-medium text-sm whitespace-nowrap ${
                    active ? "text-white" : "text-amber-800/80"
                  }`}>
                    {item.title}
                  </span>
                )}

                {active && isSidebarOpen && (
                  <span className="ml-auto w-1.5 h-8 bg-white rounded-full shadow-lg shadow-white/50"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Premium Bottom Card */}
      {isSidebarOpen && (
        <div className="absolute bottom-5 left-4 right-4">
          <div className="rounded-2xl bg-gradient-to-br from-amber-100/80 via-amber-50/80 to-yellow-50/80 backdrop-blur-sm border border-amber-200/50 p-5 shadow-xl shadow-amber-200/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-300/10 rounded-full blur-2xl"></div>
            
            <div className="relative flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-md"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <i className="fas fa-crown text-white text-xl"></i>
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-amber-800 text-lg leading-tight">SHREE SS</h3>
                <p className="text-xs text-amber-600/70 tracking-wider">Premium Dining</p>
              </div>
            </div>
            
            <p className="relative text-sm text-amber-700/80 leading-relaxed font-light italic">
              <i className="fas fa-heart text-amber-400 mr-1"></i>
              "Taste that stays in your heart"
            </p>
            
            <div className="relative mt-3 pt-3 border-t border-amber-200/40 flex items-center justify-between text-[10px] text-amber-500/60 tracking-wider">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                v2.0
              </span>
              <span>✦</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Sidebar Bottom - Mini Brand */}
      {!isSidebarOpen && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-md animate-pulse"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-white font-bold text-xs">SS</span>
            </div>
          </div>
        </div>
      )}

      {/* Scrollbar styling */}
      <style jsx>{`
        aside::-webkit-scrollbar {
          width: 4px;
        }
        aside::-webkit-scrollbar-track {
          background: transparent;
        }
        aside::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 10px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;