import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosApiInstance from "../../helper";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Use router state first, fall back to sessionStorage (survives page refresh)
  const email = state?.email || sessionStorage.getItem("verify_email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(email ? "" : "Session expired. Please register again.");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 5) {
      setError("Please enter the 5-digit code sent to your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosApiInstance.post("/user/verify-otp", {
        email,
        otp,
      });

      if (response.data.flag === 0) {
        setSuccess("✅ Email verified! Redirecting to login...");
        sessionStorage.removeItem("verify_email"); // clean up
        setTimeout(() => navigate("/auth"), 2000);
      } else {
        setError(response.data.message || "Verification failed.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMsg("");
    setError("");
    setResendLoading(true);
    try {
      const response = await axiosApiInstance.post("/user/resend-otp", { email });
      if (response.data.flag === 0) {
        setResendMsg("✅ New code sent! Check your email.");
      } else {
        setError(response.data.message || "Failed to resend code.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend code.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/bg_1.png')] bg-cover bg-center flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-3xl font-bold text-yellow-400">Verify Your Email</h1>
          <p className="text-white/70 mt-2 text-sm">
            We sent a 5-digit code to
          </p>
          <p className="text-yellow-300 font-semibold mt-1 break-all">{email}</p>
        </div>

        {/* Messages */}
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
        {resendMsg && (
          <div className="mb-4 p-3 bg-blue-500/20 border border-blue-400/50 rounded-lg text-blue-200 text-sm">
            {resendMsg}
          </div>
        )}

        {/* OTP Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              // Only allow digits, max 5
              const val = e.target.value.replace(/\D/g, "").slice(0, 5);
              setOtp(val);
              setError("");
            }}
            placeholder="Enter 5-digit code"
            maxLength={5}
            className="w-full px-4 py-4 rounded-lg bg-white/20 text-white text-center text-2xl font-bold tracking-[0.5em] placeholder-gray-300 outline-none border border-white/20 focus:border-yellow-400 transition"
            required
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 5}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="animate-spin">⏳</span> Verifying...</>
            ) : (
              "Verify Account"
            )}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-yellow-400 hover:text-yellow-300 transition text-sm mt-1 disabled:opacity-50"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        </div>

        {/* Back to login */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/auth")}
            className="text-white/40 hover:text-white/70 transition text-xs"
          >
            ← Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;
