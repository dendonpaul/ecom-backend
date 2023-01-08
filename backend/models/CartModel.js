const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        name: String,
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
