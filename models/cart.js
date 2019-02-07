
const mongoose = require('mongoose').set('debug',true);
let cartSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	user: {
    type: String,
    required:true,
    "default":"1234567890"
	},
  product: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
    required:true
	},
  quantity: {
    type: Number,
    required:true
	},
  status: {
    type: String,
    required:true,
    "default":"uncomplete"
	},
  created_at: {type: Date,
	"default": Date.now
	},
	size: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Size'
	}
});

let Cart = module.exports = mongoose.model('Cart', cartSchema,"carts");
