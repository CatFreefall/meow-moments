import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Confirm from "../pages/auth/Confirm";
import ForgotPassword from "../pages/auth/ForgotPassword";

import AuthWrapper from "../components/common/AuthWrapper";

import Illustrations from "../pages/illustrations/Illustrations";
import Photos from "../pages/photos/Photos";
import Videos from "../pages/videos/Videos";

import NoPage from "../pages/NoPage";
import Navbar from "./common/NavBar/Navbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/confirm/:username/:token" element={<Confirm />} />
        <Route
          path="/password-reset-req/:user/:token"
          element={<ForgotPassword />}
        />

        <Route
          path="/illustrations"
          element={<AuthWrapper Component={Illustrations} />}
        />
        <Route path="/photos" element={<AuthWrapper Component={Photos} />} />
        <Route path="/videos" element={<AuthWrapper Component={Videos} />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
};

export default Router;
