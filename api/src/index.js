const { MONGODB } = require("./db")
const express = require('express')
const router = require("./routes/index")

const app = express()
const port = process.env.PORT || 3000

/* Middleware */
app.use(express.json())
app.use("/api", router)

/* Routes*/
app.get("/api", (req, res) => {
    res.status(200).send("Welcome to the Viaja a tu Destino API")
})

MONGODB()
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

module.exports = app