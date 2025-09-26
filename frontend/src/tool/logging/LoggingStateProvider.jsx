import React, { useState } from 'react';
import LoggingContext from "./LoggingContext";


const LoggingStateProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  
  return (
    <LoggingContext.Provider value={{ logged, setLogged }}>
      { children }
    </LoggingContext.Provider>
  )
}

export default LoggingStateProvider;
