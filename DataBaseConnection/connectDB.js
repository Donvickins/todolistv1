const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){
    try{
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jxmocky.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`);
        console.log("Connected to database");
    }catch(err){
        console.log(err.message);
    }
}
 module.exports = connectDB;
