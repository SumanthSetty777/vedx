
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
