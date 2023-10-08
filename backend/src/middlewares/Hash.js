const argon2 = require("argon2");

// Middleware to hash the user's password before saving
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Replace the plain text password with the hashed password
    req.body.password = hashedPassword;

    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { hashPassword };
