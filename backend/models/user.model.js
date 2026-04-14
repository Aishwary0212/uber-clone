import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type:String,
            required: true,
            minlength:[3, "First name must be at least 3 characters long"]
        },
        lastname: {
            type:String,
            minlength:[3, "Last name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    socketId: {
        type: String
    }
})

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY)
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password, 10)
}

const userModel= mongoose.model("user", userSchema)
export default userModel