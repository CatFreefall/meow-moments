import { BrowserRouter } from "react-router-dom";
import Router from "./util/Router";
import { Provider } from "react-redux";

import store from "./app/store";
import { AuthStateProvider } from "./util/AuthState";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthStateProvider>
          <Router />
          <Navbar />
        </AuthStateProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
