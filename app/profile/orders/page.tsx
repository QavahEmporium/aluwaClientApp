// app/profile/orders/page.tsx
import { listOrders } from "@/data/order";
import OrdersPageClient from "@/components/profile/orders/user-orders";
import { Suspense } from "react";

async function OrdersPageServer() {
  const orders = await listOrders();

  return (
    <Suspense fallback={<>Loading ...</>}>
      <OrdersPageClient orders={orders || []} />
    </Suspense>
  );
}

export default OrdersPageServer;
