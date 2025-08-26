"use client";
import { regsiterUser } from "@/actions/user";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { registerFormData } from "@/constants/user";
import { useAuth } from "@/context/AuthContext";
import { RegisterUserForm, registerUserformSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const AccountForm = () => {
  const initialState = {
    message: "",
    errors: {},
  };

  const { logout } = useAuth();
  const router = useRouter();
  const regsiterUserWithPathname = regsiterUser.bind(null, "");

  const [state, formAction, isPending] = useActionState(
    regsiterUserWithPathname,
    initialState
  );
  const [showModal, setShowModal] = useState(false);

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

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
    router.push("/");
  };

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
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="bg-white hover:bg-rose-bud-200 border rounded-xl w-full h-[33px] mt-2"
      >
        Log Out
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AccountForm;
