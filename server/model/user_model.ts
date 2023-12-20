const UserMongoose = require('mongoose');

const userSchema = new UserMongoose.Schema({

    image:String,
    name:String, 
    username:String,
    email:String,
    password:String,
    balance:Number,
    NoOfProperties:Number,
    totalAmountInvested:Number,
    totalExpectedReturn:Number,
    avgInvestmentDuration:Number,
    role:String,
    

}, {timestamps:true})

module.exports = UserMongoose.model('Users', userSchema)