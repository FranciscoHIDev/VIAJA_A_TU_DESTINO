const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique:true
    
  },
  favorites:{
    type: Array
  },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
  banned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", userSchema);
