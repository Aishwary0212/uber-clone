import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import captainModel from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackLilsted = await blacklistTokenModel.findOne({ token: token })
    if(isBlackLilsted){
        return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token,process.env.Jwt_SECRET)
        const user = await userModel.findById(decoded.id)
        
        req.user = user
        return next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}
export const authCaptain= async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackLilsted = await blacklistTokenModel.findOne({ token: token });
    if (isBlackLilsted) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.Jwt_SECRET);
      const captain = await captainModel.findById(decoded.id);

      req.captain = captain;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
}