const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {type: String , required: true, unique : true},
        desc:{type: String, required: true},
        img: {type: String, require: true},
        price:{type: Number, default: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product",productSchema);