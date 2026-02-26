const mongoose = require("mongoose")

const initializedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Connected to Database Successfully.");
        
    } catch (error) {
        console.log("MongoDB connection failed", error)
        process.exit(1)
    }
}

module.exports = {initializedDatabase}