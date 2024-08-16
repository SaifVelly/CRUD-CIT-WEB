//CRUD project for cellule web CIT

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product.model'); 

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello from the API');
});


// Get all products
app.get('/api/products', async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err){
    res.status(500).json({message: err.message});
  }
});


// get a product byId
app.get('/api/product/:id', async (req, res) => {
  try{
    //get the id from teh URL
    const { id } = req.params;
    const product =  await Product.findById(id);
    res.status(200).json(product);
  }catch (err){
    res.status(500).json({message : err.message})
  }
});


// update a product informations 

app.put( '/api/product/:id', async (req,res) =>{
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    
    if(!product){
      return res.status(404).json({message: "Product not found in DB"})
    }

    const updatedProduct = await Product.findById(id);
    res.status(500).json(updatedProduct);
  }catch (err){
    res.status(500).json({message : err.message});
  }
})


// Delete a product 
app.delete('/api/product/:id', async (req, res) =>{
  try{
    const {id} = req.params;
  const product = await Product.findByIdAndDelete(id);

  if(!product){
    return res.status(404).json({message: "Product not found in DB"})
  }

  res.status(200).json({message : "Product deleted successfully"});
  
  }catch (err) {
    res.status(500).json({message : err.message});
  }
});



// Create a product
app.post('/api/products', async (req, res)=>{
  try{
    const product =  await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) { 
    res.status(500).json({message: err.message});
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

const DBA = process.env.MONGO_URI;


// Connection to MongoDB
mongoose.connect(DBA)
  .then(() => {
    console.log("DBA connected locally");
  })
  .catch((err) => {  
    console.error("DBA connection error:", err);
  });

