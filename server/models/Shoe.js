const { Schema, model } = require('mongoose');


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
  likes: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
  ],
  image: {
    type: String,
    required: true,
  },
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
