import { Col, Container, Row } from "react-bootstrap";
import TrendingCards from "./components/TrendingCards";
import PeopleCard from "./components/PeopleCard";
import SharePostCard from "./components/SharePostCard";
import SharePostDisplay from "./components/SharePostDisplay";

const Home = () => {
  return (
    <Container>
      Home contain would be here.
      <Row className="w-100">
        {/* Left Column */}
        <Col md={3}>
          <PeopleCard page="home" />
        </Col>
        {/* Center Content */}
        <Col md={6}>
          <SharePostCard />
          <SharePostDisplay page="home" />
        </Col>
        {/* Right Column */}
        <Col md={3}>
          <TrendingCards />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
