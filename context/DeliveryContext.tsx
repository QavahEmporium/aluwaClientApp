"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type DeliveryOption = {
  id: string;
  name: string;
  price: number;
};

interface DeliveryContextType {
  selectedDelivery: DeliveryOption | null;
  setSelectedDelivery: (option: DeliveryOption) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(
  undefined
);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(null);

  // ✅ Persist in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("deliveryOption");
    if (stored) setSelectedDelivery(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (selectedDelivery) {
      localStorage.setItem("deliveryOption", JSON.stringify(selectedDelivery));
    } else {
      localStorage.removeItem("deliveryOption");
    }
  }, [selectedDelivery]);

  return (
    <DeliveryContext.Provider value={{ selectedDelivery, setSelectedDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context)
    throw new Error("useDelivery must be used within DeliveryProvider");
  return context;
}
