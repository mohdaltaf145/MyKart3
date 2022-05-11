const mongoose = require("mongoose");

//creating user schema
const OrderSchema = new mongoose.Schema(
  {
    //our properties
    userId: { type: String, required: true }, //unique is true because we cannot create same username
    products: [
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: {type: String, default: "pending"},
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
