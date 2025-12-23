// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     orderNumber: String,

//     customer: {
//       name: String,
//       email: String,
//       phone: String,
//     },

//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//       },
//     ],

//     totalPrice: Number,

//     paymentMethod: { type: String, default: "COD" },
//     paymentStatus: { type: String, default: "unpaid" },

//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export const Order =
//   mongoose.models.Order || mongoose.model("Order", OrderSchema);


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      name: String,
      email: String,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number, // product price at time of order
          required: true,
        },
      },
    ],

    shipping: {
      name: String,
      phone: String,
      address: String,
      city: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentId: {
      type: String, // Stripe / JazzCash / Easypaisa txn id
    },

    paidAt: {
      type: Date,
    },

    orderStatus: {
      type: String,
      enum: ["new", "confirmed", "shipped", "delivered", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

// auto order number
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`;
  }
  next();
});

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
