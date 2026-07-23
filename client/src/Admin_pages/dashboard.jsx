// import { Link } from 'react-router-dom';

// const AdminDashboard=()=> {
//   const stats = [
//     { title: 'Total Dishes', value: '124', icon: 'fa-utensils', color: 'from-amber-500 to-amber-600' },
//     { title: 'Total Orders', value: '856', icon: 'fa-shopping-cart', color: 'from-blue-500 to-blue-600' },
//     { title: 'Reservations', value: '43', icon: 'fa-calendar-check', color: 'from-green-500 to-green-600' },
//     { title: 'Messages', value: '12', icon: 'fa-envelope', color: 'from-purple-500 to-purple-600' },
//   ];

//   const recentOrders = [
//     { id: '#ORD-001', customer: 'John Doe', items: 3, total: '$78.50', status: 'Completed' },
//     { id: '#ORD-002', customer: 'Jane Smith', items: 2, total: '$45.00', status: 'Processing' },
//     { id: '#ORD-003', customer: 'Robert Johnson', items: 4, total: '$112.30', status: 'Pending' },
//     { id: '#ORD-004', customer: 'Maria Garcia', items: 1, total: '$24.99', status: 'Completed' },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-light text-gray-800">
//             Welcome back, <span className="font-bold text-amber-800">Admin</span>
//           </h1>
//           <p className="text-gray-500 mt-1">
//             <i className="fas fa-heart text-red-500 mr-1"></i>
//             Taste that stays in your heart — Manage your restaurant efficiently
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/admin/add-dish"
//             className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
//           >
//             <i className="fas fa-plus-circle"></i>
//             Add New Dish
//           </Link>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">{stat.title}</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
//               </div>
//               <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}>
//                 <i className={`fas ${stat.icon}`}></i>
//               </div>
//             </div>
//             <div className="mt-3">
//               <span className="text-xs text-green-500 font-medium">
//                 <i className="fas fa-arrow-up mr-1"></i> 12%
//               </span>
//               <span className="text-xs text-gray-400 ml-2">from last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
//             <p className="text-sm text-gray-500">Latest customer orders</p>
//           </div>
//           <Link to="/admin/orders" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
//             View All <i className="fas fa-arrow-right ml-1"></i>
//           </Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {recentOrders.map((order, index) => (
//                 <tr key={index} className="hover:bg-amber-50/50 transition">
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
//                   <td className="px-6 py-4 text-sm font-semibold text-gray-800">{order.total}</td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                       order.status === 'Completed' ? 'bg-green-100 text-green-700' :
//                       order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
//                       'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
//                         order.status === 'Completed' ? 'bg-green-500' :
//                         order.status === 'Processing' ? 'bg-blue-500' :
//                         'bg-yellow-500'
//                       }`}></span>
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link
//           to="/admin/dishes"
//           className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-6 rounded-2xl border border-amber-200 hover:shadow-lg transition group"
//         >
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
//               <i className="fas fa-utensils"></i>
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-800">Manage Menu</h3>
//               <p className="text-sm text-gray-500">Add, edit, or remove dishes</p>
//             </div>
//           </div>
//         </Link>
//         <Link
//           to="/admin/reservations"
//           className="bg-gradient-to-r from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition group"
//         >
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
//               <i className="fas fa-calendar-check"></i>
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-800">Reservations</h3>
//               <p className="text-sm text-gray-500">View and manage bookings</p>
//             </div>
//           </div>
//         </Link>
//         <Link
//           to="/admin/messages"
//           className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition group"
//         >
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
//               <i className="fas fa-envelope"></i>
//             </div>
//             <div>
//               <h3 className="font-bold text-gray-800">Messages</h3>
//               <p className="text-sm text-gray-500">Check customer inquiries</p>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard




