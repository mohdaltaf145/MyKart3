const mongoose = require("mongoose");

//creating user schema
const UserSchema = new mongoose.Schema(
  {
    //our properties
    username: { type: String, required: true, unique: true }, //unique is true because we cannot create same username
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
