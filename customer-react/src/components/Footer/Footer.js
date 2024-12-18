import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Call from "../../assets/images/Call.png";
import Mail from "../../assets/images/Mail.png";
import Address from "../../assets/images/Address.png";
import Photoroom from "../../assets/images/loginn-Photoroom.png";
const Footer=()=> {
    return (
        <footer className="footer-custom">
            <Container >
                <Row>
                    <Col xs={12} sm={6} md={3} className="text-custom-left">
                        <div className="flex-container-column">
                            <h4 className="custom-color"><strong>Về Chúng tôi</strong></h4>
                            <img src={Photoroom} alt="Logo" className="footer-logo" />
                            <p>Taxi của chúng tôi - Lựa chọn hoàn hảo cho chuyến đi an toàn và tiện lợi, bất cứ khi nào bạn cần. Với chúng tôi, mỗi chuyến đi không chỉ là di chuyển, mà là một hành trình trải nghiệm dịch vụ tốt nhất.</p>
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={3} className="text-custom-left-clause">
                        <h4 className="custom-color"><strong>Thông tin liên hệ</strong></h4>
                        <p><img src={Call} height="15" alt="Call" />0978.959.557</p>
                        <p><img src={Mail} height="13" alt="Mail" /><span className="email-break">Taxitayninh247giare@gmail.com</span></p>
                        <p><img src={Address} height="15" alt="Address" />Tây Ninh, Vietnam</p>
                    </Col>

                    <Col xs={12} sm={6} md={3} className="text-custom-left-links">
                        <h4 className="custom-color"><strong>Links</strong></h4>
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/tour">Tour</Link></li>
                            <li><Link to="/contact">Liên hệ</Link></li>
                            <li><Link to="/booking">Đặt xe</Link></li>
                            <li><Link to="/login">Đăng nhập</Link></li>
                        </ul>
                    </Col>

                    <Col xs={12} sm={6} md={2} className="text-custom-left">
                        <h4 className="custom-color"><strong>Chính sách</strong></h4>
                        <p>Điều khoản dịch vụ</p>
                        <p>Giải quyết khiếu nại</p>
                        <p>Chính sách bảo mật thông tin</p>
                    </Col>
                </Row>
            </Container>
            <div className="last-footer">
                <p>© Copyright 2024 Taxi Tây Ninh</p>
            </div>
        </footer>
    );
}

export default Footer;
