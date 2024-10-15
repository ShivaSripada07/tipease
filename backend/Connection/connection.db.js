const mongoose = require('mongoose');


async function connectMongoDB(url)
{
    try
    {
        await mongoose.connect(url);
        console.log("successfully connected to database");
    } 
    catch (err)
    {
        console.error("failed to connect to database due to :", err);
    }
}

module.exports = { connectMongoDB };
