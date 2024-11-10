import React, { useEffect, useState } from "react";  // Importing necessary hooks
import { useNavigate, useParams } from "react-router-dom";  // Importing hooks to navigate and access URL parameters

const Update = () => {
  const [fname, setFirstName] = useState("");  // State to store the user's name
  const [lname, setLastName] = useState("");  // State to store the user's name
  const [email, setEmail] = useState("");  // State to store the user's email
  const [age, setAge] = useState(0);  // State to store the user's age
  const [error, setError] = useState("");  // State to store any error message

  const { id } = useParams();  // Get the user's ID from the URL
  const navigate = useNavigate();  // Hook to programmatically navigate to different routes

  // Fetch single user data by ID
  const getSingleData = async () => {
    const response = await fetch(`http://localhost:8000/${id}`);  // Fetch the user's data
    const result = await response.json();  // Convert the response into JSON
    if (response.ok) {  // If the response is successful
      setFirstName(result.fname);  // Set the fetched name to state
      setLastName(result.lname);  // Set the fetched name to state
      setEmail(result.email);  // Set the fetched email to state
      setAge(result.age);  // Set the fetched age to state
    }
  };

  // Handle form submission to update the user
  const handleUpdate = async (e) => {
    e.preventDefault();  // Prevent page reload on form submission
    const updatedUser = { fname, lname, email, age };  // Create an object with updated user data

    const response = await fetch(`http://localhost:8000/edit/${id}`, {
      method: "PATCH",  // Use PATCH method to update the data
      headers: { "Content-Type": "application/json" },  // Specify content type
      body: JSON.stringify(updatedUser),  // Convert user object to JSON for sending
    });

    if (response.ok) {  // If the update is successful
      navigate("/read");  // Redirect to the users' listing page
    } else {
      const result = await response.json();  // Handle errors if any
      setError(result.error);  // Set error message in state
    }
  };

  useEffect(() => {
    getSingleData();  // Fetch the user's current data when the component mounts
  }, []);  // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Edit User
        </h1>

        {error && (  // If there is an error, display it
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">  {/* Form for updating user */}
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}  // Update the name in state
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={lname}
              onChange={(e) => setLastName(e.target.value)}  // Update the name in state
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update the email in state
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={age}
              onChange={(e) => setAge(e.target.value)}  // Update the age in state
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;