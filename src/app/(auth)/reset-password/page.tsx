import { Suspense } from "react";
import ResetPassword from "@/src/components/auth/reset-password";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}