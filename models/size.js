
const mongoose = require('mongoose');
let sizeSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	name: {
    type: String,
    required:true,
		unique:true
	},
	code: {
    type: String,
    required:true,
		unique:true
	},

  created_at: {type: Date,
	"default": Date.now
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	}]
});

let Size = module.exports = mongoose.model('Size', sizeSchema,"sizes");
