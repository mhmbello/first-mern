import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated on the latest offers.</p>
        <div>
            <input type="email" placeholder='Enter your email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
