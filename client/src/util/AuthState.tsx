import React, { useState, createContext, useContext } from "react";

type AuthContextTypes = [
  authState: string,
  setAuthState: React.Dispatch<React.SetStateAction<string>>,
]

const AuthContext = createContext({} as AuthContextTypes);

const AuthStateProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState("logged out");

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthStateProvider, useAuthContext };
