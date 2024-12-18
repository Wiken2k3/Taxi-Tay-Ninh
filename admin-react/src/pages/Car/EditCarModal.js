import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchAllUsers } from "../../redux/slices/userSlice";
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { updateTour } from "../../redux/slices/tourSlice";
import { CarType } from "../../enums/carType.enum";
import { updateCar } from "../../redux/slices/carSlice";

const EditVehicleModal = ({ show, handleClose, edit }) => {
    const [carType, setCarType] = useState(edit ? edit.carType : "4 Chỗ");
    const [priceCarTour, setPriceCarTour] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [distanceThreshold, setDistanceThreshold] = useState("");
    const [priceForThresholdKm, setPriceForThresholdKm] = useState("");
    const [priceForExtraKm, setPriceForExtraKm] = useState("");
    const [waitingPrice, setWaitingPrice] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            setCarType(edit.carType);
            setPriceCarTour(edit.priceCarTour);
            setBasePrice(edit.basePrice);
            setDistanceThreshold(edit.distanceThreshold);
            setPriceForThresholdKm(edit.priceForThresholdKm);
            setPriceForExtraKm(edit.priceForExtraKm);
            setWaitingPrice(edit.waitingPrice);
        }
    }, [edit]);
    
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const carUpdateData ={
                carType,
                priceCarTour: Number(priceCarTour),
                basePrice: Number(basePrice),
                distanceThreshold: Number(distanceThreshold),
                priceForThresholdKm: Number(priceForThresholdKm),
                priceForExtraKm: Number(priceForExtraKm),
                waitingPrice: Number(waitingPrice),

            }

            await dispatch(updateCar({ id: edit._id, carUpdateData: carUpdateData })).unwrap();
           
            handleClose();
        } catch (error) {

        }
    };


    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Sửa Loại Xe {edit?.carType}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Select value={carType} onChange={(e) => setCarType(e.target.value)}>
                        <option value={CarType.XE_4_CHO}>{CarType.XE_4_CHO}</option>
                        <option value={CarType.XE_7_CHO}>{CarType.XE_7_CHO}</option>
                        <option value={CarType.XE_9_CHO}>{CarType.XE_9_CHO}</option>
                        <option value={CarType.XE_16_CHO}>{CarType.XE_16_CHO}</option>
                        <option value={CarType.XE_29_CHO}>{CarType.XE_29_CHO}</option>
                        <option value={CarType.XE_45_CHO}>{CarType.XE_45_CHO}</option>
               
                    </Form.Select>
                  
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá xe theo Tour</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá theo tour" defaultValue={edit?.priceCarTour} onChange={(e) => setPriceCarTour(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Mở Cửa</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá mở cửa" defaultValue={edit?.basePrice}  onChange={(e) => setBasePrice(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Quãng Đường Đầu (30KM)</Form.Label>
                        <Form.Control type="text" placeholder="Nhập quãng đường đầu" defaultValue={edit?.distanceThreshold} onChange={(e) => setDistanceThreshold(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Quãng Đường Đầu</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá quãng đường đầu" defaultValue={edit?.priceForThresholdKm} onChange={(e) => setPriceForThresholdKm(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Quãng Đường Tiếp</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá quãng đường tiếp" defaultValue={edit?.priceForExtraKm} onChange={(e) => setPriceForExtraKm(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Chờ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá chờ" defaultValue={edit?.waitingPrice} onChange={(e) => setWaitingPrice(e.target.value)} required />
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

export default EditVehicleModal;
