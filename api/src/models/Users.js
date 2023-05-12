const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    image: {
        type: String

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: Number
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    },
    banned: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Users", userSchema)