import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtpPassword } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Container, Form, Button, Card, Col } from 'react-bootstrap';
import './Forgotpassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendOtpPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy các trạng thái từ Redux store
  const { isSuccess, isLoading, isError, errorMessage, otpEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && otpEmail) {
      toast.success(`Gửi mã xác nhận đến ${otpEmail} thành công`);
      navigate(`/forgotpassword/send_otp/?email=${encodeURIComponent(otpEmail)}`);
    }
  }, [isSuccess, otpEmail, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendOtpPassword(email)).unwrap();
    
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section id="forgotpassword" className="block forgotpassword-block bg">
      <Container className="forgotpassword-container">
        <Card className="forgotpassword-card">
          <Card.Body>
            <Card.Title className="forgotpassword-title">
              <h3>Quên mật khẩu</h3>
            </Card.Title>
            <Form onSubmit={handleSubmit} className="forgotpassword-form">
              <Form.Group controlId="formEmail" className="mb-4">
                <div className="text-start mb-2">Email xác nhận:</div>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Email xác nhận"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="forgotpassword-button"
                disabled={isLoading}
              >
                {isLoading ? 'Đang gửi...' : 'Xác nhận'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default SendOtpPassword;
