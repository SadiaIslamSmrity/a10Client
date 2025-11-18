import React from 'react'
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <div className='bg-white h-15 w-full flex justify-between items-center px-4 lg:px-10 py-7 sticky z-50 top-0' >
            {/* logo */}
            <Link to='/' className="logo">
                OurDhaka
            </Link>
            {!user ? (
                <>
                    <NavLink to="/issues" className={({ isActive }) =>
                        isActive ? "text-pink-600 text-xl  font-extrabold" : "text-gray-700 text-xl font-semibold hover:text-pink-500"
                    }>Issues</NavLink>
                    <NavLink to="/login" className={({ isActive }) =>
                        isActive ? "text-pink-600 text-xl  font-extrabold" : "text-gray-700 text-xl font-semibold hover:text-pink-500"
                    }>Login</NavLink>
                    <NavLink to="/signup" className={({ isActive }) =>
                        isActive ? "text-pink-600 text-xl  font-extrabold" : "text-gray-700 text-xl font-semibold hover:text-pink-500"
                    }>Register</NavLink>
                </>
            ) : (
                <>
                    <div className='flex pl-5 gap-1 lg:gap-10'>
                        <NavLink to='/allIssues' className={({ isActive }) =>
                            isActive ? "flex text-pink-600 text-sm lg:text-xl  font-extrabold" : "flex text-gray-700 text-sm lg:text-xl font-semibold hover:text-pink-500"
                        }> <p>All issues</p> <span class="material-symbols-outlined opacity-0 absolute lg:opacity-100 lg:relative">
                                all_inbox
                            </span></NavLink>
                        <NavLink to='/addissue' className={({ isActive }) =>
                            isActive ? "flex text-pink-600 text-sm lg:text-xl font-extrabold" : "flex text-gray-700 text-sm lg:text-xl font-semibold hover:text-pink-500"
                        }> <p> Add issue </p><span class="material-symbols-outlined opacity-0 absolute lg:opacity-100 lg:relative">
                                add_ad
                            </span></NavLink>
                        <NavLink to='/myissues' className={({ isActive }) =>
                            isActive ? "flex text-pink-600 text-sm lg:text-xl  font-extrabold" : "flex text-gray-700 text-sm lg:text-xl font-semibold hover:text-pink-500"
                        }> <p> My issues</p> <span class="material-symbols-outlined opacity-0 absolute lg:opacity-100 lg:relative">
                                error
                            </span></NavLink>
                        <NavLink to='/mycontribution' className={({ isActive }) =>
                            isActive ? "flex text-pink-600 text-sm lg:text-xl  font-extrabold" : "flex text-gray-700 text-sm lg:text-xl font-semibold hover:text-pink-500"
                        }> <p>My Contribution </p> <span class="material-symbols-outlined opacity-0 absolute lg:opacity-100 lg:relative">
                                volunteer_activism
                            </span></NavLink>
                    </div>

                    <NavLink to='/myprofile' className={({ isActive }) =>
                        isActive ? "flex text-pink-600 text-sm lg:text-xl font-extrabold" : "flex text-gray-700 text-sm lg:text-xl font-semibold hover:text-pink-500"
                    }> <p>My Profile </p><span class="material-symbols-outlined opacity-0 absolute lg:opacity-100 lg:relative">
                            account_circle
                        </span> </NavLink>
                </>
            )}
        </div>
    )
}

export default Navbar