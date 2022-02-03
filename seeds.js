const mongoose = require("mongoose");

const Order = require('./models/order');
const Customer = require('./models/customer');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/vedx', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MONGO Connected!!")
  })
  .catch((err) => {
    console.log("MONGO Error!")
    console.log(err)
  })

const ord = [

  {
    customer: "dfmlma Klimochkin",
    country: "Sweden",
    address: "8978 Westridge Park",
    product_title: "Yellow-bellied marmot",
    product_description: "Bread - Flat Bread",
    date: "2022-12-09",
    status: "Delivered"
  },
  {
    customer: "Karita Klimochkin",
    country: "Sweden",
    address: "8978 Westridge Park",
    product_title: "Yellow-bellied marmot",
    product_description: "Bread - Flat Bread",
    date: '2022-02-02',
    status: "Delivered"
  }

]

const cus = [{
    customer: "Sumanth",
    country: "India",
    address: "2/1 Fallen bridge Park"
  },
  {
    customer: "Rajesh",
    country: "India",
    address: "231/13 kukatpally Hyderabad"
  }
]



const pro = [
  {
  productTitle: "Bandicoot, southern brown",
  productDescription: "Wine - Chardonnay Mondavi",
  },
  {
  productTitle: "dcececoot, Northern brown",
  productDescription: "hlil - werbyuy avi",
  }

]

Product.insertMany(pro)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

Order.insertMany(ord)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

Customer.insertMany(cus)
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })
