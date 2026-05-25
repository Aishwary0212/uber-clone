import { hash } from "bcrypt";
import userModel from "../models/user.model.js";
import {createUser} from "../services/user.service.js";
import { validationResult } from "express-validator";
export const registerUser=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
      fullname: { firstname, lastname },
      email,
      password,
    } = req.body;
    const hashedPassword=await userModel.hashPassword(password);
    const user = await createUser({ firstname, lastname, email, hashedPassword });
    const token=user.generateToken();
    return res.status(201).json({token,user});
}

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateToken();
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    return res.status(200).json({token,user});
}
export const getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user)
}