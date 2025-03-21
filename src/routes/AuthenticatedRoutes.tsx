import { Route, Routes } from "react-router-dom";
import Layout from "../common/Layout";
import Home from "../Home";
import FriendLists from "../FriendLists";
import Settings from "../Settings";
import Profile from "../Profile";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="friend-list" element={<FriendLists />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AuthenticatedRoutes;
