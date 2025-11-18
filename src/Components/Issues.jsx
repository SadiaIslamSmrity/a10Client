import React from 'react'
import { Link, useLoaderData } from 'react-router'

const Issues = () => {
    const complaints = useLoaderData();
  return (
    <div>
        <div className='py-10'>
        <p className='text-6xl font-bold text-center px-5 pt-10 pb-20'>Issues in Our Dhaka</p>

        {/* cards complaints */}
        <div className='px-10 lg:px-30 grid lg:grid-cols-3 gap-5'>

          {complaints.sort((a, b) => new Date(b.Date) - new Date(a.Date)).slice(0, 9).map(complaint => (<div key={complaint._id} complaint=
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
      <div className='w-full flex justify-center items-center pb-10'>
              <Link to='/allIssues' className='bg-blue-400 hover:bg-blue-700 hover:text-white w-fit p-4 text-xl font-extrabold rounded-full'>Show All </Link>
            </div>
    </div>
  )
}

export default Issues