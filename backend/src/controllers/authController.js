const { generateToken } = require("./auth");
const db = require("./db"); // Assuming you have a database module

// Login controller
const login = async (req, res) => {
  // Check user credentials (e.g., username and password)
  const { username, password } = req.body;

  try {
    // Fetch user data from the database based on the username
    const user = await db.getUserByUsername(username);

    // Check if the user exists and the password matches
    if (user && user.password === password) {
      // Generate a JWT token
      const token = generateToken({ username });

      // Set the token as a cookie
      res.cookie("token", token, { httpOnly: true });
      res.sendStatus(200);
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500); // Internal Server Error
  }
};

// Logout controller
const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.sendStatus(200);
};

module.exports = { login, logout };
