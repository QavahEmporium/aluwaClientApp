"use client";
import { regsiterUser } from "@/actions/user";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { registerFormData } from "@/constants/user";
import { useAuth } from "@/context/AuthContext";
import { RegisterUserForm, registerUserformSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const initialState = {
    message: "",
    errors: {},
  };

  const { user, login } = useAuth();
  console.log({ user });
  const regsiterUserWithPathname = regsiterUser.bind(null, "");

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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  return (
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
      <SubmitButton name="Sign Up" isPending={isPending} />
    </form>
  );
};

export default RegisterForm;
