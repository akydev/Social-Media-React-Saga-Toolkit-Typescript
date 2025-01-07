import { useNavigate } from "react-router-dom";
import { ILogin } from "./redux/type/ILogin";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./redux/store/store";
import { useFormik } from "formik";
import { loginRequest } from "./redux/slice/loginSlice";
import { useEffect } from "react";
import { Form, Button, Card, Col, Container, Row } from "react-bootstrap";

const initialValues: ILogin = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: AppState) => state.login.responseData);
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
      dispatch(loginRequest(values));
      action.resetForm();
    },
  });
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  }, [data]);

  return (
    <Container fluid className="login-container">
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

        {/* Right Section (Login Form) */}
        <Col
          lg={6}
          className="right-section d-flex justify-content-center align-items-center"
        >
          <Card className="login-card">
            <Card.Body>
              <h4 className="card-title text-center mb-4">Login Account</h4>
              <Form onSubmit={handleSubmit}>
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

                <Button
                  className="w-100 mt-2"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
              <p className="text-center mt-2 text-black">
                Don't have an account?
                <a href="/registration" className="link-primary fw-semibold">
                  {" "}
                  Sign-Up
                </a>{" "}
                here
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
