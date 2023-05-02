require("dotenv").config();
const router = require("express").Router();
const md = require("../auth/authMiddleware");
const db = require("../../data/dbconfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "shh";

router.post(
  "/login",
  md.loginCheckPayload,
  md.checkExistingUserId,
  async (req, res, next) => {
    const searchedUser = await db("users as u")
      .leftJoin("roles as r", "u.roleId", "r.roleId")
      .select("u.*", "r.*")
      .where("userId", req.body.userId)
      .first();

    const sendUserData = {
      username: searchedUser.username,
      rolename: searchedUser.role,
      photo: searchedUser.photo,
      typeformToken: searchedUser.typeformToken,
      pipedriveToken: searchedUser.pipedriveToken,
    };

    const passwordCheck = bcrypt.compareSync(
      req.body.password,
      searchedUser.password
    );

    if (passwordCheck) {
      let jeton = generateToken(searchedUser);
      console.log(jeton);
      res.status(200).json({
        message: `${searchedUser.username} welcome`,
        token: jeton,
        currentUser: sendUserData,
      });
    } else {
      next({ status: 402, message: `invalid entry` });
    }
  }
);

function generateToken(user) {
  let payload = {
    subject: user.userId,
    username: user.username,
    rolename: user.role,
    email: user.email,
    typeformToken: user.typeformToken,
  };

  let option = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, option);
}

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});
module.exports = router;
