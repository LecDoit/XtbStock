import React from 'react'
import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {

    const [email,setEmail] = useState('a@wp.pl');
    const [password,setPassword] = useState('a');
    const {login,error,isLoading} = useLogin()


    const handleSubmit = async (e)=>{
        e.preventDefault()

        console.log(email,password)
        await login(email,password)

    }



  return (
    <form onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label>Email:</label>
        <input 
            type='email'
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
        >
        </input>

        <label>Password:</label>
        <input 
            type='password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
        >
        </input>
        <button disabled={isLoading}>Submit</button>
        {error && <div>{error}</div>}
    </form>
  )
}

export default Login