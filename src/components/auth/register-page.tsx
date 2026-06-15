"use client";
import { useForm } from "react-hook-form";
import { registerUserSchemaValidation } from "@/src/validations/auth";
import Link from "next/link";
import AuthBackground from "./auth-background";
import { ToastContainer, toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useRouter } from "next/navigation";
import { useGoogleLoginMutation } from "@/src/store/features/auth/auth.features";
import { useRegisterUserMutation } from "@/src/store/features/users/user.features";
import { useSendOtpMutation } from "@/src/store/features/otp/otp.features";
type registerType = z.infer<typeof registerUserSchemaValidation>


function RegisterComponent() {
  const router = useRouter();
  const [googleLogin] = useGoogleLoginMutation();
  const [registerUser] = useRegisterUserMutation();
  const [sendOtp] = useSendOtpMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<registerType>({
    resolver: zodResolver(registerUserSchemaValidation),

  });


  const password = watch("password", "");
  console.log(password)

  const onSubmit = async (data: registerType) => {

    const { confirmPassword, ...registrationData } = data;
    console.log("Registering user with:", registrationData);


    try {
      const res = await registerUser(registrationData).unwrap();
      console.log(res, 'rse')

      if (res?.status===true) {

        console.log("sending.....")

        const otpRes = await sendOtp({
          email: data?.email,
          name: data?.name
        }).unwrap();
        console.log(otpRes, 'otp');



        toast.success("OTP Send Successfully");

        router.push(`/otp?email=${data?.email}&name=${data?.name}`);




      }

    } catch (error: any) {

      toast.error(error?.data?.message)

    }


  };

  const handleGoogleSignUp = async () => {
    console.log("Initiating Google OAuth Registration...");
    try {
      window.open(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
        "_self"
      );
      router.push('/home');



    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
    

      <AuthBackground />

      {/* ── Register Form ── */}
      <div className="max-w-md w-full space-y-6 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200/60 relative z-10">

        {/* Brand / Logo area */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#ff9a76] flex items-center justify-center mb-4 shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-500">Sign up to discover & share the best AI prompts</p>
        </div>

        {/* Google Registration Button */}
        <div>
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full flex justify-center items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-all duration-200 cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>
        </div>

        {/* Visual Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white/90 text-gray-400 text-xs uppercase tracking-wider">Or use your email</span>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="appearance-none block w-full px-4 py-2.5 border border-gray-200
               rounded  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] sm:text-sm transition-all duration-200"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
              className={`appearance-none block w-full px-4 py-2.5 border rounded  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] sm:text-sm transition-all duration-200 ${errors.email ? "border-red-300 text-red-900" : "border-gray-200"
                }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message as string}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`appearance-none block w-full px-4 py-2.5 border rounded  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] sm:text-sm transition-all duration-200 ${errors.password ? "border-red-300 text-red-900" : "border-gray-200"
                }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message as string}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className={`appearance-none block w-full px-4 py-2.5 border rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40 focus:border-[#FF6B35] sm:text-sm transition-all duration-200 ${errors.password ? "border-red-300 text-red-900" : "border-gray-200"
                }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message as string}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-[#FF6B35] hover:bg-[#e55a2b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "Register Account"}
            </button>
          </div>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#FF6B35] hover:text-[#e55a2b] transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterComponent;