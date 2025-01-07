import { Route, Routes } from "react-router-dom";
import Layout from "../common/Layout";
import Home from "../Home";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
