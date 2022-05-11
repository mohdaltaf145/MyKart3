const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//using express router
const router = require("express").Router();

//endpoint
//req => what we are getting from user(user can provide any input, username ,any emails etc)
//res => sending response to user
//lh:5000/api/user/usertest(whenver we go to this we will get user test is successfull)
// router.get("/usertest", (req, res) => {
//     //send something to user
//     res.send("user test is successfull")
// })

// //post methods (to check post methods we will use postman)
// router.post("/userposttest", (req, res) => {
//     const username = req.body.username //getting from postman
//     res.send("your username is " + username)
// })

//UPDATE
//put because we are updating
//verifyTokenAndAuthorization will verify user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //before updating check for password
  //because user can change it password again encrypt the password
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(); //encrypt password
  }

  //update user
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        //set new info to user
        $set: req.body, //taken everything from req.body and set again
      },
      { new: true }
    );

    //set updated user
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
//verifyTokenAndAuthorization will verify user(using the token get from logged in)
//because only that user can delete himself
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    //this will find the user with given params(localhost:5000/api/users/id)
    //and delete it from db
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...(from db)");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
//verifyTokenAndAdmin because only Admin can get any user not clients using their id(req.params.id)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    //this will find the user with given params(localhost:5000/api/users/id)
    //and get it from db
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
//verifyTokenAndAdmin because only Admin can get any user not clients using their id(req.params.id)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new; //this will set query like(localhost:5000/api/users?new=true)
  try {
    //find will find all users
    //if the request contains query then only show limit new user from
    //db else show all users
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS(will use this stats in Admin dashboard)
//this will return us the total no of users per month etc..
//using verifyTokenAndAdmin again caz only admin can do this
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date(); //get current date
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); //will get last year from current date

  try {
    //group items
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, //gte is greater than equal
      {
        $project: {
          month: { $month: "$createdAt" }, //assign the user createdAt month to month
        },
      },
      {
        $group: {
          _id: "$month", //month when user get created
          total: { $sum: 1 }, //sum every register user(means if their are two registered user total will be 2)
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export router
module.exports = router;
