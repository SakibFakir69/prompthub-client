"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthBackground from "./auth-background";

function ResetPasswordComponent() {
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log("Forgot Password Data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      <AuthBackground />

      {/* ── Card ── */}
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200/60 relative z-10">
        {/* Brand / Logo area */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#ff9a76] flex items-center justify-center mb-4 shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Reset password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {emailSent
              ? `We've sent a reset link to your email`
              : "Enter your email and we'll send you a reset link"}
          </p>
        </div>

        {/* ── Success State ── */}
        {emailSent ? (
          <div className="space-y-6">
            {/* Success icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Check your inbox at
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {getValues("email")}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>

            {/* Resend button */}
            <button
              onClick={() => setEmailSent(false)}
              type="button"
              className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-all duration-200 cursor-pointer"
            >
              Try a different email
            </button>

            {/* Back to login */}
            <p className="text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                prefetch={true}
                href="/login"
                className="font-semibold text-[#FF6B35] hover:text-[#e55a2b] transition-colors"
              >
                Back to sign in
              </Link>
            </p>
          </div>
        ) : (
          /* ── Form State ── */
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`appearance-none block w-full px-4 py-2.5 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] sm:text-sm transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 text-red-900"
                      : "border-gray-200"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e55a2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending link…" : "Send reset"}
              </button>
            </form>

            {/* Footer link */}
            <p className="text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                prefetch={true}
                href="/login"
                className="font-semibold text-[#FF6B35] hover:text-[#e55a2b] transition-colors"
              >
                Login in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordComponent;