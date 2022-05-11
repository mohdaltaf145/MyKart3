const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//using express router
const router = require("express").Router();

//CREATE/ADD order to db
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE order
//put because we are updating
// verifyTokenAndAdmin bcoz only admin can do this
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  //update user
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        //set new info to user
        $set: req.body, //taken everything from req.body and set again
      },
      { new: true }
    );

    //set updated user
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...(from db)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET user orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    //findOne bcoz every user has only one cart
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL orders
// verifyTokenAndAdmin bcoz only admin can see all cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.id;
  const date = new Date(); //get current date (if this is 1 sep)
  //this will give 1 august
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); //will get last month from current date
  //this will give 1 july
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); //will get last month from current date

  try {
    //group items
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      }, //gte is greater than equal
      {
        $project: {
          month: { $month: "$createdAt" }, //assign the user createdAt month to month
          sales: "$amount", //assign the order amount to sales
        },
      },
      {
        $group: {
          _id: "$month", //month when user get created
          total: { $sum: "$sales" }, //each month income
        },
      },
    ]);
    res.status(200).json(income);
    console.log(income)
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   console.log("what the heck")
//   const productId = req.params.pid;
//   console.log(productId)
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: previousMonth },
//           ...(productId && {
//             products: { $elemMatch: { productId } },
//           }),
//         },
//       },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//     console.log(income)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//export router
module.exports = router;
