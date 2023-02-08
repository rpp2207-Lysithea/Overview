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
      if(!product[0].features.length) {
        var findProduct = async() => {
          await Feature.find({product_id: productId})
          .then(feature => {
            var addFeature = async() => {
              await Product.updateOne({id: productId}, {features: feature});
              await Product.find({id: productId})
              .then(product => {
                res.status(200).send(product);
              })
              .catch(err => {
                res.status(500).send(err);
              })
            }
            addFeature();

          })
          .catch(err => {
            res.status(500).send(err);
          })
        }
        findProduct();
      } else {
        res.status(200).send(product[0]);
      }
    })
    .catch(err => {
      res.send(500).send(err);
    })
  }

  productAddition();

})

app.get('/products/:id/styles', (req, res) => {
  var product_Id = req.query.product_id;

  var stylesAddition = async() => {
    await Style.find({productId: product_Id})
    .then(styles => {
      // for (var i = 0; i < styles.length; i++) {
      //   if (!style[i].skus.length){
      //     var addSkus = async(style) => {
      //       await Sku.find({styleId: style.id})
      //       .then(newSkus => {
      //         Style.updateOne({id: style.id}, {skus: newSkus});
      //       })
      //       addSkus();
      //     }
      //   }
      // }

      res.status(200).send(styles);
    })
  }

  stylesAddition();
})

app.get('/products/:id/related', (req, res) => {
  var product_Id = req.query.product_id;
  var related = async() => {
    await RelatedProducts.find({current_product_id: product_Id})
    .then(products => {
      var array = [];
      products.forEach(product => {
        array.push(product.related_product_id);
      })
      res.status(200).send(array);
    })
  }
})


app.listen(process.env.PORT, () => {
  console.log('listening on port ', process.env.PORT);
})
