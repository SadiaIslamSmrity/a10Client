import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import Swiperpage from './Swiperpage';
import { Helmet } from 'react-helmet-async';
import { Typewriter } from 'react-simple-typewriter';



const Home = () => {

  const complaints = useLoaderData()
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };


  return (
    <div>
      <div className='lg:w-full flex justify-end pr-5 lg:pr-20 text-sm'>
        <button
          onClick={toggleTheme}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
            backgroundColor: theme === "dark" ? "#fff" : "#333",
            color: theme === "dark" ? "#000" : "#fff"
          }}
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      <Helmet>
        <title>Home | OurDhaka</title>
      </Helmet>
      {/* intro */}
      <div className='lg:flex lg:flex-row-reverse p-10 lg:p-20 pt-5'>

        <div>
          <img src="/introimg.jpg" className="fancy-box" />
        </div>

        <div className='w-full lg:w-1/2'>
          <p className='text-6xl font-extrabold text-pink-800 py-5'>Our Dhaka</p>
          <p className='text-2xl font-bold'>
            <Typewriter
              words={['Empowering Citizens, Transforming Neighborhoods']}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </p>
          <p className='text-lg font-bold py-3 text-gray-500' >Welcome to OUR DHAKA, a platform dedicated to making our city cleaner, safer, and more livable for everyone. Every street, park, and corner of Dhaka belongs to its people—and your voice matters.
            With OUR DHAKA, you can:
            Report overflowing trash bins, illegal construction, broken public property, and damaged roads.
            Track the progress of your submissions and see real change happen.
            Connect with fellow citizens and contribute to a cleaner, greener, and safer community.
            Whether you’re passionate about sustainability, public safety, or simply taking pride in your neighborhood, OUR DHAKA gives you the power to act. Together, we can transform our city—one report, one action, one citizen at a time.
            Join us today and be part of Dhaka’s transformation!</p>
        </div>

      </div>
      {/* pink box */}
      <div className='bg-pink-500 lg:flex justify-around px-5 lg:px-20 py-10'>
        <div className="fancy2">
          <img src="/goal.png" className='p-10' />
        </div>

        <div className='flex flex-col justify-center'>
          <p className='text-5xl lg:text-6xl font-bold'>Our Goal</p>
          <ul className='list-disc text-xl lg:text-2xl px-10 lg:px-0'>
            <li>Promote a Cleaner, Greener City</li>
            <li>Empower Every Citizen’s Voice</li>
            <li>Bridge the Gap Between People and Action</li>
            <li>Encourage Sustainable Practices</li>
            <li>Build a Connected Community</li>
            <li>Highlight Urban Challenges</li>
            <li>Promote Transparency and Accountability</li>
            <li>Recognize Active Contributors</li>
          </ul>
        </div>
      </div>

      {/* Banner - Swiper Slides */}
      <div className="w-full h-[80vh] p-5 lg:p-10">
        <p className='w-full text-center text-6xl font-extrabold py-10'>Our Focus</p>
        <Swiperpage />
      </div>


      {/* Category */}
      <div className='py-20'>
        <p className='text-6xl font-extrabold text-center py-10'>Concerned Categories</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 px-20 lg:px-30">

          <div className='hover:border-4 hover:bg-yellow-50 border-2 border-yellow-500 transition ease-in-out rounded-4xl flex items-center px-3 lg:py-6 justify-center'>
            <img src="/garbagecartoon.avif" className='rounded-3xl h-20 w-20' />
            <p className='text-3xl font-bold text-center items-center'>Garbage</p>
          </div>

          <div className='hover:border-4 hover:bg-yellow-50 border-2 border-yellow-500 transition ease-in-out rounded-4xl flex items-center px-3 lg:py-6 justify-center'>
            <img src="/illegal.webp" className='rounded-3xl h-20 w-20' />
            <p className='text-3xl font-bold text-center'>Illegal Construction</p>
          </div>

          <div className='hover:border-4 hover:bg-yellow-50 border-2 border-yellow-500 transition ease-in-out rounded-4xl flex items-center px-3 lg:py-6 justify-center'>
            <img src="/publicproperty.avif" className='rounded-3xl h-20 w-20' />
            <p className='text-3xl font-bold text-center items-center'>Broken Public Property</p>
          </div>

          <div className='hover:border-4 hover:bg-yellow-50 border-2 border-yellow-500 transition ease-in-out rounded-4xl flex items-center px-3 lg:py-6 justify-center'>
            <img src="/roaddamage.jpg" className='rounded-3xl h-20 w-20' />
            <p className='text-3xl font-bold text-center items-center'>Road Damage</p>
          </div>

        </div>
      </div>


      {/* recent complaints */}
      <div className='py-10'>
        <p className='text-6xl font-bold text-center pt-10'>Recent Complaints</p>

        {/* cards complaints */}
        <div className='px-10 lg:px-30 grid grid-cols-1 lg:grid-cols-3 gap-5'>

          {complaints.sort((a, b) => new Date(b.Date) - new Date(a.Date)).slice(0, 6).map(complaint => (<div key={complaint._id} complaint=
            {complaint}>
            <div className='p-10 hover:scale-101 transition ease-in-out'>
              <img src={complaint.Image} className='h-[40vh] w-[40vh] object-cover rounded-3xl' />
              <div>
                <div className='border-y-3 my-8 py-2'>
                  <p className='text-3xl font-semibold'>{complaint.Title}</p>
                  <p className='text-lg font-semibold text-pink-600'>{complaint.Date}</p>
                </div>
                <p>{complaint.Description}</p>
                <p className='text-lg font-extrabold'>{complaint.Location}</p>
                <div className='flex justify-between py-3'>
                  <p className='font-bold bg-pink-200 w-fit p-3 rounded-3xl justify-center text-center'>{complaint.Category}</p>
                  <Link to={`/details/${complaint._id}`} className='bg-pink-600 hover:bg-pink-800 px-2 py-3 rounded-3xl font-extrabold text-white text-center'>See Details</Link>
                </div>

              </div>

            </div>
          </div>))}

        </div>
      </div>

      <div className='w-full flex justify-center items-center pb-20'>
        <Link to='/allIssues' className='flex bg-blue-400 hover:bg-blue-700 hover:text-white w-fit p-4 text-xl font-extrabold rounded-full'><p>Show All </p><span class="material-symbols-outlined">
          all_inbox
        </span> </Link>
      </div>

    </div>
  )
}

export default Home