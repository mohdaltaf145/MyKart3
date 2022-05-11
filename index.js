// console.log("Hello")

//creating/importing express server
const express = require("express");

//using express server as app
const app = express();

//import mongoose library
const mongoose = require("mongoose");

//import env file
const dotenv = require("dotenv");
//without configuration we cannot use env file
dotenv.config();

//import user Route
const userRoute = require("./routes/user")

//import authentication route
const authRoute = require('./routes/auth')

//import product route
const productRoute = require("./routes/product")

const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe")
const cors = require("cors")



//connectiong our app to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  //if connection is successful
  .then(() => console.log("DB Connection Successfull!"))
  //if connection is unsuccessful
  .catch((err) => {
    console.log(err);
  });

// creating routes or using endpoints for REST Api
// app.get("/api/test", () => {
//   //whenever someone make get request(search localhost:5000/api/test) in this endpoint(/api/test) write test is successful
//   console.log("test is successfull");
// });

app.use(cors());
//to get json body from postman
app.use(express.json()) 

//using router we imported from routes/user
//whenever we go to /api/user our application will user userRoute
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute) //using auth route(also provide the same route in postman to test it in postman)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/carts", cartRoute)
app.use("/api/checkout", stripeRoute)

app.use(express.static(path.join(__dirname,"/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})

//to run the app we must listen to port number
app.listen(process.env.PORT || 5000, () => {
  //after running app in port 5000 do this
  console.log("Backend server is running!");
});

//connecting mongo server
