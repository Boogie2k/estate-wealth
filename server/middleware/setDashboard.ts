import { NextFunction, Response,Request } from "express";
const Dashboards = require('../model/properties_dashboard_model')
const {canViewDashboard} = require('../permissions/permissions')
import  jwt  from "jsonwebtoken";

interface RequestWithUser extends Request{
    dashboard:any
}

const setDashboard = async (req:RequestWithUser, res:Response, next:NextFunction)=>{



    const {id} = req.params

    const dashboard = await Dashboards.findById(id).populate('property').populate('investor');

    req.dashboard= dashboard

    

   // req.dashboard = await Dashboards.findById(_id)

    if(!req.dashboard){
       
        return res.status(404).send("dashboard not found")
    }

    console.log({dashboard:req.dashboard})
next()

    

}

const authDashboard =(req:any, res:Response, next:NextFunction)=>{
  
    if(!canViewDashboard(req.user, req.dashboard)){
        
        return res.status(403).send("not allowed")
    }
    next() 
}


module.exports={setDashboard, authDashboard}