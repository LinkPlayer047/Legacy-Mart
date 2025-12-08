// import { getUserFromToken } from "@/lib/auth";
// import connectToDB from "@/lib/db";
// import Cart from "@/models/cart";

// export async function POST(req) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

//   const { productId, name, price, category } = await req.json();

//   try {
//     const user = await getUserFromToken(token);
//     if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

//     await connectToDB();

//     let cart = await Cart.findOne({ userId: user._id });
//     if (!cart) cart = new Cart({ userId: user._id, items: [] });

//     const existingItem = cart.items.find(item => item.productId === productId);
//     if (existingItem) existingItem.quantity += 1;
//     else cart.items.push({ productId, name, price, quantity: 1, category });

//     await cart.save();
//     return new Response(JSON.stringify({ items: cart.items }), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to add to cart" }), { status: 500 });
//   }
// }
