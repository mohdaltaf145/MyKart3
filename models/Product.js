const mongoose = require("mongoose");

//creating product schema in db
const ProductSchema = new mongoose.Schema(
  {
    //our properties
    title: { type: String, required: true, unique: true }, //unique is true because we cannot create same username
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array }, //we can put categories inside array
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
