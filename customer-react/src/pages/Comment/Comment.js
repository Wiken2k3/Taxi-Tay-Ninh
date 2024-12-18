import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import customerImg from '../../assets/images/customer.png'; // Use your own image path
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchAllCommentApprove } from '../../redux/slices/commentSlice';
import avt from '../../assets/images/Address.png';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Slider from 'react-slick'; // Import Slider từ react-slick
import { toast } from 'react-toastify';
import './Comment.css';
const Comment = () => {
  const dispatch = useDispatch();
  const { listCommentApprove, isLoading } = useSelector(state => state.comment);
  const currentUser = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    dispatch(fetchAllCommentApprove());
  }, [dispatch]);

  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddComment = async () => {
    if (newComment && rating) {
      const commentData = {
        content: newComment,
        rating: rating,
      };
      try {
        await dispatch(addComment(commentData)).unwrap();
        toast.success('Bình luận thành công');
        toast.info('Vui lòng đợi duyệt bình luận');
      } catch (error) {
        toast.error(error);
      }

      setNewComment('');
      setRating(5);
    } else {
      toast.error('Vui lòng nhập đánh giá và ý kiến');
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Cấu hình slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <section id="home-comment" className="home-comment-section">  
      <Slider {...settings} className="comment-slider">
        {listCommentApprove.map((comment) => (
          <div key={comment._id} className='comment-container'>
            <div className="comment-content">
              <img
                src={customerImg}
                alt="Avatar"
                className="comment-avatar"
              />
              <div className="comment-details">
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < comment.rating ? 'filled-star' : 'empty-star'}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '20px' }}>{comment.content}</p>
                <p><strong>{comment.customerName}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Comment;