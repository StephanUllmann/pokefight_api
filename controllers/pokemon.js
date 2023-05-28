const Pokemon = require("../schemas/Pokemon");

const NUM_POKES_PER_PAGE = 12;

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    if (!pokemons.length) {
      res.status(200).json({ msg: "No pokemons in the DB" });
    } else {
      res.status(200).json({ success: true, data: pokemons });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

const getOnePokemon = async (req, res) => {
  try {
    const { idOrName } = req.params;
    const queryTerm = idOrName.trimStart();
    const parsedId = parseInt(queryTerm);

    if (isFinite(parsedId)) {
      const pokemon = await Pokemon.find({ id: parsedId });
      if (!pokemon) {
        res.status(404).json({ msg: "Not found" });
      } else {
        res.status(200).json({ success: true, data: pokemon });
      }
    } else {
      const processedString =
        queryTerm[0].toUpperCase() + queryTerm.slice(1).toLowerCase();
      const pokemon = await Pokemon.find({ "name.english": processedString });
      if (!pokemon) {
        res.status(404).json({ msg: "Not found" });
      } else {
        res.status(200).json({ success: true, data: pokemon });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// const insertSpriteUrl = async (req, res) => {
//   try {
//     const allPokes = await Pokemon.find();                    //fetch all pokemons from mongoDB as array of objects
//for each Pokemon:
//     allPokes.forEach(async (poke) => {
//       const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}/`);   // get the sprite URL by Pokemon ID
//       const data = await resp.json();
//       console.log(data.sprites.other.home.front_default);

//       const pokeUpdate = await Pokemon.findOneAndUpdate(     // Update Pokemon in MongoDB
//         { id: poke.id },                                     // find by Pokemon ID
//         { sprite: data.sprites.other.home.front_default },   // set the field sprite to the fetched sprite URL
//         { new: true }
//       );

//       console.log(pokeUpdate);
//     });
//   } catch (error) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       err,
//     });
//   }
// };
// insertSpriteUrl();

const getPokesByFilters = async (req, res) => {
  try {
    const {
      type,
      minHP,
      maxHP,
      minAttack,
      maxAttack,
      minDefense,
      maxDefense,
      minSpeed,
      maxSpeed,
      page,
    } = req.body;

    const toSkip = NUM_POKES_PER_PAGE * page;

    if (!type.length) {
      const pokemons = await Pokemon.find({
        $and: [
          { "base.HP": { $gte: minHP } },
          { "base.HP": { $lte: maxHP } },
          { "base.Attack": { $gte: minAttack } },
          { "base.Attack": { $lte: maxAttack } },
          { "base.Defense": { $gte: minDefense } },
          { "base.Defense": { $lte: maxDefense } },
          { "base.Speed": { $gte: minSpeed } },
          { "base.Speed": { $lte: maxSpeed } },
        ],
      })
        .sort({ id: 1 })
        .skip(toSkip)
        .limit(NUM_POKES_PER_PAGE);
      if (!pokemons || !pokemons.length)
        return res.status(404).json({ msg: "No pokemon", data: pokemons });
      res.status(200).json({ data: pokemons });
    } else {
      const pokemons = await Pokemon.find({
        $and: [
          { type: { $all: [...type] } },
          { "base.HP": { $gte: minHP } },
          { "base.HP": { $lte: maxHP } },
          { "base.Attack": { $gte: minAttack } },
          { "base.Attack": { $lte: maxAttack } },
          { "base.Defense": { $gte: minDefense } },
          { "base.Defense": { $lte: maxDefense } },
          { "base.Speed": { $gte: minSpeed } },
          { "base.Speed": { $lte: maxSpeed } },
        ],
      })
        .sort({ id: 1 })
        .skip(toSkip)
        .limit(NUM_POKES_PER_PAGE);
      if (!pokemons || !pokemons.length)
        return res.status(404).json({ msg: "No pokemon", data: pokemons });
      res.status(200).json({ data: pokemons });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports = { getAllPokemons, getOnePokemon, getPokesByFilters };
