import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Confirm from "./pages/auth/Confirm";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/confirm/:username/:token" element={<Confirm />} />
            <Route
              path="/password-reset-req/:user/:token"
              element={<ForgotPassword />}
            />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
