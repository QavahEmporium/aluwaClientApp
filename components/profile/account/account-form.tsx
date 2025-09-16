"use client";
import { updateAccountDetails } from "@/actions/user";
import { LogOutButton, SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { accountFormData } from "@/constants/user";
import { updateAccountformSchema, UpdateAccountForm } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const AccountForm = ({ user }: { user: any }) => {
  const initialState = {
    message: "",
    errors: {},
  };

  const updateAccountDetailsPathname = updateAccountDetails.bind(null);

  const [state, formAction, isPending] = useActionState(
    updateAccountDetailsPathname,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAccountForm>({
    resolver: zodResolver(updateAccountformSchema),
    defaultValues: user,
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
          });
        })(evt);
      }}
      className="flex flex-col items-center"
    >
      <div className="w-full mb-4">
        {accountFormData.map((data) => (
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
      <SubmitButton name="Update" isPending={isPending} />
      <LogOutButton />
    </form>
  );
};

export default AccountForm;
