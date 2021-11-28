const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true, //uid should be unique
  },
});

module.exports = mongoose.model("Customer", customerSchema);
