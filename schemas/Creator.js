const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
  name: String,
  image: String,
  date: String,
  bio: String,
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please usa a valid email",
    ],
  },
  hobbies: [String],
});

module.exports = mongoose.model("creators", creatorSchema);
