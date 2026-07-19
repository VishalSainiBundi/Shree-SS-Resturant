const express= require('express')
const cors= require('cors')
const connect_DB = require('./connectDB')
const dishRouter = require('./Routes/dishRoute')
const userRouter = require('./Routes/userRoute')
const menuRoute = require('./Routes/menuRoute')

const Port=5000 

const app= express()
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/dish',dishRouter)
app.use('/user',userRouter)
app.use('/menu',menuRoute)
connect_DB().then( ()=>{
    app.listen(Port,
()=> {
    console.log('server start')
}
    )
}

).
catch ( 
    (error )=>
        { 
            console.log('server error ')
        }
)