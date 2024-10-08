import bcrypt from "bcrypt"
import mongoose, { Mongoose } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain At Least 3 Characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contain At Least 3 Characters"]
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, "Please Provide a valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number must contain 10 digits"],
        maxLength:[10,"Phone Number must contain 10 digits"]
    },
    nic:{
        type:String,
        required:true,
        minLength:[10,"NIC must contain 10 digits"],
        maxLength:[10,"NIC must contain 10 digits"]
    },
    dob:{
        type:Date,
        required:[true, "DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum: ["Male","Female"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must contain at least 8 characters"],
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String
    }
})


// user schema jab bhi save hoga toh password jo hoga vo hash value mein convert hokarhum usse document par save karlenge
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("User", userSchema)