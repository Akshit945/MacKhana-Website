const Order = require("../models/orderModel");

// Get order details by razorpay_order_id
exports.getOrderDetails = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Find the order by Razorpay order ID
    const order = await Order.findOne({ razorpay_order_id: orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }

    // Exclude sensitive fields like razorpay_signature and razorpay_payment_id
    const { razorpay_signature, razorpay_payment_id, ...filteredOrder } = order.toObject();

    // Return the filtered order details as JSON
    res.status(200).json(filteredOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the order." });
  }
};
