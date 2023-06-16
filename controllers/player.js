const Player = require("../schemas/Player");
const Pokemon = require("../schemas/Pokemon");

const getPlayerByNameOrCreate = async (req, res) => {
  const { playerName } = req.params;
  // console.log(req.params);
  try {
    let player = await Player.findOne({ name: playerName });
    if (!player) player = await Player.create({ name: playerName });
    const queries = player.catchedPokemons.map((pokeId) => {
      return {
        id: pokeId,
      };
    });
    const pokemons = await Pokemon.find({ $or: [...queries] });
    // console.log(pokemons);

    if (!pokemons.length) {
      res.status(200).json({ msg: `${player.catchedPokemons} not found` });
    } else {
      res.status(200).json({ success: true, data: pokemons, player });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const catchPokemon = async (req, res) => {
  const { playerName, pokeId } = req.params;
  try {
    const player = await Player.findOneAndUpdate(
      { name: playerName },
      { $addToSet: { catchedPokemons: pokeId } },
      { new: true }
    );
    const queries = player.catchedPokemons.map((pokeId) => {
      return {
        id: pokeId,
      };
    });
    const pokemons = await Pokemon.find({ $or: [...queries] });

    if (!pokemons.length) {
      res.status(200).json({ msg: `${player.catchedPokemons} not found` });
    } else {
      res.status(200).json({ success: true, data: pokemons, player });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTopPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ points: -1 }).limit(10);
    if (!players.length)
      return res.status(200).json({ msg: "There are no players yet" });
    res.status(200).json({ data: players });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateSinglePlayerScores = async (req, res) => {
  try {
    const { name, wonGames, lostGames, points } = req.body;
    if (points > 18) return res.status(418).json({ msg: "No way!" });
    if (wonGames > 1) return res.status(418).json({ msg: "No way!" });
    const player = await Player.findOneAndUpdate(
      { name: name },
      {
        $inc: {
          matches: 1,
          wonGames: wonGames,
          lostGames: lostGames,
          points: points,
        },
      },
      { new: true, upsert: true }
    );
    if (!Object.keys(player).length) {
      res.status(404).json({ msg: "I can't update this player" });
    } else {
      res.status(200).json({ data: player });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getTopPlayers,
  updateSinglePlayerScores,
  getPlayerByNameOrCreate,
  catchPokemon,
};
