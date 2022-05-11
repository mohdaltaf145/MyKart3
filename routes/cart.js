const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//using express router
const router = require("express").Router();

//CREATE/ADD cart to db
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE user cart
//put because we are updating
//verifyTokenAndAuthorization because only user can change his cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //update user
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        //set new info to user
        $set: req.body, //taken everything from req.body and set again
      },
      { new: true }
    );

    //set updated user
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE user cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...(from db)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
      //findOne bcoz every user has only one cart
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
// verifyTokenAndAdmin bcoz only admin can see all cart
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }catch(err) {
        res.status(500).json(err)
    }
})

//export router
module.exports = router;
