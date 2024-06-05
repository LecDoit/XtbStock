import React from 'react'

const Logo = ({w,h}) => {
  return (

<svg 
    className='svgLogo'
	xmlns="http://www.w3.org/2000/svg"  
	width={w} 
	height={h} 
	viewBox="0 0 540 540"
    fill="white"
    >
        
    

<g transform="matrix(5 0 0 1 270 380)"   >
	<text  fontSize="300"


	textDecoration="overline" 
    ><tspan x="-40.79" y="25" >/</tspan>
	</text>
</g>
</svg>
  )
}

export default Logo