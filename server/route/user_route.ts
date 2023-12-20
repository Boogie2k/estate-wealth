const {getUsers, getSingleUser, createUser, updateUser, deleteUser, loginUser} = require('../controller/user_controller');   
const authUsers = require('../middleware/authUser')
const authRoles = require('../middleware/authRole')
const uploads =require("../middleware/upload")
const express = require('express')
const userRouter = express.Router()

userRouter.get('/', authUsers, authRoles("admin"), getUsers)
userRouter.get('/:id', authUsers, getSingleUser)
userRouter.post('/', uploads.single('image'), createUser)
userRouter.put('/:id', authUsers,  uploads.single('image'), updateUser)
userRouter.delete('/:id', authUsers, deleteUser)
userRouter.post('/login', loginUser)

module.exports = userRouter