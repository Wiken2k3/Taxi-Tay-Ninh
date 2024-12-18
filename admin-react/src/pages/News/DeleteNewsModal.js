import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteNews } from "../../redux/slices/newsSlice";

const DeleteNewsModal = ({ show, handleClose, deleted }) => {
    const dispatch = useDispatch();

    const handleDeleteSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(deleteNews({ id: deleted._id })).unwrap();
            handleClose();
        } catch (error) {
            toast.error(error);

        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Xoá Tin Tức: {deleted?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleDeleteSubmit}>
                    {deleted && (
                        <div>
                            <p>Bạn có chắc chắn muốn xóa Tin Tức này?</p>
                            <p><strong>Tiêu đề:</strong> {deleted.title}</p>
                            <p><strong>Địa Điểm:</strong> {deleted.summary}</p>
                           
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

export default DeleteNewsModal;
