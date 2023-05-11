const mongoose = require('mongoose')
const destinationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("Destinations", destinationSchema)


