const { Schema, model } = require('mongoose');

const User = require('./User');

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const shoeSchema = new Schema({
  shoeName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  shoeLink: {
    type: String,
    required: true,
  },
  likes: [likeSchema],
},
  {
    toJSON: {
      virtuals: true,
      getters: true,
  },
}
);

//Virtual property to measure like total
shoeSchema
  .virtual('likeCount')
  // Getter
  .get(function () {
    return this.likes.length;
  });

const Shoe = model('Shoe', shoeSchema);

module.exports = Shoe;
