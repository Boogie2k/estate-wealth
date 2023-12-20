const connectMongoose = require("mongoose");

let connectDB = () => {
  connectMongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to database");
  });
};

module.exports = connectDB;