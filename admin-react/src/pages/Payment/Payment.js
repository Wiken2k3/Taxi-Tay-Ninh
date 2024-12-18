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
import './Payment.css'
import { Status } from "../../enums/status.enum";

import { fetchAllPayment } from "../../redux/slices/paymentSlice";
import { toVietnamTime } from "../../helpers/dateHelper";
import { toVietnamCurrency } from "../../helpers/currencyHelper";





const Payment = ({ setToggle }) => {
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [action, setAction] = useState('');
  const [deleted, setDeleted] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("All");
  const dispatch = useDispatch();
  const location = useLocation();
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const { listPayment, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.payment);


  useEffect(()=>{
    dispatch(fetchAllPayment({ page:page, limit: limit }))
  }, [])
  useEffect(()=>{
    if (isError){
      toast.error(errorMessage)
    }
  }, [isError, errorMessage])
  




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
    dispatch(fetchAllPayment({ page: selectedPage, limit: limit }))
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
    dispatch(fetchAllPayment({ page: page, limit: newLimit }))

  };




  const filtered = listPayment.filter((payment) => {
    const matches = selected === "All" || payment.status === selected;
    const matchesSearch =
      (payment.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (payment.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (payment.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase())||
      (payment.orderInfo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (payment.amount?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (payment.orderId?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matches && matchesSearch;
  });

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Lịch Sử Thanh Toán</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleChange} value={selected}>
                <option value="All">Tất cả</option>
                <option value={Status.PENDING}>Chờ Duyệt</option>
                <option value={Status.APPROVED}>Đã Duyệt</option>
                <option value={Status.REJECTED}>Đã Huỷ</option>
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
                  onChange={handleSearchChange}/>
              </InputGroup>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "10%" }}>Họ và Tên</th>
                  <th style={{ width: "10%" }}>Phone</th>
                  <th style={{ width: "10%" }}>OrDer ID</th>
                  <th style={{ width: "10%" }}>Order Info</th>
                  <th style={{ width: "8%" }}>Link Tạo</th>
                  <th style={{ width: "8%" }}>Ngày Tạo</th>
                  <th style={{ width: "8%" }}>IP</th>
                  <th style={{ width: "6%" }}>Tổng Tiền</th>
                  <th style={{ width: "10%" }}>Ngày thanh toán</th>
                  <th style={{ width: "8%" }}>ID_GD VNPAY</th>
                  <th style={{ width: "10%" }}>Thông tin thanh toán</th>    
                 
                </tr>
              </thead>
              <tbody>
                {filtered.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{payment.customerName}</td>
                    <td>{payment.customerPhone}</td>
                    <td>{payment.orderId}</td>
                    <td>{payment.orderInfo}</td>
                    <td>
                      <a href={payment.paymentUrl} target="_blank" rel="noopener noreferrer">
                        Link VNPAY
                      </a>
                    </td>
                    <td>{toVietnamTime(payment.createDate)}</td>
                    <td>{payment.ipAddress}</td>
                
                    <td>{toVietnamCurrency(payment.amount)}</td>
                    {payment.createdAt !== payment.updatedAt ?(
                      <td>{toVietnamTime(payment.updatedAt)}</td>
                    ):(
                     <td></td>
                    )}
                   
                    <td>{payment.trading_code}</td>
                    <td>{payment.transaction_results}</td>
                    
                   
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
    

    </>
  );
}
export default Payment