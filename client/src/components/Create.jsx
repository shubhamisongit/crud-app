import React, { useState } from "react";  // Importing necessary hooks
import { useNavigate } from "react-router-dom";  // Hook for navigation

const Create = () => {
  const [fname, setFirstName] = useState("");  // State for user's name
  const [lname, setLastName] = useState("");  // State for user's name
  const [email, setEmail] = useState("");  // State for user's email
  const [age, setAge] = useState(0);  // State for user's age
  const [error, setError] = useState("");  // State to store any error message

  const navigate = useNavigate();  // Hook to programmatically navigate

  // Handle form submission to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on form submission
    const addUser = { fname, lname, email, age };  // Create an object with user data

    const response = await fetch("http://localhost:8000/", {
      method: "POST",  // Use POST method to add new user
      headers: { "Content-Type": "application/json" },  // Specify content type
      body: JSON.stringify(addUser),  // Convert user object to JSON
    });

    if (response.ok) {  // If the user is successfully added
      navigate("/read");  // Redirect to the users' listing page
    } else {
      const result = await response.json();  // Handle errors if any
      setError(result.error);  // Set error message in state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Add User
        </h1>

        {error && (  // Display error message if any
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">  {/* Form for creating user */}
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}  // Update name in state
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={lname}
              onChange={(e) => setLastName(e.target.value)}  // Update name in state
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email in state
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={age}
              onChange={(e) => setAge(e.target.value)}  // Update age in state
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;