const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route to get order details by order ID
router.get("/success/:orderId", orderController.getOrderDetails);

module.exports = router;
