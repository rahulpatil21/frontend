import { createContext, useContext, useState } from 'react';

const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [reloadFlag, setReloadFlag] = useState(false);
  const [currentCagr, setCurrentCagr] = useState()
  const [optimisedCagr, setOptimisedCagr] = useState()
  const handleReload = () => {
    setReloadFlag(!reloadFlag);
  };

  const contextValue = {
    reloadFlag,
    handleReload,
    currentCagr,
    setCurrentCagr,
    optimisedCagr,
    setOptimisedCagr,
  };

  return (
    <ReloadContext.Provider value={contextValue}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => {
  return useContext(ReloadContext);
};
