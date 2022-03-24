const mongoose = require("mongoose");

const heroesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  power: {
    type: Array,
    required: true,
    maxlength: 50,
  },
  color: {
    type: String,
    maxlength: 15,
  },
  isAlive: {
    type: Boolean,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 999999,
  },
  image: {
    type: String,
    maxlength: 100000000,
  },
});

const Hero = mongoose.model("Hero", heroesSchema);

module.exports = Hero;
