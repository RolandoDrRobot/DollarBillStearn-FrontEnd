
import * as React from 'react';
import { useLocalStorage } from './useLocalStorage';

const globalContext = React.createContext();

// Provider in your app
function GlobalContextProvider(props) {

  return (
    <globalContext.Provider value={{
      
    }}>
    {props.children}
    </globalContext.Provider>
  );
};

export { globalContext, GlobalContextProvider };