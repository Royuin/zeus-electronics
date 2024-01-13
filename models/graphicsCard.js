import mongoose from 'mongoose';  
const { Schema } = mongoose;

const GraphicsCardSchema = new Schema ({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Graphics Card', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

GraphicsCardSchema.virtual('url').get(function() {
  return `/graphics-cards/${this._id}`;
  });

module.exports = mongoose.model('Graphics Card', GraphicsCardSchema);
