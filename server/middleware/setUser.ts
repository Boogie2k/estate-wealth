import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const Users = require("../model/user_model"); 

interface RequestWithUser extends Request {
  user: object; // or the type of your 'user'
}


const setUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log('help')
    const authHeader = req.headers.authorization
    let token:string
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1] 
        if (!token) {
        next(new Error('Not authorized, no token'))
    }

    const decodedToken:any = jwt.verify(token, 'process.env.JWT_SECRET')
  

    const user = await Users.findById(decodedToken.userID)

    if (!user) {
        next(new Error('Not authorized, no user'))
    } 

    req.user = user
   
    }
    next();

}

module.exports = setUser