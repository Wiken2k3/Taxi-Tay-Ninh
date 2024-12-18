import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Status } from "../../enums/status.enum";
import { toggleComment } from "../../redux/slices/commentSlice";

const EditCommentModal = ({ show, handleClose, edit,action }) => {

    const dispatch = useDispatch();

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {

            await dispatch(toggleComment({ id: edit._id, action:action })).unwrap();
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
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="text-center p-4">
                <Form onSubmit={handleUpdateSubmit}>
                <div className="mb-3">
                    {/* Add your icon here, e.g., using an emoji or an SVG */}
                    <div style={{ fontSize: '48px', color: '#F5C09D' }}>⚠️</div>
                </div>
                <h5 className="mb-3">Thông báo</h5>
                <p className="text-muted">
                        {action === Status.APPROVED ? 'Xác Nhận Đơn Hàng ✔' : 'Hủy Đơn Hàng ❌'}
                </p>
                <div className="d-flex justify-content-center mt-4">
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                            variant={action === Status.APPROVED ? 'success' : 'danger'}
                        className="ms-2"
                        type="submit"
                    >
                            {action === Status.APPROVED ? 'Xác Nhận' : 'Hủy Đơn '}
                    </Button>
                </div>
                </Form>

            </Modal.Body>
        </Modal>

    );
};

export default EditCommentModal;
