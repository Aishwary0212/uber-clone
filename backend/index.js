import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectToDB} from "./db/db.js";
dotenv.config();


const app=express();
app.use(cors());
connectToDB();
app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`));