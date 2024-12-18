import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import {
  Modal,
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
import { addTour, deleteTour, fetchAllTours, updateTour } from "../../redux/slices/tourSlice";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";
import DeleteTourModal from "./DeleteTourModal";
import './Tour.css'
import { toVietnamCurrency } from "../../helpers/currencyHelper";

const Tour = ({ setToggle }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editTour, setEditTour] = useState(null);
  const [deleteTourId, setDeleteTourId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("All");
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { listTours, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.tour);



  useEffect(() => {
    dispatch(fetchAllTours({ page: page, limit: limit }))
  }, [])


  useEffect(() => {

    if (isSuccess) {
      if (actionType === 'ADD_TOUR') {
        toast.success("Thêm Tour thành công");
      } else if (actionType === 'UPDATE_TOUR') {
        toast.success("Cập nhật Tour thành công");
      } else if (actionType === 'DELETE_TOUR') {
        toast.success("Xóa Tour thành công");
      }

      dispatch(fetchAllTours({ page: page, limit: limit }))
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



  const handleUpdate = (tour) => {
    setEditTour(tour);
    setShowEditModal(true);
  };


  const handleDeleteTour = (tour) => {
    setDeleteTourId(tour);
    setShowDeleteModal(true);
  };

  const handlePageClick = (event) => {

    const selectedPage = event.selected + 1;
    setPage(selectedPage)
    dispatch(fetchAllTours({ page: selectedPage, limit: limit }))
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

  };

  const handleChange = (e) => {

    setSelected(e.target.value);

  };
  const handleKeyDown = (e) => {
    // Ngăn chặn nhập ký tự không phải số
    if (!/^[0-9]$/i.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    dispatch(fetchAllTours({ page: page, limit: newLimit }))

  };



  const filteredTours = listTours
    .filter((tour) => {
      const matchesSearch =
        (tour.price?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (tour.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (tour.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      return  matchesSearch;
    })
    .sort((a, b) => {
      if (selected === 'asc') {
        return a.price - b.price; // Sắp xếp từ thấp đến cao
      } else {
        return b.price - a.price; // Sắp xếp từ cao đến thấp
      }
    });
  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý Tour</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleChange} value={selected}>
                <option value="asc">Giá thấp đến cao</option>
                <option value="desc">Giá cao đến thấp</option>
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
            <Col xs={12} md={5} className="text-md-end">
              <Button variant="primary" onClick={handleAdd}>
                Thêm Tour
              </Button>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "15%" }}>Hình Ảnh</th>
                  <th style={{ width: "30%" }}>Hình Ảnh Phụ</th>
                  <th style={{ width: "15%" }}>Tiêu đề</th>
                  <th style={{ width: "10%" }}>Địa Điểm</th>
                  <th style={{ width: "10%" }}>Giá Tiền</th>
                  <th style={{ width: "50%" }}>Dịch vụ</th>
                  <th style={{ width: "10%" }} className="text-end">
                    Hành động
                  </th>

                </tr>
              </thead>
              <tbody>
                {filteredTours.map((tour, index) => (
                  <tr key={tour._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>
                      {tour.images.length > 0 && (
                        <img src={`${process.env.REACT_APP_NESTJS_APP_URL}${tour.images[0]}`}
                          width="200"
                          height="100" />
                      )}
                    </td>
                    <td>
                      {tour.images.length > 0 && (
                        <div style={{ display: 'flex', gap: '15px' }}>
                          {tour.images[1] && (
                            <img src={`${process.env.REACT_APP_NESTJS_APP_URL}${tour.images[1]}`}
                              width="120"
                              height="100" />
                          )}
                          {tour.images[2] && (
                            <img src={`${process.env.REACT_APP_NESTJS_APP_URL}${tour.images[2]}`}
                              width="120"
                              height="100" />
                          )}
                          {tour.images[3] && (
                            <img src={`${process.env.REACT_APP_NESTJS_APP_URL}${tour.images[3]}`}
                              width="120"
                              height="100" />
                          )}
                        </div>
                      )}
                    </td>
                    <td>{tour.title}</td>
                    <td>{tour.location}</td>
                    <td>{toVietnamCurrency(Number(tour.price))}</td>
                    <td>
                      {tour.services.map((service, index) => (
                        <div key={index}>
                          <strong>{service.name}:</strong> {toVietnamCurrency(Number(service.price))}
                        </div>
                      ))}
                    </td>
                    <td className="text-end">
                      <Button
                        variant="link"
                        className="me-2"
                        style={{ color: "green", textDecoration: "none" }}
                        onClick={() => handleUpdate(tour)}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="link"
                        style={{ color: "red", textDecoration: "none" }}
                        onClick={() => handleDeleteTour(tour)}>
                        <i className="bi bi-trash3"></i>
                      </Button>
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


      <AddTourModal show={showAddModal} handleClose={handleCloseAddModal} />
      {/* Modal thêm người dùng */}
      {/* <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Quản lý người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="formHandle">
              <Form.Label>Tiêu Đề</Form.Label>
              <Form.Control type="text" placeholder="Nhập tiêu đề" onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formDiaDiem">
              <Form.Label>Địa Điểm</Form.Label>
              <Form.Control type="text" placeholder="Nhập địa điểm" onChange={(e) => setDiadiem(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formGiatien">
              <Form.Label>Giá Tiền</Form.Label>
              <Form.Control type="text" placeholder="Nhập giá tiền" onChange={(e) => setPrice(e.target.value)} required />
            </Form.Group>
           
            <Form.Group controlId="formImage" className="mt-2">
              <Form.Label>Ảnh</Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
              // handle image upload
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-2">
              <Form.Label>Ảnh Phụ</Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange1}
                multiple  
              // handle image upload
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-2">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" className="ms-2" type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal> */}

      {/* Modal sửa người dùng */}
      {/* <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa người dùng {editTour?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="formHandle">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control type="text" defaultValue={editTour?.title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formHandle">
              <Form.Label>Địa Điểm</Form.Label>
              <Form.Control type="text" defaultValue={editTour?.location} onChange={(e) => setDiadiem(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formHandle">
              <Form.Label>Giá Tiền</Form.Label>
              <Form.Control type="text" defaultValue={editTour?.price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-2">
              <Form.Label>Ảnh</Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
              // handle image upload
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-2">
              <Form.Label>Ảnh Phụ</Form.Label>
              <Form.Control
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange1}
                multiple
              // handle image upload
              />
            </Form.Group>
        
            <div className="d-flex justify-content-end mt-2">
              <Button variant="secondary" onClick={() => setShowEditModal(false)} >
                Hủy
              </Button>
              <Button variant="primary" className="ms-2" type="submit">
                Lưu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal> */}
      <EditTourModal show={showEditModal} handleClose={handleCloseEditModal} editTour={editTour} />

      <DeleteTourModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deleteTourId={deleteTourId} />
     
    </>
  );
}
export default Tour