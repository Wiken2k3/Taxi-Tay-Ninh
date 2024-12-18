import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchAllUsers } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { userRole } from "../../enums/userRole.enum";

const AddUserModal = ({ show, handleClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState(userRole.CUSTOMER);
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);
    const { currentUser } = useSelector((state) => state.auth);
    

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(role)
            await dispatch(addUser({ email, password, name, phone, role })).unwrap();
   
            handleClose();
     
        } catch (error) {
            toast.error(error);
   
        }
    };

    const handleKeyDown = (e) => {
        if (!/^[0-9]$/i.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Quản lý người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddSubmit}>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên người dùng" onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập Email" onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Mật Khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật khẩu" onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Số Điện thoại</Form.Label>
                        <Form.Control type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Nhập số điện thoại" onKeyDown={handleKeyDown} onChange={(e) => setPhone(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Vai trò</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                            {/* Nếu user.role === 'staff' thì chỉ hiển thị tùy chọn "Khách Hàng" */}
                            {currentUser.role === userRole.STAFF && (
                                <option value={userRole.CUSTOMER}>Khách Hàng</option>
                            )}

                            {/* Nếu user.role === 'admin' thì hiển thị tất cả các tùy chọn */}
                            {currentUser.role === userRole.ADMIN && (
                                <>
                                    <option value={userRole.CUSTOMER}>Khách Hàng</option>
                                    <option value={userRole.STAFF}>Nhân Viên</option>
                                    <option value={userRole.ADMIN}>Admin</option>
                                </>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" className="ms-2" type="submit" disabled={isLoading}>
                            {isLoading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    );
};

export default AddUserModal;
