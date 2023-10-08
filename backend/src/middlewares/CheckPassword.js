const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedpassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedpassword, req.body.password)
    .then((ok) => {
      if (ok) {
        const payload = {
          sub: req.user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1y",
        });
        res.cookie("auth_token", token, {
          secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
        });
        delete req.user.hashedpassword;
        res.status(200).json({ user: req.user });
      } else {
        res.status(401).json({ message: "Invalid credentials. Try again." });
      }
    })
    .catch((error) => {
      console.error("Error during password verification:", error);
      res.status(500).json({ message: "An internal server error occurred." });
    });
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;

    if (token == null) {
      throw new Error("Token is missing");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error("Error during token verification:", err);
    res.sendStatus(401);
  }
};

const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
};
