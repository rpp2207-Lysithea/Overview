var express = require('express');
var fs = require('fs');
var path = require('path');
var fastCsv = require('fast-csv');
require('dotenv').config();
const {Product} = require('../db/index.js');
const {Feature} = require('../db/index.js');
const {Style} = require('../db/index.js');
const {Sku} = require('../db/index.js');
const {RelatedProducts} = require('../db/index.js');
const {Cart} = require('../db/index.js');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', (req,res) => {
  res.status(200).send('hello');
})

app.get('/products', (req, res) => {

    Product.find()
    .then(products => {
      res.status(200).send(products);
    })
})

app.get('/products/:id', (req, res) => {
  var productId = req.query.product_id;
  var  productAddition = async() => {
    await Product.find({id: productId})
    .then(product => {
        //
      res.status(200).send(product[0]);
    })
    .catch(err => {
      // res.send(500).send(err);
      console.log(err);
    })
  }

  productAddition();

})

app.get('/products/:id/styles', (req, res) => {
  var product_Id = req.query.product_id;

  var stylesAddition = async() => {
    await Product.find({id: product_Id})
    .then(product => {
      res.status(200).send(product[0].styles);
    })

  }

  stylesAddition();
})

app.get('/products/:id/related', (req, res) => {
  var product_Id = req.query.product_id;
  var relatedArray = [];
  var relatedProducts = async() => {
    await Product.find({id: product_Id})
    .then(product => {
      product[0].related.forEach(related => {
        relatedArray.push(related.related_product_id);
      })
    })

    res.status(200).send(relatedArray);
  }
  relatedProducts();
})

app.get('/cart', (req, res) => {
  var viewCart = async() => {
    await Cart.find()
    .then(cart => {
      res.status(200).send(cart);
    })
  }
  viewCart();
})

app.post('/cart', (req, res) => {
  var addCart = async() => {
    var newList = new Cart({
      sku_id: req.body.sku_id,
      count: req.body.count
    })
    // const counter = await Cart.estimatedDocumentCount();
    // newList._id = counter + 1;
    await newList.save();
    res.status(201).send('Created');
  }
  addCart();
})

app.listen(process.env.PORT, () => {
  console.log('listening on port ', process.env.PORT);
})
