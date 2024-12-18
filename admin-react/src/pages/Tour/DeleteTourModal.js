import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUser, fetchAllUsers, toggleBlockUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { deleteTour } from "../../redux/slices/tourSlice";
import { toVietnamCurrency } from "../../helpers/currencyHelper";

const DeleteTourModal = ({ show, handleClose, deleteTourId }) => {
    const dispatch = useDispatch();

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(deleteTour({ id: deleteTourId._id })).unwrap();
            handleClose();
        } catch (error) {

        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa Tour {deleteTourId?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleDeleteSubmit}>
                    {deleteTourId && (
                        <div>
                            <p>Bạn có chắc chắn muốn xóa Tour dùng này?</p>
                            <p><strong>Tiêu đề:</strong> {deleteTourId.title}</p>
                            <p><strong>Địa Điểm:</strong> {deleteTourId.location}</p>
                            <p><strong>Giá Tiền:</strong> {toVietnamCurrency(Number(deleteTourId.price))}</p>
                        </div>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="danger" className="ms-2" type="submit">
                            Xoá
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteTourModal;
