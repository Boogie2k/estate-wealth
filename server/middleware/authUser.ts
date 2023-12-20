import {NextFunction, Request, Response} from 'express'

interface RequestWithUser extends Request {
user: object;
}

const authUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    if (req.user == null || undefined|| ''){
        return res.status(403).json({message: 'You  are not logged In!'})
    }
    
    next()

}

module.exports = authUser 