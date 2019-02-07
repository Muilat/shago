const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Size = require('../models/Size')

router.get('/', (req, res) => {


  let reference = req.query.reference;
  let min_price = parseInt(req.query.min_price);
  let max_price = parseInt(req.query.max_price);
  let sizes = req.query.sizes;
    // if(sizes.length = 0)
    // sizes = await
  /*
  let sizes = [
    {name:"small",code:"S"},
    {name:"Medium",code:"M"},
    {name:"Large",code:"L"},
    {name:"Extra Large",code:"XL"},
    {name:"X-Extra Large",code:"XXL"}
  ];
  sizes.forEach(size=>{
    s = new Size({
      name:size.name,
      code:size.code
    })
    s.save();

  });
  */
    Product.find({
        price: { $gte: min_price, $lte:max_price },
        sizes: { $in: sizes},
      }).sort(reference).exec( (err, products) => {
      if(!products) products = [];
      for (var i = 0; i < products.length; i++) {
        if (i%5 == 1) {
          products[i].sizes.addToSet('5c44b56f23649b42b8163595');
          products[i].sizes.addToSet('5c44b56f23649b42b8163596');
          products[i].sizes.addToSet('5c44b56f23649b42b8163597');
          products[i].sizes.addToSet('5c44b56f23649b42b8163598');
        }
        if (i%5 == 2) {
          products[i].sizes.addToSet('5c44b56f23649b42b8163595');
          products[i].sizes.addToSet('5c44b56f23649b42b8163597');
          products[i].sizes.addToSet('5c44b56f23649b42b8163598');
        }
        if (i%5 == 3) {
          products[i].sizes.addToSet('5c44b56f23649b42b8163596');
          products[i].sizes.addToSet('5c44b56f23649b42b8163598');
        }
        if (i%5 == 4) {
          products[i].sizes.addToSet('5c44b56f23649b42b8163595');
        }
        if (i%5 == 0) {
          products[i].sizes.addToSet('5c44b56f23649b42b8163595');
          products[i].sizes.addToSet('5c44b56f23649b42b8163599');
        }

          // products[i].save();

      }
      res.json(products)
    })
});



//Sizes
  router.get('/sizes', (req, res) => {

      Size.find({}).sort('created_at').exec( (err, sizes) => {
        if(!sizes) sizes = [];
        res.json(sizes)
      })
  });



router.get('/:id', (req, res) => {
  Product.findById(req.params.id).populate('sizes').exec((err, product )=>{
    return res.json(product);

  })

})



module.exports = router;
