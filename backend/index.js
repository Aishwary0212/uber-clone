import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {connectToDB} from "./db/db.js";
dotenv.config();
import userRoutes from "./routes/user.routes.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();


app.get("/",(req,res)=>{
    res.send("hello");
})
app.use('/users', userRoutes);



app.get
app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`));