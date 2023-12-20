const DashboardMongoose = require('mongoose');

const dashboardSchema = new DashboardMongoose.Schema({  
    investmentValue:Number,
    progress:Number,
    score:Number,
    amountInvested:Number,
    dateOfInvestment:Date,
    investmentStatus:String,
    currentInvestmentValue:Number,
    investmentDuration:Number,
    investmentValueHistory:[{value:Number, date:Date}],
    property: {type:DashboardMongoose.Schema.Types.ObjectId, ref:'Property'},
    investor:{type:DashboardMongoose.Schema.Types.ObjectId, ref:'Users'}
},{timestamps:true})

module.exports = DashboardMongoose.model('Property-Dashboard', dashboardSchema)