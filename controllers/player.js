const Player = require("../schemas/Player");

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

module.exports = { getTopPlayers, updateSinglePlayerScores };
