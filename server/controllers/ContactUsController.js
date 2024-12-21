const ContactUs = require("../models/ContactUsModel");
const nodemailer = require("nodemailer");

// Handle form submission
exports.submitContactForm = async (req, res) => {
  const { name, email, phone, orderId, message } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Create a new ContactUs document
    const contactForm = new ContactUs({
      name,
      email,
      phone,
      orderId, // This field is optional
      message,
    });

    // Save the document to the database
    await contactForm.save();
    sendEmail(name,
      email,
      phone,
      orderId, // This field is optional
      message,
    )
    res.status(201).json({ message: "Your message has been submitted successfully!" });
  } catch (error) {
    console.error("Error while saving contact form:", error);
    res.status(500).json({ error: "An error occurred while submitting your message." });
  }
};

function sendEmail(name,
  email,
  phone,
  orderId="",  
  message
) {
  return new Promise((resolve, reject) => {
    // Simple email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      reject(new Error(`Invalid email format: ${email}`)); // Reject if email is invalid
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Contact Us Email",
      text: ` 
      email:${email}
      phone:${phone}
      orderId:${orderId}  
      message:${message}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new Error(`Failed to send email to ${email}: ${error.message}`)); // Reject on error
      } else {
        resolve(info); // Resolve if email is sent successfully
      }
    });
  });
}