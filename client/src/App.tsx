import { BrowserRouter } from "react-router-dom";

import Router from "./util/Routes";

import Navbar from "./components/navbar/Navbar";

import { AuthStateProvider } from "./util/AuthState";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthStateProvider>
          <Navbar />
          <Router />
        </AuthStateProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
