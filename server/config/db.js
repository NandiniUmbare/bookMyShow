const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const dbUrl = process.env.DB_URL;
        await mongoose.connect(dbUrl);
        console.log('connected to DataBase');
    } catch(err){
        console.log(err);
    }
}

module.exports = connectDB