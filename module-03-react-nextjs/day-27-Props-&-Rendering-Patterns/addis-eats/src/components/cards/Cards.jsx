import React from 'react'
import '../../css/style.css'

function Cards(props) {
  return (
    <div  className='cards'>
        <h2>{props.name}</h2>
        <p>{props.price}</p>
    </div>
  )
}

export default Cards