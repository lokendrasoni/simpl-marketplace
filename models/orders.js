const mongoose = require("mongoose");

const schema = mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    seller: {
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