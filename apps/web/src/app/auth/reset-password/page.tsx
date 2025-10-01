"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../../../lib/supabase";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showErrorWithRetry, setShowErrorWithRetry] = useState(false);

  const token = searchParams.get("code") || searchParams.get("token");

  useEffect(() => {
    let mounted = true;

    // Listen for auth state changes (Supabase will automatically handle URL tokens)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(
        "🔊 Auth event:",
        event,
        session ? "Session active" : "No session"
      );

      if (event === "PASSWORD_RECOVERY" && session) {
        console.log("PASSWORD_RECOVERY event fired - session established");
        console.log("User email:", session.user?.email);

        if (mounted) {
          setError("");
          setIsLoading(false);
        }
      } else if (event === "SIGNED_IN" && session) {
        console.log("SIGNED_IN event fired - session established");

        if (mounted) {
          setError("");
          setIsLoading(false);
        }
      } else if (event === "TOKEN_REFRESHED" && session) {
        console.log("TOKEN_REFRESHED event fired");

        if (mounted) {
          setError("");
          setIsLoading(false);
        }
      }
    });

    // Set a timeout in case no auth event fires
    const timeout = setTimeout(() => {
      if (mounted) {
        console.log("Timeout reached - no auth event fired");
        console.log("Checking current session state...");

        supabase.auth.getSession().then(({ data: { session }, error }) => {
          if (session) {
            console.log("Session found during timeout check");
            setError("");
            setIsLoading(false);
          } else {
            console.log("No session found during timeout check");
            setError(
              "Invalid or expired reset link. Please request a new password reset."
            );
            setIsLoading(false);
          }
        });
      }
    }, 10000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Check current session first
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        setError("Invalid or expired reset link");
        setIsLoading(false);
        return;
      }

      if (!session) {
        console.error("No active session for password reset");
        setError("No active session. Please use a valid reset link.");
        setIsLoading(false);
        return;
      }

      console.log("Current session:", session ? "Active" : "None");

      // Now try to update the password with the active session
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) {
        console.error("Password update error:", error);
        setError(error.message || "Failed to update password");
      } else {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !showErrorWithRetry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <div className="animate-spin h-8 w-8 border-4 border-[#483AA0] border-t-transparent rounded-full" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verifying Reset Link
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your password reset link...
              </p>
            </div>
          </div>
        </div>
    );
  }

  if (showErrorWithRetry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Reset Link Expired
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/auth/forgot-password")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white font-semibold"
                >
                  Request New Reset Link
                </button>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="w-full text-[#483AA0] dark:text-[#7965C1] text-sm hover:underline"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Password Reset Successful
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your password has been successfully updated. You'll be
              redirected to the sign-in page shortly.
            </p>
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white font-semibold"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Invalid Reset Link
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This password reset link is invalid or has expired.
              </p>
              <button
                onClick={() => router.push("/auth/forgot-password")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white font-semibold"
              >
                Request New Reset Link
              </button>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Reset your password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-sm">
              <AlertCircle className="h-5 w-5" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="New password"
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

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#483AA0] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : null}
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
