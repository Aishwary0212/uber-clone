import express from "express";
import { body } from "express-validator";
const router = express.Router();
import {getUserProfile, loginUser, registerUser} from "../controllers/user.controller.js"
import { authUser } from "../middleware/auth.middleware.js";
router.post("/register", [
    body('email').isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],
registerUser
);

router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], loginUser)

router.get("/profile", authUser, getUserProfile);

export default router