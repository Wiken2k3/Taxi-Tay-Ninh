import React, { useEffect, useState } from 'react';
import { Container, Table, Button, FormControl, InputGroup, Modal, Col ,Form, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTaxiBookingCurrentUser } from '../../redux/slices/taxiBookingSlice';
import { toVietnamTime } from '../../helpers/dateHelper';
import { toVietnamCurrency } from '../../helpers/currencyHelper';
import { Status, getStatusStyle } from '../../enums/status.enum';
import { extractAddress } from '../../helpers/addressHelper';

const TaxiBookingHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page , setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selected, setSelected] = useState("All");
  const dispatch = useDispatch()

  const { listTaxiBooking, isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.taxiBooking);

  useEffect(()=>{
    dispatch(fetchAllTaxiBookingCurrentUser({page,limit}))
  },[])




  const handleShowModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const filtered = listTaxiBooking.filter((taxiBooking) => {
    const matches = selected === "All" || taxiBooking.status === selected;
    const matchesSearch =
      (taxiBooking.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (taxiBooking.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (taxiBooking.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matches && matchesSearch;
  });
  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    dispatch(fetchAllTaxiBookingCurrentUser({ page: page, limit: newLimit }))

  };
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container className="mt-4">
      {/* <h4 className="text-center mb-4"><strong>LỊCH SỬ ĐẶT TAXI</strong></h4> */}
      <div className="title-holder">
        <h2>LỊCH SỬ ĐẶT TAXI</h2>
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
            <th style={{ width: "30%" }}>Điểm điểm</th>
            <th style={{ width: "15%" }}>Ngày đặt</th>
            <th style={{ width: "15%" }}>Tổng tiền</th>
            <th style={{ width: "15%" }}>Trạng Thái</th>
            <th style={{width:"20%"}}>Chi tiết hoá đơn</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((booking, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{extractAddress(booking.pickupLocation, booking.dropoffLocation)}</td>
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
              <p><strong>Điểm đón:</strong> {selectedBooking.pickupLocation}</p>
              <p><strong>Điểm trả:</strong> {selectedBooking.dropoffLocation}</p>
              <p><strong>Dịch vụ:</strong> {selectedBooking.serviceType}</p>
              <p><strong>Ngày đi:</strong> {toVietnamTime(selectedBooking.departureDate)}</p>
              {selectedBooking.returnDate &&(
                <p><strong>Ngày về:</strong> {toVietnamTime(selectedBooking.returnDate)}</p>
              )}
              <p><strong>Loại xe:</strong> {selectedBooking.carType}</p>
              <p><strong>Khoảng cách:</strong> {selectedBooking.distance}</p>
              <p><strong>Thời gian đi:</strong> {selectedBooking.duration}</p>
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

export default TaxiBookingHistory;
