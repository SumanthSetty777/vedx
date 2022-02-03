
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
  }
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
