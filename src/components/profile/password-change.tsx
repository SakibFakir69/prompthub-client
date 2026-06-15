
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, Loader2, CheckCircle2 } from "lucide-react";
import FormField from "./form-field";


const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof schema>;

interface ChangePasswordSectionProps {
  // receives { currentPassword, newPassword }
  // maps to ChangePasswordPayload { oldPassword, newPassword } internally in edit-profile-page
  onSubmit: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
}

export default function ChangePasswordSection({ onSubmit }: ChangePasswordSectionProps) {
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordForm>({ resolver: zodResolver(schema) });

  const toggle = (f: keyof typeof show) =>
    setShow((p) => ({ ...p, [f]: !p[f] }));

  const handleChange = async (data: PasswordForm) => {
    await onSubmit({ currentPassword: data.currentPassword, newPassword: data.newPassword });
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 3000);
  };

  const EyeToggle = ({ field }: { field: keyof typeof show }) => (
    <button
      type="button"
      onClick={() => toggle(field)}
      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
      aria-label={show[field] ? "Hide" : "Show"}
    >
      {show[field] ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );

  return (
    <section className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center">
          <Lock size={15} className="text-gray-600" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Change password</h2>
          <p className="text-xs text-gray-500">Use a strong password you don't use elsewhere.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleChange)} className="flex flex-col gap-4">
        {/* Current */}
        <div className="relative">
          <FormField
            label="Current password"
            type={show.current ? "text" : "password"}
            placeholder="Enter current password"
            error={errors.currentPassword?.message}
            {...register("currentPassword")}
          />
          <EyeToggle field="current" />
        </div>

        {/* New */}
        <div className="relative">
          <FormField
            label="New password"
            type={show.next ? "text" : "password"}
            placeholder="Min. 8 chars, 1 uppercase, 1 number"
            error={errors.newPassword?.message}
            hint="Min. 8 characters · 1 uppercase · 1 number"
            {...register("newPassword")}
          />
          <EyeToggle field="next" />
        </div>

        {/* Confirm */}
        <div className="relative">
          <FormField
            label="Confirm new password"
            type={show.confirm ? "text" : "password"}
            placeholder="Repeat new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <EyeToggle field="confirm" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? (
            <><Loader2 size={15} className="animate-spin" /> Updating…</>
          ) : success ? (
            <><CheckCircle2 size={15} className="text-emerald-400" /> Password updated!</>
          ) : (
            "Update password"
          )}
        </button>
      </form>
    </section>
  );
}