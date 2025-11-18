import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const Myissues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [formData, setFormData] = useState({
    Title: "",
    Category: "",
    Amount: "",
    Description: "",
  });

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3000/complaints")
      .then((res) => res.json())
      .then((data) => {
        const userIssues = data.filter(
          (issue) => issue.AddedBy === user.useremail
        );
        setIssues(userIssues);
      })
      .catch((err) => console.error(err));
  }, [user]);


  const openModal = (issue) => {
    setSelectedIssue(issue);
    setFormData({
      Title: issue.Title,
      Category: issue.Category,
      Amount: issue.Amount,
      Description: issue.Description,
      Status: issue.Status,
      Image: issue.Image
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/complaints/${selectedIssue._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Issue updated successfully!");
          setIssues((prev) =>
            prev.map((issue) =>
              issue._id === selectedIssue._id ? { ...issue, ...formData } : issue
            )
          );
          setSelectedIssue(null);
        } else {
          toast.error(data.message || "Update failed!");
        }
      })
      .catch((err) => console.error(err));
  };


  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this issue?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3000/complaints/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Issue deleted successfully!");
          setIssues((prev) => prev.filter((issue) => issue._id !== id));
        } else {
          toast.error(data.message || "Failed to delete issue");
        }
      })
      .catch((err) => console.error(err));
  };

  if (!user) {
    return <p className="text-center text-xl">Loading user info...</p>;
  }

  return (
    <div className="p-10">
      <Helmet>
        <title>My issues | OurDhaka</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-pink-500 text-center mb-8">
        My Reported Issues
      </h1>

      {issues.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No issues reported by {user.username}
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg hover:bg-gray-100 transition lg:flex justify-between"
            >
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-bold">{issue.Title}</h2>
                <p className="text-gray-600 font-semibold">{issue.Category}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Location: {issue.Location}
                </p>
                <p className="mt-2">Description: {issue.Description}</p>

                <p className="mt-2">Fund Needed: {issue.Amount}</p>
                <p className="mt-2 text-gray-800">Added By: {issue.AddedBy}</p>
                <p className="mt-2 text-gray-700">Date: {issue.Date}</p>
                <p className="mt-2 text-gray-700 bg-yellow-300 w-fit p-1">Status: {issue.Status}</p>
                <div className="w-full flex">
                  <button
                    onClick={() => openModal(issue)}
                    className="flex mt-4 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700"
                  >
                    <p>Update</p> <span className="material-symbols-outlined">update</span>
                  </button>

                  <button
                    onClick={() => handleDelete(issue._id)}
                    className="flex mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
                  ><p>Delete</p> <span class="material-symbols-outlined">
                      delete
                    </span></button>
                </div>


              </div>
              <div className="pt-5 lg:w-1/2">
                <img src={issue.Image} className="w-full rounded-xl" />
              </div>

            </div>

          ))}
        </div>
      )}

      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] md:w-[500px]">
            <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
              Update Issue
            </h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <label>Issue Title</label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-2 rounded"
                required
              />
              <label>Issue Category</label>
              <input
                type="text"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-2 rounded"
                required
              />
              <label>Fund Needed</label>
              <input
                type="text"
                name="Amount"
                value={formData.Amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border p-2 rounded"
              />
              <label>Issue Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 rounded h-24 resize-none"
              />
              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Image :</label>
                <input
                  type="text"
                  name="Image"
                  value={formData.Image}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  className="border p-2 w-full"
                />

              </div>
              <div className='lg:flex w-full justify-around'>
                <label className='w-1/3 text-start text-xl font-bold'>Issue Status :</label>

                <div className='w-full flex gap-10 items-center'>
                  <label className='flex items-center text-lg gap-2'>
                    <input
                      type="radio"
                      name="Status"
                      value="Unsolved"
                      checked={formData.Status === "Unsolved"}
                      onChange={handleChange}
                      required
                    />
                    Unsolved
                  </label>

                  <label className='flex items-center text-lg gap-2'>
                    <input
                      type="radio"
                      name="Status"
                      value="Solved"
                      checked={formData.Status === "Solved"}
                      onChange={handleChange}
                      required
                    />
                    Solved
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedIssue(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Myissues;
