const mongoose= require('mongoose')
const dotenv= require('dotenv')
const reserveTableModel = require('./Models/reserveTableModel')

dotenv.config()

const connect_DB= async ()=>{
    try{
        await mongoose.connect(process.env.Mongo_Url,{
            dbName:process.env.dbName
        })

        // Force-sync all Mongoose schema indexes to MongoDB on every startup.
        // This ensures the TTL index on expiresAt is always present,
        // even if it was accidentally dropped from Atlas/Compass.
        await reserveTableModel.ensureIndexes()
        console.log('✅ DB connected — indexes synced')

    } catch(err) {
        console.log('error to connect DB', err.message)
    }
}

module.exports= connect_DB