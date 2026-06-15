"use client";
import React, { useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthBackground from "./auth-background";
import { useRouter, useSearchParams } from "next/navigation";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/src/store/features/otp/otp.features";
import { toast, ToastContainer } from "react-toastify";
import CatchErrorHandel from "@/src/helper/error/error.helper";


interface OtpFormValues {
  otp: string[];
  email:string
}

interface OtpComponentProps {
  email?: string;
  onVerify?: (code: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
  onBack?: () => void;
}

function OtpComponent({

  onVerify,
  onResend,
  onBack,
}: OtpComponentProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchParams = useSearchParams();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isOtpLoading }] = useSendOtpMutation();



  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const from = searchParams.get("from");
  const router = useRouter();
  console.log(from , 
  "from"
  );





  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    defaultValues: { otp: Array(4).fill("") },
  });

  const otpValues = watch("otp");

  const isComplete = otpValues.every((v) => v !== "");

  /* ── Timer ── */
  const startTimer = () => {
    setTimer(30);
    setCanResend(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  /* ── Input handlers ── */
  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setValue(`otp.${index}`, digit, { shouldValidate: false });
    clearErrors("otp");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!getValues(`otp.${index}`) && index > 0) {
        setValue(`otp.${index - 1}`, "", { shouldValidate: false });
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    paste.split("").forEach((d, i) => {
      setValue(`otp.${i}`, d, { shouldValidate: false });
    });
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  /* ── Submit ── */
  const onSubmit = async (data: OtpFormValues) => {

    const code = data.otp.join("");
    if (code.length < 4) {
      setError("otp", { message: "Please enter all 6 digits." });
      return;
    }
    if(!email ||!name){
      toast.error("Please provide all info");
      return;
    }
    try {
      console.log(data?.otp, ' otp code')
      const code = data?.otp.join('');
      console.log(code);

      const success = await verifyOtp({ otp: code, email: email }).unwrap();

      if (success.status === true && from==="reset-email") {
        router.push(`/reset-password?email=${email}`)
      }

      if (success.status === true && from!=="reset-email") {
        router.replace('/login')
      }



    } catch(error:any) {
      
       toast.error(error?.data?.message)
      
    }
  };

  /* ── Resend ── */
  const handleResend = async () => {

    if (!canResend) return;
    setValue("otp", Array(4).fill(""));
    clearErrors("otp");
    setVerified(false);
    inputRefs.current[0]?.focus();
    startTimer();
    try {

      await sendOtp({ email: email, name: name }).unwrap();
      toast.success("OTP Send Successfully")
      console.log("resen")


    } catch(error:any) {
      // handle silently or show toast
      toast.error(error?.data?.message)
    }

  };

  const hasError = !!errors.otp;




  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      <AuthBackground />
      
      <div className="max-w-md w-full space-y-6 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200/60 relative z-10">

        {/* Brand / Logo */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#ff9a76] flex items-center justify-center mb-4 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-500">
            We've sent a 4-digit code to
          </p>
          <span className="inline-block mt-1.5 px-3 py-0.5 bg-orange-50 text-[#FF6B35] border border-orange-200 rounded-lg text-sm font-semibold">
            {email}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${verified ? "bg-green-400" : "bg-gradient-to-r from-[#FF6B35] to-[#ff9a76]"}`}
            style={{ width: verified ? "100%" : `${(timer / 30) * 100}%` }}
          />
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div
            className="flex gap-2.5 justify-center mb-2"
            role="group"
            aria-label="One-time password"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                      field.ref(el);
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`Digit ${index + 1}`}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    disabled={verified || isSubmitting}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    className={`
                      w-12 h-14 text-center text-xl font-bold rounded border
                       outline-none transition-all duration-200
                      focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35]
                      disabled:opacity-60 disabled:cursor-not-allowed
                      ${hasError
                        ? "border-red-400 bg-red-50 text-red-700 animate-[shake_0.35s_ease]"
                        : verified
                          ? "border-green-400 bg-green-50 text-green-700"
                          : field.value
                            ? "border-[#FF6B35] bg-orange-50/50 text-gray-900"
                            : "border-gray-200 bg-white text-gray-900"
                      }
                    `}
                  />
                )}
              />
            ))}
          </div>

          {/* Error message */}
          <div className="min-h-[1.25rem] text-center mb-4">
            {errors.otp && (
              <p className="text-xs text-red-500" role="alert">
                {errors.otp.message as string}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || verified}
            className={`
              w-full flex items-center justify-center py-2.5 px-4
              rounded-xl text-sm font-semibold text-white
              border border-transparent shadow-sm
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35]
              ${verified
                ? "bg-green-500 cursor-default"
                : "bg-[#FF6B35] hover:bg-[#e55a2b] disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
              }
            `}
          >
            {verified ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Email verified!
              </>
            ) : isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Verifying…
              </>
            ) : (
              "Verify email"
            )}
          </button>
        </form>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500">
          Didn't receive it?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend}
            className={`font-semibold transition-colors ${canResend
              ? "text-[#FF6B35] hover:text-[#e55a2b] cursor-pointer"
              : "text-gray-400 cursor-default"
              }`}
          >
            {canResend ? "Resend code" : `Resend in ${timer}s`}
          </button>
        </p>

        {/* Back link */}
        <button
          type="button"
          onClick={()=> router.push('/login')}
          className="flex items-center justify-center gap-1.5 w-full text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer mt-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to login
        </button>

      </div>
    </div>
  );
}

export default OtpComponent;