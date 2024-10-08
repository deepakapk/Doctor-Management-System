import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Aboutus from "./pages/Aboutus";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import { useContext , useEffect} from "react";
import axios from "axios";
import Footer from "./components/Footer";

const App = () => {
 
  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(Context)
  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await axios.get("https://doctor-management-system.onrender.com/api/v1/user/patient/me",{withCredentials:true})
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
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/appointment" element={<Appointment/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer/>
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
  );
};

export default App;
