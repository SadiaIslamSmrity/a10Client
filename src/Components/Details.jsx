import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useLoaderData } from 'react-router'
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";



const Details = () => {
    const complaint = useLoaderData();
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [contribution, setContribution] = useState("");
    const [paidBy, setPaidBy] = useState(user?.useremail || "");

    const handleContribute = async (e) => {
        e.preventDefault();
        if (!contribution || Number(contribution) <= 0) return;

        try {
            const res = await fetch(`http://localhost:3000/complaints/contribute/${complaint._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contribution, useremail: user.useremail }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Contribution added successfully!");

                await fetch("http://localhost:3000/contribution", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        Title: complaint.Title,
                        Category: complaint.Category,
                        PaidAmount: contribution,
                        Paidby: paidBy
                    })
                });


                setShowModal(false);
                setContribution("");
                window.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting contribution.");
        }
    };

    return (
        <div className='px-15 lg:px-40'>
            <Helmet>
                <title>Details | OurDhaka</title>
            </Helmet>
            <p className='text-6xl py-10 text-pink-600 font-bold text-center'>Issue Details</p>

            <div className='lg:flex lg:flex-row-reverse justify-between'>

                <div className='px-5 lg:py-20 lg:w-1/2'>
                    <img src={complaint.Image} />
                </div>

                <div className='py-10'>
                    <p className='text-3xl font-bold py-5 border-b-3 border-pink-600'>{complaint.Title}</p>
                    <p className='py-2 text-xl'><span className='font-semibold'>Description: </span> {complaint.Description}</p>
                    <p className='py-2 text-lg'><span className='font-semibold'>Issue Category: </span> {complaint.Category}</p>
                    <p className='py-2 text-lg'><span className='font-semibold'>Location: </span>{complaint.Location}</p>
                    <p className='py-2 text-lg'><span className='font-semibold'>Date: </span>{complaint.Date}</p>
                    <p className='py-2 text-lg'><span className='font-semibold'>Fund Needed: </span> {complaint.Amount}</p>
                    <p className='py-2 text-lg text-red-700'><span className='font-semibold text-black'>Status: </span> {complaint.Status}</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-700"
                    >
                        Contribute
                    </button>
                </div>

            </div>



            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-[90%] md:w-[400px]">
                        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
                            Contribute to this Issue
                        </h2>
                        <form onSubmit={handleContribute} className="flex flex-col gap-4">
                            <input
                                type="number"
                                name='PaidAmount'
                                placeholder="Enter contribution amount"
                                value={contribution}
                                onChange={(e) => setContribution(e.target.value)}
                                className="border p-2 rounded"
                                required
                            />
                            <input type="text" name="Title" value={complaint.Title} readOnly className="border p-3" />
                            <input type="text" name="Category" value={complaint.Category} readOnly className="border p-3" />
                            <input
                                type="text"
                                name="Paidby"
                                value={paidBy}
                                onChange={(e) => setPaidBy(e.target.value)}
                                className="border p-3"
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Details