require("dotenv").config();
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const dbUri = process.env.DB_URI || "mongodb://localhost:27017/shop_app";
        await mongoose.connect(dbUri);
        console.log(chalk.bgBlue("connect db successfully"));
    } catch (error) {
        console.log(error.message);
        console.log("\nfailed to connect db");
    }
};

module.exports = connectDB;