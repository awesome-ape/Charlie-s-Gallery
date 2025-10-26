const mongoose = require('mongoose');
const uri = process.env.MONGO_URI 

const mongooseConnect = async () => {
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};


const mongooseDisconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("MongoDB disconnection error:", error);
    }
};

module.exports = { mongooseConnect, mongooseDisconnect };