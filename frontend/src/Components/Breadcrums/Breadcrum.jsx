import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

export const Breadcrum = (props) => {
    //nb: props permet de passer des données du composant parent au composant enfant
    const {product} = props;
  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt="" />
        SHOP <img src={arrow_icon} alt="" />
        {product.category}
        <img src={arrow_icon} alt="" />
        {product.name}
    </div>
  )
}
