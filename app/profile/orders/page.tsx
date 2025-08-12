// app/profile/orders/page.tsx or pages/profile/orders.tsx
"use client";
const mockOrders = [
  {
    id: 1,
    date: "2025-08-10",
    status: "Delivered",
    total: 59.97,
    items: [
      { id: 101, name: "Beard Oil", quantity: 1, price: 19.99 },
      { id: 102, name: "Hair Wax", quantity: 2, price: 19.99 },
    ],
  },
  {
    id: 2,
    date: "2025-07-21",
    status: "Shipped",
    total: 39.98,
    items: [{ id: 103, name: "Shaving Kit", quantity: 1, price: 39.98 }],
  },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {mockOrders.length === 0 ? (
        <p className="text-center text-gray-600">No orders yet.</p>
      ) : (
        mockOrders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-md p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
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
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </p>
              <p className="font-bold text-lg">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
