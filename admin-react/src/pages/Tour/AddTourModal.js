import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTour } from "../../redux/slices/tourSlice";
import { toast } from "react-toastify";

const AddTourModal = ({ show, handleClose }) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [services, setServices] = useState([
        { name: '', price: '' },
        { name: '', price: '' },
        { name: '', price: '' },

    ]);

    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.tour);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!mainImage) {
                toast.error("Vui lòng thêm ảnh chính");
                return;
            }
            if (additionalImages.length > 3) {
                toast.error('Bạn chỉ có thể chọn tối đa 3 ảnh phụ');
                return;
            }
            const imagesData = [mainImage, ...additionalImages].filter(image => image !== null);
            const tourData = {
                title,
                location,
                price: Number(price),
                services: services.map(service => ({
                    name: service.name,
                    price: Number(service.price)
                })),
            };

            await dispatch(addTour({ tourData, imagesData })).unwrap();
            setTitle('');
            setLocation('');
            setPrice('');
            setMainImage(null);
            setAdditionalImages([]);
            setServices([
                { name: '', price: '' },
                { name: '', price: '' },
                { name: '', price: '' }
            ]);
            handleClose();
        } catch (error) {

        }
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = services.map((service, i) =>
            i === index ? { ...service, [field]: value } : service
        );
        setServices(updatedServices);
    };

    const handleImageChange = (event) => {
        setMainImage(event.target.files[0]);
    };

    const handleImageChange1 = (event) => {
        setAdditionalImages(Array.from(event.target.files));
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>Quản lý Tour</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Tiêu Đề</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLocation">
                        <Form.Label>Địa Điểm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa điểm"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Giá Tiền</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập giá tiền"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {services.map((service, index) => (
                        <React.Fragment key={index}>
                            <Form.Group controlId={`formServiceName${index}`}>
                                <Form.Label>Gói Dịch Vụ {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={`Nhập dịch vụ ${index + 1}`}
                                    value={service.name}
                                    onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`formServicePrice${index}`}>
                                <Form.Label>Giá Tiền</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={`Nhập giá tiền dịch vụ ${index + 1}`}
                                    value={service.price}
                                    onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </React.Fragment>
                    ))}

                    <Form.Group controlId="formMainImage" className="mt-2">
                        <Form.Label>Ảnh Chính</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAdditionalImages" className="mt-2">
                        <Form.Label>Ảnh Phụ</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageChange1}
                            multiple
                        />
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
