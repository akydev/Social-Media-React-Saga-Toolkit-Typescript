import { Col, Container, Row } from "react-bootstrap";
import TrendingCards from "./components/TrendingCards";

const Home = () => {
  return (
    <Container>
      Home contain would be here.
      <Row className="w-100">
        {/* Left Column */}
        <Col md={3}></Col>
        {/* Center Content */}
        <Col md={6}></Col>
        {/* Right Column */}
        <Col md={3}>
          <TrendingCards />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
