"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, UploadCloud, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


const verifySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  category: z.string().min(1, "Please select a category."),
  portfolioUrl: z.string().url("Please enter a valid URL (portfolio, GitHub, or social media)."),
  reason: z.string().min(20, "Please provide at least 20 characters explaining why you should be verified."),
  documentType: z.string().min(1, "Please select an identification document type."),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

function VerifyBadge() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: VerifyFormValues) => {
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FA7441]/10 text-[#FA7441] mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Request Verified Badge
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Get your PromptHub profile verified to build trust, showcase authenticity, and unlock special creator perks.
          </p>
        </div>

        {isSubmitted ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Application Submitted!</h3>
            <p className="text-sm text-gray-600 mt-2">
              We have received your verification request. Our moderation team will review your details and notify you via email within 3–5 business days.
            </p>
            <button
            
              onClick={()=> router.replace('/settings')}
              disabled={isSubmitting}
              className="w-full bg-[#d95a28] hover:bg-[#e06232] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              Back
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="e.g. Sakib Fakir"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7441] focus:border-transparent text-sm bg-gray-50/50"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Creator Category
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7441] focus:border-transparent text-sm bg-gray-50/50"
              >
                <option value="">Select a category</option>
                <option value="developer">AI Developer / Engineer</option>
                <option value="prompt-engineer">Professional Prompt Engineer</option>
                <option value="educator">Content Creator / Educator</option>
                <option value="enterprise">Organization / Enterprise</option>
                  <option value="enterprise">Others</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.category.message}
                </p>
              )}
            </div>

            {/* Portfolio / Public Proof URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Portfolio, GitHub, or Public Profile URL
              </label>
              <input
                type="text"
                {...register("portfolioUrl")}
                placeholder="https://github.com/yourname"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7441] focus:border-transparent text-sm bg-gray-50/50"
              />
              {errors.portfolioUrl && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.portfolioUrl.message}
                </p>
              )}
            </div>

           

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Why should you be verified?
              </label>
              <textarea
                rows={3}
                {...register("reason")}
                placeholder="Briefly describe your contributions to AI prompts or community presence..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7441] focus:border-transparent text-sm bg-gray-50/50 resize-none"
              />
              {errors.reason && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.reason.message}
                </p>
              )}
            </div>

            {/* back Button */}
            <button
             
              disabled={isSubmitting}
              className="w-full bg-[#FA7441] hover:bg-[#e06232] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...
                </>
              ) : (
                "Submit Verification Request"
              )}
            </button>

            <button
            
              onClick={()=> router.replace('/settings')}
              disabled={isSubmitting}
              className="w-full bg-[#d95a28] hover:bg-[#e06232] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              Back
            </button>
            
          </form>
        )}
      </div>
    </div>
  );
}

export default VerifyBadge;