const router = require("express").Router();

//importing user model
const User = require("../models/User");

//importing crypto js fot password encryption
const CryptoJS = require("crypto-js");

//import env file
const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");

//REGISTER
//post because user send his information(username, password etc)
//through body(and body is only available in post method and not get method)
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(), //encrypt password
  });

  //sending newUser to db using save method
  //this take time to get save in database that's why using asyn function
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //try catch as we are using async
  try {
    //finding user in database for login
    const user = await User.findOne({ username: req.body.username });

    //if the user doesnot exists in db
    !user && res.status(401).json("Wrong credentials!");

    //decrypt password taken from database as user.password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    //converting hashPassword to string
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    //if user password doesnot mathches when login to the
    //password he enterd when registered
    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    //after login process if everthing is ok create json web token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,  
      {expiresIn: "3d"} //after 3 days token will expire
    );

    //extract password and other info from user and only
    //send those other info and not password for security
    const { password, ...others } = user._doc;

    //if everything is fine
    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
