import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, AppState } from "../redux/store/store";
import { IUser } from "../redux/type/IUser";
import { UserRequest } from "../redux/slice/userSlice";
import defaultProfile from "../assets/images/defaultProfile.png";
import toast from "react-hot-toast";
import adminFetch from "../axiosbase/interceptors";

interface PeopleCardProps {
  page: "home" | "friendlist";
}

const PeopleCard = ({ page }: PeopleCardProps) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<AppState>((state) => state.user.data) as IUser[];
  const userId = localStorage.getItem("userId");
  const [following, setFollowing] = useState<string[]>([]);
  const displayData =
    page === "home"
      ? data.filter((item) => item._id !== userId).slice(0, 5)
      : data.filter((item) => item._id !== userId);

  useEffect(() => {
    dispatch(UserRequest());
  }, []);

  useEffect(() => {
    // Initial following state
    const initialFollowing = displayData
      .filter((item) => item.followers && item.followers.includes(userId))
      .map((item) => item._id as string);
    setFollowing(initialFollowing as string[]);
  }, []);

  const handleFollowButton = async (selectedUserId: string) => {
    try {
      if (!selectedUserId) return;
      const action = following.includes(selectedUserId)
        ? "unfollow"
        : " follow";

      const res =
        action === " follow"
          ? await adminFetch.put(`user/${selectedUserId}/follow`, {
              _id: userId,
            })
          : await adminFetch.put(`/user/${selectedUserId}/unfollow`, {
              _id: userId,
            });
      toast.success(res.data);
      setFollowing(
        (prev) =>
          action === " follow"
            ? [...prev, selectedUserId] //Add user to following list
            : prev.filter((id) => id !== selectedUserId) //Remove user from following list)
      );
    } catch (error: any) {
      toast.error(error.response?.data);
    }
  };
  return (
    <Card className="bg-body rounded-4 shadow-lg">
      <div className="border-2 border-bottom p-2">
        <Card.Text className="fw-bold fs-5 ms-2" style={{ color: "#242d49" }}>
          People you may know...
        </Card.Text>
      </div>
      {displayData.map((value) => (
        <Card.Body key={value._id} className="border-2 border-bottom rounded-4">
          <Row className=" w-100 g-0 align-items-center">
            <Col xs={8}>
              <Row className="align-items-center">
                <img
                  src={
                    value?.profilePicture
                      ? `${apiUrl}/images/${value.profilePicture}`
                      : defaultProfile
                  }
                  alt="Profile"
                  style={{
                    maxWidth: "55px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Col>
                  <Card.Title
                    className="fw-semibold fs-6 text-capitalize mb-0"
                    style={{ color: "#242d49" }}
                  >
                    {value.firstname} {value.lastname}
                  </Card.Title>
                  <Card.Text
                    className="fw-medium ms-1"
                    style={{ fontSize: "16px" }}
                  >
                    @{value.firstname}
                    {value.lastname}
                  </Card.Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={() => handleFollowButton(value._id as string)}
              >
                {following.includes(value._id as string)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      ))}
      {page === "home" && (
        <div className="p-2 d-flex align-items-center justify-content-center">
          <Link to="/friend-lists" className="w-100">
            <Button variant="primary" className="w-100">
              See All
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default PeopleCard;
