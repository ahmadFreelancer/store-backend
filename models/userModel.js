const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String }
}, { collection: "UserAuthModel" })

module.exports = mongoose.model("UserModel", UserModel)