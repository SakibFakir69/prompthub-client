"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft, Check, Loader2, Eye, EyeOff,
  Camera, Sparkles, X, Lock,
} from "lucide-react";
import { toast ,ToastContainer} from "react-toastify";
import { useGetMeQuery, useChangePasswordMutation } from "@/src/store/features/auth/auth.features";
import { useUpdateUserMutation } from "@/src/store/features/users/user.features";



const profileSchema = z.object({
  name:  z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  bio:   z.string().max(160, "Bio max 160 characters").optional(),
  tags:  z.array(z.string()).optional(),
});

const passwordSchema = z
  .object({
    password: z.string().min(1, "Required"),
    newPassword:     z.string()
      .min(8, "At least 8 characters")
     
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileForm  = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8)            score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#E24B4A", "#EF9F27", "#639922", "#639922"];
  return { score, label: labels[score], color: colors[score] };
}

function profileCompleteness(user: any, bio: string, tags: string[]): number {
  let filled = 0;
  const total = 5;
  if (user?.name)   filled++;
  if (user?.email)  filled++;
  if (bio?.trim())  filled++;
  if (tags?.length) filled++;
 
  return Math.round((filled / total) * 100);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PasswordEye({ show, toggle }: { show: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  );
}

function Field({
  label, error, hint, children,
}: {
  label: string; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-gray-500">{label}</label>
      {children}
      {hint && !error && <p className="text-[11px] text-gray-400">{hint}</p>}
      {error         && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full px-3 py-2.5 text-sm text-gray-900 bg-white border rounded
   placeholder:text-gray-400 outline-none transition-all
   focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
   ${err ? "border-red-400" : "border-gray-200 hover:border-gray-300"}`;

// ─── AvatarSection ────────────────────────────────────────────────────────────

function AvatarSection({
  name, avatar, onUpload, isUploading,
}: {
  name?: string; avatar?: string; onUpload: (f: File) => void; isUploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    onUpload(file);
  };

  const src = preview ?? avatar;

  return (
    <div className="flex items-center gap-4 py-1">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="relative w-[72px] h-[72px] rounded-full flex-shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-label="Change profile photo"
      >
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm" />
        ) : (
          <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-2xl border-2 border-white shadow-sm">
            {name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
        )}
        <span className="absolute inset-0 rounded-full bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          {isUploading
            ? <Loader2 size={20} className="text-white animate-spin" />
            : <Camera size={20} className="text-white" />}
        </span>
      </button>

      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 mt-1 disabled:opacity-50 transition-colors"
        >
          {isUploading ? "Uploading…" : "Change photo"}
        </button>
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── TagsInput ────────────────────────────────────────────────────────────────

function TagsInput({ value, onChange }: { value: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState("");

  const add = () => {
    const tag = input.trim().toLowerCase().replace(/^#+/, "").replace(",", "");
    if (!tag || value.includes(tag) || value.length >= 8) return;
    onChange([...value, tag]);
    setInput("");
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
    if (e.key === "Backspace" && !input && value.length) remove(value[value.length - 1]);
  };

  return (
    <div
      className="flex flex-wrap gap-1.5 px-3 py-2 border border-gray-200 hover:border-gray-300 rounded bg-white min-h-[42px] cursor-text
        focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all"
      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
    >
      {value.map((tag) => (
        <span key={tag} className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
          #{tag}
          <button type="button" onClick={() => remove(tag)} className="text-indigo-300 hover:text-indigo-600 transition-colors" aria-label={`Remove ${tag}`}>
            <X size={10} />
          </button>
        </span>
      ))}
      {value.length < 8 && (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={add}
          placeholder={value.length === 0 ? "Add tags…" : ""}
          className="flex-1 min-w-[100px] text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
        />
      )}
    </div>
  );
}

// ─── Completeness bar ─────────────────────────────────────────────────────────

function CompletenessBar({ pct }: { pct: number }) {
  const steps = 10;
  const filled = Math.round((pct / 100) * steps);
  const incomplete = pct < 100;

  if (!incomplete) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-2xl">
      <Sparkles size={15} className="text-indigo-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-700 mb-1.5">
          Profile is {pct}% complete — add a bio to get discovered
        </p>
        <div className="flex gap-0.5">
          {Array.from({ length: steps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${i < filled ? "bg-indigo-500" : "bg-gray-100"}`}
            />
          ))}
        </div>
      </div>
      <span className="text-xs font-medium text-gray-400">{pct}%</span>
    </div>
  );
}

