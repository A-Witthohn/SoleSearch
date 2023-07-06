const { AuthenticationError } = require('apollo-server-express');
const { User, Shoe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('shoes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('shoes');
    },
    shoes: async () => {
      return Shoe.find();
  },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    likeShoe: async (parent, { input }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { shoes: input } },
          { new: true}
        ).populate('shoes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeShoe: async (parent, { shoeId }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { shoes: { _id: shoeId }} },
            { new: true}
          ).populate('shoes');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  },
};

module.exports = resolvers;
