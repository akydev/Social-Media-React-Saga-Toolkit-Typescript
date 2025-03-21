import { Col, Container, Row } from "react-bootstrap";
import TrendingCards from "./components/TrendingCards";
import PeopleCard from "./components/PeopleCard";

const FriendLists = () => {
  return (
    <Container>
      <Row className="w-100">
        <Col md={9}>
          <PeopleCard page="friendlist" />
        </Col>
        <Col md={3}>
          <TrendingCards />
        </Col>
      </Row>
    </Container>
  );
};

export default FriendLists;
