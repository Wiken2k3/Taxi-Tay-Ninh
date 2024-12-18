import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col } from "react-bootstrap";
import "./SignUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";



const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isSuccess = useSelector(state => state.auth.isSuccess)

  useEffect(()=>{
    if (isSuccess){
      navigate('/login');
    }
  }, [isSuccess,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (password !== verifyPassword){
        toast.error("Mật khẩu không trùng khớp")
        return
      }
      const newUserData = {
        email,
        password,
        name,
        phone
      }
      await dispatch(register(newUserData)).unwrap()
      toast.success("Đăng ký thành công")
    }
  
    catch(error){
      toast.error(error)
    }
  };

  return (
    <section id="signup" className="block signup-block bg">
      <Container className="signup-container">
        <Card className="signup-card">
          <Card.Body>
            <Card.Title className="signup-title">
              <h3>Đăng Ký</h3>
            </Card.Title>
            <Form onSubmit={handleSubmit} className="signup-form">
              <Form.Group controlId="formName" className="mb-3">
                <div className="text-start mb-2">Họ và Tên:</div>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Họ và Tên"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <div className="text-start mb-2">Email:</div>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="formNumber" className="mb-3">
                <div className="text-start mb-2">Số điện thoại:</div>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Số điện thoại"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
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
              <Form.Group controlId="formConfirmPassword" className="mb-4">
                <div className="text-start mb-2">Xác nhận mật khẩu:</div>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={verifyPassword}
                    required
                    onChange={(e) => setVerifyPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit" className="signup-button">
                Đăng ký
              </Button>
              <Form.Group className="mt-3">
                <div className="text-center">
                  <p>Bạn chưa có tài khoản?</p>
                </div>
                <Button
                  as={Link}
                  to="/login"
                  variant="primary"
                  className="Login-button"
                >
                  Đăng nhập
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default SignUp;
