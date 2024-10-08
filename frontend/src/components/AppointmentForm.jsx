import axios from "axios";
import React, { useEffect }  from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AppointmentForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState(""); 
    const [gender, setGender] = useState(""); 
    const [appointmentDate, setAppointmentDate] = useState("")
    const [department, setDepartment] = useState("")
    const [doctorFirstName, setDoctorFirstName] = useState("")
    const [doctorLastName, setDoctorLastName] = useState("")
    const [address, setAddress] = useState("")
    const [hasVisited, setHasVisited] = useState("")

    const departmentsArray = [
        "Pediatricks",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
        "Specialist"
    ]

    const [doctors, setDoctors] = useState([])
    useEffect(() => {
      const fetchDoctors = async()=>{
        const {data} = await axios.get("https://doctor-management-system.onrender.com/api/v1/user/doctors",{withCredentials:true})
        setDoctors(data.doctors)
      }
      fetchDoctors()
    
    }, [])

    const navigateTo = useNavigate()

    const handleAppointment = async(e) => {
      e.preventDefault()
      try{
          const hasVisitedBool = Boolean(hasVisited)
          const data = await axios.post("https://doctor-management-system.onrender.com/api/v1/appointment/post",
            {
                firstName,
                lastName,
                email,
                phone,
                dob,
                nic,
                gender,
                doctor_firstName:doctorFirstName,
                doctor_lastName:doctorLastName,
                hasVisitedBool,
                appointment_date:appointmentDate,
                department,
                address},
            {withCredentials:true,headers:{
                "Content-Type":"application/json"
            }})
            console.log(data)
            toast.success(data.message)
            navigateTo("/")
      } catch (error) {
            toast.error(error.response.data.message)
      }
    }
    
    

  return (
    <>
    <div className="container form-component appointment-form">
      <h2>Appointment Form</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="date" placeholder="Appointment Date" value={appointmentDate} onChange={(e)=>setAppointmentDate(e.target.value)} />
        </div>
        <div>
            <select value={department} onChange={(e)=>{setDepartment(e.target.value); setDoctorFirstName(""); setDoctorLastName("")}}>
                {
                    departmentsArray.map((depart,index)=>{
                        return( <option key={index} value={depart}>{depart}</option>)
                    })
                }
            </select>
            <select value={`${doctorFirstName} ${doctorLastName}`} onChange={(e)=>{
                const [firstName, lastName] = e.target.value.split(" ")
                setDoctorFirstName(firstName)
                setDoctorLastName(lastName)
            }} disabled={!department}>
                <option value={""}>Select Doctor</option>
                {
                    doctors.filter(doctor=>doctor.doctorDepartment === department).map((doctor, index)=>{
                        return <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                            {`${doctor.firstName} ${doctor.lastName}`}
                        </option>
                    })
                }
            </select>
        </div>
        <textarea value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" rows="10"></textarea>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited Before!</p>
          <input style={{flex:"none", width:"25px"}} type="checkbox" checked={hasVisited} onChange={(e)=>setHasVisited(e.target.checked)}/>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Get Appointment</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AppointmentForm;
