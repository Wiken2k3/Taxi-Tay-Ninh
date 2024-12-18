import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTourBooking } from "../../redux/slices/tourBookingSlice";
import { PaymentType } from "../../enums/payment.enums";
import { toVietnamCurrency } from "../../helpers/currencyHelper";

const  PaymentModal = ({ show, handleClose, infoProduct, closeParentModal }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const dispatch = useDispatch();


 

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pay = {
        ...infoProduct,
        price: Number(infoProduct.price),
        paymentMethods: selectedPaymentMethod
      };

      await dispatch(addTourBooking(pay)).unwrap();
      toast.success("Thanh toán thành công");
      // Đóng modal thanh toán
      handleClose();
      // Đóng modal cha
      closeParentModal();
    
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Container className="pay">
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="payment-modal"
      >
        <Modal.Body className="bg-none">
          <Form className="paymodal" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Thanh toán:</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Thanh toán tiền mặt"
                  name="paymentMethod"
                  className="mb-2"
                  value={PaymentType.TIENMAT}
                  checked={selectedPaymentMethod === PaymentType.TIENMAT}
                  onChange={handlePaymentMethodChange}
                />
                <Form.Check
                  type="radio"
                  label="Thanh toán VNPAY"
                  name="paymentMethod"
                  className="mb-2"
                  value={PaymentType.VNPAY}
                  checked={selectedPaymentMethod === PaymentType.VNPAY}
                  onChange={handlePaymentMethodChange}
                />
              </div>
            </Form.Group>
            <div className="text-end">
              <p>
                <strong>Tổng tiền: </strong>
                <span className="text-end">
                  {toVietnamCurrency(infoProduct?.price)}
                </span>
              </p>
              <p>
                <strong>Số tiền thanh toán: </strong>
                <span className="text-danger">
                  {toVietnamCurrency(infoProduct?.price)}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit" className="rounded-pill px-4">
                Xác nhận
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="rounded-pill px-4"
              >
                Hủy
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default PaymentModal;
