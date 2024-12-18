import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteCar } from "../../redux/slices/carSlice";

const DeleteTourModal = ({ show, handleClose, deleted }) => {
    const dispatch = useDispatch();

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(deleteCar({ id: deleted._id })).unwrap();
            handleClose();
        } catch (error) {

        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa Loại xe: {deleted?.carType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleDeleteSubmit}>
                    {deleted && (
                        <div>
                            <p>Bạn có chắc chắn muốn xóa ?</p>
                            <p><strong>Loại Xe:</strong> {deleted.carType}</p>
                            <p><strong>Mô Tả:</strong> {deleted.describe}</p>
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
