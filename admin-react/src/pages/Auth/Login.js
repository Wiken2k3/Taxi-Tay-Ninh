import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, login } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo123.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { user, isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.auth);

    useEffect(() => {
        if (isSuccess){
            if (actionType === 'LOGIN_USER') {
                dispatch(fetchCurrentUser());
                toast.success("Đăng nhập thành công");
                navigate('/');
            }
            else if (actionType === 'LOGOUT_USER'){
                toast.success("Đăng xuất thành công");
            }
        }
        
        
    }, [isSuccess, actionType, dispatch]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
        } catch (error) {
            toast.error(error);
        }
    };




    return (
        <div className="header-login">
            <div className="overlay"></div>
            <Container fluid className="p-0">
                <Row className="justify-content-center align-items-center h-100">
                    <Col xs={12} sm={8} md={6} lg={4} className="d-flex justify-content-center">
                        <div className="form">
                            <img src={logo} alt="Logo" className="img-fluid" />
                            <h1>Đăng Nhập</h1>
                            <Form onSubmit={handleLoginSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="Tài khoản"
                                        required
                                        className="mb-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Sửa lỗi setEmai thành setEmail
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Mật khẩu"
                                        required
                                        className="mb-3"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="danger" type="submit" className="w-100">
                                    Đăng Nhập
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default Login