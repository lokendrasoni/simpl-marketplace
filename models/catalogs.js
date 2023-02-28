const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Catalog", schema, "catalogs");