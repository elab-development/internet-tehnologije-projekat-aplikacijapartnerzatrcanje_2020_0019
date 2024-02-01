
import { useState, useEffect } from 'react';

const ViewMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDarkMode(event.matches);

    darkModeQuery.addEventListener('change', handleChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return { isDarkMode, toggleDarkMode };
};

export default ViewMode;
