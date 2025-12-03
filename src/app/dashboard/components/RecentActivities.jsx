import React from "react";

const RecentActivities = ({ orders }) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
      <ul className="divide-y divide-gray-200">
        {orders.slice(-5).reverse().map((order) => (
          <li key={order._id} className="py-3 flex justify-between">
            <span>Order #{order._id} {order.status}</span>
            <span className="text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
