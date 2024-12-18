import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NewsDetail.css"; // Import file CSS
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsId } from "../../redux/slices/newsSlice";

const NewsDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { newsId, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.news);
    // Giả sử bạn đã lấy dữ liệu từ API và lưu trong biến 'baiViet'
    useEffect(()=>{
        dispatch(fetchNewsId(id))
    },[])

    // if (!baiViet) {
    //     return <div>Bài viết không tồn tại</div>;
    // }

    return (
        <section id="detail" className="block news-detail-block">
        <Container>
        <div className="news-detail">
                    <div dangerouslySetInnerHTML={{ __html: newsId.description }} />
        </div>
        </Container>
        </section>
    );
};

export default NewsDetail;
