const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model.js");

const auth = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: "Unauthorized"});
    }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "token not found" });
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if(!decoded){
        return res.status(401).json({
            message: "Invalid token please login again",
        })
      }
      const user = await UserModel.findById(decoded.id);
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: `Invalid token ${error}`,
      
    });
  }
};

module.exports = auth;
