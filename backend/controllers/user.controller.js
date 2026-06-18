import { hash } from "bcrypt";
import userModel from "../models/user.model.js";
import {createUser} from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";
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
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }
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

export const logoutUser=async(req,res,next)=>{
    try {
        res.clearCookie("token");
        const token =
          req.cookies.token || req.headers.authorization?.split(" ")[1];
        await blacklistTokenModel.create({ token: token });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
        console.log(error);
        
    }
}