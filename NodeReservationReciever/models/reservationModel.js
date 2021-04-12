const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  guest: { type: String },
  roomnumber: { type: Number },
  comments: { type: String },
  id: { type: String },
});

module.exports = mongoose.model("Reservation", reservationSchema);
