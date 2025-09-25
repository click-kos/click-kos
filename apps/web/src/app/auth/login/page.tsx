"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { setAuthStatus, type UserData } from "../../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api-click-kos.netlify.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the response has user data
        const userData: UserData = {
          name: data.user?.email || formData.email, // Use email as fallback for name
          email: formData.email,
          role: "Student" // Default role, could be extracted from response if available
        };
        setAuthStatus(true, userData);
        router.push("/");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Simulate Google login
    setIsLoading(true);
    setError("");
    try {
      await new Promise(r => setTimeout(r, 1000));
      const userData: UserData = { name: "Google User", email: "googleuser@gmail.com", role: "Student" };
      setAuthStatus(true, userData);
      router.push("/");
    } catch {
      setError("Google login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">Welcome back</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Sign in to your Click & Kos account</p>

        {error && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
            <AlertCircle className="h-5 w-5" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="University email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#483AA0] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#483AA0] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-[#483AA0] rounded border-gray-300" /> Remember me
            </label>
            <Link href="/auth/forgot-password" className="text-[#483AA0] dark:text-[#7965C1]">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <LogIn className="h-5 w-5" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Or separator */}
        <div className="flex items-center justify-center gap-2 mt-3 mb-3 text-gray-400 dark:text-gray-500">
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></span>
          <span className="px-2 text-sm">or</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></span>
        </div>

        {/* Google Login with inline SVG */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95.1h146.9c-6.4 34.7-25.7 64.1-54.6 83.7v69.4h88.2c51.7-47.7 81-117.9 81-198z"/>
            <path fill="#34A853" d="M272 544.3c73.8 0 135.8-24.4 181-66.4l-88.2-69.4c-24.5 16.4-55.9 26-92.8 26-71.4 0-132-48.1-153.7-112.8H29.8v70.6C75 494.7 167.7 544.3 272 544.3z"/>
            <path fill="#FBBC05" d="M118.3 318.7c-4.7-14-7.3-28.9-7.3-44 0-15.1 2.6-30 7.3-44v-70.6H29.8c-15 30.1-23.6 63.9-23.6 99s8.6 68.9 23.6 99l88.5-70.6z"/>
            <path fill="#EA4335" d="M272 107.9c39.7 0 75.4 13.6 103.6 40.2l77.7-77.7C406.7 24.3 344.7 0 272 0 167.7 0 75 49.6 29.8 135.5l88.5 70.6C140 156 200.6 107.9 272 107.9z"/>
          </svg>
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>

        {/* Register link */}
        <div className="text-sm mt-2 flex justify-center items-center gap-1">
          <span>Don't have an account?</span>
          <Link
            href="/auth/register"
            className="text-[#483AA0] dark:text-[#7965C1] hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
