import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className="container biography">
      <div className="banner">
      <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, in praesentium consectetur quae incidunt eveniet iure quis ab facilis adipisci laborum, laboriosam quam cum fugit magnam explicabo ut commodi illo id aliquam cupiditate. At odit possimus quidem minima expedita aliquam ea laboriosam veniam pariatur nemo? Recusandae repellat minima impedit consectetur.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, explicabo!</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A eveniet rem ducimus numquam omnis soluta officiis distinctio sint voluptates, consequatur eos dolor? Dignissimos quisquam iusto nesciunt voluptate recusandae illum, dolores necessitatibus odit repudiandae natus itaque!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, temporibus!</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography
