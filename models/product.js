
const mongoose = require('mongoose').set('debug',true);
let productSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	name: {
    type: String,
    required:true
	},
	price: {
    type: Number,
    required:true
	},
  description:{
      type: String,
      required:true
  },
  image:{
      type: String,
      required:true
  },

  created_at: {type: Date,
	"default": Date.now
	},
	sizes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Size'
	}]
});

let Product = module.exports = mongoose.model('Product', productSchema,"products");
