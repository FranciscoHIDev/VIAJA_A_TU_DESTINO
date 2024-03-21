const { MONGODB } = require("./db")
const express = require('express')
const router = require("./src/routes/index")
const cors = require("cors");
const morgan = require("morgan")
require("dotenv").config()


const app = express()
const port = process.env.PORT || 3000

// const corsOptions = {
//     origin: 'https://viajaatudestino.com',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Habilita el intercambio de cookies a través de dominios
//     optionsSuccessStatus: 204,
//   };

/* Middleware */
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
app.use("/api", router)

/* Routes*/
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Viaja a tu Destino API")
})

MONGODB()
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

module.exports = app