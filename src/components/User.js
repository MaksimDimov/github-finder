import React, { useEffect, useState } from 'react'; // Importing React and hooks
import { useParams } from 'react-router-dom'; // Importing useParams hook from react-router-dom
import axios from 'axios'; // Importing axios for making HTTP requests
import { motion } from 'framer-motion'; // Importing motion from framer-motion for animations

const User = () => { // Defining the User component
  const { username } = useParams(); // Getting the username from the URL parameters
  const [userData, setUserData] = useState(""); // State for storing user data
  const [repos, setRepos] = useState([]); // State for storing user's repositories

  useEffect(() => { // useEffect hook to fetch user data on component mount
    const fetchUserData = async () => { // Asynchronous function to fetch user data
      try {
        const token = process.env.REACT_APP_GITHUB_TOKEN; // Retrieve the GitHub token from environment variables
        const options = { // Set up the authorization headers
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options); // Fetch user data
        setUserData(userResponse.data); // Set user data state

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options); // Fetch user repositories
        setRepos(reposResponse.data); // Set repositories state
      } catch (error) { // If there's an error in the request
        console.error('Error fetching user data:', error); // Log the error
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [username]); // Dependency array to run the effect when username changes

  const shortDescription = (description) => { // Function to shorten the repository description
    if (!description) return 'No description available'; // Return default message if no description
    return description.length > 100 ? description.substring(0, 100) + '...' : description; // Shorten description if it exceeds 100 characters
  };

  return (
    <motion.div // Wrapping the component in a motion.div for animations
      initial={{ opacity: 0, y: -150 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation state after mounting
      exit={{ opacity: 0, y: -100 }} // Animation state on exit
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      <div className="container"> {/* Main container for the user data */}
        {userData && ( // Conditionally render the user data if it exists
          <>
            <h1>{userData.name}</h1> {/* Display user name */}
            <p>{userData.bio}</p> {/* Display user bio */}
            <img className='avatar' src={userData.avatar_url} alt={`${userData.name}'s avatar`} /> {/* Display user avatar */}
            <h2>Repositories</h2> {/* Heading for repositories section */}
            <ul className='repositories-part'> {/* List of repositories*/}
              {repos.map(repo => ( // Map over repositories and render each one
                <li key={repo.id} className='repository'> {/* List item for each repository */}
                  <div className='repo-info-top'> {/* Container for repository info */}
                    <strong>{repo.name}</strong> {/* Display repository name */}
                    <p>{new Date(repo.created_at).toLocaleDateString()}</p> {/* Display repository creation date */}
                  </div>
                  <p className='repo-description'>{shortDescription(repo.description)}</p> {/* Display shortened description */}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default User; // Export the User component
