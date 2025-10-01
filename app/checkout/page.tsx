"use client";

import { useRef, startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { checkoutFormSchema, CheckoutFormData } from "@/validations/address";
import { checkoutFormData } from "@/constants/address";
import InputValidated from "@/components/ui/input-validated";
import { SubmitButton } from "@/components/ui/buttons";
import { createOrderAction } from "@/actions/order";
import { useCart } from "@/context/CartContext";
import { useDelivery } from "@/context/DeliveryContext";

const CheckoutForm = () => {
  const initialState = {
    message: "",
    errors: {},
  };
  const pathname = "/order-confirmation";
  const { cart } = useCart();
  const { selectedDelivery } = useDelivery();

  const createOrderActionWithParams = createOrderAction.bind(
    null,
    pathname,
    cart,
    selectedDelivery!
  );

  const [state, formAction, isPending] = useActionState(
    createOrderActionWithParams,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-[64px] pb-[72px]">
        <p className="text-center text-lg">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black p-6 pt-[64px] pb-[72px] max-w-lg mx-auto">
      <h1 className="text-emperor-900 text-3xl font-bold mb-6 text-center">
        Checkout
      </h1>

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
          {checkoutFormData.map((data) => (
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

        <SubmitButton name="Place Order" isPending={isPending} />
      </form>
    </main>
  );
};

export default CheckoutForm;
