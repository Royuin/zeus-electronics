const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProcessorSchema = new Schema ({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required : true },
  description: { type: String, required: true },
  price: { type: Number, required : true },
  quantity: { type: Number, required: true },
})

ProcessorSchema.virtual('url').get(function() {
  return `/processors/${this._id}`;
});

module.exports = mongoose.model('Processor', ProcessorSchema);
