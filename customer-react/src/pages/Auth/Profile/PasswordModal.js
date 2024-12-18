import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../redux/slices/authSlice";

const PasswordModal = ({ show, handleClose, currentUser }) => {
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const dispatch = useDispatch()

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        
        try{
            if (passwordNew !== verifyPassword) {
                toast.error("Xác thực mật khẩu không chính xác");
                return;
            }
            const passwordData = {
                passwordOld,
                passwordNew
            }
            await dispatch(updatePassword({ id: currentUser._id, passwordData })).unwrap();
            toast.success("Mật khẩu đã được thay đổi thành công");
        }
        catch (error){
            toast.error(error)
        }
    };

    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đổi mật khẩu người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePasswordChange}>
                    <Form.Group controlId="formCurrentPassword" className="mb-3">
                        <Form.Label>Mật khẩu hiện tại</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu hiện tại"
                            required
                            onChange={(e) => setPasswordOld(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword" className="mb-3">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            required
                            onChange={(e) => setPasswordNew(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmNewPassword" className="mb-3">
                        <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            required
                            onChange={(e) => setVerifyPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                        <Button variant="primary" type="submit">Lưu</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PasswordModal;
