"use client";

type OrderItem = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
};

export default function OrdersPageClient({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-md p-6 shadow-sm"
          >
            <div className="flex flex-col items-start md:justify-between md:items-center mb-3">
              <p className="font-semibold text-lg">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <div className="mb-4 flex flex-wrap gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-md"
                >
                  {item.name} x {item.quantity}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p
                className={`font-semibold ${
                  order.status === "delivered"
                    ? "text-green-600"
                    : order.status === "shipped"
                    ? "text-blue-600"
                    : order.status === "paid"
                    ? "text-purple-600"
                    : order.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </p>
              <p className="font-bold text-lg">
                Total: R {order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
