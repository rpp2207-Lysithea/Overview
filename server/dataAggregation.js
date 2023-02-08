const {Product} = require('../db/index.js');
const {Feature} = require('../db/index.js');
const {Style} = require('../db/index.js');
const {Sku} = require('../db/index.js');
const {RelatedProducts} = require('../db/index.js');

const getProducts = async() => {
  for (var i = 1; i <= 1000011; i++) {
  var product = await Product.aggregate().
  match({id: i}).
  exec();

  if (!product[0].features.length) {
    var features = await Feature.aggregate().
    match({product_id: i}).
    sort({id: 1}).
    exec();
  }

  if (!product[0].style)
  }
}
getProducts();