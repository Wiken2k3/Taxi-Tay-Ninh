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
import './User.css'
import { addUser, deleteUser, fetchAllUsers, updateUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { userRole } from "../../enums/userRole.enum";


const User = ({ setToggle }) => {
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const dispatch = useDispatch();
  const location = useLocation();
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const { listUsers, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.user);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(()=>{
    dispatch(fetchAllUsers({ page:page, limit: limit }))
  }, [])


  useEffect(() => {

    if (isSuccess) {
      if (actionType === 'ADD_USER') {
        toast.success("Thêm người dùng thành công");
      } else if (actionType === 'UPDATE_USER') {
        toast.success("Cập nhật người dùng thành công");
      } else if (actionType === 'ACTIVE_USER') {
        toast.success("Cập nhật trạng thái người dùng thành công");
      } else if (actionType === 'DELETE_USER') {
        toast.success("Xóa người dùng thành công");
      }
      dispatch(fetchAllUsers({ page: page, limit: limit }))
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

  const handleUpdate = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };


  const handleToggleBlock = (user) => {
    setDeleteUserId(user);
    setShowDeleteModal(true);
  };
  const handlePageClick = (event) => {

    const selectedPage = event.selected + 1;
    setPage(selectedPage)
    dispatch(fetchAllUsers({ page: selectedPage, limit: limit }))
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    dispatch(fetchAllUsers({ page: page, limit: newLimit }))
  };


  const filteredUsers = listUsers.filter((user) => {
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesSearch =
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý người dùng</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleRoleChange} value={selectedRole}>
                <option value="All">Tất cả vai trò</option>
                <option value={userRole.CUSTOMER}>Khách Hàng</option>
                <option value={userRole.STAFF}>Nhân Viên</option>
                <option value={userRole.ADMIN}>Admin</option>
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
                  placeholder="Tìm kiếm người dùng..."
                  value={searchTerm}
                  onChange={handleSearchChange}/>
              </InputGroup>
            </Col>
           
       
            <Col xs={12} md={5} className="text-md-end">
              <Button variant="primary" onClick={handleAdd}>
                Thêm người dùng
              </Button>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
               
                  <th style={{ width: "20%" }}>Email</th>
                  <th style={{ width: "20%" }}>Tên</th>
                  <th style={{ width: "15%" }}>Phone</th>
                  <th style={{ width: "15%" }}>Vai trò</th>
                  <th style={{ width: "15%" }}>Trạng Thái</th>
                  <th style={{ width: "10%" }} className="text-end">
                    Hành động
                  </th> 

                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                 
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.isBlock ? "Khóa" : "Không khóa"}</td>
                    <td className="text-end">
                      {/* Hiển thị nút cập nhật và nút block/unblock nếu currentUser là admin */}
                      {currentUser.role === userRole.ADMIN ? (
                        <>
                          <Button
                            variant="link"
                            className="me-2"
                            style={{ color: "green", textDecoration: "none" }}
                            onClick={() => handleUpdate(user)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="link"
                            style={{ color: user.isBlock ? "green" : "red", textDecoration: "none" }}
                            onClick={() => handleToggleBlock(user)}
                          >
                            {user.isBlock ? (
                              <i className="bi bi-unlock"></i> // Icon mở khóa cho unblock
                            ) : (
                              <i className="bi bi-lock"></i> // Icon khóa cho block
                            )}
                          </Button>
                        </>
                      ) : (
                        // Hiển thị nút cập nhật và block/unblock chỉ nếu currentUser là staff và user.role là 'customer'
                        currentUser.role === userRole.STAFF && user.role === userRole.CUSTOMER ? (
                          <>
                            <Button
                              variant="link"
                              className="me-2"
                              style={{ color: "green", textDecoration: "none" }}
                              onClick={() => handleUpdate(user)}
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                              variant="link"
                              style={{ color: user.isBlock ? "green" : "red", textDecoration: "none" }}
                              onClick={() => handleToggleBlock(user)}
                            >
                              {user.isBlock ? (
                                <i className="bi bi-unlock"></i> // Icon mở khóa cho unblock
                              ) : (
                                <i className="bi bi-lock"></i> // Icon khóa cho block
                              )}
                            </Button>
                          </>
                        ) : null
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
    
      {/* Modal thêm người dùng */}
      <AddUserModal show={showAddModal} handleClose={handleCloseAddModal} />
      {/* Modal sửa người dùng */}
      <EditUserModal show={showEditModal} handleClose={handleCloseEditModal} editUser={editUser} />
      {/* Modal xác nhận xóa */}
      <DeleteUserModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deleteUserId={deleteUserId} />

    </>
  );
}
export default User