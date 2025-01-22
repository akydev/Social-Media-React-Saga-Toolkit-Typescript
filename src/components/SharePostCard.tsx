import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMapMarkerAlt,
  faCalendarAlt,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../redux/store/store";
import { IUser } from "../redux/type/IUser";
import defaultProfile from "../assets/defaultProfile.png";
import toast from "react-hot-toast";
import adminFetch from "../axiosbase/interceptors";
import { TimelineRequest } from "../redux/slice/timelineSlice";

interface NewPost {
  usrId: string;
  desc: string;
  image?: string;
}

export const SharePostCard = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const data = useSelector<AppState>((state) => state.profile.data) as IUser;
  const [desc, setDesc] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    setDesc("");
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (!data._id) return;
      const newPost: NewPost = {
        usrId: data._id,
        desc: desc,
      };

      if (image) {
        const formData = new FormData();
        const fileName = Date.now() + image.name;
        formData.append("name", fileName);
        formData.append("file", image);

        const uploadRes = await adminFetch.post("/upload", formData);
        if (uploadRes.status === 200) {
          toast.success(`${image.name} uoloaded successfully`);
          newPost.image = fileName;
        } else {
          toast.error(`Failed to upload ${image.name}`);
          return;
        }
      }

      //Create the post

      const postRes = await adminFetch.post("/post", newPost);
      if (postRes.status === 200) {
        toast.success("Post created successfully!");
        reset();
        setTimeout(() => {
          if (data._id) {
            dispatch(TimelineRequest(data._id));
          }
        }, 1000);
      } else {
        toast.error("Failed to ceate a post!");
      }
    } catch (error) {
      toast.error("An error occurred while createing the post!");
    }
  };

  return (
    <Card className="bg-body rounded-4 shadow-lg">
      <div className="d-flex align-items-center border-2 border-bottom p-1">
        <img
          src={
            data?.profilePicture
              ? `${apiUrl}/images/${data.profilePicture}`
              : defaultProfile
          }
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Card.Text className="fw-bold fs-5 ms-2" style={{ color: "#242d49" }}>
          Create a Post
        </Card.Text>
      </div>
      <Card.Body>
        <Row className="w-100 g-3">
          <Col xs={12}>
            <Form.Control
              type="text"
              placeholder="What's on your mind?"
              className="rounded-pill px-3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Col>
          {image && (
            <Col xs={5} className="position-relative">
              <Card.Img
                variant="top"
                src={URL.createObjectURL(image)}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <Button
                variant="light"
                title="Cancel"
                className="p-2 border-0 position-absolute top-0 end-0"
                onClick={() => setImage(null)}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  size="lg"
                  className="text-black"
                />
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
      <Card.Body>
        <Row className="w-100 g-0 align-items-center">
          <Col xs={3} className="d-flex justify-content-between">
            <Button
              variant="light"
              title="Upload Image"
              className="p-2 border-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <FontAwesomeIcon
                icon={faImage}
                size="lg"
                className="text-primary"
              />
            </Button>
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <Button
              variant="light"
              title="Add Location"
              className="p-2 border-0"
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="lg"
                className="text-danger"
              />
            </Button>
            <Button
              variant="light"
              title="Pick a Date"
              className="p-2 border-0"
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                size="lg"
                className="text-success"
              />
            </Button>
          </Col>
          <Col xs={9} className="text-end">
            <Button variant="primary" className="px-4" onClick={handleSubmit}>
              Post
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SharePostCard;
