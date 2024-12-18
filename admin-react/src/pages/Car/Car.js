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
import AddTourModal from "./AddCarModal";
import DeleteTourModal from "./DeleteCarModal";
import { fetchAllCar } from "../../redux/slices/carSlice";
import EditCarModal from "./EditCarModal";
import { toVietnamCurrency } from "../../helpers/currencyHelper";



const Car =({ setToggle }) =>{
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [deleted, setDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("asc");
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { listCars, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.car);



  useEffect(() => {
    dispatch(fetchAllCar({ page: page, limit: limit }))
  }, [])



  useEffect(() => {

    if (isSuccess) {
      if (actionType === 'ADD_CAR') {
        toast.success("Thêm Loại xe thành công");
      } else if (actionType === 'UPDATE_CAR') {
        toast.success("Cập nhật Loại xe thành công");
      } else if (actionType === 'DELETE_CAR') {
        toast.success("Xóa Loại xe thành công");
      }

      dispatch(fetchAllCar({ page: page, limit: limit }))
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



  const handleUpdate= (prop) => {
    setEdit(prop);
    setShowEditModal(true);
  };


  const handleDelete = (prop) => {
    setDelete(prop);
    setShowDeleteModal(true);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage)
    dispatch(fetchAllCar({ page: selectedPage, limit: limit }))
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
    dispatch(fetchAllCar({ page: page, limit: newLimit }))

  };



  const filtered = listCars.filter((car) => {
    const matchesSearch =
      (car.carType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) 
    
    return matchesSearch;

  })
    .sort((a, b) => {
      const order = selected=== "asc" ? 1 : -1;
      const aSeats = parseInt(a.carType) || 0;
      const bSeats = parseInt(b.carType) || 0;
      return order * (aSeats - bSeats);
    });

  

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý Loại Xe</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleChange} value={selected}>
                <option value="asc">Sắp xếp từ xe nhỏ - to</option>
                <option value="desc">Sắp xếp từ xe to - nhỏ</option>
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
                Thêm Loại Xe
              </Button>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "10%" }}>Loại xe</th>
                  <th style={{ width: "12%" }}>Giá xe theo Tour</th>
                  <th style={{ width: "12%" }}>Giá mở cửa</th>
                  <th style={{ width: "12%" }}>Quãng đường đầu</th>
                  <th style={{ width: "15%" }}>Giá quãng đường đầu</th>
                  <th style={{ width: "15%" }}>Giá quãng đường tiếp</th>
                  <th style={{ width: "12%" }}>Giá chờ</th>
                  <th style={{ width: "10%" }} className="text-end">
                    Hành động
                  </th>

                </tr>
              </thead>
              <tbody>
                {filtered.map((car, index) => (
                  <tr key={car._id}>
                    <td>{(page - 1) * limit + index + 1}</td>

                    <td>{car.carType}</td>
                    <td>{toVietnamCurrency(Number(car.priceCarTour))}</td>
                    <td>{toVietnamCurrency (car.basePrice)}</td>
                    <td>{car.distanceThreshold}  KM</td>
                    <td>{toVietnamCurrency(car.priceForThresholdKm)}</td>
                    <td>{toVietnamCurrency(car.priceForExtraKm)}</td>
                    <td>{toVietnamCurrency(car.waitingPrice)}</td>
                  
               
                    <td className="text-end" >
                      <Button
                        variant="link"
                        className="me-2"
                        style={{ color: "green", textDecoration: "none" }}
                        onClick={() => handleUpdate(car)}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="link"
                        style={{ color: "red", textDecoration: "none" }}
                        onClick={() => handleDelete(car)}>
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
     
      <EditCarModal show={showEditModal} handleClose={handleCloseEditModal} edit={edit} />
 

      <DeleteTourModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deleted={deleted} />
     
    </>
  );
}
export default Car