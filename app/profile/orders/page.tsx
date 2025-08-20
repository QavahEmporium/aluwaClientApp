// app/profile/orders/page.tsx
import { listOrders } from "@/data/order";
import OrdersPageClient from "@/components/profile/orders/user-orders";

async function OrdersPageServer() {
  const orders = await listOrders();

  return <OrdersPageClient orders={orders || []} />;
}

export default OrdersPageServer;
