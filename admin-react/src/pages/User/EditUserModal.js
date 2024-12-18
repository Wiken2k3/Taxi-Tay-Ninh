import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchAllUsers } from "../../redux/slices/userSlice";
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { userRole } from "../../enums/userRole.enum";

const EditUserModal = ({ show, handleClose, editUser }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("Nhân Viên");
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    useEffect(() => {
        if (editUser) {
            setName(editUser.name);
            setPhone(editUser.phone);
            setRole(editUser.role);
        }
    }, [editUser]);

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(updateUser({ id: editUser._id, name, phone, role })).unwrap();
     
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
                <Modal.Title>Sửa người dùng </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control type="text" defaultValue={editUser?.name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Số Điện Thoại</Form.Label>
                        <Form.Control type="text" inputMode="numeric" pattern="[0-9]*" onKeyDown={handleKeyDown} defaultValue={editUser?.phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Vai trò</Form.Label>
                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                            {/* Nếu user.role === 'staff' thì chỉ hiển thị tùy chọn "Khách Hàng" */}
                            {currentUser.role === userRole.STAFF && (
                                <option value={userRole.CUSTOMER}>{userRole.CUSTOMER}</option>
                            )}

                            {/* Nếu user.role === 'admin' thì hiển thị tất cả các tùy chọn */}
                            {currentUser.role === userRole.ADMIN && (
                                <>
                                    <option value={userRole.CUSTOMER}>{userRole.CUSTOMER}</option>
                                    <option value={userRole.STAFF}>{userRole.STAFF}</option>
                                    <option value={userRole.ADMIN}>{userRole.ADMIN}</option>
                                </>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" className="ms-2" type="submit">
                            Lưu
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    );
};

export default EditUserModal;
