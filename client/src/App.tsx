import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

import { AuthStateProvider } from "./hooks/useAuthState";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <Router />
        <Navbar />
      </AuthStateProvider>
    </BrowserRouter>
  );
}

export default App;
