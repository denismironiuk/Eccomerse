export  const retrieveSessionData = () => {
    const sessionData = localStorage.getItem('sessionData');
  
    // Check if session data exists
    if (sessionData) {
      try {
        // Parse the session data from JSON string to object
        return JSON.parse(sessionData);
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    } else {
      // Session data does not exist
      return null;
    }
  };