import React, { useState } from 'react';
import UserDataContext from "./UserDataContext";



const UserDataProvider = ({ children }) => {
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const setUser = (value) => {
    setUserState(value);
    localStorage.setItem("user", JSON.stringify(value || {}));
  };
  
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      { children }
    </UserDataContext.Provider>
  )
}

export default UserDataProvider;
