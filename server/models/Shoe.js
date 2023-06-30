const { Schema, model } = require('mongoose');

const likeSchema = new Schema(
  {
    likeId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
  }
});

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
  likes: [likeSchema],
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
    id: false,
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
