import { Response, Request, NextFunction } from "express";

interface User{
    role: string;

}

interface RequestWithUser extends Request {
  user: User;
 
}

const authRole = (role: string) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        if(req.user.role !== role){
            return res.status(401).json({message: 'Not allowed'})
        }
        next()
    }

    
}

module.exports = authRole