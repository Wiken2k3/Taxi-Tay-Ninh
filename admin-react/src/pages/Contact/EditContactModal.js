import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleTaxi } from "../../redux/slices/taxiBookingSlice";
import { toggleContact } from "../../redux/slices/contactSlice";
import { StatusContact } from "../../enums/contact.enum";

const EditContactModal = ({ show, handleClose, edit,action }) => {

    const dispatch = useDispatch();

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
        
            await dispatch(toggleContact({ id: edit._id, action:action })).unwrap();
            handleClose();
   
        } catch (error) {
            toast.error(error);
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
                        {action === StatusContact.APPROVED ? 'Xác Nhận Giải Quyết ✔' : 'Hủy Giải Quyết ❌'}
                </p>
                <div className="d-flex justify-content-center mt-4">
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                            variant={action === StatusContact.APPROVED ? 'success' : 'danger'}
                        className="ms-2"
                        type="submit"
                    >
                            {action === StatusContact.APPROVED ? 'Xác Nhận' : 'Xác Nhận '}
                    </Button>
                </div>
                </Form>

            </Modal.Body>
        </Modal>

    );
};

export default EditContactModal;
