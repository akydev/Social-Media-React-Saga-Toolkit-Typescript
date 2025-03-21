import { Col, Container, Row } from "react-bootstrap";
import EditProfile from "./components/EditProfile";

const Settings = () => {
  return (
    <Container>
      <Row className="w-100">
        <Col md={9} className="mx-auto">
          <EditProfile />
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
