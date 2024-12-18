import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import "./PaymentCallBack.css";
import paymentService from "../../services/paymentService";

const  PaymentCallBack = () => {

    const location = useLocation();
    const [vnp_Amount, setVnp_Amount] = useState(null);
    const [vnp_BankCode, setVnp_BankCode] = useState(null);
    const [vnp_BankTranNo, setVnp_BankTranNo] = useState(null);
    const [vnp_CardType, setVnp_CardType] = useState(null);
    const [vnp_OrderInfo, setVnp_OrderInfo] = useState(null);
    const [vnp_PayDate, setVnp_PayDate] = useState(null);
    const [vnp_ResponseCode, setVnp_ResponseCode] = useState(null);
    const [vnp_TmnCode, setVnp_TmnCode] = useState(null);
    const [vnp_TransactionNo, setVnp_TransactionNo] = useState(null);
    const [vnp_TransactionStatus, setVnp_TransactionStatus] = useState(null);
    const [vnp_TxnRef, setVnp_TxnRef] = useState(null);
    const [vnp_SecureHash, setVnp_SecureHash] = useState(null);
    const [tinhTrangGD, setTinhTrangGD] = useState(null);
    const [showModal, setShowModal] = useState(true); // Trạng thái hiển thị modal
    const convertToVietnamTime = (dateString) => {
        if (!dateString) return '';

        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const hour = dateString.substring(8, 10);
        const minute = dateString.substring(10, 12);
        const second = dateString.substring(12, 14);

        return `${day}/${month}/${year} - ${hour}:${minute}:${second}`;
 

       
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount / 100);
    };


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setVnp_Amount(query.get('vnp_Amount'));
        setVnp_BankCode(query.get('vnp_BankCode'));
        setVnp_BankTranNo(query.get('vnp_BankTranNo'));
        setVnp_CardType(query.get('vnp_CardType'));
        setVnp_OrderInfo(query.get('vnp_OrderInfo'));
        setVnp_PayDate(query.get('vnp_PayDate'));
        setVnp_ResponseCode(query.get('vnp_ResponseCode'));
        setVnp_TmnCode(query.get('vnp_TmnCode'));
        setVnp_TransactionNo(query.get('vnp_TransactionNo'));
        setVnp_TransactionStatus(query.get('vnp_TransactionStatus'));
        setVnp_SecureHash(query.get('vnp_SecureHash'));
        setVnp_TxnRef(query.get('vnp_TxnRef'));
        const fetchPaymentData = async () => {
            try {
                const params = {
                    vnp_Amount: +vnp_Amount,
                    vnp_BankCode,
                    vnp_BankTranNo,
                    vnp_CardType,
                    vnp_OrderInfo,
                    vnp_PayDate,
                    vnp_ResponseCode,
                    vnp_TmnCode,
                    vnp_TransactionNo,
                    vnp_TransactionStatus,
                    vnp_TxnRef,
                    vnp_SecureHash
                };

                // Kiểm tra và loại bỏ vnp_BankTranNo nếu không có giá trị
                if (!params.vnp_BankTranNo) {
                    delete params.vnp_BankTranNo;
                }

                const res = await paymentService.returnPayment(params);

                if (res.statusCode === 201 && res.data.code !== 97) {
                    setTinhTrangGD(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching payment data", error);
            }
        };


        fetchPaymentData();

        // Dispatch action to handle payment callback
    }, [location.search,
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(false); // Đóng modal khi nhấn nút Hủy
    };
    const handleLS = async () => {
        toast.error("Chưa phát triển");
    };

    return (
      
        <Container className="pay">
            <Modal
                centered
                className="payment-modal"
                show={showModal}
              
               
            >
                <Modal.Body className="bg-none">
                    <Form className="paymodal" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold ">HOÁ ĐƠN THANH TOÁN</Form.Label>
                            <div></div>
                        </Form.Group>
                        <div className="text">
                            <p>
                                <i className="fas fa-receipt"></i> <strong>Mã Hoá Đơn:</strong>
                                <span className="text-danger ms-2">{vnp_TxnRef || ""}</span>
                            </p>
                            <p>
                                <i className="fas fa-credit-card"></i>{" "}
                                <strong>Loại Thẻ:</strong>
                                <span className="text-danger ms-2">{vnp_CardType || ""}</span>
                            </p>
                            <p>
                                <i className="fas fa-money-check"></i>{" "}
                                <strong>Cổng thanh toán:</strong>
                                <span className="text-danger ms-2">{vnp_BankCode || ""}</span>
                            </p>
                            <p>
                                <i className="fas fa-money-check-alt"></i>{" "}
                                <strong>Số Tiền:</strong>
                                <span className="text-danger ms-2">
                                    {formatCurrency(vnp_Amount) || ""}
                                </span>
                            </p>
                            <p>
                                <i className="bi bi-calendar-date-fill"></i>{" "}
                                <strong>Ngày:</strong>
                                <span
                                    className="text-danger ms-2"
                                    style={{ whiteSpace: "pre-line" }}
                                >
                                    {convertToVietnamTime(vnp_PayDate) || ""}
                                </span>
                            </p>

                            <p>
                                <i className="bi bi-hand-thumbs-up-fill"></i>{" "}
                                <strong>Tình trạng giao dịch:</strong>
                                <span className="text-danger ms-2">
                                    {tinhTrangGD || " Thanh Cong"}
                                </span>
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/" className="btn btn-success rounded-pill px-4">
                                Xác nhận
                            </Link>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
      
    );
}

export default PaymentCallBack;
