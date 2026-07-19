const mongoose= require('mongoose')
const dotenv= require('dotenv')

dotenv.config()

const connect_DB= async ()=>{
    try{
   await mongoose.connect(process.env.Mongo_Url,{
        dbName:process.env.dbName
    })
    
        console.log('DB connected ')
    } catch  {
        console.log('error to connect DB')
        
    }
}

module.exports= connect_DB