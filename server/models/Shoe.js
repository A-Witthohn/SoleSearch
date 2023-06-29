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
  type: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },

});

const Shoe = model('Shoe', shoeSchema);

module.exports = Shoe;
