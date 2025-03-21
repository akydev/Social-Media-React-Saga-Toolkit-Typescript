import { useSelector } from "react-redux";
import { AppState } from "../redux/store/store";
import { IUser } from "../redux/type/IUser";
import { ITimeline } from "../redux/type/ITimeline";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import defaultProfile from "../assets/images/defaultProfile.png";

export const ProfileCard = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const data = useSelector<AppState>((state) => state.profile.data) as IUser;
  const userId = localStorage.getItem("userId");
  const timeline = useSelector<AppState>(
    (state) => state.timeline.data
  ) as ITimeline[];
  const postCount = timeline
    .filter((item) => item.userId === userId)
    .map((item) => item.likes);
  return (
    <Card className="bg-body h-35 rounded-4 shadow-lg p-3">
      {data?.coverPicture && (
        <Card.Body
          className="rounded-4"
          style={{
            backgroundImage: `url(${apiUrl}/images/${data?.coverPicture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
            border: "1px solid #788097",
          }}
        ></Card.Body>
      )}
      <Card.Body>
        <Row className="align-align-items-center justify-content-center">
          <Col xs={3} className="d-flex flex-column align-items-center">
            <img
              src={
                data?.profilePicture
                  ? `${apiUrl}/images/${data.profilePicture}`
                  : defaultProfile
              }
              alt="Profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "100%",
                objectFit: "cover",
                border: "1px solid #788097",
              }}
            />
            <Card.Text className="fw-semibold text-capitalize mt-2 text-dark text-center">
              {data?.firstname} {data?.lastname}
            </Card.Text>
          </Col>
          <Col xs={9} className="d-flex justify-content-around">
            <div className="text-center">
              <Card.Text className="fw-bold text-dark mb-0">
                {postCount.length}
              </Card.Text>
              <Card.Text className="fw-semibold text-secondary">
                Posts
              </Card.Text>
            </div>
            <div className="text-center">
              {data?.followers && (
                <Card.Text className="fw-bold text-dark mb-0">
                  {data?.followers.length}
                </Card.Text>
              )}
              <Card.Text className="fw-semibold text-secondary">
                Followers
              </Card.Text>
            </div>
            <div className="text-center">
              {data?.following && (
                <Card.Text className="fw-bold text-dark mb-0">
                  {data?.following.length}
                </Card.Text>
              )}
              <Card.Text className="fw-semibold text-secondary">
                Following
              </Card.Text>
            </div>
          </Col>
        </Row>
        <Link to="/settings" className="w-100">
          <Button
            variant="light"
            title="Edit Profile"
            className="p-2 border-0 ms-5"
          >
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              className="text-body-secondary"
            />
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
