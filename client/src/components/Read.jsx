import React, { useEffect, useState } from "react";  // Importing necessary hooks
import { Link } from "react-router-dom";  // Importing Link for navigation

const Read = () => {
  const [data, setData] = useState([]);  // State to store the list of users
  const [error, setError] = useState("");  // State to store any error message

  // Function to handle deleting a user
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",  // Use DELETE method to delete the user
    });

    if (response.ok) {  // If the deletion is successful
      setError("Deleted Successfully");  // Set success message in state
      getData();  // Fetch the updated list of users
    }
  };

  // Fetch the list of users from the server
  const getData = async () => {
    const response = await fetch("http://localhost:8000/");
    const result = await response.json();  // Convert response to JSON
    if (response.ok) {
      setData(result);  // Store the fetched data in state
    } else {
      setError(result.error);  // Handle any errors
    }
  };

  useEffect(() => {
    getData();  // Fetch the data when the component mounts
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        {error && (  // Display error message if any
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="mb-4">
                <h5 className="text-xl font-bold text-gray-900"> {user.fname} {user.lname} </h5>  {/* Display user's name */}
                <p className="text-gray-600">{user.email}</p>  {/* Display user's email */}
              </div>
              <p className="text-gray-700">{user.age} years old</p>  {/* Display user's age */}
              <div className="flex justify-between mt-4">
                <Link
                  to={`/update/${user._id}`}  // Link to the update page for this user
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-300"
                  onClick={() => handleDelete(user._id)}  // Delete the user on button click
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Read;