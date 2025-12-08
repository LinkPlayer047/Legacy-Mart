// import { getUserFromToken } from "@/lib/auth";
// import connectToDB from "@/lib/db";
// import Cart from "@/models/cart";

// export async function POST(req) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   const { productId } = await req.json();

//   if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

//   try {
//     const user = await getUserFromToken(token);
//     if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

//     await connectToDB();

//     const cart = await Cart.findOne({ userId: user._id });
//     if (!cart) return new Response(JSON.stringify({ items: [] }), { status: 200 });

//     cart.items = cart.items.filter(item => item.productId !== productId);
//     await cart.save();

//     return new Response(JSON.stringify({ items: cart.items }), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to remove item" }), { status: 500 });
//   }
// }
