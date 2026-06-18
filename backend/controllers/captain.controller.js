import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerCaptain=async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType },
    } = req.body;
    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword=await captainModel.hashPassword(password);
    const captain = await createCaptain({ firstname, lastname, email, hashedPassword, color, plate, capacity, vehicleType });
    const token = captain.generateToken();
    return res.status(201).json({token,captain});
}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await captain.comparePassword(password);
    if(!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = captain.generateToken();
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    return res.status(200).json({token,captain});
}

export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

export const logoutCaptain = async (req, res, next) => {
    try {
        res.clearCookie("token");
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        await blacklistTokenModel.create({ token: token });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
        console.log(error);
    }
}