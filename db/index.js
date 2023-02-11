var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/overview');

var productSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      feature: String,
      value: String
    }
  ],
  styles: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      "default?": Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ],
      skus: [
        {
          id: Number,
          quantity: Number,
          size: String
        }
      ]
    }
  ],
  related: [{
    id: Number,
    current_product_id: Number,
    related_product_id: Number
  }]
});

var featureSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String
})

var styleSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Boolean,
  skus:[
    {
      id: Number,
      quantity: Number,
      size: String
    }
  ],
  photos: [
    {
      thumbnail_url: String,
      url: String
    }
  ]
})

var skuSchema = mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
})

var relatedProductSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  related_product_id: Number
})

var photoSchema = mongoose.Schema({
  id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String
})

var cartSchema = mongoose.Schema({
  sku_id: Number,
  count: Number
})
let Product = mongoose.model('Product', productSchema);

let Feature = mongoose.model('Feature', featureSchema);

let Style = mongoose.model('Style', styleSchema);

let Sku = mongoose.model('Sku', skuSchema);

let RelatedProducts = mongoose.model('RelatedProduct', relatedProductSchema);

let Photo = mongoose.model('Photo', photoSchema);

let Cart = mongoose.model('Cart', cartSchema);

let saveCart = async(cart) => {
  var newCart = new Cart({
    sku_id: cart.sku_id,
    count: cart.sku_id
  });

  await newCart.save()
}

module.exports.Product = Product;
module.exports.Feature = Feature;
module.exports.Style = Style;
module.exports.Sku = Sku;
module.exports.RelatedProducts = RelatedProducts;
module.exports.Photo = Photo;
module.exports.Cart = Cart;
module.exports.saveCart = saveCart;


