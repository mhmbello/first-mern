import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
    <div className="descriptionbox-navigator">
      <div className="descriptionbox-nav-box">Description</div>
      <div className="descriptionbox-nav-box fade">Reviews (122)</div>
    </div>
    <div className="descriptionbox-description">
      <p>An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
      <p>In addition to product listings, e-commerce websites often include features such as shopping carts, secure payment gateways, and customer reviews to enhance the shopping experience.</p>
    </div>
  </div>
  )
}
