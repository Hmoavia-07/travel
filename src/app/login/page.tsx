'use client';

import { useState } from "react";
import Header from "@/app/components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaExclamationCircle, FaCheckCircle, FaUserCheck, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, logout, loginWithSocial } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setErrorMessage(res.error || "Authentication failed. Please verify credentials.");
      }
    }, 400);
  };

  const handleDemoLogin = () => {
    setEmail("hasnainmoa07@gmail.com");
    setPassword("Password123!");
    setErrorMessage("");
    setLoading(true);

    setTimeout(() => {
      login("hasnainmoa07@gmail.com", "Password123!");
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }, 300);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    loginWithSocial(provider);
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/70 via-white to-yellow-50/40 flex flex-col justify-between">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-7 sm:p-10 rounded-[32px] shadow-2xl max-w-lg w-full border border-gray-100/90 relative overflow-hidden"
        >
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/30 rounded-bl-full pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-orange-100/40 rounded-tr-full pointer-events-none -z-0" />

          {/* Already Logged In State */}
          {user && !success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                <FaUserCheck />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Already Signed In</h2>
              <p className="text-sm text-gray-500 mb-6">
                You are currently logged in as <span className="font-semibold text-gray-800">{user.name}</span> ({user.email}).
              </p>

              <div className="space-y-3">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-2xl shadow-md transition-all"
                >
                  <span>Continue to Home Page</span>
                  <FaArrowRight className="text-xs" />
                </Link>
                <button
                  onClick={logout}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-2xl text-sm transition-colors cursor-pointer"
                >
                  Sign Out &amp; Switch Account
                </button>
              </div>
            </div>
          ) : success ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                <FaCheckCircle />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
              <p className="text-sm text-gray-600 mb-2">
                Authentication successful. Removing login marks and syncing your trips...
              </p>
              <div className="w-24 h-1 bg-yellow-400 rounded-full mx-auto my-4 animate-pulse" />
              <Link
                href="/"
                className="inline-block mt-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm"
              >
                Go to Home Now &rarr;
              </Link>
            </div>
          ) : (
            /* Standard Login Form */
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-3 rounded-2xl bg-yellow-100/60 text-yellow-600 mb-3 shadow-inner">
                  <FaLock className="text-xl" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In to Jadoo</h1>
                <p className="text-gray-500 mt-2 text-sm">
                  First-time traveler? <Link href="/signup" className="text-orange-600 font-semibold hover:underline">Create an account first</Link>
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3 animate-shake">
                  <FaExclamationCircle className="text-lg text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                    {errorMessage.includes("Sign Up first") && (
                      <Link
                        href="/signup"
                        className="mt-2 inline-flex items-center text-xs font-bold text-red-800 underline hover:text-red-900"
                      >
                        Click here to Sign Up now &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Demo Account Quick-Fill Card */}
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-900">Demo Account Ready</span>
                  <p className="text-amber-700 text-[11px]">Instant sign in with verified traveler credentials</p>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="px-3 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow-sm transition-all cursor-pointer text-xs"
                >
                  ⚡ Autofill &amp; Sign In
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>
                    <a href="#" className="text-xs text-orange-600 hover:underline font-medium">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center text-xs text-gray-600 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    defaultChecked
                    className="rounded text-yellow-400 focus:ring-yellow-400 mr-2 cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="remember" className="cursor-pointer select-none">
                    Remember my login session on this browser
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 text-white font-bold rounded-2xl shadow-lg shadow-yellow-400/30 transition-all text-sm tracking-wide cursor-pointer flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FaArrowRight className="text-xs" />
                    </>
                  )}
                </button>

                {/* Or Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Or Continue With
                  </span>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center space-x-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <FaGoogle className="text-red-500 text-sm" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center space-x-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <FaFacebook className="text-blue-600 text-sm" />
                    <span>Facebook</span>
                  </button>
                </div>

                {/* Switch to Signup */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Don&apos;t have an account yet?{" "}
                    <Link href="/signup" className="text-orange-600 font-bold hover:underline">
                      Sign up now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
