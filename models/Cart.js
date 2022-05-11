const mongoose = require("mongoose");

//creating user schema
const CartSchema = new mongoose.Schema(
  {
    //our properties
    userId: { type: String, required: true }, //unique is true because we cannot create same username
    Products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
