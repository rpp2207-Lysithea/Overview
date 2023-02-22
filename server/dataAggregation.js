const {Product} = require('../db/index.js');
const {Feature} = require('../db/index.js');
const {Style} = require('../db/index.js');
const {Sku} = require('../db/index.js');
const {RelatedProducts} = require('../db/index.js');
const {Photo} = require('../db/index.js');
const Promise = require('bluebird');

const getProducts = async() => {
  // iterate through each product in the database
  for (var i = 5600; i <= 1000011; i++) {
    // aggregate the current product
  // var product = await Product.aggregate().
  // match({id: i}).
  // exec();

  // console.log(product[0].features.length);
  // if the current product doesn't have an features stored
  // if (!product[0].features.length) {
  //   // aggregate the features related to the current product
    var featuresAdded = await Feature.aggregate().
    match({product_id: i}).
    exec();

  //   // add the current features to the product
    await Product.updateOne({id: i}, {features: featuresAdded});
  // }


    var stylesAdded = await Style.aggregate().
    match({productId: i}).
    sort({id: 1}).
    exec();

    // console.log(stylesAdded);

    // for (var j = 0; j < stylesAdded.length; j++) {
    //   const currentStyle = stylesAdded[j];
    //   var skusAdded = await Sku.aggregate().
    //   match({styleId: currentStyle.id}).
    //   sort({id: 1}).
    //   exec();
    //   // console.log(skusAdded);

    //   var photosAdded = await Photo.aggregate().
    //   match({styleId: currentStyle.id}).
    //   sort({id: 1}).
    //   project({url: 1, thumbnail_url: 1}).
    //   exec();
    //   console.log(photosAdded);

    //   await Style.updateOne({id: currentStyle.id}, {skus: skusAdded});
    //   await Style.updateOne({id: currentStyle.id}, {photos: photosAdded});
      // Style.bulkWrite([
      //   {
      //     updateOne: {
      //       filter: {id: currentStyle.id},
      //       update: {skus: skusAdded}
      //     }
      //   },

      //   {
      //     updateOne: {
      //       filter: {id: currentStyle.id},
      //       update: {photos: photosAdded}
      //     }
      //   }
      // ]);
    // }

    await Product.updateOne({id: i}, {styles: stylesAdded});

    var relatedAdded = await RelatedProducts.aggregate().
    match({current_product_id: i}).
    exec();

    console.log(relatedAdded);
    await Product.updateOne({id: i}, {related: relatedAdded});
    // console.log(product);
  }
}
getProducts();