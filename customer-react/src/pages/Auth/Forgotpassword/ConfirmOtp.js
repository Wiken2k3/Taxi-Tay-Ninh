import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col, Alert } from "react-bootstrap";
import "./Forgotpassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmOtp, sendOtpPassword } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ConfirmOTP = () => {
  const [otp, setOtp] = useState("");
  const [search] = useSearchParams ();
  const navigate = useNavigate()
  const [email, setEmail] = useState(""); 
  const dispatch = useDispatch()
  const { isLoading, isSuccess, isError, errorMessage, otpConfirm, otpEmail } = useSelector((state) => state.auth);

  useEffect(() => {
    const emailParam = search.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam)); // Giải mã giá trị email
    }
  }, [search]);

  useEffect(()=>{
    if (isSuccess && otpEmail && otpConfirm){
      toast.success("Xác nhận OTP thành công")
      navigate(`/forgotpassword/reset/?email=${encodeURIComponent(otpEmail)}&otp=${encodeURIComponent(otpConfirm)}`); // Mã hóa email và OTP
    }
 
  }, [isSuccess, otpConfirm, otpEmail])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const dataConfirmOtp = {
        email: email,
        otp: otp

      }
      await dispatch(confirmOtp(dataConfirmOtp)).unwrap()

    }
    catch (error){
      toast.error(error);
    }
  };

  const handleResendOtp = async () => {
    try {
      await dispatch(sendOtpPassword(email)).unwrap();
      toast.success(`Mã OTP đã được gửi đến ${email}`);
    } catch (error) {
      toast.error(errorMessage || 'Đã xảy ra lỗi khi gửi mã OTP');
    }
  };
     
  
  if (isLoading){
    return <LoadingSpinner/>
  }

  return (
    <section id="forgotpassword" className="block forgotpassword-block bg">
      <Container className="forgotpassword-container">
        <Card className="forgotpassword-card">
          <Card.Body>
            <Card.Title className="forgotpassword-title">
              <h3>Quên mật khẩu</h3>
            </Card.Title>
            <Form onSubmit={handleSubmit} className="forgotpassword-form">
              <Form.Group controlId="formCode" className="mb-4">
                <div className="text-start mb-2">Nhập mã:</div>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã"
                    value={otp}
                    required
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="forgotpassword-button"
              >
                Xác nhận
              </Button>
              <Form.Group className="mt-3">
                <div className="text-center">
                  <p>Bạn chưa có tài khoản?</p>
                </div>
                <Button
                  variant="primary"
                  className="OTP-button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi lại mã'}
                </Button>
                {isSuccess && <Alert variant="success" className="mt-3">{isSuccess}</Alert>}
                {isSuccess && <Alert variant="danger" className="mt-3">{isSuccess}</Alert>}
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default ConfirmOTP;
