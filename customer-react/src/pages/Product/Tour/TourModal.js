import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PaymentModal from "../../Payment/PaymentModal"
import "./Tour.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCar } from "../../../redux/slices/carSlice";
import { toVietnamCurrency } from "../../../helpers/currencyHelper";
import { toast } from "react-toastify";

const  TourModal =({ show, handleClose, product }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [note, setNote] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [serviceType, setServiceType] = useState(""); 
  const [carType, setCarType] = useState("4 Chỗ");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [priceTour, setPriceTour] = useState(0); // Khởi tạo với giá tour cơ bản
  const [price, setPrice] = useState(product.price); // Khởi tạo với giá tour cơ bản
  const [priceCar, setPriceCar] = useState(0); // Khởi tạo với giá tour cơ bản
  const [infoProduct, setDataProduct] = useState("");

  const dispatch = useDispatch()
  const listCars = useSelector(state => state.car.listCars)
  const currentUser = useSelector(state => state.auth.currentUser)

  useEffect( ()=>{
    dispatch(fetchAllCar({page:page,limit:limit}))
  }, [])


  const handlePayment = (e) => {
    e.preventDefault();
    if (!serviceType || !currentUser) {
      toast.error("Bạn cần đăng nhập để tiếp tục");
      return;
    }
    const dataProduct = {
      tourId: product._id,
      name,
      phone,
      pickupAddress,
      note,
      departureDate,
      returnDate,
      serviceType,
      carType,
      price: price
    }
    setDataProduct(dataProduct)
    setShowPaymentModal(true)
  };

  useEffect(() => {
    setPrice(Number(product.price) + priceTour+ priceCar );
  }, [priceCar, priceTour, product.price]);

  const handleServiceSelect = (service) => {
    setServiceType(service.name);
    setPriceTour(Number(service.price));

  };

  const handleCareSelect = (car) => {
    setCarType(car.carType);
    setPriceCar(Number(car.priceCarTour));
  

  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);



  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="tour-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <strong>{product.title}</strong>
            <small className="text-muted d-block">{product.location}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="w-auto">
            {/* Image Section for Travel Type */}
            <Col lg={6} className="align-items-center">
              <h3 className="mb-3 text-center">Chọn gói dịch vụ</h3>
              {product?.images?.length > 0 && product?.services?.length > 0 && (
                <>
                  {product.images.map((image, index) => {
                    // Lấy dịch vụ tương ứng với hình ảnh
                    const service = product.services[index];
                    return (
                      service && (
                        <div key={index} className="mb-3">
                          <div
                            onClick={() => handleServiceSelect(service)}
                            className={`image-select-container ${serviceType === service.name ? "selected" : ""}`}
                          >
                            <img
                              src={`${process.env.REACT_APP_NESTJS_APP_URL}${image}`}
                              alt={service.name}
                              className="img-fluid rounded"
                            />
                          </div>
                          <p className="text-center">
                            <strong>{service.name}</strong>
                          </p>
                        </div>
                      )
                    );
                  })}
                </>
              )}
            </Col>

            {/* Dashed Border */}
            <Col lg={1} className="d-flex justify-content-center">
              <div className="border-dashed"></div>
            </Col>

            {/* Form Section for Vehicle Type */}
            <Col lg={5} className="modal-content-section tour-info">
              <h3 className="mb-3 text-center">Thông tin cá nhân</h3>
              <Form onSubmit={handlePayment}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Họ và tên:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    defaultValue={currentUser?.name} onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    defaultValue={currentUser?.phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Địa chỉ đón:</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Nhập địa chỉ đón"
                    className="rounded-pill"
                  />
                </Form.Group>
                <Form.Group controlId="formNotes" className="mb-3">
                  <Form.Label>Ghi chú:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    onChange={(e) => setNote(e.target.value)}
                    className="rounded"
                    placeholder="Nhập ghi chú"
                  />
                </Form.Group>
                {/* Ngày đi and Ngày về fields with time */}
                <Form.Group className="mt-2 mb-2" controlId="departureDate">
                  <Form.Label>Ngày & Giờ đi</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </Form.Group>
                {/* Chỉ hiện thị trường Ngày về khi chọn 2 chiều */}
          
                  <Form.Group className="mt-2 mb-2" controlId="returnDate">
                    <Form.Label>Ngày & Giờ về</Form.Label>
                    <Form.Control
                      type="datetime-local"
                    required
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </Form.Group>
                {/* Car Type Selection */}
                <Form.Group controlId="formCar" className="mb-2">
                  <Form.Label>Loại xe:</Form.Label>
                  <Row>
                    <Col>
                      <div className="car-options">
                        {listCars.map((car) => (
                          <Form.Check
                            key={car._id}
                            inline
                            type="radio"
                            required
                            label={car.carType}
                            name="car"
                            value={car.carType}
                            checked={carType === car.carType}
                            onChange={() => handleCareSelect(car)}
                          />
                        ))}
                      </div>
                    </Col>
                    </Row>
                </Form.Group>
                <div className="text-end">
                  <p>
                    <strong>Tổng tiền: </strong>
                    {toVietnamCurrency(price)} 
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="rounded-pill px-4"
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="success"
                    className="rounded-pill px-4"
                        type="submit"
                  >
                    Thanh toán
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        infoProduct={infoProduct}
        closeParentModal={handleClose}
      />
    </>
  );
}

export default TourModal;
