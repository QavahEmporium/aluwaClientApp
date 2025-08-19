// src/actions/order.ts
import { verifySession } from "@/lib/dal";
import dbConnect from "@/lib/db";
import Order from "@/models/order";
import OrderItem from "@/models/order-item";
import ShippingAddress from "@/models/shipping";

export async function createOrder(form: any, cart: any[]) {
  await dbConnect();

  // 1️⃣ Save shipping address
  const session = await verifySession();
  if (!session) return null;

  const userId = session?.userId as string;

  const shipping = await ShippingAddress.create({
    userId,
    name: form.name,
    email: form.email,
    address: form.address,
    city: form.city,
    postalCode: form.postalCode,
    country: form.country,
  });

  // 2️⃣ Calculate total
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 3️⃣ Create order
  const order = await Order.create({
    userId,
    shippingAddressId: shipping._id,
    totalAmount,
    status: "pending",
  });

  // 4️⃣ Save order items
  const items = cart.map((item) => ({
    orderId: order._id,
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  await OrderItem.insertMany(items);

  return order;
}
