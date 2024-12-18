import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchAllUsers } from "../../redux/slices/userSlice";
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { updateTour } from "../../redux/slices/tourSlice";

const EditTourModal = ({ show, handleClose, editTour }) => {
    const [title, setTitle] = useState("");
    const [diadiem, setDiadiem] = useState("");
    const [price, setPrice] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState(null)
    const [services, setServices] = useState([
        { name: '', price: '' },
        { name: '', price: '' },
        { name: '', price: '' },
    ]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (editTour) {
            setTitle(editTour.title)
            setDiadiem(editTour.location)
            setPrice(editTour.price)
            setServices(editTour.services || [
                { name: '', price: '' },
                { name: '', price: '' },
                { name: '', price: '' }
            ]);

        }
    }, [editTour]);

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
         
            let allImages = [];
            if (mainImage && !additionalImages) {
                toast.error("Vui lòng thêm 3 ảnh phụ");
                return
            }
            if (!mainImage && additionalImages) {
                toast.error("Vui lòng thêm ảnh chính");
                return
            }

            if (mainImage && additionalImages) {
                allImages = [mainImage, ...additionalImages].filter(image => image !== null);
            }

            const tourData = {
                title,
                location:diadiem,
                price: Number(price),
                services: services.map(service => ({
                    name: service.name,
                    price: Number(service.price)
                })),
            };
            // Nếu không có hình ảnh nào được chọn, allImages sẽ là mảng rỗng.
            await dispatch(updateTour({ id: editTour._id, tourData, images: allImages.length > 0 ? allImages : null })).unwrap();
          
            setTitle('');
            setDiadiem('');
            setPrice('');
            setAdditionalImages(null)
            setMainImage(null)
            setServices([
                { name: '', price: '' },
                { name: '', price: '' },
                { name: '', price: '' },
            ]);
            handleClose();
        } catch (error) {

        }
    };
    const handleKeyDown = (e) => {
        // Các phím được phép
        const allowedKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'
        ];

        // Kiểm tra nếu phím nhấn là phím điều khiển hoặc số
        if (allowedKeys.includes(e.key) || /^[0-9]$/.test(e.key)) {
            return; // Nếu là phím hợp lệ thì không làm gì
        }

        // Ngăn chặn nhập ký tự không hợp lệ
        e.preventDefault();
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
                <Modal.Title>Sửa Tour {editTour?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" defaultValue={editTour?.title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Địa Điểm</Form.Label>
                        <Form.Control type="text" defaultValue={editTour?.location} onChange={(e) => setDiadiem(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formHandle">
                        <Form.Label>Giá Tiền</Form.Label>
                        <Form.Control type="text" defaultValue={editTour?.price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    {services.map((service, index) => (
                        <React.Fragment key={index}>
                            <Form.Group controlId={`formServiceName${index}`}>
                                <Form.Label>Gói Dịch Vụ {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={service.name}
                                    onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId={`formServicePrice${index}`}>
                                <Form.Label>Giá Dịch Vụ {index + 1}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={service.price}
                                    onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                                    onKeyDown={handleKeyDown} // Giới hạn nhập số
                                />
                            </Form.Group>
                        </React.Fragment>
                    ))}
                    <Form.Group controlId="formImage" className="mt-2">
                        <Form.Label>Ảnh</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageChange}
                        // handle image upload
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage" className="mt-2">
                        <Form.Label>Ảnh Phụ</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageChange1}
                            multiple
                        // handle image upload
                        />
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

export default EditTourModal;
