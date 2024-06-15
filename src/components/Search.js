import React, { useState } from 'react'; // Importing React and the useState hook
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import axios from 'axios'; // Importing axios for making HTTP requests
import { motion } from 'framer-motion'; // Importing motion from framer-motion for animations

const Search = () => { // Defining the Search component
  const [username, setUsername] = useState(''); // State for storing the GitHub username input
  const [error, setError] = useState(''); // State for storing error messages
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleSubmit = async (e) => { // Function to handle form submission
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const token = process.env.REACT_APP_GITHUB_TOKEN; // Retrieve the GitHub token from environment variables
      const options = { // Set up the authorization headers
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`https://api.github.com/users/${username}`, options); // Make a GET request to the GitHub API
      if (response.data) { // If the response contains data
        navigate(`/user/${username}`); // Navigate to the user page
      }
    } catch (error) { // If there's an error in the request
      setError('User not found or unauthorized'); // Set the error message
    }
  };

  return (
    <motion.div // Wrapping the component in a motion.div for animations
      initial={{ opacity: 0, y: -200 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation state after mounting
      exit={{ opacity: 0, y: -100 }} // Animation state on exit
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      <div className="search-container"> { /*Main container for the search component */}
        <h1>GitHub User Finder</h1> {/* Heading for the search page */}
        <form onSubmit={handleSubmit}> {/* Form element with onSubmit handler */}
          <input
            className='search-input' // CSS class for styling
            type="text" // Input type
            value={username} // Value of the input field
            placeholder="Enter GitHub username" // Placeholder text
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
          />
          <button className="search-button" type="submit">Search</button> {/* Submit button */}
        </form>
        <p className={`error ${error ? 'active' : ''}`}>{error}</p> {/* Error message paragraph, conditionally styled */}
      </div>
    </motion.div>
  );
};

export default Search; // Export the Search component
