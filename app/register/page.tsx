import Register from "@/components/register/Register";
import { Suspense, useState } from "react";

export default function RegisterPage() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}
