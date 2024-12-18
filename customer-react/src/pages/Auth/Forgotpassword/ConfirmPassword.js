import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col } from "react-bootstrap";
import "./Forgotpassword.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { confirmPassword } from "../../../redux/slices/authSlice";

const ConfirmPassword = () => {
    const [password,setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [search] = useSearchParams();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, isLoading, isError, errorMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        const emailParam = search.get('email');
        const otpParam = search.get('otp');
        if (emailParam) {
            setEmail(decodeURIComponent(emailParam));
        }
        if (otpParam) {
            setOtp(decodeURIComponent(otpParam)); 
        }
    }, [search]);
    useEffect(() => {
        if(isSuccess){
            toast.success("Thay đổi mật khẩu thành công")
            navigate('/login')
        }
    
  
    }, [isSuccess]);
    
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if (password !== passwordConfirm) {
                toast.error("Mật khẩu không trùng khớp")
                return
            }
            const dataConfirmPassword = {
                email: email,
                otp: otp,
                password:password,
                confirmpassword: passwordConfirm
            }
            await dispatch(confirmPassword(dataConfirmPassword)).unwrap()
            
        }
        catch(error){
            toast.error(error);
        }
        


      
    };

    return (
        <section id="forgotpassword" className="block forgotpassword-block bg">
            <Container className="forgotpassword-container">
                <Card className="forgotpassword-card">
                    <Card.Body>
                        <Card.Title className="forgotpassword-title">
                            <h3>Xác nhận mật khẩu</h3>
                        </Card.Title>
                        <Form onSubmit={handleSubmit} className="forgotpassword-form">
                            <Form.Group controlId="formPassword" className="mb-4">
                                <div className="text-start mb-2">Nhập mật khẩu mới</div>
                                <Col>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword" className="mb-4">
                                <div className="text-start mb-2">Xác nhận mật khẩu mới</div>
                                <Col>
                                    <Form.Control
                                        type="password"
                                        placeholder="xác nhận mật khẩu mới"
                                        value={passwordConfirm}
                                        required
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
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
                               
                                <Button variant="primary" className="OTP-button" as={Link}
                                    to="/">
                                    Quay lại trang chủ
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
};

export default ConfirmPassword;
