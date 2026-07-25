const mongoose= require('mongoose')
const dotenv= require('dotenv')
const reserveTableModel = require('./Models/reserveTableModel')

dotenv.config()

const connect_DB= async ()=>{
    try{
   await mongoose.connect(process.env.Mongo_Url,{
        dbName:process.env.dbName
    })
    // console.log(await reserveTableModel.collection.indexes());
    //     console.log('DB connected ')
    } catch  {
        console.log('error to connect DB')
        
    }
}

module.exports= connect_DB