const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemorySchema = new Schema ({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Memory', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

MemorySchema.virtual('url').get(function() {
  return `product/${this._id}`;
});

module.exports = mongoose.model('Memory', MemorySchema);
