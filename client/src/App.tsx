import { BrowserRouter } from "react-router-dom";

import Router from "./util/Router";

import { AuthStateProvider } from "./util/AuthState";

function App() {
  return (
    <BrowserRouter>
      <div>
        <AuthStateProvider>
          <Router />
        </AuthStateProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
