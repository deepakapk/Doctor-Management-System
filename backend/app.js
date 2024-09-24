import express, { urlencoded } from "express"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { dbConnection } from "./database/dbconnection.js"
import messagerouter from "./router/messageRouter.js"
import userrouter from "./router/userRouter.js"
import appointmentrouter from "./router/appointmentRouter.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js"

config({path:"./config/config.env"})
const app = express()


// Middle ware to connect to our frontend
app.use(cors({
    origin: [process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))

// Middleware to use cookieparser
app.use(cookieParser())
// Middleware to convert json body to string
app.use(express.json())
// Middle to encode our url
app.use(urlencoded({extended:true}))
app.use(fileUpload({useTempFiles:true,tempFileDir:"/temp/"}))

// Middleware to send data to database
app.use("/api/v1/message", messagerouter)
app.use("/api/v1/user", userrouter )
app.use("/api/v1/appointment", appointmentrouter )

dbConnection()


app.use(errorMiddleware)
export default app