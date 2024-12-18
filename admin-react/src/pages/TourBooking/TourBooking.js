import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import {
  Button,
  Form,
  Table,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';

import './TourBooking.css'
import { Status, getStatusStyle } from "../../enums/status.enum";
import AddTourBookingModal from "./AddTourBookingModal";
import EditTourBookingModal from "./EditTourBookingModal";
import { fetchAllTourBooking } from "../../redux/slices/tourBookingSlice";
import { toVietnamCurrency } from "../../helpers/currencyHelper";
import OrderDetailsModal from "./OrderDetailsModal";




const TourBooking = ({ setToggle }) => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [action, setAction] = useState('');
  const [deleted, setDeleted] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("All");
  const dispatch = useDispatch();
  const location = useLocation();
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseOrderModal = () => setShowOrderModal(false);
  const { listTourBooking, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.tourBooking);


  useEffect(() => {
    dispatch(fetchAllTourBooking({ page: page, limit: limit }))
  }, [])


  useEffect(() => {

    if (isSuccess) {

      if (actionType === 'ACTIVE_TOURBOOKING') {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
      }
      dispatch(fetchAllTourBooking({ page: page, limit: limit }))

    }

    if (isError) {
      toast.error(errorMessage || "Đã xảy ra lỗi");
    }
  }, [isSuccess, isError, errorMessage, actionType, dispatch]);


  useEffect(() => {
    if (window.innerWidth > 768) {
      setToggle(false);
    } else {
      setToggle(true);
    }

  }, [location.pathname, setToggle]);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleUpdate = (tourbooking, actionType) => {
    setEdit(tourbooking);
    setAction(actionType);
    setShowEditModal(true);
  };


  const handleToggleBlock = (tourbooking) => {
    setDeleted(tourbooking);
    setShowDeleteModal(true);
  };
  const handlePageClick = (event) => {

    const selectedPage = event.selected + 1;
    setPage(selectedPage)
    dispatch(fetchAllTourBooking({ page: selectedPage, limit: limit }))
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    dispatch(fetchAllTourBooking({ page: page, limit: newLimit }))

  };
  const handleShowOrderDetails = (tourBooking) => { // Add function to show order details

    setSelectedOrder(tourBooking)
    setShowOrderModal(true)
  };



  const filtered = listTourBooking.filter((tourBooking) => {
    const matches = selected === "All" || tourBooking.status === selected;
    const matchesSearch =
      (tourBooking.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (tourBooking.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (tourBooking.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matches && matchesSearch;
  });

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý Tour Booking</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleChange} value={selected}>
                <option value="All">Tất cả</option>
                <option value={Status.PENDING}>{Status.PENDING}</option>
                <option value={Status.APPROVED}>{Status.APPROVED}</option>
                <option value={Status.REJECTED}>{Status.REJECTED}</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={2} className="mb-3 mb-md-0 text-md-end">
              <Form.Select onChange={handleItemsPerPageChange} value={limit}>
                <option value={10}>10 mục mỗi trang</option>
                <option value={20}>20 mục mỗi trang</option>
                <option value={50}>50 mục mỗi trang</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={3} className="mb-3 mb-md-0">
              <InputGroup>
                <FormControl
                  placeholder="Tìm kiếm ..."
                  value={searchTerm}
                  onChange={handleSearchChange} />
              </InputGroup>
            </Col>

          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "10%" }} >Tên KH</th>
                  <th style={{ width: "8%" }} >Phone KH</th>
                  <th style={{ width: "15%" }}>Tên Tour</th>
                  <th >Hình thức</th>
                  <th >Order ID</th>
                  <th style={{ width: "15%" }}> Thông tin thanh toán</th>
                  <th >Tổng tiền</th>
                  <th >Trạng thái</th>
                  <th style={{ width: "8%" }}>TT đơn hàng</th>
                  <th style={{ width: "8%" }} className="text-end">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tourBooking, index) => (
                  <tr key={tourBooking._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{tourBooking.customerName}</td>
                    <td>{tourBooking.customerPhone}</td>
                    <td>{tourBooking.tourTitle}</td>
                    <td>{tourBooking.paymentMethods}</td>
                    <td>{tourBooking.orderId}</td>
                    <td>{tourBooking.paymentStatus}</td>
                    <td>{toVietnamCurrency(tourBooking.price)}</td>
                    <td>
                      <Button variant="success" size="sm" style={getStatusStyle(tourBooking.status)}>{tourBooking.status}</Button>
                    </td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleShowOrderDetails(tourBooking)}>Xem chi tiết</Button>
                    </td>
                    <td className="text-end">
                      {/* Kiểm tra trạng thái và hiển thị các nút hoặc biểu tượng tương ứng */}
                      {tourBooking.status === Status.APPROVED || tourBooking.status === Status.REJECTED ? (
                        // Nếu trạng thái là 'approved' hoặc 'rejected', hiển thị dấu tích hoặc dấu x
                        <></>
                      ) : (
                        // Nếu trạng thái không phải là 'approved' hoặc 'rejected', hiển thị các nút
                        <>
                          <Button
                            variant="link"
                            className="me-2"
                            style={{ color: "green", textDecoration: "none" }}
                            onClick={() => handleUpdate(tourBooking, Status.APPROVED)}>
                            <i className="bi bi-check-circle"></i>
                          </Button>
                          <Button
                            variant="link"
                            style={{ color: "red", textDecoration: "none" }}
                            onClick={() => handleUpdate(tourBooking, Status.REJECTED)}>
                            <i className="bi bi-x-circle"></i>
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>

      </div>

      {/* Modal thêm */}
      <AddTourBookingModal show={showAddModal} handleClose={handleCloseAddModal} />
      {/* Modal sửa */}
      <EditTourBookingModal show={showEditModal} handleClose={handleCloseEditModal} edit={edit} action={action} />
      {/* Modal xác nhận xóa */}
      {/* <DeleteUserModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deletee={deletee} /> */}
      <OrderDetailsModal show={showOrderModal} handleClose={handleCloseOrderModal} orderDetails={selectedOrder} />
    </>
  );
}
export default TourBooking