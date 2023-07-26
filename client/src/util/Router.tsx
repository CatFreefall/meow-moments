import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";

import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/register/Register";
import Confirm from "../pages/auth/Confirm";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Illustrations from "../pages/illustrations/Illustrations";
import Photos from "../pages/photos/Photos";
import Videos from "../pages/videos/Videos";

import NoPage from "../pages/NoPage";
import Hashtags from "../pages/hashtags/Hashtags";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/confirm/:username/:token" element={<Confirm />} />
      <Route
        path="/password-reset-req/:user/:token"
        element={<ForgotPassword />}
      />

      <Route path="/illustrations" element={<Illustrations />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/hashtags" element={<Hashtags />} />

      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default Router;
