import React from 'react'
import HeroLineChart from '../components/HeroLineChart'


const Hero = () => {


  return (
    <div className='hero'>
      <div className='hero--1'>
        <div className='hero--1--1'>
          <div className='hero--header'> 
            Invest in your future
          </div>
          <div className='hero--desc'>Set your <strong>buy</strong> and <strong>sell</strong> levels easily, maximize profits, and trade smarter with our intuitive app.
          </div>
          <div className='hero--buttons'>
            Sign up
          </div>
        </div>
        <HeroLineChart className='hero--1--2'/>
        
      </div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>

    </div>
  )
}

export default Hero