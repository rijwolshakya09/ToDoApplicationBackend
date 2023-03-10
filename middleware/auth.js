const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
// const admin = require("../Models/adminModel");

// This Is Guard For Customer...
module.exports.userGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "todouser");
    console.log(data);
    user
      .findOne({
        $and: [
          { _id: data.userId },
          {
            userType: "user",
          },
        ],
      })
      .then((udata) => {
        req.userInfo = udata;
        next();
      })
      .catch((e) => {
        res.json({ msg: "Invalid Token" });
      });
  } catch (e) {
    res.json({ msg: "Invalid Token" });
  }
};

