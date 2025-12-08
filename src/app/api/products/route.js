import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("ecommerce");

  if (req.method === "GET") {
    const products = await db.collection("products").find({}).toArray();
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const product = req.body;
    const result = await db.collection("products").insertOne(product);
    res.status(201).json(result);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
