import React from "react";  // Importing React
import { Link } from "react-router-dom";  // Importing Link for navigation

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="text-white font-bold text-lg">
          CRUD
        </Link>  {/* Home link in the navbar */}
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-indigo-500 py-2 px-4 rounded transition"
          >
            Add User
          </Link>  {/* Link to the create user page */}
          <Link
            to="/read"
            className="text-white hover:bg-indigo-500 py-2 px-4 rounded transition"
          >
            View Users
          </Link>  {/* Link to the view users page */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;