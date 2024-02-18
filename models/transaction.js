//schema of database
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      sold: {
        type: Boolean,
        required: true
      },
      dateOfSale: {
        type: Date,
        required: true
      },
      month: {
        type: String,
        required: false // Optional field
      }
});
module.exports = mongoose.model("Transaction",transactionSchema);