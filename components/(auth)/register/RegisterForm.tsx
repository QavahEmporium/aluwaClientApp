"use client";
import { regsiterUser } from "@/actions/user";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { registerFormData } from "@/constants/user";
import { useAuth } from "@/context/AuthContext";
import { RegisterUserForm, registerUserformSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const initialState = {
    message: "",
    errors: {},
  };

  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const regsiterUserWithPathname = regsiterUser.bind(null, redirectPath);

  const [state, formAction, isPending] = useActionState(
    regsiterUserWithPathname,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserformSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-2 md:px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(() => {
              const formData = new FormData(formRef.current!);
              startTransition(() => {
                formAction(formData);
                const user = Object.fromEntries(formData);
                login(user);
              });
            })(evt);
          }}
          className="flex flex-col items-center"
        >
          <div className="w-full mb-4">
            {registerFormData.map((data) => (
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
          <div>
            <SubmitButton name="Sign Up" isPending={isPending} />
          </div>
          <p className="mt-5 text-sm text-turquoise-900">
            Already have an account?
            <Link
              className="text-pinklet-500 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              href={`/login?redirect=${redirectPath}`}
            >
              Sign In here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
