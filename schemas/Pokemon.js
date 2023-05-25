const mongoose = require("mongoose");

const pokeName = new mongoose.Schema({
  english: String,
  japanese: String,
  chinese: String,
  french: String,
});

const pokeBase = new mongoose.Schema({
  HP: Number,
  Attack: Number,
  Defense: Number,
  "Sp. Attack": Number,
  "Sp. Defense": Number,
  Speed: Number,
});

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: pokeName,
  },
  type: [String],
  base: {
    type: pokeBase,
  },
  sprite: String,
});

module.exports = mongoose.model("pokemons", pokemonSchema);
