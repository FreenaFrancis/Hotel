const express = require('express');
 const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
 dotenv.config();

const authRoute = require('./routes/auth');
 const hotelsRoute = require('./routes/hotels');
 const roomsRoute = require('./routes/rooms');
 const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser');
const cors = require('cors');



const uri ="mongodb+srv://freenafrancis2000:h1KK0O4WspCcQvmU@cluster0.vhbev6p.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connected to mongodbserver")
}).catch((error)=>{
    console.log("error connecting server");
})

// const connect = async () =>{
//     try{
//         await mongoose.connect(process.env.MONGO);
//         console.log("connected to mongoDB")
//     }catch (err){
//         throw err;

//     }
// };

// mongoose.connection.on("disconnected", () =>{
//     console.log("mongodb disconnected");
// })
// mongoose.connection.on("connected", () =>{
//     console.log("mongodb connected");
// })
// connect();


app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
 app.use("/api/rooms", roomsRoute);
 app.use("/api/hotels", hotelsRoute);
 app.use("/api/users", usersRoute);

 app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessages = err.message || "Something went wrong";
    res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessages,
      stack: err.stack
    });
    next();
  });
  

  

app.get("/", (req, res) => {
    res.json("Hello");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// app.listen(8000,()=>{

//     console.log("server is running")
// })