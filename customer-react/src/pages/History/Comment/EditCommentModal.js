import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { UpdateCommentCurrentUser } from '../../../redux/slices/commentSlice';

const EditCommentModal = ({ show, handleClose, commentData }) => {
    const [rating, setRating] = useState(commentData?.rating || 0);
    const [content, setContent] = useState(commentData?.content || '');
    const dispatch = useDispatch();

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const dataComment = {
                content,
                rating,
            };
            await dispatch(UpdateCommentCurrentUser({ id: commentData._id, dataComment: dataComment })).unwrap();
           
            toast.success("Bình luận đã được cập nhật thành công");
            handleClose();
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Chỉnh sửa bình luận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Đánh giá của bạn:</Form.Label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{ color: rating >= star ? '#ffc107' : '#e4e5e9', fontSize: '18px' }}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ý kiến cá nhân của bạn:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                        <Button variant="success" type="submit">Lưu</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditCommentModal;
