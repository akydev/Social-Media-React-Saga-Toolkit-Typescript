import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store/store";
import { IUser } from "../redux/type/IUser";
import adminFetch from "../axiosbase/interceptors";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

export const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const data = useSelector<AppState>((state) => state.profile.data) as IUser;
  const userId = localStorage.getItem("userId");
  const [delModal, setDelModal] = useState<boolean>(false);
  const initialValues: IUser = {
    email: data?.email,
    firstname: data?.firstname,
    lastname: data?.lastname,
    profilePicture: data?.profilePicture,
    coverPicture: data?.coverPicture,
    livesin: data?.livesin,
    worksAt: data?.worksAt,
    country: data?.country,
    relationship: data?.relationship,
  };

  const uploadImage = async (file: File, filedName: string) => {
    const formData = new FormData();
    const fileName = Date.now() + filedName;
    formData.append("name", fileName);
    formData.append("file", file);

    try {
      const res = await adminFetch.post("/upload", formData);
      if (res.status === 200) {
        toast.success(`${fileName} uploaded successfully`);
        return fileName;
      }
    } catch (error) {
      toast.error(`Failed to upload${filedName}`);
    }
    return null;
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    enableReinitialize: true, //Allows reinitialication when initialValues change
    onSubmit: async (values) => {
      try {
        //Upload Profile Image.
        if (profileImage) {
          const uploadProfileName = await uploadImage(
            profileImage,
            "Profile picture"
          );
          if (uploadProfileName) values.profilePicture = uploadProfileName;
        }

        //Upload Cover Image
        if (coverImage) {
          const uploadedCoverName = await uploadImage(
            coverImage,
            "Cover picture"
          );
          if (uploadedCoverName) values.coverPicture = uploadedCoverName;
        }
        //Update user details
        const res = await adminFetch.put(`/user/${userId}`, values);
        if (res.status === 200) toast.success("Profile updated successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = Date.now() + file.name;
      setFieldValue(event.target.name, fileName);
      if (event.target.name === "profileImage") setProfileImage(file);
      else if (event.target.name === "coverPicture") setCoverImage(file);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const handleShowModal = () => setDelModal(true);
  const handleCloseModal = () => setDelModal(false);

  const handleDeleteAccount = async () => {
    try {
      const res = await adminFetch.delete(`/user/${userId}`, {
        data: { _id: userId, currentUserAdminStatus: false },
      });
      if (res.status === 200) {
        toast.success("Account Deleted Successfully");
        handleCloseModal();
        setTimeout(() => {
          handleLogout();
        }, 2000);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <Accordion
        defaultActiveKey={["0", "2"]}
        alwaysOpen
        className="bg-body rounded-4 shadow-lg"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span
              style={{
                color: "#242d49",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Profile Info
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="p-4 w-100 rounded-4 shadow-sm bg-transparent">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      className="p-2 bg-dark-subtle"
                      type="text"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      className="p-2 bg-dark-subtle"
                      type="text"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="p-2 bg-dark-subtle"
                    type="email"
                    name="email"
                    disabled
                    value={values.email}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="profilePicture">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      className="p-2 bg-dark-subtle"
                      type="file"
                      name="profilePicture"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="coverPicture">
                    <Form.Label>Cover Image</Form.Label>
                    <Form.Control
                      className="p-2 bg-dark-subtle"
                      type="file"
                      name="coverPicture"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 p-2 rounded-3"
                >
                  Update Details
                </Button>
              </Form>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <span
              style={{
                color: "#242d49",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Bio
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="p-4 w-100 rounded-4 shadow-sm bg-transparent">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" as={Col} controlId="worksAt">
                  <Form.Label>Works At</Form.Label>
                  <Form.Control
                    className="p-2 bg-dark-subtle"
                    type="text"
                    name="worksAt"
                    placeholder="Enter Works At"
                    value={values.worksAt}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="livesin">
                    <Form.Label>Lives In</Form.Label>
                    <Form.Control
                      className="p-2 bg-dark-subtle"
                      type="text"
                      name="livesin"
                      placeholder="Enter Lives In"
                      value={values.livesin}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      className="p-2 bg-dark-subtle"
                      type="text"
                      name="country"
                      placeholder="Enter Country"
                      value={values.country}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" as={Col} controlId="relationship">
                  <Form.Label>Relationship Status</Form.Label>
                  <Form.Control
                    className="p-2 bg-dark-subtle"
                    type="text"
                    name="relationship"
                    placeholder="Enter Relationship Status"
                    value={values.relationship}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 p-2 rounded-3"
                >
                  Update Bio
                </Button>
              </Form>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <span
              style={{
                color: "#242d49",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Sign Out All Devices
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="p-4 w-100 rounded-4 shadow-sm bg-transparent">
              <Button
                variant="danger"
                className="w-100 fw-semibold mb-3"
                onClick={handleShowModal}
              >
                Delete Your Account
              </Button>
              <Button
                variant="primary"
                className="w-100 fw-semibold"
                onClick={() => handleLogout()}
              >
                Log Out of All Devices
              </Button>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {delModal && (
        <DeleteModal
          title=" Deleting your account is permanent, so are you sure you want to proceed with 
          deleting your account?"
          show={delModal}
          handleClose={handleCloseModal}
          handleDelete={handleDeleteAccount}
        />
      )}
    </>
  );
};

export default EditProfile;
