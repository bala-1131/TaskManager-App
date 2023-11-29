const { verify } = require("jsonwebtoken");

/**
 * Fetch token from the request header from auth-user
 * @param {*} req request from the auth-user
 * @param {*} res response from the auth-user
 * @param {*} next call the next function in the route
 * @returns calling the next function
 */

module.exports = (req, res, next) => {
  const token = req.get("Auth");
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

    if (decoded?.user?.role !== "user") {
      req.isAuth = false;
      return res.status(401).send("Authorization failed 4..");
    }

    req.isAuth = true;
    req.user = decoded.user;
    req.userData = decoded;
    return next();
  }
};
