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
                <Logo className='navbar--logo-react' w={58} h={50}/>
                    <div  id='navbar--logo'>MargIn</div>
                </Link>
            </div>

        
                {user && (
                <div className='navbar--buttons--nav'>
                    <div className='navbar--email'>{user.email}</div>
                    <div className='navbar--buttons' onClick={handleClick}>Log out</div>
                </div>
                )}
                {!user && (
                    <div className='navbar--buttons--nav'>
                        <Link  to='/login'>
                            <div className='navbar--buttons' id='navbar--signin'>Sign in</div>
                            </Link>
                        <Link to='/signup'>
                            <div className='navbar--buttons' id='navbar--signup'>Sign up</div>
                        </Link>
                    </div>
                )}
            {/* </div> */}
        </div>

  )
}

export default Navbar