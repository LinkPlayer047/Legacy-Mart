export default async function handler(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();
  const { orderId } = req.body;
  
  res.status(200).json({ message: `Order ${orderId} cancelled` });
}
