const {getDashboard, getSingleDashboard, createDashboard, updateDashboard, deleteDashboard} = require('../controller/properties_dashboard_controller');

//const authenUser = require('../middleware/authUser')
const {setDashboard, authDashboard} = require("../middleware/setDashboard") 

const expressDashboard = require('express');
const dashboardRouter = expressDashboard.Router();

dashboardRouter.get('/', getDashboard);
dashboardRouter.get('/:id', setDashboard,authDashboard,   getSingleDashboard);
dashboardRouter.post('/',  createDashboard);
dashboardRouter.patch('/:id', setDashboard, authDashboard, updateDashboard);
dashboardRouter.delete('/:id', setDashboard,authDashboard, deleteDashboard);

module.exports=dashboardRouter;