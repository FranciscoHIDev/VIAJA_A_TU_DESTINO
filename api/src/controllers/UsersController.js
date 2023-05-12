const Users = require('../models/Users')
const Offers = require('../models/Offers')
const userSchema = require('../models/Users')


/* Routes to create a new user */
const routerPostUser = async (req, res) => {
    try {
        const user = userSchema(req.body)
        const newUser = await new Users({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            image: user.image,
            telephone: user.telephone
        })
        const userCreated = await newUser.save()
        res.status(201).json(userCreated)

    } catch (error) {
        res.status(500).json(`Error ${error}`);
    }
}

/* This is a route that allows you to get all the users */
const routerGetUsers = async (req, res) => {
    try {
        const allUsers = await userSchema.find()
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json(`Error ${error}`);
    }
}
/* This is a route that allows you to get a user*/
const routerGetByIdUser = async (req, res) => {
    try {
        const { id } = req.params
        const userId = await userSchema.findById(id)
        res.status(200).json(userId)
    } catch (error) {
        res.status(500).json(`Error ${error}`);
    }

}

/* This is a route that allows you to modify a user */
const routerPutUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, telephone, image, roll } = req.body
        const user = await userSchema.updateOne({ _id: id }, { $set: { name, lastname, email, telephone, email, image, roll } })
        res.status(200).json(user)


    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}


/* This is a route that allows you to delete a user */

const routerDeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userSchema.findByIdAndRemove(id)
        res.status(200).send("Usuario eliminado")
    } catch (error) {
        res.status(500).json(`Error ${error}`)
    }
}
module.exports = { routerPostUser, routerGetUsers, routerGetByIdUser, routerDeleteUser, routerPutUser }