const { Schema, model } = require('mongoose');


const shoeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Shoe = model('Shoe', shoeSchema);

module.exports = Shoe;
