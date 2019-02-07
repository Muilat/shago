const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Size = require('../models/Size')
const Cart = require('../models/Cart')


//////cart////////////
router.get('/add', (req, res) => {


  let product_id = req.query.product_id;
  let quantity = parseInt(req.query.quantity);
  let size = req.query.size;

  let user = "1234567890";

  //lets make sure product exist
  Product.findById(product_id,(err, product)=>{
    if(!product) return res.json({status: "failed", msg:"Product not found"});
  })

  //check if the item i already in carts
  // Cart.findOne({product:product_id, size:size, user, $or:[{status:'uncomplete'}, {status:"complete"}]}, (err, cart)=>{
  Cart.findOne({product:product_id, size:size, user, status:'uncomplete'}, (err, cart)=>{
    if(cart){
      //item already exist
      return res.json({status: "failed", msg:"already exist"});
    }
    //let create new cart
    cart = new Cart({
      product : product_id,
      size, quantity, user
    });


    cart.save((err)=>{
      if(err) throw err;
      // nextApp.render(req, res, '/carts',user);
      res.json({status: "success", msg:"Cart added"});
    });
  })

})

router.get('/remove/:id', (req, res) => {
  Cart.findById(req.params.id).exec((err, cart )=>{
    if(cart){
      cart.status = "deleted";
      cart.save((err), ()=>{
        if(err) throw err;
        return res.json({success:true});

      })

    }

  })

})

///cart count
router.get('/count', (req, res) => {
  let user = "1234567890";

  Cart.countDocuments({ status:"uncomplete", user}, (err, count)=>{
      return res.json(count);
  })

})

// router.get('/:id', (req, res) => {
//   Product.findById(req.params.id).populate('sizes').exec((err, product )=>{
//     return res.json(product);
//
//   })
//
// })





module.exports = router;
