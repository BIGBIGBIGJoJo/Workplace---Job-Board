import React, { useState } from 'react';
import LoggingContext from "./LoggingContext";


const LoggingStateProvider = ({ children }) => {
  const [logged, setLoggedState] = useState(
    () => localStorage.getItem("logged") === "true"
  );

  const setLogged = (value) => {
    setLoggedState(value);
    localStorage.setItem("logged", String(value));
  };
  
  return (
    <LoggingContext.Provider value={{ logged, setLogged }}>
      { children }
    </LoggingContext.Provider>
  )
}

export default LoggingStateProvider;
