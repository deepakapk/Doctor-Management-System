import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"


export const patientRegister = catchAsyncErrors(async(req, res, next)=>{
    const {firstName, lastName, email, phone, password, gender, dob, nic, role} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please fill the Full Form",400))
    }
    let user = await User.findOne({email})
    if(user){
        return next(new ErrorHandler("User already Registered",400))
    }
    user = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, role
    })
    generateToken(user, "user Registered!", 200, res)
})

export const login = catchAsyncErrors(async (req, res, next)=>{
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide all Details!",400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password should be same!",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",400))
    }
    if(role !== user.role)
    {
        return next(new ErrorHandler("User with This role not found!",400))
    }
    generateToken(user, "user Logged in Successfully!", 200, res)

})

export const addNewAdmin = catchAsyncErrors(async(req , res, next)=>{
    const {firstName, lastName, email, phone, password, gender, dob, nic} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic){
        return next(new ErrorHandler("Please fill the Full Form",400))
    }
    let user = await User.findOne({email})
    if(user){
        return next(new ErrorHandler(`${user.role} with this email is already Registered!`,400))
    }
    user = await User.create({firstName, lastName, email, phone, password, gender, dob, nic,role:"Admin"})
    res.status(200).json({
        success: true,
        message: "New Admin Registered",
    })   
})

export const getAllDoctors = catchAsyncErrors(async(req, res, next)=>{
    const doctors = await User.find({role: "Doctor"})
    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async(req, res, next)=>{
    const user = req.user
    res.status(200).json({
        success: true,
        user
    })
})

export const logoutAdmin = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message: "Admin Logged Out Successfully"
    })

})

export const logoutPatient = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message: "Patient Logged Out Successfully"
    })

})

export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0)
    {
        return next(new ErrorHandler("Doctor Avatar Required!", 404))
    }
    const {docAvatar} = req.files 
    const allowedFormats = ["image/png","image/jpeg","image/webp"]
    if(!allowedFormats.includes(docAvatar.mimetype))
    {
        return next(new ErrorHandler("Invalid Avatar Format!", 400))
    }
    const {firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment} = req.body
    if(!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("Please Fill All Fields!", 400))
    }
    const isRegistered = await User.findOne({email})
    if(isRegistered)
    {
        return next(new ErrorHandler("Doctor Already Registered!", 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log("Cloudinary Error", cloudinaryResponse.error || "Unkown Cloudinary Error");
        
        return next(new ErrorHandler("Failed to Upload Doctor Avatar!", 500))
    }
    const doctor = await User.create({firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment, role:"Doctor",docAvatar:{public_id:cloudinaryResponse.public_id,url:cloudinaryResponse.secure_url}})
    res.status(200).json({
        success:true,
        message:"New Doctor Registered",
        doctor
    })
})
