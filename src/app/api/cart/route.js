import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import connectToDB from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";

/* ================= GET CART ================= */
export async function GET(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const cart = await Cart.findOne({ user: user._id })
      .populate("products.product");

    return NextResponse.json(
      { items: cart?.products || [] },
      { status: 200 }
    );
  } catch (err) {
    console.error("Cart GET error:", err);
    return NextResponse.json(
      { items: [] },
      { status: 200 } // ❗ frontend kabhi crash nahi hoga
    );
  }
}

/* ================= ADD TO CART ================= */
export async function POST(req) {
  try {
    await connectToDB();
    const { productId, quantity } = await req.json();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let cart = await Cart.findOne({ user: user._id });
    if (!cart) cart = await Cart.create({ user: user._id, products: [] });

    const existing = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existing) existing.quantity += quantity;
    else cart.products.push({ product: productId, quantity });

    await cart.save();
    return NextResponse.json({ message: "Added to cart" }, { status: 200 });
  } catch (err) {
    console.error("Cart POST error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ================= UPDATE QUANTITY ================= */
export async function PUT(req) {
  try {
    await connectToDB();
    const { productId, delta } = await req.json();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    const product = cart.products.find(
      (p) => p.product.toString() === productId
    );
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    product.quantity += delta;
    if (product.quantity <= 0) {
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );
    }

    await cart.save();
    return NextResponse.json({ message: "Quantity updated" }, { status: 200 });
  } catch (err) {
    console.error("Cart PUT error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ================= DELETE ITEM ================= */
export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();

    return NextResponse.json({ message: "Product removed" }, { status: 200 });
  } catch (err) {
    console.error("Cart DELETE error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
