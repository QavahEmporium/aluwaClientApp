import { verifySession } from "@/lib/dal";
import dbConnect from "@/lib/db";
import Order from "@/models/order";
import OrderItem from "@/models/order-item";

export async function listOrders() {
  await dbConnect();
  const session = await verifySession();
  if (!session) return null;

  const userId = session?.userId as string;

  // Fetch orders for this user
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

  // For each order, fetch its items
  const ordersWithItems = await Promise.all(
    orders.map(async (order: any) => {
      const items = await OrderItem.find({ orderId: order._id }).lean();

      return {
        id: order._id.toString(),
        date: order.createdAt.toISOString().split("T")[0],
        status: order.status,
        total: order.totalAmount,
        items: items.map((item: any) => ({
          id: item._id.toString(),
          productId: item.productId.toString(),
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };
    })
  );

  return ordersWithItems;
}
