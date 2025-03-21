import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserRequest } from "./redux/slice/userSlice";
import { Col, Container, Row } from "react-bootstrap";
import ProfileCard from "./components/ProfileCard";
import SharePostDisplay from "./components/SharePostDisplay";
import TrendingCards from "./components/TrendingCards";
import { AppDispatch } from "./redux/store/store";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(UserRequest());
  }, []);

  return (
    <Container>
      <Row className="w-100">
        <Col md={9} className="mx-auto">
          <ProfileCard />
          <SharePostDisplay page="profile" />
        </Col>
        <Col md={3}>
          <TrendingCards />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
