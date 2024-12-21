const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: [String], required: true }, // Change to an array of strings
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);

