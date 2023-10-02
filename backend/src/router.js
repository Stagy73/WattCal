const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const deviceControllers = require("./controllers/DeviceController");
const catControllers = require("./controllers/CatController");
const userControllers = require("./controllers/UserController");
const supplierControllers = require("./controllers/SupplierController");
const currencyControllers = require("./controllers/CurrencyController");

// examples
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);
// devices
router.get("/devices", deviceControllers.browse);
router.get("/devices/:id", deviceControllers.read);
router.get("/devices/:ean", deviceControllers.readEan);
router.put("/devices/:id", deviceControllers.edit);
router.post("/devices", deviceControllers.add);
router.delete("/devices/:id", deviceControllers.destroy);
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
router.post("/users", userControllers.add);
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

module.exports = router;
