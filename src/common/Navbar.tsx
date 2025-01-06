import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Navbars = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("userId");
  const isActive = (path: string) => window.location.pathname === path;

  useEffect(() => {
    if (userId) {
      dispatch(ProfileRequest(userId));
    }
  }, []);

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Brand Icon</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">
            <FontAwesomeIcon icon={faHome} size="xl" />
            <span className="nav-label">Home</span>
          </Nav.Link>
          <Nav.Link href="#Profile">Profile</Nav.Link>
          <Nav.Link href="#Friends">Friend List</Nav.Link>
          <Nav.Link href="#Setting">Setting</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbars;
