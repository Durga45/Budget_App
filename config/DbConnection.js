const mongoose = require('mongoose'); 

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = ConnectDB;
