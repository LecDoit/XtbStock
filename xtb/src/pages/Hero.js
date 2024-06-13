import React from 'react'
import HeroLineChart from '../components/HeroLineChart'
import {Link} from 'react-router-dom'


const Hero = () => {


  return (
    <div  className='hero'>
      <div className='hero--1'>
        <div className='hero--1--1'>
          <div className='hero--header'> 
            Invest in your future
          </div>
          <div className='hero--desc'>Set your <strong>buy</strong> and <strong>sell</strong> levels easily, maximize profits, and trade smarter with our intuitive app.
          </div>

          <Link to='/signup'>
            <div className='hero--buttons' id='navbar--signup'>Sign up</div>
          </Link>
        </div>
        <HeroLineChart />
        
      </div>
      <div className='hero--2'>
        <div className='hero--header--2'>
        MargIn is an is intuitve app for everyone
        </div>
        <div className='hero--2--1'>
          <div className='hero--2--holder'>
            <div className='hero--2--top'>2800+</div>
            <div className='hero--2--bottom'>Stocks</div>
          </div>
          <div className='hero--2--holder'>
            <div className='hero--2--top'>300+</div>
            <div className='hero--2--bottom'>ETFs</div>
          </div>
          <div className='hero--2--holder'>
            <div className='hero--2--top'>10+</div>
            <div className='hero--2--bottom'>Cryptocurrencies</div>
          </div>
        </div>
        <div className='hero--2--2'>
          <div className='hero--2--picture'>
            placeholder for picture of finished app
          </div>
          <div className='hero--2--steps'>
            <div className=''>MargIn App</div>
            <div className=''>Set margin in minutes</div>
            <div className=''>
              <div>
                <div>1</div>
                <div>Create your free MargIn account</div>
              </div>
              <div>
                <div>2</div>
                <div>Choose financial instrument</div>
              </div>
              <div>
                <div>3</div>
                <div>Set buy and Sell margins</div>
              </div>
              <Link to='/signup'>
              <div className='hero--buttons' id='navbar--signup'>Sign up</div>
            </Link>
            </div>
          </div>
        </div>

  

        {/* <div className='hero--2'></div>
        <div className='hero--2'></div> */}
      </div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>
      <div className='hero--'></div>

    </div>
  )
}

export default Hero