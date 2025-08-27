import { verifySession } from "@/lib/dal";
import dbConnect from "@/lib/db";
import Order from "@/models/order";
import { Types } from "mongoose";

export async function listOrders() {
  await dbConnect();
  const session = await verifySession();
  if (!session) return null;

  const userId = session.userId as string;

  // Aggregate orders and join with items
  const orders = await Order.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "orderitems", // collection name in MongoDB
        localField: "_id",
        foreignField: "orderId",
        as: "items",
      },
    },
    {
      $project: {
        id: { $toString: "$_id" },
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        status: 1,
        total: "$totalAmount",
        items: {
          $map: {
            input: "$items",
            as: "item",
            in: {
              id: { $toString: "$$item._id" },
              productId: { $toString: "$$item.productId" },
              name: "$$item.name",
              quantity: "$$item.quantity",
              price: "$$item.price",
            },
          },
        },
      },
    },
  ]);

  return orders.map(({ id, status, date, total, items }) => ({
    id,
    status,
    date,
    total,
    items,
  }));
}
