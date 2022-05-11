const jwt = require("jsonwebtoken");

//this will verify access token(created when user logged in)
//to provide crud operation to that user
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    //authHeader has bearer and token we just want token so split it
    const token = authHeader.split(" ")[1];
    //if we have access token(created when login) then verify it
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");

      //if everything is okay then assign user to request
      // console.log(user); (means a user like this has logged in previously)
      req.user = user; //we have req.body, req.headers we here created new request
      next(); //will leave this function
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    //req.user is coming from verifyToken
    //if this cases are true we can update the user
    if (req.user.id === req.params.id || req.user.isAdmin) {
      //if this cases are true continue your root function
      next();
    } else {
      res.status(403).json("You are not allowed to do that!!");
    }
  });
};

//for order and product only Admin can add any product
const verifyTokenAndAdmin = (req, res, next) => {
  //check verifyToken then check if that user is Admin or not
  verifyToken(req, res, () => {
    //req.user is coming from verifyToken
    if (req.user.isAdmin) {
      //if the user is Admin continue your root function
      next();
    } else {
      res.status(403).json("You are not allowed to do that!!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
