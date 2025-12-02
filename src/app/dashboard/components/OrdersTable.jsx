const OrdersTable = ({ orders }) => (
  <table className="w-full text-left border-collapse">
    <thead>
      <tr>
        <th className="border p-2">Order ID</th>
        <th className="border p-2">Items</th>
        <th className="border p-2">Total</th>
        <th className="border p-2">Status</th>
        <th className="border p-2">Date</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => (
        <tr key={order._id}>
          <td className="border p-2">{order._id}</td>
          <td className="border p-2">{order.items.length}</td>
          <td className="border p-2">₨ {order.totalPrice}</td>
          <td className="border p-2">{order.status}</td>
          <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default OrdersTable;
