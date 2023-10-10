const models = require("../models");

const getUser = (req, res, next) => {
  console.log(req.body);
  models.user
    .findByEmail(req.body.email)
    .then(([rows]) => {
      const userInDatabase = rows[0];
      if (userInDatabase == null) {
        console.error("User not found");
        res.sendStatus(422);
      } else {
        req.user = userInDatabase;
        req.user.role = "user";
        next();
      }
    })
    .catch((error) => {
      console.error("Error during user retrieval:", error);
      res.sendStatus(500);
    });
};

module.exports = {
  getUser,
};
