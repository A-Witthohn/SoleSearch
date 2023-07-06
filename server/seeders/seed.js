const db = require('../config/connection');
const { User, Shoe } = require('../models');
const userSeeds = require('./userSeeds.json');
const shoeSeeds = require('./shoeSeeds.json');

db.once('open', async () => {
  
    await Shoe.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    await Shoe.insertMany(shoeSeeds);
      
  console.log(shoeSeeds);
  console.log(userSeeds);
  console.log("success")
  process.exit(0);
});
