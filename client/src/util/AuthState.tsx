import React, { useState, createContext, useContext, useEffect } from "react";

type AuthContextTypes = {
  authentication: [
    authState: boolean,
    setAuthState: React.Dispatch<React.SetStateAction<boolean>>
  ];
  verification: [
    verified: boolean,
    setVerified: React.Dispatch<React.SetStateAction<boolean>>
  ];
};

const AuthContext = createContext({} as AuthContextTypes);

const AuthStateProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [verified, setVerified] = useState(false);

  // this is done to maintain authentication and verification state on page refresh
  useEffect(() => {
    setAuthenticated(document.cookie.indexOf("verified") !== -1 ? true : false);
    setVerified(document.cookie.indexOf("verified=true") !== -1 ? true : false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authentication: [authenticated, setAuthenticated],
        verification: [verified, setVerified],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthStateProvider, useAuthContext };
