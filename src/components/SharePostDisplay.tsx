import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store/store";
import { IUser } from "../redux/type/IUser";
import { ITimeline } from "../redux/type/ITimeline";
import { TimelineRequest } from "../redux/slice/timelineSlice";
import adminFetch from "../axiosbase/interceptors";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  Col,
  Overlay,
  Popover,
  PopoverHeader,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEllipsis,
  faShareAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./DeleteModal";

interface SharePostDisplayProps {
  page: "home" | "profile";
}
export const SharePostDisplay = ({ page }: SharePostDisplayProps) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<AppState>((state) => state.user.data) as IUser[];
  const timeline = useSelector<AppState>(
    (state) => state.timeline.data
  ) as ITimeline[];
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [delModal, setDelModal] = useState<boolean>(false);
  const [selectedPostID, setSelectedPostID] = useState<string | null>(null);
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);
  const buttonRefs = React.useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (userId) {
      dispatch(TimelineRequest(userId));
    }
  }, []);

  const displayData =
    page === "home"
      ? timeline
      : timeline.filter((item) => item.userId === userId);

  const findUser = (userId: string) => user.find((user) => user._id === userId);

  useEffect(() => {
    if (!userId) return;
    //Initial liked state
    const initialLiked = displayData
      .filter((item) => item.likes.includes(userId))
      .map((item) => item._id);
    setLiked(initialLiked);
  }, [timeline]);

  const handleLikeButton = async (selectedPostId: string) => {
    try {
      if (!userId || !selectedPostId) return;
      const action = liked.includes(selectedPostId) ? "unlike" : "like";
      const res = await adminFetch.put(`/post/${selectedPostId}/like_dislike`, {
        userId,
      });
      toast.success(res.data);

      setLiked(
        (prev) =>
          action === "like"
            ? [...prev, selectedPostId] // Add post to liked list
            : prev.filter((id) => id !== selectedPostId) // Remove post from liked list
      );
      dispatch(TimelineRequest(userId));
    } catch (error: any) {
      toast.error(error.response?.data);
    }
  };

  const handleShowModal = (id: string) => {
    setDelModal(true);
    setSelectedPostID(id);
  };

  const handleCloseModal = () => {
    setDelModal(false);
    setSelectedPostID(null);
  };

  const handleDeletePost = async () => {
    try {
      if (!selectedPostID || !userId) return;
      const res = await adminFetch.delete(`/post/${selectedPostID}`, {
        data: { userId },
      });

      if (res.status === 200) {
        toast.success("Post deleted successfully!");
        handleCloseModal();
        setTimeout(() => {
          dispatch(TimelineRequest(userId));
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {displayData.map((value) => {
        const matchedUser = findUser(value.userId);
        return (
          <div key={value._id}>
            <Card className="bg-body rounded-4 shadow-lg mt-2" key={value._id}>
              <div className="d-flex align-items-center justify-content-between border-2 border-bottom p-2">
                <div className="d-flex align-item-center">
                  <img
                    src={
                      matchedUser?.profilePicture
                        ? `${apiUrl}/images/${matchedUser.profilePicture}`
                        : defaultProfile
                    }
                    alt="Profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Text
                    className="fw-semibold text-capitalize fs-6 ms-2 mb-0"
                    style={{ color: "#242d49" }}
                  >
                    {matchedUser?.firstname} {matchedUser?.lastname}
                  </Card.Text>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <Card.Text className="fw-medium text-secondary mb-0">
                    {value.createdAt.split("T")[0]}
                  </Card.Text>
                  {page === "profile" && (
                    <div>
                      <Button
                        ref={(el) => (buttonRefs.current[value._id] = el)}
                        variant="light"
                        title="More"
                        className="p-2 border-0"
                        onClick={() =>
                          setActivePopoverId(
                            activePopoverId === value._id ? null : value._id
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          size="lg"
                          className="text-body-secondary"
                        />
                      </Button>
                      <Overlay
                        show={activePopoverId === value._id}
                        target={buttonRefs.current[value._id]}
                        placement="bottom"
                        containerPadding={20}
                        rootClose={true}
                        onHide={() => setActivePopoverId(null)}
                      >
                        <Popover id={`popover-${value._id}`}>
                          <PopoverHeader style={{ cursor: "pointer" }}>
                            Edit Post
                          </PopoverHeader>
                          <PopoverHeader
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleShowModal(value._id);
                              setActivePopoverId(null);
                            }}
                          >
                            Delete Post
                          </PopoverHeader>
                        </Popover>
                      </Overlay>
                    </div>
                  )}
                </div>
              </div>
              <Card.Body>
                <Row className="w-100 g-3">
                  <Col xs={12}>
                    {value.image && (
                      <img
                        src={`${apiUrl}/images/${value.image}`}
                        alt="Profile"
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "10%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body>
                <Row className="w-100 g-0 align-items-center">
                  <Col xs={3} className="d-flex justify-content-between">
                    <Button
                      variant="light"
                      title={`${liked.includes(value._id) ? "UnLike" : "Like"}`}
                      className="p-2 border-0"
                      onClick={() => handleLikeButton(value._id)}
                    >
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        size="lg"
                        className={`${
                          liked.includes(value._id)
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    </Button>
                    <Button
                      variant="light"
                      title="Comment"
                      className="p-2 border-0"
                    >
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        size="lg"
                        className="text-body-secondary"
                      />
                    </Button>
                    <Button
                      variant="light"
                      title="Share"
                      className="p-2 border-0"
                    >
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        size="lg"
                        className="text-body-secondary"
                      />
                    </Button>
                  </Col>
                </Row>
                <div className="d-flex align-items-center">
                  <Card.Text className="fw-medium text-secondary me-3 mb-0">
                    {value.likes.length} likes
                  </Card.Text>
                  <Card.Text className="fw-medium mb-0">{value.desc}</Card.Text>
                </div>
              </Card.Body>
            </Card>
            {delModal && (
              <DeleteModal
                title="Are you sure to delete this post!"
                show={delModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeletePost}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default SharePostDisplay;
