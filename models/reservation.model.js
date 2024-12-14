const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
},
  {timestamps: true}
);

module.exports = mongoose.model("Reservation", ReservationSchema);