const mongoose = require("mongoose")
const { Schema } = mongoose;


const productsModel = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: `{VALUE} is not supported`
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    url: {
        type: String
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
})

module.exports = mongoose.model('productsModel', productsModel);