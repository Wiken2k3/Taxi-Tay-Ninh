import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import avatar from '../../../assets/images/Mail.png';
import './Profile.css';
import { useSelector } from "react-redux";
import InfoModal from './InfoModal';
import PasswordModal from './PasswordModal';

const Profile = () => {
    const { currentUser, isLoading } = useSelector(state => state.auth);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);


    return (
        <section id="profile" className="block profile-block">
            <Container>
                <div className="profile-container">
                    <div className="title-holder">
                        <h2>THÔNG TIN</h2>
                        <div className="subtitle">THÔNG TIN CÁ NHÂN</div>
                    </div>
                    <div className="profile-row">
                        <Row>
                            <Col xs={12} md={4} className="text-center border-class">
                                <Image src={avatar} roundedCircle className="profile-pic" />
                                <h3 className="profile-name">{currentUser.name || ""}</h3>
                                <p className="profile-email">{currentUser.email || ""}</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form>
                                    <Form.Group controlId="formDisplayName" className="mb-3 custom-form-group">
                                        <Form.Label>Tên hiển thị</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Tên hiển thị"
                                            defaultValue={currentUser.name || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail" className="mb-3 custom-form-group">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            defaultValue={currentUser.email || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formNumber" className="mb-3 custom-form-group">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Số điện thoại"
                                            defaultValue={currentUser.phone || ""}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group className="mt-3 click">
                                        <Button className="primary" type="button" onClick={() => setShowInfoModal(true)}>
                                            Đổi Thông Tin
                                        </Button>
                                        <Button className="primary ms-3" type="button" onClick={() => setShowPasswordModal(true)}>
                                            Đổi Mật Khẩu
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* Info Modal Component */}
                <InfoModal show={showInfoModal} handleClose={() => setShowInfoModal(false)} currentUser={currentUser} />

                {/* Password Modal Component */}
                <PasswordModal show={showPasswordModal} handleClose={() => setShowPasswordModal(false)} currentUser={currentUser} />

            </Container>
        </section>
    );
};

export default Profile;
