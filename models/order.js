const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  
  customer: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  product_title: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['prepared', 'Delivered', 'Completed']
  }

})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
