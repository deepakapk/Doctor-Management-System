import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "Doctor_Management_System",
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.log(`Some error connected while connecting to database ${err}`);
    })
}