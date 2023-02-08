# Overview

## Mongo DB Structure

### Product Info
{
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
  ]
}

### Product Styles
{
  product_id: String,
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      default?: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ],
      skus: {
        (sku_id): {
          quantity: Number,
          size: String
        }
      }
    }
  ]
}