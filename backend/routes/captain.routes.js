import { registerUser } from "../controllers/user.controller.js";
import express from "express";
import { body } from "express-validator";
import {
    registerCaptain,
    getCaptainProfile,
    loginCaptain,
    logoutCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be at least 3 characters long"),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Plate must be at least 3 characters long"),
    body('vehicle.capacity').isNumeric().withMessage("Capacity must be a number"),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage("Vehicle type must be car, auto or motorcycle")
],registerCaptain)


router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginCaptain)

router.get('/profile', authCaptain, getCaptainProfile);

router.get('/logout', logoutCaptain);


export default router