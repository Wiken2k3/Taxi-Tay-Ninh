import React, { useEffect, useState } from 'react';
import { Container, Table, Button, FormControl, InputGroup, Modal, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toVietnamTime } from '../../helpers/dateHelper';
import { toVietnamCurrency } from '../../helpers/currencyHelper';
import { Status, getStatusStyle } from '../../enums/status.enum';
import { fetchAllTourBookingCurrentUser } from '../../redux/slices/tourBookingSlice';

const TourBookingHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selected, setSelected] = useState("All");
  const dispatch = useDispatch()

  const { listTourBooking, isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.tourBooking);

  useEffect(() => {
    dispatch(fetchAllTourBookingCurrentUser({ page, limit }))
  }, [])



  const handleShowModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const filtered = listTourBooking.filter((tourBooking) => {
    const matches = selected === "All" || tourBooking.status === selected;
    const matchesSearch =
      (tourBooking.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (tourBooking.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (tourBooking.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matches && matchesSearch;
  });
  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    dispatch(fetchAllTourBookingCurrentUser({ page: page, limit: newLimit }))

  };
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container className="mt-4">
      
      <div className="title-holder">
        <h2>LỊCH SỬ ĐẶT TOUR</h2>
        <div className="subtitle">TẤT CẢ CÁC LỊCH SỬ</div>
      </div>
      <Row className="mb-3">
        <Col xs={12} md={3} className="mb-3 mb-md-0">
          <Form.Select onChange={handleChange} value={selected}>
            <option value="All">Tất cả</option>
            <option value={Status.PENDING}>{Status.PENDING}</option>
            <option value={Status.APPROVED}>{Status.APPROVED}</option>
            <option value={Status.REJECTED}>{Status.REJECTED}</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3} className="mb-3 mb-md-0 text-md-end">
          <Form.Select onChange={handleItemsPerPageChange} value={limit}>
            <option value={10}>10 mục mỗi trang</option>
            <option value={20}>20 mục mỗi trang</option>
            <option value={50}>50 mục mỗi trang</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <InputGroup>
            <FormControl
              placeholder="Tìm kiếm ..."
              value={searchTerm}
              onChange={handleSearchChange} />
          </InputGroup>
        </Col>
      </Row>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th>Tên Tour</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng Thái</th>
            <th>Chi tiết hoá đơn</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((booking, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{booking.tourTitle}</td>
              <td>{toVietnamTime(booking.createdAt)}</td>
              <td>{toVietnamCurrency(booking.price)}</td>
              <td>
                <Button variant="success" size="sm" style={getStatusStyle(booking.status)}>{booking.status}</Button>
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleShowModal(booking)}>Xem chi tiết</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Invoice Details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hoá đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <>
              <p><strong>Tên người đặt:</strong> {selectedBooking.name}</p>
              <p><strong>Số điện thoại người đặt:</strong> {selectedBooking.phone}</p>
              <p><strong>Tên Tour:</strong> {selectedBooking.tourTitle}</p>
              <p><strong>Địa điểm:</strong> {selectedBooking.tourLocation}</p>
              <p><strong>Điểm đón:</strong> {selectedBooking.pickupAddress}</p>
              <p><strong>Dịch vụ:</strong> {selectedBooking.serviceType}</p>
              <p><strong>Ngày đi:</strong> {toVietnamTime(selectedBooking.departureDate)}</p>
              <p><strong>Ngày về:</strong> {toVietnamTime(selectedBooking.returnDate)}</p>
              <p><strong>Loại xe:</strong> {selectedBooking.carType}</p>
              <p><strong>Ghi chú:</strong> {selectedBooking.note}</p>
              <p><strong>Tổng tiền:</strong> {toVietnamCurrency(selectedBooking.price)}</p>
              <p><strong>Hình thức thanh toán:</strong> {selectedBooking.paymentMethods}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TourBookingHistory;
