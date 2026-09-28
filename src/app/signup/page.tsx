'use client';

import { useState } from "react";
import Header from "@/app/components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaCheck, FaExclamationCircle, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();
  const { user, signup, logout, loginWithSocial } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Please accept the Terms of Service to create an account.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = signup(name, email, password);
      setLoading(false);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setErrorMessage(res.error || "Failed to create account.");
      }
    }, 400);
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
          {/* Decorative Background Accents */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-orange-100/40 rounded-bl-full pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-yellow-200/30 rounded-tr-full pointer-events-none -z-0" />

          {/* Already Logged In Notice */}
          {user && !success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl mx-auto mb-4">
                <FaUser />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Account Active</h2>
              <p className="text-sm text-gray-500 mb-6">
                You are currently signed in as <span className="font-semibold text-gray-800">{user.name}</span> ({user.email}).
              </p>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-2xl shadow-md transition-all"
                >
                  <span>Go to Jadoo Home</span>
                  <FaArrowRight className="text-xs" />
                </Link>
                <button
                  onClick={logout}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-2xl text-sm transition-colors cursor-pointer"
                >
                  Create a Different Account
                </button>
              </div>
            </div>
          ) : success ? (
            /* Registration Success */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                <FaCheck />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Account Created!</h2>
              <p className="text-sm text-gray-600 mb-2">
                Welcome to Jadoo Travel, <span className="font-bold text-gray-800">{name || "Traveler"}</span>! Your membership is active and login marks have been removed.
              </p>
              <div className="w-24 h-1 bg-yellow-400 rounded-full mx-auto my-4 animate-pulse" />
              <Link
                href="/"
                className="inline-block mt-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm"
              >
                Start Exploring Now &rarr;
              </Link>
            </div>
          ) : (
            /* Signup Form */
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-3 rounded-2xl bg-orange-100/60 text-orange-600 mb-3 shadow-inner">
                  <FaShieldAlt className="text-xl" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Jadoo Account</h1>
                <p className="text-gray-500 mt-2 text-sm">
                  Sign up once to unlock exclusive fares, booking management, and trip itineraries
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3">
                  <FaExclamationCircle className="text-lg text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                    {errorMessage.includes("Sign In") && (
                      <Link
                        href="/login"
                        className="mt-1 inline-flex items-center text-xs font-bold text-red-800 underline hover:text-red-900"
                      >
                        Click here to Sign In &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email Address */}
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

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
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
                  <p className="text-[11px] text-gray-400 mt-1 pl-1">
                    Must be at least 6 characters with a combination of letters and numbers.
                  </p>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start text-xs text-gray-600 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="rounded text-yellow-400 focus:ring-yellow-400 mr-2 mt-0.5 cursor-pointer w-4 h-4 shrink-0"
                  />
                  <label htmlFor="terms" className="cursor-pointer select-none leading-relaxed">
                    I agree to the <Link href="/faq" className="text-orange-600 underline font-medium">Terms of Service</Link> and <Link href="/faq" className="text-orange-600 underline font-medium">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-70 text-white font-bold rounded-2xl shadow-lg shadow-yellow-400/30 transition-all text-sm tracking-wide cursor-pointer flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Registering Account...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
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
                    Or Sign Up With
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

                {/* Switch to Login */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    Already registered with Jadoo?{" "}
                    <Link href="/login" className="text-orange-600 font-bold hover:underline">
                      Sign in here
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
