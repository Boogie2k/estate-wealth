import {Request, Response} from "express";  
import jwt from 'jsonwebtoken'
const Users = require('../model/user_model')

interface RequestWithUser extends Request {
user: object; 
file:any
}

const getUsers = async (req:RequestWithUser, res:Response) => {

  console.log({user:req.user})
  try {
      const users = await Users.find({})
      if(!users) {return res.status(404).json({msg: 'No users found'})}
      res.status(200).json(users)
  } catch (error) {
    
  }
}

const getSingleUser = async (req:Request, res:Response) => {

  try{ const {email}= req.body 
    const user = await Users.find({email})
    if(!user) {return res.status(404).json({msg: 'No user found'})}
    res.status(200).json(user)}

    catch(error){
        res.status(400).json({error})
    }
}           

const createUser = async (req:RequestWithUser, res:Response) => {
  try {
    const {
      image,
      name,
      username, 
      email, 
      password, 
      balance, 
      NoOfProperties, 
      totalAmountInvested, 
      totalExpectedReturn, 
      avgInvestmentDuration, 
      role} = req.body 
    const existingUser =await Users.findOne({email}) 
    if(existingUser){
      return res.status(400).json({msg: 'User already exists'})
    }
      const user = await Users.create({
       image:req.file.path ||'',
        name, 
        username, 
        email, 
        password, 
        balance, 
        NoOfProperties:0, 
        totalAmountInvested:0, 
        totalExpectedReturn:0, 
        avgInvestmentDuration:0, 
        role})
      if(!user) {return res.status(400).json({msg: 'User not created'})   } 

    const token = jwt.sign({id:user._id, email:user.email}, "process.env.JWT_SECRET")
    res.status(200).json(token)                    
  } catch (error) {
    res.status(400).json({error})
  }
}   

const updateUser = async (req:Request, res:Response) => {       

  try {
    const {
      image, 
      name, 
      username, 
      email, 
      password, 
      balance, 
      NoOfProperties, 
      totalAmountInvested, 
      totalExpectedReturn, 
      avgInvestmentDuration, 
      role} = req.body



    const user = await Users.findByOneAndUpdate(
      {email}, 
      {
        image, 
        name, 
        username, 
        email, 
        password, 
        balance, 
        NoOfProperties, 
        totalAmountInvested, 
        totalExpectedReturn, 
        avgInvestmentDuration, 
        role}, {new:true})

    if(!user) {return res.status(404).json({msg: 'User not updated'})} 
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error})
  }
}   

const deleteUser = async (req:Request, res:Response) => {
  try{
    const {email}= req.body 
    const user = await Users.findByOneAndDelete({email})
    if(!user) {return res.status(404).json({msg: 'User not deleted'})}
    res.status(200).send("user Deleted")
}
    catch(error){
        res.status(400).json({error})
    }
}   

const loginUser = async (req:Request, res:Response) => {
try {
    const {email, password} = req.body
    const user = await Users.findOne({email}) 
    if(!user|| !password) {return res.status(404).json({msg: 'invalid credentials'})}
    const token = jwt.sign({
        userID:user._id,
        email:user.email,
        username:user.username,
    }, "process.env.JWT_SECRET") 

    res.status(200).json(token)
} catch (error) {
    res.status(400).json({error})
}
}

module.exports = {getUsers, getSingleUser, createUser, updateUser, deleteUser, loginUser}      