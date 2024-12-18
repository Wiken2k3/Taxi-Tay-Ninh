import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col, InputGroup, FormControl,  } from 'react-bootstrap';
import EditCommentModal from './EditCommentModal';
import { Status, getStatusStyle } from '../../../enums/status.enum';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCommentCurrentUser, fetchAllCommentCurrentUser } from '../../../redux/slices/commentSlice';
import { toVietnamTime } from '../../../helpers/dateHelper';
import './CommentHistory.css'
import { toast } from 'react-toastify';

const CommentHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selected, setSelected] = useState("All");

  const dispatch = useDispatch()
  
  const [searchTerm, setSearchTerm] = useState('');
  const { listCommentCurrentUser, isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.comment);
  
  useEffect(()=>{
    dispatch(fetchAllCommentCurrentUser({page,limit}))
  },[])

  const handleShowModal = (comment) => {
    setSelectedComment(comment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComment(null);
  };

  const handleDeleteComment = async (commentId) => {
    try {
    
      await dispatch(DeleteCommentCurrentUser(commentId)).unwrap();
      toast.success("Bình luận đã được xóa thành công");
    } catch (error) {
      // Thông báo lỗi
      toast.error(error);
      
    }
  };

  const filtered = listCommentCurrentUser.filter((comment) => {
    const matches = selected === "All" || comment.status === selected;
    const matchesSearch =
      (comment.content?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (comment.rating?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase())
    return matches && matchesSearch;
  });
  const handleItemsPerPageChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    dispatch(fetchAllCommentCurrentUser({ page: page, limit: newLimit }))

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
        <h2>LỊCH SỬ COMMENT</h2>
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
            <th >Nội dung bình luận</th>
            <th>Đánh giá</th>
            <th>Ngày bình luận</th>
            <th>Trạng Thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((comment, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td className='content'>{comment.content}</td>
              <td>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ color: comment.rating >= star ? '#ffc107' : '#e4e5e9', fontSize: '18px' }}
                  >
                    ★
                  </span>
                ))}
              </td>
              <td>{toVietnamTime(comment.createdAt)}</td>
              <td>
                <Button variant="success" size="sm" style={getStatusStyle(comment.status)}>{comment.status}</Button>
              </td>
              <td>
                {comment.status === Status.PENDING && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleShowModal(comment)}
                      className="ms-2 me-2 mb-2"
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteComment(comment._id)}
                      className="ms-2 me-2 mb-2"
                    >
                      Xóa
                    </Button>
                  </>
                )}
                {comment.status === Status.APPROVED && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                    className="ms-2 me-2 mb-2"
                  >
                    Xóa
                  </Button>
                )}
              </td>
             
             
            </tr>
          ))}
        </tbody>
      </Table>

     {selectedComment && (
        <EditCommentModal
          show={showModal}
          handleClose={handleCloseModal}
          commentData={selectedComment}
        />
      )} 

    
    </Container>
  );
};

export default CommentHistory;
