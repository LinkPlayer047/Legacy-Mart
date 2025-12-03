import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number
    }
  ]
}, { timestamps: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
