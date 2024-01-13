import mongoose from 'mongoose';
const { Schema } = mongoose;

const MotherBoardSchema = new Schema ({
  name: { type: String, required: true},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

MotherBoardSchema.virtual('url').get(function() {
  return `/motherboards/${this._id}`;
})

module.exports = mongoose.model('Motherboard', MotherBoardSchema);

