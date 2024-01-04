const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  bookingPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
});

const model = mongoose.model("Booking", BookingSchema);

module.exports = model;
