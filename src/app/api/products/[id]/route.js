import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("ecommerce");
  const { id } = req.query;

  if (req.method === "GET") {
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    res.status(200).json(product);
  } else if (req.method === "PATCH") {
    const update = req.body;
    await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.status(200).json({ message: "Product updated" });
  } else if (req.method === "DELETE") {
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
