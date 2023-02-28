const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalog"
    }
});

module.exports = mongoose.model("Product", schema, "products");