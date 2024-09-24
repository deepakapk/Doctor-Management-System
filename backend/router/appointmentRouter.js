import express from "express"
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointmentStatus } from "../controller/appointmentControler.js"
import { isPatientAuthenticated,isAdminAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/post",isPatientAuthenticated ,postAppointment)
router.get("/getall",isAdminAuthenticated ,getAllAppointment)
router.put("/update/:id",isAdminAuthenticated ,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated ,deleteAppointment)

export default router