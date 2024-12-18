import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./ConfirmModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import goongIoService from "../../services/goongIoService";
import carService from "../../services/carService";
import { PaymentType } from "../../enums/payment.enums";
import { addTaxiBooking } from "../../redux/slices/taxiBookingSlice";
import MapComponent from "./GoongMap";
import { toast } from "react-toastify";
import { toVietnamCurrency } from "../../helpers/currencyHelper";

const ConfirmModal = ({ show, handleClose, taxiData }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState("");
  const [paymentMethods, setPaymentMethods] = useState(PaymentType.TIENMAT);

  const currentUser = useSelector(state => state.auth.currentUser)
  const { isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.taxiBooking);
  const hasFetched = useRef(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Bạn cần đăng nhập để tiếp tục");
      return;
    }
    try {
      const bookingData = {
        name,
        phone,
        pickupLocation: taxiData.pickupLocation,
        dropoffLocation: taxiData.dropoffLocation,
        serviceType: taxiData.serviceType,
        departureDate: taxiData.departureDate,
        returnDate: taxiData.returnDate,
        carType: taxiData.carType,
        distance,
        duration,
        price: Number(price),
        paymentMethods
      }

      await dispatch(addTaxiBooking(bookingData)).unwrap();
      toast.success("Đặt xe thành công");

      handleClose(); // Đóng modal sau khi thành công

    }
    catch (error) {
      toast.error(error);
    }
  };


  useEffect(() => {

    if (!taxiData) {
      navigate('/booking');
      toast.error("Không có thông tin đặt xe");
      return; // Không cần gọi API nếu không có thông tin đặt xe
    }

    const getDistance = async () => {
      if (taxiData.pickupLatLng && taxiData.dropoffLatLng) {
        const { lat: pickupLat, lng: pickupLng } = taxiData.pickupLatLng;
        const { lat: dropoffLat, lng: dropoffLng } = taxiData.dropoffLatLng;

        try {
          const result = await goongIoService.fetchDistanceMatrix(
            [`${pickupLat},${pickupLng}`],
            [`${dropoffLat},${dropoffLng}`]
          );

          if (result && result.rows && result.rows.length > 0) {
            const distanceInfo = result.rows[0].elements[0];

            setDistance(distanceInfo.distance.text);
            setDuration(distanceInfo.duration.text);


            const res = await carService.pricingCar(taxiData.carType, distanceInfo.distance.value)
            if (res.statusCode === 200) {
              const priceTaxi = res.data.totalPrice
              if (taxiData.serviceType !== "1 chiều") {
                setPrice(priceTaxi * 2)
              }
              else {
                setPrice(priceTaxi)
              }

            }


          }
        } catch (error) {
          console.error('Error fetching distance matrix', error);
          toast.error('Lỗi khi lấy thông tin khoảng cách');
        }
      }
    };

    // Kiểm tra xem API đã được gọi chưa
    if (!hasFetched.current) {
      getDistance();
      hasFetched.current = true; // Đánh dấu đã gọi API
    }


  }, [taxiData, navigate]);


  const handlePaymentMethodsChange = (event) => {
    setPaymentMethods(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>ĐƠN XÁC NHẬN ĐẶT XE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="sumit-info">
            <Col md={6} className="sumit">
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt text-danger"></i> Điểm
                  đón:
                </strong>{" "}
                {taxiData.pickupLocation}
              </p>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt text-primary"></i> Điểm
                  trả:
                </strong>{" "}
                {taxiData.dropoffLocation}
              </p>
              <p>
                <strong>
                  <i className="fas fa-cogs text-success"></i> Dịch vụ:
                </strong>{" "}
                {taxiData.serviceType}
              </p>
              <p>
                <strong>
                  <i className="fas fa-calendar-alt"></i> Ngày đi:
                </strong>{" "}
                {`${taxiData.departureDate.split("T")[0]} ${taxiData.departureDate.split("T")[1]}`}
              </p>
              {taxiData.serviceType !== "1 chiều" && (
                <p>
                  <strong>
                    <i className="fas fa-calendar-alt"></i> Ngày về:
                  </strong>{" "}
                  {`${taxiData.returnDate.split("T")[0]} ${taxiData.returnDate.split("T")[1]}`}
                </p>
              )}
              <p>
                <strong>
                  <i className="fas fa-car text-danger"></i> Loại xe:
                </strong>{" "}
                {taxiData.carType}
              </p>
              <p>
                <strong>
                  <i className="fas fa-tachometer-alt text-info"></i> KM:
                </strong>{" "}
                {distance}
              </p>
              <p>
                <strong>
                  <i className="fas fa-clock text-info"></i> Thời gian đi:
                </strong>{" "}
                {duration}
              </p>
              <p>
                <strong>
                  <i className="fas fa-money-check-alt"></i> Giá tiền:
                </strong>{" "}
                {toVietnamCurrency(price)}
              </p>
            </Col>
            <Col md={6} className="info">
              <div>
                <strong>Họ và Tên:</strong>
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Họ và Tên"
                  required
                  defaultValue={currentUser?.name}
                  onChange={(e) => setName(e.target.value)}
                  
                />
              </div>
              <div className="mt-3">
                <strong>Phone:</strong>
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Số điện thoại"
                  defaultValue={currentUser?.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3">
                <strong>Phương thức thanh toán:</strong>
                <div className="mt-2">
                  <Form.Check
                    type="radio"
                    label={PaymentType.TIENMAT}
                    value={PaymentType.TIENMAT}
                    checked={paymentMethods === PaymentType.TIENMAT}
                    onChange={handlePaymentMethodsChange}
                    name="paymentMethod"
                    required
                  />
                  <Form.Check
                    type="radio"
                    label={PaymentType.VNPAY}
                    value={PaymentType.VNPAY}
                    checked={paymentMethods === PaymentType.VNPAY}
                    onChange={handlePaymentMethodsChange}
                    name="paymentMethod"
                    required
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button className="sumitcar" variant="success" type="submit">
              Gửi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
