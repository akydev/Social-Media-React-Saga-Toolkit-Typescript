import { useNavigate } from "react-router-dom";
import { IRegistration } from "./redux/type/IRegistration";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./redux/store/store";
import { useFormik } from "formik";
import { registrationRequest } from "./redux/slice/registrationSlice";
import { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
const initialValues: IRegistration = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpass: "",
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required."),
  lastname: Yup.string().required("Last name is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string().required("Password is required."),
  confirmpass: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Password do not match.")
    .required("Confirm password is required."),
});

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<AppState>(
    (state) => state.registration.responseData
  );

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      dispatch(registrationRequest(values));
      action.resetForm();
    },
  });
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [data]);
  return (
    <Container fluid className="registration-container">
      <Row className="h-100">
        {/* Left Section (Welcome Message and Logo) */}
        <Col
          lg={6}
          className="left-section d-flex flex-column justify-content-center align-items-center text-center"
        >
          <img
            src="../src/assets/image/international-day-education-futuristic-style_23-2150998671.jpg"
            alt="Logo"
            className="logo"
          />
          <h2>Welcome to Our Platform</h2>
          <p>Join us and experience something amazing!</p>
        </Col>

        {/* Right Section (Registration Form) */}
        <Col
          lg={6}
          className="right-section d-flex justify-content-center align-items-center"
        >
          <Card className="registration-card">
            <Card.Body>
              <h4 className="card-title text-center mb-4">Create Account</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your first name"
                  />
                  {touched.firstname && errors.firstname && (
                    <Form.Text className="text-danger">
                      {errors.firstname}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your last name"
                  />
                  {touched.lastname && errors.lastname && (
                    <Form.Text className="text-danger">
                      {errors.lastname}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <Form.Text className="text-danger">
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Create a password"
                  />
                  {touched.password && errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="confirmpass">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmpass"
                    value={values.confirmpass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                  />
                  {touched.confirmpass && errors.confirmpass && (
                    <Form.Text className="text-danger">
                      {errors.confirmpass}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button
                  className="w-100 mt-2"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            </Card.Body>
            <p className="text-center mt-2 text-black">
              Already have an account?{" "}
              <a href="/login" className="link-primary fw-semibold">
                {" "}
                Login
              </a>{" "}
              here
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
