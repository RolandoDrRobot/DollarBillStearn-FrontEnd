
import * as React from 'react';
import useVaults from './useVaults';

const globalContext = React.createContext();

// Provider in your app
function GlobalContextProvider(props) {
  const vaults = useVaults();

  return (
    <globalContext.Provider value={{
      vaults
    }}>
    {props.children}
    </globalContext.Provider>
  );
};

export { globalContext, GlobalContextProvider };
