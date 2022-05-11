const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//using express router
const router = require("express").Router();

//CREATE/ADD product to db
//verifyTokenAndAdmin because only admin can create any product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCT
//put because we are updating
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  //update user
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        //set new info to user
        $set: req.body, //taken everything from req.body and set again
      },
      { new: true }
    );

    //set updated user
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    //this will find the user with given params(localhost:5000/api/users/id)
    //and delete it from db
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...(from db)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
//removing verifyTokenAndAdmin because everyone can get product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCT
//verifyTokenAndAdmin because only Admin can get any user not clients using their id(req.params.id)
router.get("/", async (req, res) => {
  //we can fetch all products by createdAt date and just five(any number using limit) of them
  //and by their category
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      //fetch first 5 products
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      //if the query category is present in the db then fetch it
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      //else if there is not any query fetch all product
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export router
module.exports = router;
