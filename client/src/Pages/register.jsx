import { useState } from "react";
// import axios  from "axios";
import axiosApiInstance from "../../helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/userSlice";

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userStore.user);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // ==========================
  // Handle input changes
  // ==========================
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // ==========================
  // Login submission
  // ==========================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // const response = await axios.post("http://localhost:5000/user/login", loginData);
      const response = await axiosApiInstance.post("/user/login", loginData);
      console.log("Login response:", response.data);

      // Check if login was successful (flag === 0 means success)
      if (response.data.flag !== 0) {
        setError(response.data.msg || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Extract token and user from response
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userName", user?.name || "User");
      localStorage.setItem("userEmail", user?.email || loginData.email);
      // Also store the user object for later use
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch login action to Redux
      dispatch(login(user));

      setSuccess("Login successful! Redirecting...");

      // Determine redirect based on verification status
      if (user.isVerified === true) {
        // Verified user -> go to home
        setTimeout(() => navigate("/"), 1500);
      } else {
        // Not verified -> go to verification page with email
        // Store email in sessionStorage as fallback
        sessionStorage.setItem("verify_email", user.email);
        navigate("/verify-email", {
          state: { email: user.email },
          replace: true, // prevents back button issues
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Register submission
  // ==========================
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, password, confirmPassword } = registerData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosApiInstance.post("/user/create", {
        name,
        email,
        phone,
        password,
      });

      if (response.data.flag === 0) {
        setSuccess("Account created! Redirecting to email verification...");
        // Clear register form
        setRegisterData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        // Persist email for verification page (fallback)
        sessionStorage.setItem("verify_email", email);
        // Navigate to verify page with email state
        navigate("/verify-email", {
          state: { email },
          replace: true,
        });
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Toggle between login/register
  // ==========================
  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    // Reset forms
    setLoginData({ email: "", password: "" });
    setRegisterData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-[url('/bg_1.png')] bg-cover bg-center flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Shree SS Restaurant"
            className="w-24 h-24 object-contain mx-auto mb-4 rounded-full border-2 border-yellow-400/50 shadow-lg shadow-yellow-500/20"
          />
          <h1 className="text-3xl font-bold text-yellow-400">Shree SS Restaurant</h1>
          <p className="text-white/80 mt-1 text-sm">Taste that stays in your heart ❤️</p>
          <p className="text-white/60 text-sm mt-2">
            {isLogin ? "Welcome back! Login to continue." : "Create your account to get started."}
          </p>
        </div>

        {/* Error / Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-lg text-green-200 text-sm">
            {success}
          </div>
        )}

        {/* ===== LOGIN FORM ===== */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        ) : (
          /* ===== REGISTER FORM ===== */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition"
              required
            />
            <input
              type="tel"
              name="phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition"
              required
            />
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="Password (min 6 chars)"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none border border-white/20 focus:border-yellow-400 transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        )}

        {/* Toggle between Login / Register */}
        <div className="text-center mt-6">
          <button
            onClick={toggleAuth}
            className="cursor-pointer text-yellow-400 hover:text-yellow-300 transition text-sm"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Shree SS Restaurant</p>
          <p className="mt-1 text-yellow-400/60">Taste that stays in your heart ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;