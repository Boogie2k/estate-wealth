const Mongoose = require('mongoose');

const propertySchema = new Mongoose.Schema({  
    image:String,
    name:String, 
    propertyValue:Number,
    score:Number,
    location:String,
    description:String,
    taxes:Number,  
    propertyValueHistory:[{value:Number, date:Date}],
    initialPropertyValue:Number,
},{timestamps:true})

module.exports = Mongoose.model('Property', propertySchema)