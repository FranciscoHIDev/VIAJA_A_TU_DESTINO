const express = require('express')
const router = express.Router()

const { routerGetFavorites,routerPostUser, routerGetUsers, routerGetByIdUser, routerDeleteUser, routerPutUser } = require('../controllers/UsersController')

router.post("/favorite", (req,res)=>{
    routerGetFavorites(req,res)
})

/* This route is to create a user */
router.post("/", (req, res) => {
    routerPostUser(req, res)
})

/* This is a route that allows you to get all the users */
router.get("/", (req, res) => {
    routerGetUsers(req, res)
})

/* This is a route that allows you to get a user*/
router.get("/:id", (req, res) => {
    routerGetByIdUser(req, res)
})

/* This is a route that allows you to modify a user */
router.put("/:id", (req, res) => {
    routerPutUser(req, res)
})

/* This is a route that allows you to delete a user */
router.delete("/:id", (req, res) => {
    routerDeleteUser(req, res)
})

module.exports = router