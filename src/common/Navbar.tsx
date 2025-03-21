import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { ProfileRequest } from "../redux/slice/profileSlice";
import socialIcon from "../assets/images/social-icon.webp";
import toast from "react-hot-toast";
const Navbars = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("userId");
  const isActive = (path: string) => window.location.pathname === path;

  useEffect(() => {
    if (userId) {
      dispatch(ProfileRequest(userId));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="home">
          <img
            src={socialIcon}
            alt="Social Media Logo"
            style={{ maxWidth: "50px", height: "auto", borderRadius: "10px" }}
          />
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link
            href="/home"
            className="nav-icon d-flex flex-column align-items-center fw-bold"
            style={{ color: isActive("/home") ? "#033491" : "#242d49" }}
          >
            <FontAwesomeIcon icon={faHome} size="xl" />
            <span className="nav-label">Home</span>
          </Nav.Link>
          <Nav.Link href="friend-list">Friend List</Nav.Link>
          <Nav.Link href="profile">Profile</Nav.Link>
          <Nav.Link href="setting">Setting</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbars;
