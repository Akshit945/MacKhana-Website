const express = require("express");
const router = express.Router();
const ContactUsController = require("../controllers/ContactUsController");

// Route to handle contact form submission
router.post("/", ContactUsController.submitContactForm);

module.exports = router;
