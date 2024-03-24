const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema ({
  name: { type: String, required: true },
  category: {type: Schema.ObjectId, ref: 'Category', required : true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

ProductSchema.virtual('url').get(function() {
  return `/catalog/product/${this._id}`;
  });

module.exports = mongoose.model('Product', ProductSchema);
