const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// You can now access the JWT secret key as follows:
const jwtSecret = process.env.JWT_SECRET;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    req.body.hashedpassword = await argon2.hash(
      req.body.password,
      hashingOptions
    );

    delete req.body.password;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const verifyPassword = async (req, res, next) => {
  try {
    if (await argon2.verify(req.user.hashedpassword, req.body.password)) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const sendToken = (req, res) => {
  const token = jwt.sign({ sub: req.user.id }, jwtSecret, {
    expiresIn: "15min",
  });

  res.cookie("token", token, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true, // try false, and console.log(document.cookie) in frontend
  });

  res.send({
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
};

module.exports = { hashPassword, verifyPassword, sendToken };
