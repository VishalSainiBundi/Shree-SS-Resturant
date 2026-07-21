// const express= require('express')
// const cors= require('cors')
// const path = require('path')
// const connect_DB = require('./connectDB')
// const dishRouter = require('./Routes/dishRoute')
// const userRouter = require('./Routes/userRoute')
// const menuRoute = require('./Routes/menuRoute')
// const OrderRoute = require('./Routes/orderRoute')

// require("dotenv").config();

// const Port=5000 

// const app= express()
// app.use(express.json())
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use('/dish',dishRouter)
// app.use('/user',userRouter)
// app.use('/menu',menuRoute)
// app.use('/order',OrderRoute)
// connect_DB().then( ()=>{
//     app.listen(Port,
// ()=> {
//     console.log('server start')
// }
//     )
// }

// ).
// catch ( 
//     (error )=>
//         { 
//             console.log('server error ')
//         }
// )




const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connect_DB = require("./connectDB");

const dishRouter = require("./Routes/dishRoute");
const userRouter = require("./Routes/userRoute");
const menuRoute = require("./Routes/menuRoute");
const OrderRoute = require("./Routes/orderRoute");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/dish", dishRouter);
app.use("/user", userRouter);
app.use("/menu", menuRoute);
app.use("/order", OrderRoute);

const PORT = process.env.PORT || 5000;

connect_DB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });