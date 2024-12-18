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
import './Contact.css'


import EditContactModal from "./EditContactModal";
import { fetchAllContact, fetchCountPending } from "../../redux/slices/contactSlice";
import { StatusContact, getStatusContactStyle } from "../../enums/contact.enum";





const Contact = ({ setToggle }) => {
  
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
  const { listContact,isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.contact);

 
  useEffect(()=>{

    dispatch(fetchAllContact({ page:page, limit: limit }))
  }, [])

 


  useEffect(() => {

    if (isSuccess) {
     
      if (actionType === 'ACTIVE_CONTACT') {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
      } 
      dispatch(fetchAllContact({ page: page, limit: limit }))
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
    dispatch(fetchAllContact({ page: selectedPage, limit: limit }))
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
    dispatch(fetchAllContact({ page: page, limit: newLimit }))

  };




  const filtered = listContact.filter((contact) => {
    const matches = selected === "All" || contact.status === selected;
    const matchesSearch =
      (contact.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (contact.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (contact.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matches && matchesSearch;
  });

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý Contact</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleChange} value={selected}>
                <option value="All">Tất cả</option>
                <option value={StatusContact.PENDING}>{StatusContact.PENDING}</option>
                <option value={StatusContact.APPROVED}>{StatusContact.APPROVED}</option>
                <option value={StatusContact.REJECTED}>{StatusContact.REJECTED}</option>
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
                  <th style={{ width: "10%" }}>Email</th>
                  <th style={{ width: "20%" }}>Chủ Đề</th>
                  <th style={{ width: "25%" }}>Nội Dung</th>
                  <th style={{ width: "10%" }}>Trạng Thái</th>
                  <th style={{ width: "10%" }} className="text-end">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>{contact.topic}</td>
                    <td>{contact.content}</td>
                    <td>
                      <Button variant="success" size="sm" style={getStatusContactStyle(contact.status)}>{contact.status}</Button>
                    </td>
                    <td className="text-end">
                      {/* Kiểm tra trạng thái và hiển thị các nút hoặc biểu tượng tương ứng */}
                      {contact.status === StatusContact.APPROVED || contact.status === StatusContact.REJECTED ? (
                        // Nếu trạng thái là 'approved' hoặc 'rejected', hiển thị dấu tích hoặc dấu x
                        <></>
                      ) : (
                        // Nếu trạng thái không phải là 'approved' hoặc 'rejected', hiển thị các nút
                        <>
                          <Button
                            variant="link"
                            className="me-2"
                            style={{ color: "green", textDecoration: "none" }}
                              onClick={() => handleUpdate(contact, StatusContact.APPROVED)}>
                            <i className="bi bi-check-circle"></i>
                          </Button>
                          <Button
                            variant="link"
                            style={{ color: "red", textDecoration: "none" }}
                              onClick={() => handleUpdate(contact, StatusContact.REJECTED)}>
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
      <EditContactModal show={showEditModal} handleClose={handleCloseEditModal} edit={edit} action={action} />
      {/* Modal xác nhận xóa */}
      {/* <DeleteTaxiModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deletee={deletee} /> */}

    </>
  );
}
export default Contact