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

import './News.css'
import EditNewsModal from "./EditNewsModal";
import DeleteNewsModal from "./DeleteNewsModal";
import AddNewsModal from "./AddNewsModal";
import { fetchAllNews } from "../../redux/slices/newsSlice";

const News = ({ setToggle }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [deleted, setDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("All");
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { listNews, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.news);



  useEffect(() => {
    dispatch(fetchAllNews({ page: page, limit: limit }))
  }, [])


  useEffect(() => {

    if (isSuccess) {
      if (actionType === 'ADD_NEWS') {
        toast.success("Thêm Tin tức thành công");
      } else if (actionType === 'UPDATE_NEWS') {
        toast.success("Cập nhật Tin tức thành công");
      } else if (actionType === 'DELETE_NEWS') {
        toast.success("Xóa Tin tức thành công");
      }

      dispatch(fetchAllNews({ page: page, limit: limit }))
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



  const handleUpdate = (prop) => {
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
    dispatch(fetchAllNews({ page: selectedPage, limit: limit }))
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
    dispatch(fetchAllNews({ page: page, limit: newLimit }))

  };


  const filtered = listNews
    .filter((news) => {
      const matchesSearch =
        (news.summary?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (news.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (news.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (selected === "asc") {
        // Sắp xếp từ cũ đến mới (tăng dần)
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        // Sắp xếp từ mới đến cũ (giảm dần)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded ps-4 pt-4 pe-4 pb-3">
          <h4 className="text-black fs-4 mb-3">Quản lý Tin Tức</h4>
          <Row className="mb-3">
            <Col xs={12} md={2} className="mb-3 mb-md-0">
              <Form.Select onChange={handleChange} value={selected}>
                <option value="asc">Mới Nhất</option>
                <option value="desc">Cũ Nhất</option>
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
                Thêm Tin Tức
              </Button>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th style={{ width: "15%" }}>Thumbnail</th>
                  <th style={{ width: "20%" }}>Tiêu đề</th>
                  <th style={{ width: "50%" }}>Tóm tắt</th>
                  <th style={{ width: "10%" }} className="text-end">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((neww, index) => (
                  <tr key={neww._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>
                      {neww.thumbnail.length > 0 && (
                        <img src={`${process.env.REACT_APP_NESTJS_APP_URL}${neww.thumbnail[0]}`}

                          width="200"
                          height="100"
                        />
                      )}
                    </td>
                    <td>{neww.title}</td>
                    <td >{neww.summary}</td>
                    <td className="text-end" >
                      <Button
                        variant="link"
                        className="me-2"
                        style={{ color: "green", textDecoration: "none" }}
                        onClick={() => handleUpdate(neww)}>
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="link"
                        style={{ color: "red", textDecoration: "none" }}
                        onClick={() => handleDelete(neww)}>
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


      <AddNewsModal show={showAddModal} handleClose={handleCloseAddModal} />

      <EditNewsModal show={showEditModal} handleClose={handleCloseEditModal} edit={edit} />

      <DeleteNewsModal show={showDeleteModal} handleClose={handleCloseDeleteModal} deleted={deleted} />
     
    </>
  );
}
export default News