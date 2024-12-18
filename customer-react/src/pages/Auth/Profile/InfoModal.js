import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { updateInfo } from "../../../redux/slices/authSlice";

const InfoModal = ({ show, handleClose, currentUser }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    useEffect(()=>{
        if (currentUser){
            setEmail(currentUser.email)
            setPhone(currentUser.phone)
            setName(currentUser.name)
     
        }
    }, [currentUser])


    const handleSaveChanges = async (event) => {
        event.preventDefault();
        try {
            const infoData = {
                email,
                phone,
                name,
                password,
            };
            await dispatch(updateInfo({ id: currentUser._id, infoData })).unwrap();
            toast.success("Thông tin đã được cập nhật thành công");
            handleClose();
        } catch (error) {
            // Kiểm tra nếu lỗi có thông tin
            toast.error(error);
        }
    };

    


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đổi thông tin người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSaveChanges}>
                    <Form.Group controlId="formModalDisplayName" className="mb-3">
                        <Form.Label>Tên hiển thị</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Nhập tên hiển thị" 
                        defaultValue={currentUser.name || ""} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="formModalEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Nhập email" 
                        defaultValue={currentUser.email || ""}
                        required
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formModalNumber" className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Nhập số điện thoại" 
                        defaultValue={currentUser.phone || ""} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="formModalPassword" className="mb-3">
                        <Form.Label>Mật khẩu hiện tại</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Nhập mật khẩu hiện tại" 
                        required
                        onChange={(e) => setPassword(e.target.value)} 
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

export default InfoModal;
