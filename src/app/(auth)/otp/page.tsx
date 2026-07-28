import { Suspense } from "react";
import OtpComponent from "@/src/components/auth/otp";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpComponent />
    </Suspense>
  );
}