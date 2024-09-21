const mongoose = require('mongoose');

exports.connectDatabase = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/intershallllaaa")
        console.log("database connected")
    } catch (error) {
        console.log(error.message)
    }

}