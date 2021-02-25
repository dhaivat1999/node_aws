const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required:true,
  },
  ingredients: String,
});

module.exports = mongoose.model("Recipes", postSchema);
