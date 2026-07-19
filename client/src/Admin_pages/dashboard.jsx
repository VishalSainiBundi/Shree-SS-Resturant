import { Link } from 'react-router-dom';

const AdminDashboard=()=> {
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-gray-800">
            Welcome back, <span className="font-bold text-amber-800">Admin</span>
          </h1>
          <p className="text-gray-500 mt-1">
            <i className="fas fa-heart text-red-500 mr-1"></i>
            Taste that stays in your heart — Manage your restaurant efficiently
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/add-dish"
            className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            <i className="fas fa-plus-circle"></i>
            Add New Dish
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-green-500 font-medium">
                <i className="fas fa-arrow-up mr-1"></i> 12%
              </span>
              <span className="text-xs text-gray-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <p className="text-sm text-gray-500">Latest customer orders</p>
          </div>
          <Link to="/admin/orders" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-amber-50/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        order.status === 'Completed' ? 'bg-green-500' :
                        order.status === 'Processing' ? 'bg-blue-500' :
                        'bg-yellow-500'
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/dishes"
          className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-6 rounded-2xl border border-amber-200 hover:shadow-lg transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
              <i className="fas fa-utensils"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Manage Menu</h3>
              <p className="text-sm text-gray-500">Add, edit, or remove dishes</p>
            </div>
          </div>
        </Link>
        <Link
          to="/admin/reservations"
          className="bg-gradient-to-r from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Reservations</h3>
              <p className="text-sm text-gray-500">View and manage bookings</p>
            </div>
          </div>
        </Link>
        <Link
          to="/admin/messages"
          className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Messages</h3>
              <p className="text-sm text-gray-500">Check customer inquiries</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard