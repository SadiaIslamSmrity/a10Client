import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Myprofile from './Myprofile'
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const Signup = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user, login } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      username: e.target.name.value,
      useremail: e.target.email.value,
      password: e.target.password.value,
      image: e.target.image.value
    }

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success('Signup successful!');
          login({
            username: formData.username,
            useremail: formData.useremail,
            image: formData.image
          })
        } else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='pb-20'>
      {!user ?
        (
          <>
            <div className='bg-blue-600 text-white text-5xl font-extrabold text-center py-10'>
              Get Involved
            </div>
            <p className='px-10 lg:px-30 py-10'>
              Every clean street, every fixed road, every green corner starts with one voice — yours.
              CleanCommunity empowers citizens to take charge of their neighborhoods by reporting issues, tracking progress, and building a cleaner, safer, and more sustainable community.
              Whether it's an overflowing garbage bin, illegal construction, broken public property, or road damage, your report can spark real action. This platform bridges the gap between people and authorities, turning frustration into collaboration.
            </p>


            <div className='flex flex-col justify-center items-center w-full'>
              <p className='text-5xl text-pink-500 font-bold'>Join Our Team</p>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-2/3 lg:w-1/3 py-8 items-center'>
                <input type="name" name="name" placeholder='Your Name' className='border p-2 w-full' required />
                <input type="email" name="email" placeholder='Email' className='border p-2 w-full' required />
                <input type="password" name="password" placeholder='Password' pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}" className='border p-2 w-full' required />
                <label className='text-gray-400'> *Must Contain one lowercase, one uppercase and minimum 6 charcaters*</label>
                <div className='lg:flex w-full justify-around'>
                  <input
                    type="text"
                    name="image"
                    placeholder="Paste Your Photo URL"
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
                <button type='submit' className='cursor-pointer hover:bg-pink-700 bg-pink-500 text-white py-2 rounded-full p-5 w-fit'>Sign Up</button>
              </form>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <p className='text-2xl font-bold w-fit rounded-full p-3'>Already Have An Account?</p>
              <Link to='/login' className='cursor-pointer hover:bg-blue-700 bg-blue-500 text-white text-xl py-2 rounded-full p-5 w-fit'>Login</Link>
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

export default Signup
