import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <AuthenticatedRoutes />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
