const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderNumber: { type: String, required: true },

    customer: {
      name: String,
      email: String,
      phone: String,
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalPrice: { type: Number, required: true },

    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "unpaid" },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
