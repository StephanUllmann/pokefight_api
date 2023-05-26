const Creator = require("../schemas/Creator");

// function to create creator
const createCreator = async (req, res) => {
  try {
    const { name, image, date, bio, email, hobbies } = req.body;
    const creator = await Creator.create({
      name,
      image,
      date,
      bio,
      email,
      hobbies,
    });
    res.status(201).json({ data: creator });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//function to get all creators
const getAllCreators = async (req, res) => {
  try {
    const creators = await Creator.find();
    if (!creators.length)
      return res.status(200).json({ msg: "There are no creators here" });
    res.status(200).json({ data: creators });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//function to get one creator
const getOneCreator = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = await Creator.findById(id);
    if (creator) return res.status(200).json({ data: creator });
    res.status(404).json({ msg: "There is no creator here" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//function to update creator
const updateCreator = async (req, res) => {
  try {
    const { name, image, date, bio, email, hobbies } = req.body;
    const { id } = req.params;
    const creator = await Creator.findByIdAndUpdate(
      id,
      {
        name,
        image,
        date,
        bio,
        email,
        hobbies,
      },
      { new: true }
    );
    if (!Object.keys(creator).length) {
      res.status(404).json({ msg: "I can't find this creator" });
    } else {
      res.status(200).json({ data: creator });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//function for delting creator
const deleteCreator = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = await Creator.findByIdAndDelete(id);
    if (!creator) {
      res.status(404).json({ msg: "I can't find this creator" });
    } else {
      res.status(200).json({ data: creator });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// if (!student) {
//   res.status(404).json({ msg: "I don't know this student :(" });
// } else {
//   res.status(200).json({
//     msg: "Student updated successfully",
//     data: student,
//   });
// }

//export of functions
module.exports = {
  createCreator,
  getAllCreators,
  getOneCreator,
  updateCreator,
  deleteCreator,
};
