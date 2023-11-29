const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Auth");
  // console.log(token);
  if (token == "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed 1..");
  } else {
    let decoded;

    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed 2..");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed 3..");
    }

    if (decoded?.user?.role !== 'user') {
      req.isAuth = false;
      return res.status(401).send("Authorization failed 4..");
    }

    req.isAuth = true;
    req.user = decoded.user;
    req.userData = decoded;
    return next();
  }
};