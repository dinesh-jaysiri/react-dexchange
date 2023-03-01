import React from 'react'
import brandLogo  from "../images/brand-logo.png"

function BrandLogo() {
  return (
    <div className='block brand-logo'>
        <img className='brand-logo__image' src={brandLogo} />
        <div className='separator'></div>
    </div>
  )
}

export default BrandLogo