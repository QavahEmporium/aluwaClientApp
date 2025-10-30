"use client";
import { loginUser } from "@/actions/user";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { loginFormData } from "@/constants/user";
import { useAuth } from "@/context/AuthContext";
import { LoginUserForm, loginUserFormSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const initialState = { message: "", errors: {} };
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const loginUserWithPathname = loginUser.bind(null, redirectPath);

  const [state, formAction, isPending] = useActionState(
    loginUserWithPathname,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-2 md:px-4">
      <div className="w-full max-w-md md:bg-white md:shadow-lg md:rounded-2xl p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              const formData = new FormData(formRef.current!);
              startTransition(() => {
                formAction(formData);
                login();
              });
            })(evt);
          }}
          className="flex flex-col items-center w-full"
        >
          {/* Email + Password Inputs */}
          <div className="w-full mb-4">
            {loginFormData.map((data) => (
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
          {/* Submit Button */}
          <SubmitButton name="Sign In" isPending={isPending} />
          {/* Forgot Password Link */}
          <div className="w-full text-center mb-4">
            <Link
              href="/forgot-password"
              className="text-sm text-rose-bud-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Register CTA */}
          <p className="mt-5 text-sm text-turquoise-900">
            Don't have an account yet?{" "}
            <Link
              className="text-pinklet-500 hover:underline font-medium"
              href={`/register?redirect=${redirectPath}`}
            >
              Sign Up here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
