const PropertiesDashboard = require('../model/properties_dashboard_model');
import { Request, Response } from 'express';

const {scopedDashboard} =require('../permissions/permissions')

interface RequestWithUser extends Request{
    user: object
}
const getDashboard = async (req: RequestWithUser, res: Response) => {
  
    try {
        const dashboard = await PropertiesDashboard.find({}).populate('property').populate('investor');
        if (!dashboard) {
        return res.status(404).json({ msg: 'No dashboard found' });
        }
        console.log('pppp')
        console.log({user:req.user} ) 
        res.status(200).json(scopedDashboard(req.user, dashboard) );
    } catch (error) {
        res.status(400).json({ error }); 
    }
}

const getSingleDashboard = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const dashboard = await PropertiesDashboard.findById(id).populate('property').populate('investor');
        if (!dashboard) {
        return res.status(404).send('Dashboard not found');
        }

    console.log({users:req.user}, )
    console.log({dashboard:req.dashboard})
        res.json(dashboard );
        
    } catch (error) {
        res.status(400).json({ error });
        
    }
}

const createDashboard = async (req: Request, res: Response) => {
    try {
        const { 
            investmentValue, 
            progress, 
            score, 
            amountInvested, 
            dateOfInvestment, 
            investmentStatus, 
            currentInvestmentValue, 
            investmentDuration, 
            investmentValueHistory, 
            investor,
            property } = req.body;

        const dashboard = await PropertiesDashboard.create({
            investmentValue, 
            progress, 
            score, 
            amountInvested, 
            dateOfInvestment, 
            investmentStatus, 
            currentInvestmentValue, 
            investmentDuration, 
            investmentValueHistory, 
            property:"657d60260f239c4dd2cf8994",
            investor
        });
        if (!dashboard) {
            return res.status(404).send('Dashboard not created');
        }
        res.json(dashboard);
    } catch (error) {
        res.status(400).json({ error });
    }
}

const updateDashboard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { 
            investmentValue, 
            progress, 
            score, 
            amountInvested, 
            dateOfInvestment, 
            investmentStatus, 
            currentInvestmentValue, 
            investmentDuration, 
            investmentValueHistory, 
            property } = req.body;

        const dashboard = await PropertiesDashboard.findByIdAndUpdate(id, {
            investmentValue, 
            progress, 
            score, 
            amountInvested, 
            dateOfInvestment, 
            investmentStatus, 
            currentInvestmentValue, 
            investmentDuration, 
            investmentValueHistory, 
            property
        });
        if (!dashboard) {
            return res.status(404).send('Dashboard not updated');
        }
        res.json(dashboard);
    } catch (error) {
        res.status(400).json({ error });
    }
}

const deleteDashboard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dashboard = await PropertiesDashboard.findByIdAndDelete(id);
        if (!dashboard) {
            return res.status(404).send('Dashboard not deleted');
        }
        res.json(dashboard);
    }catch (error) {

}

}

module.exports ={getDashboard, getSingleDashboard, createDashboard, updateDashboard, deleteDashboard}