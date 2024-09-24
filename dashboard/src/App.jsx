import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddNewDoctor from "./components/AddNewDoctor"
import AddNewAdmin from "./components/AddNewAdmin"
import Doctor from "./components/Doctor"
import Login from "./components/Login"
import Messages from "./components/Messages"
import Sidebar from './components/Sidebar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Context} from "./main"
import axios from 'axios'
import { useEffect } from 'react'


const App = () => {

  const {isAuthenticated,setIsAuthenticated, user, setUser} = useContext(Context)

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me",{withCredentials:true})
        setIsAuthenticated(true)
        setUser(response.data.user)
      } catch(error){
        setIsAuthenticated(false)
        setUser({})
      }
    }
    fetchUser()
  }, [isAuthenticated])

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/doctor/addnew' element={<AddNewDoctor/>}/>
          <Route path='/admin/addnew' element={<AddNewAdmin/>}/>
          <Route path='/messages' element={<Messages/>}/>
          <Route path='/doctors' element={<Doctor/>}/>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </>
  )
}

export default App
