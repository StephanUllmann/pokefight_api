const Pokemon = require("../schemas/Pokemon");

const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    if (!pokemons.length) {
      res.status(200).json({ msg: "No pokemons in the DB" });
    } else {
      res.status(200).json({ success: true, data: pokemons });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      err,
    });
  }
};

const getOnePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await Pokemon.findById(id);
    if (!pokemon) {
      res.status(404).json({ msg: "Not found" });
    } else {
      res.status(200).json({ success: true, data: pokemon });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      success: false,
      err,
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

module.exports = { getAllPokemons, getOnePokemon };
