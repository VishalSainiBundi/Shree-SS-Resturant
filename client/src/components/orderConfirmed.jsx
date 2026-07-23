import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { Link } from "react-router-dom";

const OrderConfirmed = () => {
  const orderId = "#" + Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 mt-20">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-green-600 mt-6">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you for your order.
          <br />
          Your delicious food is being prepared.
        </p>

        <div className="bg-orange-50 rounded-2xl p-5 mt-8 text-left">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-600">Order ID</span>
            <span className="font-bold">{orderId}</span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-600">Status</span>
            <span className="text-green-600 font-semibold">
              Confirmed
            </span>
          </div>

          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-600">
              Estimated Delivery
            </span>
            <span className="font-semibold">30 - 40 mins</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-600">Payment</span>
            <span className="font-semibold">Cash on Delivery</span>
          </div>
        </div>

        <div className="mt-8 space-y-4">

          <Link
            to="/orders"
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            <Package size={20} />
            Track Order
          </Link>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-3 rounded-xl font-semibold transition"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmed;