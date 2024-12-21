const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  status: {
    type: Number,
    enum: [0, 1, 2, 3, 4], // 0: Pending, 1: Paid, 2: Shipped, 3: Delivered, 4: Cancelled
    default: 0,            // Default status is 'Pending'
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
