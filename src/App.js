import React from 'react'; // Importing React
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route components from react-router-dom
import { AnimatePresence } from 'framer-motion'; // Importing AnimatePresence from framer-motion for route animations
import Search from './components/Search'; // Importing the Search component
import User from './components/User'; // Importing the User component
import './App.css'; // Importing the main CSS file for the app
import './style/index.css'; // Importing additional styles

const App = () => { // Defining the App component
  return (
    <AnimatePresence> {/* AnimatePresence component to enable animations for route transitions */}
      <Routes> {/* Routes component to define route paths */}
        <Route path="/" element={<Search />} /> {/* Route for the Search component */}
        <Route path="/user/:username" element={<User />} /> {/* Route for the User component with a dynamic username parameter */}
      </Routes>
    </AnimatePresence>
  );
};

export default App; // Exporting the App component as the default export
