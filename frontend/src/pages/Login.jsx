import React, { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(Context)
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigateTo = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post("https://doctor-management-system.onrender.com/api/v1/user/login",{email,password, confirmPassword, role:"Patient"},{withCredentials:true, headers:{"Content-Type":"application/json"}})
      toast.success(response.data.message)
      setIsAuthenticated(true)
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  
  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum cumque placeat eos ex aliquam corrupti.</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
        <div style={{gap:"10px",justifyContent:"flex-end", flexDirection:"row"}}>
          <p style={{marginBottom: 0}}>Not Regsitered</p>
          <Link to={"/register"} style={{textDecoration:"none", alignItems:"center"}}>Register Now!</Link>
        </div>
        <div style={{justifyContent:"center", alignItems:"center"}}>
          <button type="submit">LOG IN</button>
        </div>
      </form>
      
    </div>
  )
}

export default Login
