import ForgotPassword from "@/components/(auth)/forgot-password/client";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
}
