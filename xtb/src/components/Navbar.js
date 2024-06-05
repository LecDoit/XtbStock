import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import Logo from '../img/Logo'
const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()
  
    const handleClick = ()=>{
        logout()
    }

  return (

        <div className='navbar'>

            <div className='navbar--logo' href='/'>

                <Link to='/' className='navbar--logo' >
                <Logo w={61} h={40}/>
                    <div className='navbar--buttons' id='navbar--logo'>MargIn</div>
                </Link>
            </div>

            <nav className='navbar--buttons--nav'>
                {user && (
                <div className='navbar--buttons'>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>logout</button>
                </div>
                )}
                {!user && (
                    <div className='navbar--buttons'>
                        <Link  to='/login'>
                            <div className='navbar--buttons' id='navbar--signin'>Sign in</div>
                            </Link>
                        <Link to='/signup'>
                            <div className='navbar--buttons' id='navbar--signup'>Sign up</div>
                        </Link>
                    </div>
                )}
            </nav>
        </div>

  )
}

export default Navbar