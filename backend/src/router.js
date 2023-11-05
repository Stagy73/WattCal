const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const deviceController = require("./controllers/DeviceController");
const catControllers = require("./controllers/CatController");
const userControllers = require("./controllers/UserController");
const supplierControllers = require("./controllers/SupplierController");
const currencyControllers = require("./controllers/CurrencyController");
const priceControllers = require("./controllers/PriceController");
/* const authControllers = require("./controllers/authController"); */

// middleware
const { CheckUserMiddleware } = require("./middlewares/CheckUserMiddleware");

const { CheckDoubleEmail } = require("./middlewares/CheckDoubleEmail");

const { verifyPassword, hashPassword } = require("./middlewares/auth");

/* const { hashPassword } = require("./middlewares/Hash"); */

// examples
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);
// devices
router.get("/devices", deviceController.browse);
router.get("/devices/:id", deviceController.read);
router.get("/devices/:ean", deviceController.readean);
router.get("/devices/:brand", deviceController.searchByBrand);

router.put("/devices/:id", deviceController.edit);
router.post("/devices", deviceController.add);
router.delete("/devices/:id", deviceController.destroy);
// categories
router.get("/cats", catControllers.browse);
router.get("/cats/:id", catControllers.read);
router.put("/cats/:id", catControllers.edit);
router.post("/cats", catControllers.add);
router.delete("/cats/:id", catControllers.destroy);
// users
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post(
  "/users",
  CheckUserMiddleware,
  CheckDoubleEmail,
  hashPassword,
  userControllers.add
);

const { sendToken } = require("./middlewares/auth");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
/* router.post("/users", hashPassword, userControllers.add); */
router.delete("/users/:id", userControllers.destroy);

router.post(
  "/login",
  (req, res, next) => {
    userControllers.getUserByUsernameWithPasswordAndPassToNext(req, res, next);
  },
  (req, res, next) => {
    verifyPassword(req, res, next);
  },
  (req, res) => {
    sendToken(req, res);
  }
);

router.get("/show-token", (req, res) => {
  console.info(req.cookies);

  res.sendStatus(200);
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});
router.delete("/users/:id", userControllers.destroy);

// supplier
router.get("/suppliers", supplierControllers.browse);
router.get("/suppliers/:id", supplierControllers.read);
router.put("/suppliers/:id", supplierControllers.edit);
router.post("/suppliers", supplierControllers.add);
router.delete("/suppliers/:id", supplierControllers.destroy);

// currency
router.get("/currencies", currencyControllers.browse);
router.get("/currencies/:id", currencyControllers.read);
router.put("/currencies/:id", currencyControllers.edit);
router.post("/currencies", currencyControllers.add);
router.delete("/currencies/:id", currencyControllers.destroy);

// price

router.get("/prices", priceControllers.browse);
router.get("/prices/:id", priceControllers.read);
router.put("/prices/:id", priceControllers.edit);
router.post("/prices", priceControllers.add);
router.delete("/prices/:id", priceControllers.destroy);

module.exports = router;
