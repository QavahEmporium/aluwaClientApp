"use client";

import { useRef, startTransition, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/actions/reset-password"; // you'll create this next
import { ResetPasswordForm, resetPasswordFormSchema } from "@/validations/user";
import { resetPasswordFormData } from "@/constants/user";

export default function ResetPasswordPage() {
  const initialState = { message: "", errors: {} };
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const resetPasswordWithToken = resetPassword.bind(null, token);
  const [state, formAction, isPending] = useActionState(
    resetPasswordWithToken,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-white px-2 md:px-4">
      <div className="w-full max-w-md md:bg-white md:shadow-lg md:rounded-2xl p-4 md:p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              const formData = new FormData(formRef.current!);
              startTransition(() => formAction(formData));
            })(evt);
          }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-full">
            {resetPasswordFormData.map((data) => (
              <InputValidated
                key={data.name}
                {...data}
                register={register}
                errors={errors}
                isPending={isPending}
                stateError={state?.errors}
              />
            ))}
          </div>

          <SubmitButton name="Reset Password" isPending={isPending} />

          {state?.message && (
            <p className="text-sm text-turquoise-900 mt-3">{state.message}</p>
          )}
        </form>
      </div>
    </main>
  );
}
