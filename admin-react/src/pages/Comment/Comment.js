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
import './Comment.css'
import { Status, getStatusStyle } from "../../enums/status.enum";

import { fetchAllTaxiBooking } from "../../redux/slices/taxiBookingSlice";
import { fetchAllComment } from "../../redux/slices/commentSlice";
import EditCommentModal from "./EditCommentModal";





const  Comment = ({ setToggle }) =>{
  
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
  const { listComment, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.comment);

  useEffect(()=>{
    dispatch(fetchAllComment({ page:page, limit: limit }))
  }, [])


  useEffect(() => {

    if (isSuccess) {
     
      if (actionType === 'ACTIVE_COMMENT') {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
      } 

      dispatch(fetchAllComment({ page: page, limit: limit }))
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
    dispatch(fetchAllComment({ page: selectedPage, limit: limit }))
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
    dispatch(fetchAllComment({ page: page, limit: newLimit }))

  };




  const filtered = listComment.filter((comment) => {
    const matches = selected === "All" || comment.status === selected;
    const matchesSearch =
      (comment.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (comment.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (comment.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matches && matchesSearch;
  });

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý Bình Luận</h4>
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
                  onChange={handleSearchChange}/>
              </InputGroup>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "15%" }}>Họ và Tên</th>
                  <th style={{ width: "10%" }}>Phone</th>
                  <th style={{ width: "50%" }}>Nội Dung</th>
                  <th style={{ width: "10%" }}>Đánh Giá</th>
                  <th style={{ width: "10%" }}>Trạng Thái</th>
                  <th style={{ width: "10%" }} className="text-end">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((comment, index) => (
                  <tr key={comment._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{comment.customerName}</td>
                    <td>{comment.customerPhone}</td>
                    <td>{comment.content}</td>
                    <td>
                      {comment.rating} <i className="fas fa-star"></i>
                    </td>
                    <td>
                      <Button variant="success" size="sm" style={getStatusStyle(comment.status)}>{comment.status}</Button>
                    </td>
                    <td className="text-end">
                      {/* Kiểm tra trạng thái và hiển thị các nút hoặc biểu tượng tương ứng */}
                      {comment.status === Status.APPROVED || comment.status === Status.REJECTED ? (
                        // Nếu trạng thái là 'approved' hoặc 'rejected', hiển thị dấu tích hoặc dấu x
                        <></>
                      ) : (
                        // Nếu trạng thái không phải là 'approved' hoặc 'rejected', hiển thị các nút
                        <>
                          <Button
                            variant="link"
                            className="me-2"
                            style={{ color: "green", textDecoration: "none" }}
                              onClick={() => handleUpdate(comment, Status.APPROVED)}>
                            <i className="bi bi-check-circle"></i>
                          </Button>
                          <Button
                            variant="link"
                            style={{ color: "red", textDecoration: "none" }}
                              onClick={() => handleUpdate(comment, Status.REJECTED)}>
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
      {/* <AddTaxiBookingModal  show={showAddModal} handleClose={handleCloseAddModal} /> */}
      {/* Modal sửa */}
      <EditCommentModal show={showEditModal} handleClose={handleCloseEditModal} edit={edit} action={action} />
      {/* Modal xác nhận xóa */}
      {/* <DeleteTaxiModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deletee={deletee} /> */}

    </>
  );
}
export default Comment