import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Dishes', value: '124', icon: 'fa-utensils', color: 'from-amber-500 to-amber-600' },
    { title: 'Total Orders', value: '856', icon: 'fa-shopping-cart', color: 'from-blue-500 to-blue-600' },
    { title: 'Reservations', value: '43', icon: 'fa-calendar-check', color: 'from-green-500 to-green-600' },
    { title: 'Messages', value: '12', icon: 'fa-envelope', color: 'from-purple-500 to-purple-600' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', items: 3, total: '$78.50', status: 'Completed' },
    { id: '#ORD-002', customer: 'Jane Smith', items: 2, total: '$45.00', status: 'Processing' },
    { id: '#ORD-003', customer: 'Robert Johnson', items: 4, total: '$112.30', status: 'Pending' },
    { id: '#ORD-004', customer: 'Maria Garcia', items: 1, total: '$24.99', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-amber-50/30 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating cream particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-amber-300/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-amber-400 text-2xl">✦</span>
              <h1 className="text-3xl font-serif font-bold text-amber-800">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Admin</span>
              </h1>
              <span className="text-amber-400 text-2xl">✦</span>
            </div>
            <p className="text-amber-600/60 font-light ml-1">
              <i className="fas fa-heart text-amber-400 mr-1"></i>
              Taste that stays in your heart — Manage your restaurant efficiently
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/add-dish"
              className="relative group/btn overflow-hidden rounded-xl px-6 py-2.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl opacity-90 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-300/40 to-yellow-300/40 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-center gap-2 text-white font-serif tracking-wide">
                <i className="fas fa-plus-circle"></i>
                Add New Dish
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-200/20 hover:shadow-xl hover:shadow-amber-200/30 transition-all duration-300 p-6 border border-amber-200/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-amber-600/70 uppercase tracking-[0.1em]">{stat.title}</p>
                    <p className="text-3xl font-serif font-bold text-amber-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    <i className="fas fa-arrow-up mr-1"></i> 12%
                  </span>
                  <span className="text-xs text-amber-400/60 font-light">from last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-2xl blur-sm"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-200/20 border border-amber-200/30 overflow-hidden">
            <div className="p-6 border-b border-amber-200/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">✦</span>
                  <h2 className="text-xl font-serif font-bold text-amber-800">Recent Orders</h2>
                </div>
                <p className="text-sm text-amber-600/60 font-light">Latest customer orders</p>
              </div>
              <Link to="/admin/orders" className="text-amber-500 hover:text-amber-600 text-sm font-medium transition-colors flex items-center gap-1 group">
                View All 
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-amber-700/70 uppercase tracking-[0.1em]">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-amber-700/70 uppercase tracking-[0.1em]">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-amber-700/70 uppercase tracking-[0.1em]">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-amber-700/70 uppercase tracking-[0.1em]">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-amber-700/70 uppercase tracking-[0.1em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100/50">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-amber-50/50 transition-colors duration-200 group">
                      <td className="px-6 py-4 text-sm font-medium text-amber-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-amber-700/80">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-amber-700/80">{order.items}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-amber-800">{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                          'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            order.status === 'Completed' ? 'bg-emerald-500' :
                            order.status === 'Processing' ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}></span>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/dishes"
            className="group relative overflow-hidden rounded-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-yellow-200/40 to-amber-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-amber-200/30 shadow-lg shadow-amber-200/20 hover:shadow-xl hover:shadow-amber-200/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-utensils"></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-amber-800 text-lg">Manage Menu</h3>
                  <p className="text-sm text-amber-600/60 font-light">Add, edit, or remove dishes</p>
                </div>
                <div className="ml-auto text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/reservations"
            className="group relative overflow-hidden rounded-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/40 to-green-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-emerald-200/30 shadow-lg shadow-emerald-200/20 hover:shadow-xl hover:shadow-emerald-200/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-emerald-800 text-lg">Reservations</h3>
                  <p className="text-sm text-emerald-600/60 font-light">View and manage bookings</p>
                </div>
                <div className="ml-auto text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/messages"
            className="group relative overflow-hidden rounded-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200/40 to-violet-200/40 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-purple-200/30 shadow-lg shadow-purple-200/20 hover:shadow-xl hover:shadow-purple-200/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-400/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-envelope"></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-purple-800 text-lg">Messages</h3>
                  <p className="text-sm text-purple-600/60 font-light">Check customer inquiries</p>
                </div>
                <div className="ml-auto text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <div className="flex justify-center items-center gap-3">
            <span className="text-amber-300/40 text-xs">◆</span>
            <p className="text-[10px] text-amber-500/40 font-light tracking-[0.2em] uppercase">
              SHREE SS RESTAURANT · Taste that stays in your heart ❤️
            </p>
            <span className="text-amber-300/40 text-xs">◆</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;