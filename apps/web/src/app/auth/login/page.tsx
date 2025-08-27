"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, ArrowRight } from "lucide-react";
import { setAuthStatus, type UserData } from "../../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Implementation for actual authentication
      console.log("Login attempt:", formData);
      
      // For demo purposes, check for a specific email/password
      if (formData.email === "test@mynwu.ac.za" && formData.password === "demo123") {
        const userData: UserData = {
          name: "Thuso Ndou",
          email: "test@mynwu.ac.za",
          role: "Student"
        };
        
        // Set authentication status using the utility function
        setAuthStatus(true, userData);
        
        // Navigate back to home page
        router.push('/');
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="text-center">
            
            {/* Title and Description */}
            <div className="mt-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to your Click & Kos account
              </p>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="px-8 py-8">
              {/* Error Message */}
              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-red-800 dark:text-red-200">
                    {error}
                  </span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      placeholder="Enter your university email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#483AA0] focus:ring-[#483AA0] border-gray-300 rounded focus:ring-2 focus:ring-offset-2"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm font-medium text-[#483AA0] dark:text-[#7965C1] hover:text-[#0E2148] dark:hover:text-[#483AA0] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-3 py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0E2148] to-[#483AA0] hover:from-[#483AA0] hover:to-[#7965C1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#483AA0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-200 mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                  <p>Email: <span className="font-mono">test@mynwu.ac.za</span></p>
                  <p>Password: <span className="font-mono">demo123</span></p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="px-8 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#483AA0] dark:text-[#7965C1] hover:text-[#0E2148] dark:hover:text-[#483AA0] transition-colors group"
                >
                  Create a new account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* SSO Section */}
            <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="h-5 w-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">U</span>
                  </div>
                  University SSO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}