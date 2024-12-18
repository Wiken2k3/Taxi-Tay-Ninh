import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col } from "react-bootstrap";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, login } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error(error);
    }
  };

  




  return (
    <section id="login" className="block login-block bg">
      <Container className="login-container">
        <Card className="login-card">
          <Card.Body>
            <Card.Title className="login-title">
              <h3>Đăng nhập</h3>
            </Card.Title>
            <Form onSubmit={handleLoginSubmit} className="login-form">
              <Form.Group controlId="formEmail" className="mb-3">
                <div className="text-start mb-2">Email:</div>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <div className="text-start mb-2">Mật khẩu:</div>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button
                as={Link}
                to="/forgotpassword"
                variant="Link"
                className="forgot-password text-start"
              >
                Quên mật khẩu?
              </Button>
              <Button variant="primary" type="submit" className="login-button">
                Đăng nhập
              </Button>
              <Form.Group className="mt-3">
                <div className="text-center">
                  <p>Bạn chưa có tài khoản?</p>
                </div>
                <Button
                  as={Link}
                  to="/signup"
                  variant="primary"
                  className="Signup-button"
                >
                  Đăng ký
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Login;
