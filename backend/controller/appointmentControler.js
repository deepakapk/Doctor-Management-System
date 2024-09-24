import { Appointment } from "../models/appointmentSchema.js";
import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/errorMiddleware.js"
import {User} from "../models/userSchema.js"


export const postAppointment = catchAsyncErrors(async(req, res, next)=>{
    const {firstName, lastName, email, phone, nic, dob,gender, appointment_date, department,doctor_firstName, doctor_lastName, hasVisited, address} = req.body
    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department ||!doctor_firstName || !doctor_lastName || !address)
    {
        return next(new ErrorHandler("Please Provide All Apointment Details!",400))
    }
    const isConflict = await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department
    })
    if(isConflict.length === 0)
    {
        return next(new ErrorHandler("Doctor not found!",404))
    }
    if(isConflict.lengt > 1)
    {
        return next(new ErrorHandler("Doctor conflict! Please Contact through Email or phone!",400))
            
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({firstName, lastName, email, phone, nic, dob,gender, appointment_date, department,doctor:{firstName:doctor_firstName,lastName:doctor_lastName}, hasVisited, address,doctorId,patientId})
    res.status(200).json({
        succes:true,
        message:"Appointment Created Successfully!",
        appointment
    })

})

export const getAllAppointment = catchAsyncErrors(async(req, res, next)=>{
    const appointments = await Appointment.find()
    res.status(200).json({
        succes:true,
        message:"All Appointments Retrieved Successfully!",
        appointments
    })
})

export const updateAppointmentStatus = catchAsyncErrors(async(req, res, next)=>{
    const {id} = req.params 
    let appointment = await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment not found!",404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })
    res.status(200).json({
        succes:true,
        message:"Appointment Status Updated Successfully!",
        appointment
    })
})

export const deleteAppointment = catchAsyncErrors(async(req, res, next)=>{
    const {id} = req.params
    let appointment = await Appointment.findById(id)
    if(!appointment)
    {
        return next(new ErrorHandler("Appointment not found!",404))
    }
    await appointment.deleteOne()
    res.status(200).json({
        succes:true,
        message:"Appointment Deleted Successfully!",
    })
})