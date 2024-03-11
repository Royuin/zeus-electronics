const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema ({
  name: { type: String, required: true },
});


CategorySchema.virtual('url').get(function() {
  const trimmedName = this.name.trim();
  const hyphenName = trimmedName.replaceAll(' ', '-').toLowerCase();
  
  return `category/${hyphenName}/${this._id}`;
});


module.exports = mongoose.model('Category', CategorySchema);
