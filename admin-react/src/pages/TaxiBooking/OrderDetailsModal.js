import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toVietnamTime } from '../../helpers/dateHelper';
import { toVietnamCurrency } from '../../helpers/currencyHelper';

const OrderDetailsModal = ({ show, handleClose, orderDetails }) => {
  console.log(orderDetails)
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header >
        <Modal.Title>Thông Tin Đơn Hàng Taxi - {orderDetails?.customerName} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderDetails && (
          <>
            <p><strong>Tên người đặt:</strong> {orderDetails.name}</p>
            <p><strong>Số điện thoại người đặt:</strong> {orderDetails.phone}</p>
            <p><strong>Điểm đón:</strong> {orderDetails.pickupLocation}</p>
            <p><strong>Điểm trả:</strong> {orderDetails.dropoffLocation}</p>
            <p><strong>Dịch vụ:</strong> {orderDetails.serviceType}</p>
            <p><strong>Ngày đi:</strong> {toVietnamTime(orderDetails.departureDate)}</p>
            {orderDetails.returnDate && (
              <p><strong>Ngày về:</strong> {toVietnamTime(orderDetails.returnDate)}</p>
            )}
            <p><strong>Loại xe:</strong> {orderDetails.carType}</p>
            <p><strong>Khoảng cách:</strong> {orderDetails.distance}</p>
            <p><strong>Thời gian đi:</strong> {orderDetails.duration}</p>
            <p><strong>Tổng tiền:</strong> {toVietnamCurrency(orderDetails.price)}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
