require('dotenv').config();//for protecting credentials
const express = require("express");
const cors = require('cors');
const app = express();
const transaction_routes = require("../routes/transaction");
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;

const connectDB = require("../db/connect");
app.get("/",(req,res)=>{
    res.send("hi i am live");
});
app.use("/api",transaction_routes);
const start = async ()=>{
    await connectDB(process.env.MONGODB_URL);
    try{app.listen(PORT, ()=>{
        console.log("Yes i am connected");
    });
}
    catch(error){
        console.log(error);
    }
};

start();