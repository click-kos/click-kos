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
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.session?.access_token) {
          localStorage.setItem("access_token", data.session.access_token);
        }

        // Fetch user profile
        try {
          const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${data.session.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const profileData = profileResponse.ok
            ? await profileResponse.json()
            : null;
          const profileUser = profileData?.user;

          const userData: UserData = {
            name: profileUser
              ? `${profileUser.first_name} ${profileUser.last_name}`
              : data.user?.email || formData.email,
            email: profileUser ? profileUser.email : formData.email,
            role: profileUser ? profileUser.role : "Student",
          };

          setAuthStatus(true, userData);
          router.push("/");
        } catch {
          const userData: UserData = {
            name: data.user?.email || formData.email,
            email: formData.email,
            role: "Student",
          };
          setAuthStatus(true, userData);
          router.push("/");
        }
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
          Welcome back
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Sign in to your account
        </p>

        {error && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
            <AlertCircle className="h-5 w-5" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#483AA0] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>

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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#483AA0] rounded border-gray-300"
              />{" "}
              Remember me
            </label>
            <Link href="/auth/forgot-password" className="">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <LogIn className="h-5 w-5" />
            )}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

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
