const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema({
  country:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Location", LocationSchema);