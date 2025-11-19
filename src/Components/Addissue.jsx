import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { AuthContext } from './AuthContext';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

const Addissue = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      Title: e.target.Title.value,
      Category: e.target.Category.value,
      Location: e.target.Location.value,
      Description: e.target.Description.value,
      Image: image,
      Amount: e.target.Amount.value,
      Date: e.target.Date.value,
      AddedBy: e.target.AddedBy.value,
      Status: e.target.Status.value
    }

    fetch(`${API_URL}/complaints`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          toast.success('Added successful!')
          e.target.reset();
        } else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error(err)
      })
  }


  return (
    <div>
      <Helmet>
        <title>Add issue | OurDhaka</title>
      </Helmet>
      <div>
        <div>
          <div className='bg-yellow-400 text-center py-10'>
            <p className='text-black text-5xl font-extrabold'>Raise Your Voice For A Better City</p>
            <p className='px-10 lg:px-30 pt-10'>
              Every clean street, every fixed road, every green corner starts with one voice — yours.
              CleanCommunity empowers citizens to take charge of their neighborhoods by reporting issues, tracking progress, and building a cleaner, safer, and more sustainable community.
              Whether it's an overflowing garbage bin, illegal construction, broken public property, or road damage, your report can spark real action. This platform bridges the gap between people and authorities, turning frustration into collaboration.
            </p>
          </div>



          <div className='flex flex-col justify-center items-center w-full py-20 px-10 lg:px-40'>
            <p className='text-5xl text-pink-500 font-bold'>Add an Issue</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full py-8 items-center'>
              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Title :</label>
                <input type="text" name="Title" placeholder='Issue Title' className='border p-2 w-full' required />
              </div>

              <div className="lg:flex w-full justify-around">
                <label className="w-1/3 text-start text-xl font-bold">Category :</label>
                <select name="Category" className="border p-2 h-10 w-full" required>
                  <option value="">Select a Category</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Illegal Construction">Illegal Construction</option>
                  <option value="Broken Public Property">Broken Public Property</option>
                  <option value="Road Damage">Road Damage</option>
                </select>
              </div>

              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Location :</label>
                <input type="text" name="Location" placeholder='Issue Location' className='border p-2 w-full' required />
              </div>

              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Description :</label>
                <input type="text" name="Description" placeholder='Issue Description' className='border p-2 w-full' required />
              </div>

              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Image :</label>
                <input type="text" name="Image" placeholder="Paste image URL" onChange={(e) => setImage(e.target.value)} className="border p-2 w-full" />
              </div>

              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Suggested Fixed Budget :</label>
                <input type="text" name="Amount" placeholder='Enter The Amount Only' className='border p-2 w-full' />
              </div>

              <div className="lg:flex w-full justify-around">
                <label className="w-1/3 text-start text-xl font-bold">Issue Date :</label>
                <input type="date" name="Date" className="border p-2 w-full" required />
              </div>

              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Added By :</label>
                <input type="text" name="AddedBy" className='border p-2 w-full' value={user?.useremail || ''} readOnly />
              </div>

              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Status :</label>

                <div className='w-full flex gap-10 items-center'>
                  <label className='flex items-center text-lg gap-2'>
                    <input type="radio" name="Status" value="Unsolved" required />
                    Unsolved
                  </label>

                  <label className='flex items-center text-lg gap-2'>
                    <input type="radio" name="Status" value="Solved" required />
                    Solved
                  </label>
                </div>
              </div>


              <button type='submit' className='flex cursor-pointer hover:bg-pink-700 bg-pink-500 text-lg text-white py-2 rounded-full p-8 w-fit my-8'><p>Submit</p> <span class="material-symbols-outlined">
add_task
</span></button>
            </form>

          </div>
        </div>

        <div>

        </div>
      </div>
    </div>
  )
}

export default Addissue