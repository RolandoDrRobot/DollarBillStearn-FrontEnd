
import * as React from 'react';
import useVaults from './useVaults';
import usePrices from './usePrices';

const globalContext = React.createContext();

// Provider in your app
function GlobalContextProvider(props) {
  const vaults = useVaults();
  const prices = usePrices();

  return (
    <globalContext.Provider value={{
      vaults,
      prices
    }}>
    {props.children}
    </globalContext.Provider>
  );
};

export { globalContext, GlobalContextProvider };
