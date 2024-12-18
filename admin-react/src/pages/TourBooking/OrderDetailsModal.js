import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toVietnamTime } from '../../helpers/dateHelper';
import { toVietnamCurrency } from '../../helpers/currencyHelper';

const OrderDetailsModal = ({ show, handleClose, orderDetails }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header >
        <Modal.Title>Thông Tin Đơn Hàng Tour - {orderDetails?.customerName}</Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
        {orderDetails && (
          <>
            <p><strong>Tên người đặt:</strong> {orderDetails.name}</p>
            <p><strong>Số điện thoại người đặt:</strong> {orderDetails.phone}</p>
            <p><strong>Tên Tour:</strong> {orderDetails.tourTitle}</p>
            <p><strong>Địa điểm:</strong> {orderDetails.tourLocation}</p>
            <p><strong>Điểm đón:</strong> {orderDetails.pickupAddress}</p>
            <p><strong>Dịch vụ:</strong> {orderDetails.serviceType}</p>
            <p><strong>Ngày đi:</strong> {toVietnamTime(orderDetails.departureDate)}</p>
            <p><strong>Ngày về:</strong> {toVietnamTime(orderDetails.returnDate)}</p>
            <p><strong>Loại xe:</strong> {orderDetails.carType}</p>
            <p><strong>Ghi chú:</strong> {orderDetails.note}</p>
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
