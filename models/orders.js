const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    products: [{
        _id: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
});

module.exports = mongoose.model("Order", schema, "orders");