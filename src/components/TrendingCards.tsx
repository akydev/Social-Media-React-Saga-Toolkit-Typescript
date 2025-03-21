import { Card, Col, Row } from "react-bootstrap";
import TrendingData from "../data/trendingData.json";
const TrendingCards = () => {
  const trendingData = TrendingData;
  return (
    <Card className="bg-body" rounded-4 shadow-lg>
      <div>
        <Card.Text> Trending for you</Card.Text>
      </div>
      <Card.Body>
        <Row>
          {trendingData.map((value) => (
            <Col>
              <Card.Title>#{value.name}</Card.Title>
              <Card.Text>{value.shares}K Shares</Card.Text>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TrendingCards;
