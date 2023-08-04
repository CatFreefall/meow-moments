import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";

import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/register/Register";
import Confirm from "../pages/auth/Confirm";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Illustrations from "../pages/illustrations/Illustrations";
import Photos from "../pages/photos/Photos";
import Videos from "../pages/videos/Videos";
import TrendingIllustrations from "../pages/illustrations/TrendingIllustrations";
import TrendingPhotos from "../pages/photos/TrendingPhotos";
import TrendingVideos from "../pages/videos/TrendingVideos";

import Hashtags from "../pages/hashtags/Hashtags";
import Post from "../pages/post/Post";
import UserProfile from "../pages/profile/UserProfile";
import ChangeProfilePage from "../pages/profile/components/ChangeProfilePage";

import NoPage from "../pages/NoPage";

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

      {/* TODO: add pages for when the user clicks to focus a post */}
      <Route path="/illustrations" element={<Illustrations />} />
      {/* <Route path="/illustrations/:id" element={<Illustrations />} /> */}
      <Route path="/illustrations/recent" element={<Illustrations />} />
      <Route
        path="/illustrations/trending"
        element={<TrendingIllustrations />}
      />

      <Route path="/photos" element={<Photos />} />
      {/* <Route path="/photos/:id" element={<Photos />} /> */}
      <Route path="/photos/recent" element={<Photos />} />
      <Route path="/photos/trending" element={<TrendingPhotos />} />

      <Route path="/videos" element={<Videos />} />
      {/* <Route path="/videos/:id" element={<Videos />} /> */}
      <Route path="/videos/recent" element={<Videos />} />
      <Route path="/videos/trending" element={<TrendingVideos />} />

      <Route path="/hashtags" element={<Hashtags />} />

      <Route path="/post" element={<Post />} />

      <Route path="/profile/:username" element={<UserProfile />} />
      <Route path="/profile/:username/change-profile" element={<ChangeProfilePage />} />

      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default Router;
