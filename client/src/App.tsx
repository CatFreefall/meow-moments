import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import Confirm from "./pages/Confirm";
import ForgotPassword from "./pages/ForgotPassword";

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
            <Route path="/password-reset-req/:user/:token" element={<ForgotPassword />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
