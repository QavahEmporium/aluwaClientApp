"use client";

import { useRef, startTransition } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputValidated from "@/components/ui/input-validated";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/actions/forgot-password"; // 👈 import your server action
import { ForgotPasswordForm, forgotPasswordSchema } from "@/validations/user";

export default function ForgotPasswordPage() {
  const initialState = {
    message: "",
    errors: {},
  };

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/login";

  const forgotPasswordWithPath = forgotPassword.bind(null, redirectPath);

  const [state, formAction, isPending] = useActionState(
    forgotPasswordWithPath,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-2 md:px-4">
      <div className="w-full max-w-md md:bg-white md:shadow-lg md:rounded-2xl p-4 md:p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>

        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              const formData = new FormData(formRef.current!);
              startTransition(() => {
                formAction(formData);
              });
            })(evt);
          }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-full">
            <InputValidated
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              bgColour="bg-gray-50"
              register={register}
              errors={errors}
              isPending={isPending}
              stateError={state?.errors}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-rose-bud-500 hover:bg-rose-bud-400 text-white w-full"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>

          {state?.message && (
            <p
              className={`text-sm ${
                state.errors?.email ? "text-red-600" : "text-green-600"
              } font-medium mt-2`}
            >
              {state.message ||
                (state.errors?.email
                  ? "No account found with that email address."
                  : "A password reset link has been sent to your email.")}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
