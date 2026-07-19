import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[url('/bg_1.png')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Shree SS Restaurant"
            className="w-24 h-24 object-contain mx-auto mb-4"
          />

          <h1 className="text-3xl font-bold text-yellow-400">
            Shree SS Restaurant
          </h1>

          <p className="text-white mt-2">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </p>
        </div>

        <form className="space-y-4">

          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400"
          />

          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-400 hover:text-yellow-300"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AuthPage;