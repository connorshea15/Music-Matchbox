const faker = require('faker');

const db = require('../config/connection');
const { Band, User } = require('../models');

db.once('open', async () => {
  await Band.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create Bands
  let createdBands = [];
  for (let i = 0; i < 100; i += 1) {
    const bandName = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdBand = await Band.create({ bandName, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { bands: createdBand._id } }
    );

    createdBands.push(createdBand);
  }

  console.log('all done!');
  process.exit(0);
});