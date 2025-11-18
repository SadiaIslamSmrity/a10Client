import React, { useContext } from 'react'
import { AuthContext } from './AuthContext';
import Login from './Login';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

const Myprofile = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <div>
            <Helmet>
                    <title>My profile | OurDhaka</title>
                  </Helmet>
            {user ?
                (<>
                    <div className='p-20'>
                        <div className='text-5xl font-bold text-pink-600 pb-20'>
                            My Profile
                        </div>
                        <div className='lg:flex'>
                            <img src={user.image} className='h-[50vh] w-full lg:w-[50vh]' />
                            <div className='flex flex-col p-20 gap-5'>
                                <p className='text-4xl text-pink-500 font-bold'>{user.username}</p>
                                <p className='text-xl'>General member</p>
                                <Link to='/mycontribution' className='text-xl text-pink-500 font-bold'>My Contribution &#x2197;</Link>
                                <Link to='/myissues' className='text-xl text-pink-500 font-bold'>My Issues &#x2197;</Link>
                                <button
                                    onClick={logout}
                                    className="flex justify-center bg-white hover:bg-blue-500 text-black hover:text-white border border-blue-500 px-3 py-1 rounded-lg transition text-lg font-extrabold"
                                >
                                    <p>Logout</p>
                                    
                                    <span class="material-symbols-outlined">
account_circle_off
</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>

                )
                :
                (
                    <Login />
                )
            }

        </div>
    )
}

export default Myprofile