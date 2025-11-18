import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLoaderData } from 'react-router'
import { motion } from 'framer-motion';

const Allissues = () => {
  const complaints = useLoaderData()

  // States
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Categories list
  const categories = ["All", ...new Set(complaints.map(c => c.Category))];

  // STATUS options
  const statusOptions = ["All", "Solved", "Unsolved"];

  // Filter logic
  const filteredComplaints = complaints.filter(c => {
    const categoryMatch = categoryFilter === "All" || c.Category === categoryFilter;
    const statusMatch = statusFilter === "All" || c.Status === statusFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div>
      <Helmet>
        <title>All issues | OurDhaka</title>
      </Helmet>

      <div>
        <p className='text-6xl font-bold text-center py-10'>All Complaints</p>

        {/* Filters */}
        <div className='w-full flex justify-end px-5 lg:px-20 gap-5'>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='border border-gray-400 h-fit p-1 rounded-4xl text-sm text-gray-500'
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='border border-gray-400 h-fit p-1 rounded-4xl text-sm text-gray-500'
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

        </div>

        {/* Complaint Cards */}
        <div className='px-10 lg:px-30 grid lg:grid-cols-3 gap-5'>
          {filteredComplaints.length === 0 ? (
            <p className='text-center col-span-3'>No complaints found for selected filters.</p>
          ) : (
            filteredComplaints.map((complaint, index) => (
              <motion.div
                key={complaint._id}
                initial={{ opacity: 0, y: 100 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.3 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className='p-10 hover:scale-101 transition ease-in-out'>
                  <img src={complaint.Image} className='h-[40vh] w-[40vh] object-cover rounded-3xl' />

                  <div>
                    <div className='border-y-3 my-8 py-2'>
                      <p className='text-3xl font-semibold'>{complaint.Title}</p>
                      <p className='text-lg font-semibold text-pink-600'>{complaint.Date}</p>
                    </div>

                    <p>{complaint.Description}</p>
                    <p className='text-lg font-extrabold'>{complaint.Location}</p>

                    <p className='text-orange-400 text-sm'>
                      Status: {complaint.Status}
                    </p>

                    <div className='flex justify-between py-3'>
                      <p className='font-bold bg-pink-200 w-fit p-3 rounded-3xl text-center'>
                        {complaint.Category}
                      </p>

                      <Link
                        to={`/details/${complaint._id}`}
                        className='bg-pink-600 hover:bg-pink-800 px-2 py-3 rounded-3xl font-extrabold text-white'
                      >
                        See Details
                      </Link>

                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Allissues
