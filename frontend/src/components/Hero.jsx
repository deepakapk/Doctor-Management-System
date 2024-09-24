import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'> 
        <div className="banner">
            <h1>{title}</h1>
            <p>
                DeeCare Medical Institue is a state-of-the-art facility dedicated to providing comprehensive heatlcare services with compassion and expertise. Our team of skilled professinal is commited to delivering personalized care tailored to each patient's needs. At DeeCare we prioritize your well-beings, ensuring a harmonious journey towards optimal health and wellness.
            </p>
        </div>
        <div className="banner">
            <img src={imageUrl} alt="banner" className='animated-image' />
            <span>
                <img src="./Vector.png" alt="vector" />
            </span>
        </div>
      
    </div>
  )
}

export default Hero
