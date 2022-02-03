console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}



const express = require("express");
const path = require('path');
const orderData = require('./data.json');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(upload.array());

const Order = require('./models/order');
const Customer = require('./models/customer');
const Product = require('./models/product');


app.use(express.static('public')) //to use css files and js files
app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, '/views'));

const dbUrl = process.env.DB_URL
//'mongodb://localhost:27017/vedx
mongoose.connect(dbUrl || 'mongodb://localhost:27017/vedx', {
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

app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.get("/customers", async (req, res) => {
  const customers = await Customer.find({});
  // console.log(customers);
  res.render("customers.ejs", {
    customers
  });
})

app.get("/customerNew", async (req, res) =>{
    res.render("customerNew.ejs")
})

app.post("/customerNew", async (req, res) =>{
    // console.log(req.body);
    const newCustomer = new Customer(req.body);
    await newCustomer.save()
    res.redirect(`/customers/${newCustomer._id}`);
})



app.get("/customers/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const customerDetails = await Customer.findById(id)
  res.render("customerShow", {
    customerDetails
  });
})

app.get("/customer/:id/newOrder", async (req, res) => {
  const {
    id
  } = req.params;
  const customerDetails = await Customer.findById(id);
  const products = await Product.find({});
  res.render("customerProduct", {
    customerDetails,
    products
  });
})

app.get("/customer/:id1/product/:id2", async (req, res) => {
  const {
    id1,
    id2
  } = req.params;
  // console.log(id2);
  const productDetails = await Product.findById(id2);
  res.render("productShow", {
    id1,
    productDetails
  });
})

app.get("/customer/:id1/:id2/order", async (req, res) => {
  const {
    id1,
    id2
  } = req.params;
  // console.log(id1, id2);
  const customerDetails = await Customer.findById(id1);
  const productDetails = await Product.findById(id2);

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let d = year + "-" + month + "-" + date;

  res.render("orderDetails", {
    customerDetails,
    productDetails,
    d
  });
})



app.get("/products", async (req, res) =>{
  const products = await Product.find({});
  res.render("products.ejs", {products});
})

app.get("/product/:id", async (req, res) =>{
  const {id} = req.params;
  const productDetails = await Product.findById(id);
  res.render("productShow1.ejs", {productDetails})
})

app.get("/productNew", async (req, res) =>{
    res.render("productNew.ejs")
})

app.post("/productNew", async (req, res) =>{
    // console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`products`);
})

app.get('/orders', async (req, res) => {
  const orders = await Order.find({});
  //const order = await Order.deleteMany();

  //res.send("kk");
  res.render("orders.ejs", {
    data: orders
  });
})

app.get('/order/customer', async(req, res)=>{
  const customers = await Customer.find({});
  // console.log(customers);
  res.render("customers1.ejs", {
    customers
  });
})

app.get('/orders/:id/edit', async (req, res)=>{
  const {id} = req.params;
  // console.log(id, "llllllllll")
  const order = await Order.findById(id);

  res.render('orderEdit.ejs', {order})
})

app.post('/orderNew', async(req, res)=>{
  // console.log(req.body);
  const orderNew = new Order(req.body)
  await orderNew.save();
  const orders = await Order.find({});
  res.render("orders.ejs", {data: orders})
})

app.put('/order/:id', async (req, res)=>{
  // console.log(req.body);
  const {id} = req.params;
  await Order.findByIdAndUpdate(id, req.body);
  const orders = await Order.find({});
  res.render("orders.ejs", {data: orders});
})


app.listen("3000", () => {
  console.log("listening on port 3000");
})
