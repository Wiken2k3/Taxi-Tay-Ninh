import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUser, fetchAllUsers, toggleBlockUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

const DeleteUserModal = ({ show, handleClose, deleteUserId }) => {
    const dispatch = useDispatch();

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(toggleBlockUser({ id: deleteUserId._id,isBlock:deleteUserId.isBlock})).unwrap();

            handleClose();
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title> {deleteUserId ? (
                    `Xác nhận ${deleteUserId.isBlock ? "Mở khóa" : "Khóa"} ${deleteUserId.email}`
                ) : (
                    "Xác nhận hành động"
                )}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleDeleteSubmit}>
                    {deleteUserId && (
                        <div>
                            <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
                            <p><strong>Tên:</strong> {deleteUserId.name}</p>
                            <p><strong>Email:</strong> {deleteUserId.email}</p>
                            <p><strong>Số Điện Thoại:</strong> {deleteUserId.phone}</p>
                            <p><strong>Trạng Thái:</strong> {deleteUserId.isBlock ? "Khoá" : "Không Khoá"}</p>

                          
                        </div>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="danger" className="ms-2" type="submit">
                            Cập Nhập
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteUserModal;
