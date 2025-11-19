import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import { Helmet } from 'react-helmet-async';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Mycontribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    if (user?.useremail) {
      fetch(`${API_URL}/contribution/${user.useremail}`)
        .then(res => res.json())
        .then(data => Array.isArray(data) && setContributions(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!user) return <Login />;

  const downloadPDF = () => {
    if (!contributions.length) {
      alert("No contributions to download!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("My Contributions", 14, 22);

    const tableColumn = ["Title", "Category", "Amount Paid"];
    const tableRows = contributions.map(c => [c.Title, c.Category, c.PaidAmount]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("my_contributions.pdf");
  };

  return (
    <div className='p-20'>
      <Helmet>
        <title>My profile | OurDhaka</title>
      </Helmet>

      <h1 className='text-3xl text-pink-600 font-extrabold w-full text-center py-10'>{user.useremail}'s Contributions</h1>

      {contributions.length === 0 ? (
        <p>No contributions found.</p>
      ) : (
        <>
          <div className='w-full flex justify-end'>
            <button
              onClick={downloadPDF}
              className="flex cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
              <p>Download as PDF</p>

              <span class="material-symbols-outlined">
                download
              </span>
            </button>
          </div>


          <div >

            {contributions.map(c => (
              <div key={c._id} className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition flex justify-between my-5">
                <div>
                  <p className="text-2xl font-bold"><strong>Title:</strong> {c.Title}</p>
                  <p><strong>Category:</strong> {c.Category}</p>
                  <p><strong>Amount Paid:</strong> {c.PaidAmount}</p>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Mycontribution;