// ─── StrengthBar ──────────────────────────────────────────────────────────────

function StrengthBar({ password }: { password: string }) {
  if (!password) return null;
  const { score, label, color } = getStrength(password);
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all"
            style={{ background: i <= score ? color : "#E5E7EB" }}
          />
        ))}
      </div>
      <p className="text-[11px]" style={{ color }}>{label}</p>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded-xl" />
        <div className="h-5 w-28 bg-gray-100 rounded-full flex-1" />
        <div className="h-8 w-24 bg-gray-100 rounded-xl" />
      </header>
      <main className="max-w-[560px] mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="h-12 bg-gray-100 rounded-2xl" />
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-[72px] h-[72px] bg-gray-100 rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-2 pt-2">
              <div className="h-4 w-32 bg-gray-100 rounded-full" />
              <div className="h-3 w-20 bg-gray-100 rounded-full" />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="h-3.5 w-20 bg-gray-100 rounded-full" />
              <div className="h-10 bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="h-3.5 w-28 bg-gray-100 rounded-full" />
              <div className="h-10 bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditProfilePage() {
  const router = useRouter();
  const { data: user, isLoading: isMeLoading } = useGetMeQuery();
  const [updateUser, { isLoading: isSaving }]       = useUpdateUserMutation();
  const [changePassword, { isLoading: isPwSaving }] = useChangePasswordMutation();

  // ── Profile form ────────────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors: profileErrors, isDirty: isProfileDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", bio: "", tags: [] },
  });

  useEffect(() => {
    if (user) reset({ name: user.name ?? "", email: user.email ?? "", bio: "", tags: [] });
  }, [user, reset]);

  const bioValue  = watch("bio") ?? "";
  const tagsValue = watch("tags") ?? [];

  const pct = profileCompleteness(user, bioValue, tagsValue);

  const onSaveProfile = async (data: ProfileForm) => {
    try {
      await updateUser(data).unwrap();
      toast.success("Profile saved");
      reset(data);
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to save");
    }
  };

  const onAvatarUpload = async (_file: File) => {
    toast.info("Avatar upload — add POST /user/avatar to enable this");
  };

  // ── Password form ───────────────────────────────────────────────────────────
  const [pwShow, setPwShow] = useState({ cur: false, next: false, confirm: false });
  const togglePw = (f: keyof typeof pwShow) => setPwShow((p) => ({ ...p, [f]: !p[f] }));

  const {
    register: regPw,
    handleSubmit: handlePw,
    reset: resetPw,
    watch: watchPw,
    formState: { errors: pwErrors },
  } = useForm<PasswordForm>({ resolver: zodResolver(passwordSchema) });

  const newPwValue = watchPw("newPassword") ?? "";

  const onChangePassword = async (data: PasswordForm) => {
    try {
      const {password,newPassword} = data;

      await changePassword({ password: data.password, newPassword: data.newPassword }).unwrap();

      toast.success("Password updated");
      resetPw();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Incorrect current password");
    }
  };

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (isMeLoading) return <Skeleton />;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-500">Session expired.</p>
        <button onClick={() => router.push("/login")} className="text-sm font-semibold text-indigo-600 hover:underline">
          Log in again
        </button>
      </div>
    );
  }

  // ── UI ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-[15px] font-medium text-gray-900 flex-1">Edit profile</span>
        <button
          form="profile-form"
          type="submit"
          disabled={isSaving || !isProfileDirty}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-40 transition-colors"
        >
          {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
          {isSaving ? "Saving…" : "Save changes"}
        </button>
      </header>

      <main className="mx-auto px-4 py-4 pb-16 flex flex-col gap-4">

        {/* Completeness nudge */}
        <CompletenessBar pct={pct} />

        {/* ── Identity card ── */}
        <section className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

          {/* Avatar */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">Identity</p>
            <AvatarSection
              name={user.name}
              avatar={undefined}
              onUpload={onAvatarUpload}
              isUploading={false}
            />
          </div>

          {/* Editable fields */}
          <form id="profile-form" onSubmit={handleSubmit(onSaveProfile)} className="px-6 py-5 border-b border-gray-100 flex flex-col gap-4">

            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Full name" error={profileErrors.name?.message}>

                <input className={inputCls(profileErrors.name?.message)} placeholder="Your name" {...register("name")} />
              </Field>

              <Field label="Email" error={profileErrors.email?.message} hint="Re-verification may be required">
                <input className={inputCls(profileErrors.email?.message)} type="email" placeholder="you@example.com" {...register("email")} />
              </Field>
            </div>

            {/* Bio */}
            <Field label="Bio" error={profileErrors.bio?.message}>
              <textarea
                className={`${inputCls(profileErrors.bio?.message)} resize-none`}
                rows={3}
                maxLength={160}
                placeholder="Tell the community about yourself…"
                {...register("bio")}
              />
              <p className="text-[11px] text-gray-400 text-right -mt-1">{bioValue.length} / 160</p>
            </Field>

            {/* Tags */}
            <Field label="Interests" hint="Press Enter or comma to add · max 8 tags">
              <TagsInput value={tagsValue} onChange={(t) => setValue("tags", t, { shouldDirty: true })} />
            </Field>

            {/* Save + Discard */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => reset()}
                disabled={!isProfileDirty}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isSaving || !isProfileDirty}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                {isSaving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : "Save changes"}
              </button>
            </div>
          </form>

          {/* Read-only fields */}
          <div className="px-6 py-5 grid grid-cols-2 gap-3">
            
            <Field label="Member since">
              <div className="px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </div>
            </Field>
          </div>
        </section>

        {/* ── Password card ── */}
        <section className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
              <Lock size={14} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Change password</p>
              <p className="text-xs text-gray-400">Use a strong password you don't use elsewhere.</p>
            </div>
          </div>

          <form onSubmit={handlePw(onChangePassword)} className="px-6 py-5 flex flex-col gap-4">
            {/* Current */}
            <Field label="Current password" error={pwErrors.password?.message}>
              <div className="relative">
                <input
                  className={inputCls(pwErrors.password?.message) + " pr-10"}
                  type={pwShow.cur ? "text" : "password"}
                  placeholder="Enter current password"
                  {...regPw("password")}
                />
                <PasswordEye show={pwShow.cur} toggle={() => togglePw("cur")} />
              </div>
            </Field>

            {/* New */}
            <Field label="New password" error={pwErrors.newPassword?.message}>
              <div className="relative">
                <input
                  className={inputCls(pwErrors.newPassword?.message) + " pr-10"}
                  type={pwShow.next ? "text" : "password"}
                  placeholder="Min. 8 chars, 1 uppercase, 1 number"
                  {...regPw("newPassword")}
                />
                <PasswordEye show={pwShow.next} toggle={() => togglePw("next")} />
              </div>
              <StrengthBar password={newPwValue} />
            </Field>

            {/* Confirm */}
            <Field label="Confirm new password" error={pwErrors.confirmPassword?.message}>
              <div className="relative">
                <input
                  className={inputCls(pwErrors.confirmPassword?.message) + " pr-10"}
                  type={pwShow.confirm ? "text" : "password"}
                  placeholder="Repeat new password"
                  {...regPw("confirmPassword")}
                />
                <PasswordEye show={pwShow.confirm} toggle={() => togglePw("confirm")} />
              </div>
            </Field>

            <button
              type="submit"
              disabled={isPwSaving}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {isPwSaving ? <><Loader2 size={14} className="animate-spin" /> Updating…</> : "Update password"}
            </button>
          </form>
        </section>

      
      </main>
    </div>
  );
}