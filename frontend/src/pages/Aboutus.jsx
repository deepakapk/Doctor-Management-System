import React from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"

const Aboutus = () => {
  return (
    <>
      <Hero title={"Learn More About us | DeeCare Medical Institute"} imageUrl={"/about.png"}/>
      <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}

export default Aboutus
