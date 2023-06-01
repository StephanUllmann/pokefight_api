const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  matches: { type: Number, default: 0 },
  wonGames: { type: Number, default: 0 },
  lostGames: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  catchedPokemons: { type: [Number], default: [1, 4, 7] },
});

module.exports = mongoose.model("players", playerSchema);
