const express=require("express");
const cors=require('cors')
require("dotenv").config();
const transaction=require('./models/Transaction')
const mongoose=require('mongoose')
//RJC1mtX7LsxRzIWp

const app=express();
app.use(cors());
app.use(express.json())
app.get("/api/test",(req,res)=>{
    res.json({body: "testing successfull"})
});

app.post("/api/transaction", async(req,res)=>{
    //console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, datetime,price} = req.body;
    const Transaction = await transaction.create({name,description,datetime,price})
    res.json(Transaction);
});

app.get('/api/transaction',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL)
    const Transactions=await transaction.find()
    res.json(Transactions)
});

app.listen(3004,()=>{
    console.log("Server is running on port 3004");
});