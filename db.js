const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

// connect to db
module.exports.connect = async () => {
  // const uriFake = await mongod.getUri();
  const uri =
    "mongodb+srv://mcmzrc:zrenjaninac@cluster0.zycmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // poolSize: 10,
  };

  try {
    await mongoose.connect(uri, mongooseOpts);
    console.log("mongoDB is connect");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// disconnect and close connection
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// clear the db, remove all data
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
