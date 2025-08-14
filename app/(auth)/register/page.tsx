import RegisterForm from "@/components/(auth)/register/RegisterForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
