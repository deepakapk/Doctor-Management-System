import React from 'react'
import { Link } from 'react-router-dom'
import {FaPhone, FaLocationArrow} from "react-icons/fa"
import {MdEmail} from "react-icons/md"


const Footer = () => {
  return (
    <>
    <footer className="container">
        <hr />
        <div className="content">
            <div>
            <span style={{color:"purple", fontSize:"25px"}}>Dee</span> <span style={{color:"green", fontSize:"25px"}}>Care</span>
            </div>
            <div>
                <h4>Quick Links</h4>
                <ul>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about"}>About us</Link>
                    <Link to={"/appointment"}>Appointment</Link>
                </ul>
            </div>
            <div>
                <h4>Hours</h4>
                <p>Monday - Friday: 9am - 5pm</p>
            </div>
            <div>
                <h4>Contact</h4>
                <div>
                    <FaPhone/>
                    <span>777-777-777</span>
                </div>
                <div>
                    <MdEmail/>
                    <span>Deecare@gmail.com</span>
                </div>
                <div>
                    <FaLocationArrow/>
                    <span>Jhaa Koi Ata Jata nahi</span>
                </div>
            </div>
        </div>

    </footer>
      
    </>
  )
}

export default Footer
