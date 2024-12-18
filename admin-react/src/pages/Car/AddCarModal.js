import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchAllUsers } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { CarType } from "../../enums/carType.enum";
import { addCar } from "../../redux/slices/carSlice";


const AddTourModal = ({ show, handleClose }) => {
    const [carType, setCarType] = useState(CarType.XE_4_CHO);
    const [priceCarTour, setPriceCarTour] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [distanceThreshold, setDistanceThreshold] = useState("");
    const [priceForThresholdKm, setPriceForThresholdKm] = useState("");
    const [priceForExtraKm, setPriceForExtraKm] = useState("");
    const [waitingPrice, setWaitingPrice] = useState("");

    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.tour);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
   
        try {
            const carData = {
                carType,
                priceCarTour: Number(priceCarTour),
                basePrice: Number(basePrice),
                distanceThreshold: Number(distanceThreshold),
                priceForThresholdKm: Number(priceForThresholdKm),
                priceForExtraKm: Number(priceForExtraKm),
                waitingPrice: Number(waitingPrice),

            }
           
            await dispatch(addCar(carData)).unwrap();
       
            handleClose();
      
        } catch (error) {
            toast.error(error);
        }
    };



    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Thêm Loại Xe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddSubmit}>
               
                    <Form.Group controlId="formHandle">
                        <Form.Label>Loại Xe</Form.Label>
                        <Form.Select onChange={(e) => setCarType(e.target.value)}>
                            <option value={CarType.XE_4_CHO}>{CarType.XE_4_CHO}</option>
                            <option value={CarType.XE_7_CHO}>{CarType.XE_7_CHO}</option>
                            <option value={CarType.XE_9_CHO}>{CarType.XE_9_CHO}</option>
                            <option value={CarType.XE_16_CHO}>{CarType.XE_16_CHO}</option>
                            <option value={CarType.XE_29_CHO}>{CarType.XE_29_CHO}</option>
                            <option value={CarType.XE_45_CHO}>{CarType.XE_45_CHO}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá xe theo Tour</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá theo tour" onChange={(e) => setPriceCarTour(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Mở Cửa</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá mở cửa" onChange={(e) => setBasePrice(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Quãng Đường Đầu (30KM)</Form.Label>
                        <Form.Control type="text" placeholder="Nhập quãng đường đầu" onChange={(e) => setDistanceThreshold(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Quãng Đường Đầu</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá quãng đường đầu" onChange={(e) => setPriceForThresholdKm(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Quãng Đường Tiếp</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá quãng đường tiếp" onChange={(e) => setPriceForExtraKm(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formDescribe">
                        <Form.Label>Giá Chờ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập giá chờ" onChange={(e) => setWaitingPrice(e.target.value)} required />
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

export default AddTourModal;
