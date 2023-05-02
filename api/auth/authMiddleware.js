const db = require("../../data/dbconfig");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "shh";

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        next({ status: 402, message: "Invalid token" });
      } else {
        req.userData = decodedJwt;
        next();
      }
    });
  } else {
    next({ status: 404, message: "Token not found" });
  }
}

function loginCheckPayload(req, res, next) {
  const keyArray = ["userId", "password"];
  keyArray.forEach((key) => {
    !req.body[key] &&
      next({ status: 404, message: `${key} property is missing` });
  });
  next();
}

async function checkExistingUserId(req, res, next) { // UserId yerine email gelecek 
  const searchedUser = await db("users as u")
    .leftJoin("roles as r", "u.roleId", "r.roleId")
    .select("u.*", "r.*")
    .where("userId", req.body.userId)
    .first();

  searchedUser
    ? next()
    : next({ status: 404, message: `ID No:${req.body.userId} is not found` });
}

module.exports = {
  loginCheckPayload,
  checkExistingUserId,
  restricted,
};
