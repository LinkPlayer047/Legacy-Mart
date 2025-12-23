import { NextResponse } from "next/server";
import connectToDB from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import Cart from "@/models/cart";
import Order from "@/models/order";

export async function POST(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { shipping, paymentMethod } = await req.json();

    // Validate shipping
    if (
      !shipping?.name ||
      !shipping?.phone ||
      !shipping?.address ||
      !shipping?.city
    ) {
      return NextResponse.json(
        { message: "Incomplete shipping details" },
        { status: 400 }
      );
    }

    if (!["cod", "online"].includes(paymentMethod)) {
      return NextResponse.json(
        { message: "Invalid payment method" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: user._id }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return NextResponse.json({ message: "Cart empty" }, { status: 400 });
    }

    // Build order items securely
    let totalPrice = 0;
    const orderItems = cart.products.map((item) => {
      totalPrice += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await Order.create({
      user: user._id,
      customer: {
        name: shipping.name,
        email: user.email,
      },
      items: orderItems,
      shipping,
      totalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      orderStatus: "new",
    });

    // Clear cart
    cart.products = [];
    await cart.save();

    return NextResponse.json(
      {
        orderId: order._id,
        paymentMethod,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
