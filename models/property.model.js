
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PropertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  propertyType: {
    type: String,
    required: [true, "Property type is required"],
    required: true,
  },
  nightPrice: {
    type: Number,
    required: [true, "Night price is required"],
    required: true,
  },
  disponibility: {
    type: Boolean,
    required: [true, "Disponibility is required"],
    required: true,
  },
});

module.exports = mongoose.model("Property", PropertySchema);