import React, { useState, createContext } from 'react';

const UserContext = createContext({
  userData: null,
  setUserData: (userData) => {},
});

export const UserContextProvider = (props) => {
  const [userData, setUserData] = useState(null);

  const setUserDataHandler = (userData) => {
    setUserData(userData);
  };

  const contextValue = {
    userData: userData,
    setUserData: setUserDataHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
