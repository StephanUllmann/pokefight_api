const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "Pokemons",
  });
  console.log(`MongoDB connected: ${conn.connection.name}`.italic.cyan);
};

module.exports = connectDB;
