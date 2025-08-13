import Register from "@/components/(auth)/register/Register";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}
