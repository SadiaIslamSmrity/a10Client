import React, { useContext } from 'react'
import { AuthContext } from './AuthContext';
import { Link } from 'react-router';
import Myprofile from './Myprofile';
import { toast } from 'react-toastify';

const Login = () => {
  const { user, logout, login } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      useremail: e.target.email.value,
      password: e.target.password.value,
    }

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success("Welcome Back !");
          login(data.user);
        } else {
          toast.error(data.message);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='pb-20'>
      {!user ? (
        <>
          <div className='bg-blue-600 text-white text-5xl font-extrabold text-center py-10'>
            Get Involved Again
          </div>
          <p className='px-10 lg:px-30 py-10'>
            Every clean street, every fixed road, every green corner starts with one voice — yours.
            CleanCommunity empowers citizens to take charge of their neighborhoods by reporting issues, tracking progress, and building a cleaner, safer, and more sustainable community.
            Whether it's an overflowing garbage bin, illegal construction, broken public property, or road damage, your report can spark real action. This platform bridges the gap between people and authorities, turning frustration into collaboration.
          </p>


          <div className='flex flex-col justify-center items-center w-full'>
            <p className='text-5xl text-pink-500 font-bold px-10 text-center'>Log Into Your Account</p>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 w-2/3 lg:w-1/3 py-8 items-center'>
              <input type="email" name="email" placeholder='Email' className='border p-2 w-full' required />
              <input type="password" name="password" placeholder='Password' className='border p-2 w-full' required />
              <button type='submit' className='cursor-pointer hover:bg-pink-700 bg-pink-500 text-white py-2 rounded-full p-5 w-fit'>Login</button>
            </form>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl font-bold w-fit rounded-full p-3'>New Here?</p>
            <Link to='/signup' className='cursor-pointer hover:bg-blue-700 bg-blue-500 text-white text-xl py-2 rounded-full p-5 w-fit'>Sign up</Link>
          </div>
        </>
      )
        :
        (
          <Myprofile />
        )
      }
    </div>
  )
}

export default Login
